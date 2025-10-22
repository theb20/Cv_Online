// ==========================================
// AI SERVICE - RÉPONSES COURTES ET DIRECTES
// ==========================================

import { db } from '../config/db.js';

// ==========================================
// 1. CONFIGURATION CENTRALISÉE
// ==========================================

const CONFIG = {
  // Cache
  CACHE_TTL: 5 * 60 * 1000, // 5 minutes
  DB_TIMEOUT: 5000,
  MAX_CACHE_SIZE: 50,
  
  // IA
  USE_AI: true,
  AI_PROVIDER: process.env.AI_PROVIDER || 'groq',
  AI_FALLBACK: true,
  
  // Réponses - OPTIMISÉ POUR RÉPONSES COURTES
  MAX_SUGGESTIONS: 4,
  MAX_AI_TOKENS: 150, // Réduit de 300 à 150
  MAX_WORDS: 50, // Maximum 50 mots
  TEMPERATURE: 0.6, // Réduit pour plus de précision
  
  // Providers
  providers: {
    groq: {
      url: 'https://api.groq.com/openai/v1/chat/completions',
      key: process.env.GROQ_API_KEY,
      model: 'llama-3.1-8b-instant',
      format: 'openai'
    },
    huggingface: {
      url: process.env.HUGGINGFACE_URL,
      key: process.env.HUGGINGFACE_API_KEY,
      model: 'google/flan-t5-base',
      format: 'hf'
    },
    openrouter: {
      url: 'https://openrouter.ai/api/v1/chat/completions',
      key: process.env.OPENROUTER_API_KEY,
      model: 'meta-llama/llama-3.1-8b-instruct:free',
      format: 'openai'
    },
    cohere: {
      url: 'https://api.cohere.ai/v1/chat',
      key: process.env.COHERE_API_KEY,
      model: 'command-r',
      format: 'cohere'
    }
  }
};

// ==========================================
// 2. GESTION DU CACHE (CLASS)
// ==========================================

class CacheManager {
  constructor() {
    this.profile = null;
    this.profileTimestamp = 0;
    this.queries = new Map();
    this.aiResponses = new Map();
    this.topics = new Set();
    this.conversationStarted = false;
    this.messageCount = 0;
  }

  getProfile() {
    if (this.profile && Date.now() - this.profileTimestamp < CONFIG.CACHE_TTL) {
      return this.profile;
    }
    return null;
  }

  setProfile(profile) {
    this.profile = profile;
    this.profileTimestamp = Date.now();
  }

  getQuery(key) {
    const cached = this.queries.get(key);
    if (cached && Date.now() - cached.timestamp < CONFIG.CACHE_TTL) {
      return cached.data;
    }
    this.queries.delete(key);
    return null;
  }

  setQuery(key, data) {
    this.queries.set(key, { data, timestamp: Date.now() });
    this._cleanCache(this.queries);
  }

  getAIResponse(key) {
    const cached = this.aiResponses.get(key);
    if (cached && Date.now() - cached.timestamp < CONFIG.CACHE_TTL) {
      return cached;
    }
    this.aiResponses.delete(key);
    return null;
  }

  setAIResponse(key, response, source) {
    this.aiResponses.set(key, { response, source, timestamp: Date.now() });
    this._cleanCache(this.aiResponses);
  }

  addTopic(topic) {
    this.topics.add(topic);
    this.messageCount++;
    if (!this.conversationStarted) {
      this.conversationStarted = true;
    }
  }

  getTopics() {
    return Array.from(this.topics);
  }

  isConversationStarted() {
    return this.conversationStarted;
  }

  getMessageCount() {
    return this.messageCount;
  }

  _cleanCache(cache) {
    if (cache.size > CONFIG.MAX_CACHE_SIZE) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
  }

  reset() {
    this.topics.clear();
  }

  clear() {
    this.profile = null;
    this.profileTimestamp = 0;
    this.queries.clear();
    this.aiResponses.clear();
    this.topics.clear();
  }
}

const cache = new CacheManager();

// ==========================================
// 3. DATABASE SERVICE (CLASS)
// ==========================================

class DatabaseService {
  async executeQuery(sql, params = []) {
    const cacheKey = `${sql}:${JSON.stringify(params)}`;
    const cached = cache.getQuery(cacheKey);
    if (cached) return cached;

    try {
      const [rows] = await Promise.race([
        db.query(sql, params),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('DB timeout')), CONFIG.DB_TIMEOUT)
        )
      ]);

      cache.setQuery(cacheKey, rows);
      return rows;
    } catch (error) {
      console.error('DB Error:', error.message);
      return [];
    }
  }

  async fetchTable(table, options = {}) {
    const { where, orderBy, limit } = options;
    let sql = `SELECT * FROM ${table}`;
    const params = [];

    if (where) {
      const conditions = Object.keys(where).map(key => `${key}=?`);
      sql += ` WHERE ${conditions.join(' AND ')}`;
      params.push(...Object.values(where));
    }

    if (orderBy) sql += ` ORDER BY ${orderBy}`;
    if (limit) sql += ` LIMIT ${limit}`;

    return this.executeQuery(sql, params);
  }

  async getCompleteProfile(forceRefresh = false) {
    if (!forceRefresh) {
      const cached = cache.getProfile();
      if (cached) return cached;
    }

    try {
      const [users, experiences, education, certifications, projects, skills, socialLinks] =
        await Promise.all([
          this.fetchTable('users', { limit: 1 }),
          this.fetchTable('experiences', { orderBy: 'start_date DESC' }),
          this.fetchTable('education', { orderBy: 'start_year DESC' }),
          this.fetchTable('certification', { orderBy: 'start_year DESC' }),
          this.fetchTable('projects', { orderBy: 'created_at DESC' }),
          this.fetchTable('skills', { orderBy: 'id ASC' }),
          this.fetchTable('social_links')
        ]);

      const user = users[0];
      if (!user) {
        console.error('❌ Aucun utilisateur trouvé dans la base de données');
        return null;
      }

      console.log('✅ Profil chargé:', {
        name: user.fullname,
        experiencesCount: experiences.length,
        projectsCount: projects.length,
        skillsCount: skills.length
      });

      const profile = {
        ...user,
        experiences: experiences || [],
        education: education || [],
        certifications: certifications || [],
        projects: (projects || []).map(p => ({
          ...p,
          name: p.title, // Mapper 'title' vers 'name'
          technologies: [p.techno_1, p.techno_2, p.techno_3, p.techno_4].filter(Boolean)
        })),
        skills: skills || [],
        socialLinks: socialLinks || []
      };

      cache.setProfile(profile);
      return profile;
    } catch (error) {
      console.error('❌ Erreur lors de la récupération du profil:', error.message);
      return cache.getProfile() || null;
    }
  }
}

const dbService = new DatabaseService();

// ==========================================
// 4. INTENT DETECTION (CLASS)
// ==========================================

class IntentDetector {
  constructor() {
    this.patterns = {
      greeting: /^(salut|bonjour|hello|hey|hi|coucou|yo|bonsoir)[\s!?]*$/i,
      presentation: /(?:qui|présente|nom|parle.*toi|connais|découvrir|à propos)/i,
      skills: /(?:compétence|technologie|stack|langage|framework|outil|maîtrise|capable|sais.*faire)/i,
      experience: /(?:expérience|travail|job|poste|carrière|parcours|travaillé|mission)/i,
      projects: /(?:projet|réalisation|portfolio|créé|développé|fait|construit|app)/i,
      education: /(?:formation|diplôme|éducation|école|université|études|certif)/i,
      contact: /(?:contact|linkedin|github|email|twitter|site|joindre|recruter|appeler)/i,
      availability: /(?:disponible|embaucher|recruter|freelance|mission|collaborer|travailler ensemble|libre)/i,
      pricing: /(?:tarif|prix|coût|budget|combien|rate|tjm|facturation)/i,
      why: /(?:pourquoi|motivation|raison|objectif|choix|intéresse)/i,
      strengths: /(?:force|avantage|meilleur|différence|unique|spécial|atout)/i,
      thanks: /(?:merci|thanks|cool|super|génial|top|excellent|bien|bravo|parfait)/i
    };
  }

  detect(message) {
    const normalized = message.toLowerCase().trim();
    
    // Ne détecter "greeting" que si c'est UNIQUEMENT un mot de salutation
    for (const [intent, pattern] of Object.entries(this.patterns)) {
      if (pattern.test(normalized)) {
        return intent;
      }
    }
    
    return 'general';
  }
}

const intentDetector = new IntentDetector();

// ==========================================
// 5. PROFILE ANALYZER (CLASS)
// ==========================================

class ProfileAnalyzer {
  analyze(profile) {
    if (!profile) {
      console.error('❌ ProfileAnalyzer: Profil vide');
      return null;
    }

    const experiences = profile.experiences || [];
    const skills = profile.skills || [];
    const projects = profile.projects || [];
    const certifications = profile.certifications || [];

    console.log('📊 Analyse du profil:', {
      name: profile.fullname,
      experiencesCount: experiences.length,
      skillsCount: skills.length,
      projectsCount: projects.length
    });

    const totalYears = this._calculateYearsOfExperience(experiences);
    const expertSkills = skills.filter(s => ['Expert', 'Avancé', 'expert', 'advanced'].includes(s.level));
    const topSkills = skills.slice(0, 5);

    // Déterminer le genre depuis le prénom (pas de champ gender dans la BDD)
    const pronouns = this._determinePronouns(profile.fullname);

    const insights = {
      name: profile.fullname || 'Développeur',
      currentRole: experiences[0]?.position || 'Développeur Web',
      currentCompany: experiences[0]?.company || '',
      yearsOfExperience: Math.max(1, Math.round(totalYears)),
      totalProjects: projects.length,
      totalCertifications: certifications.length,
      expertSkillsCount: expertSkills.length,
      topSkills: topSkills.map(s => ({ name: s.name, level: s.level })),
      topSkillsNames: topSkills.map(s => s.name).join(', ') || 'Développement web',
      mainTech: skills[0]?.name || 'React',
      recentProjects: projects.slice(0, 7),
      email: profile.email || '',
      phone: profile.phone || '',
      socialLinks: profile.socialLinks || [],
      country: profile.country || '',
      city: profile.city || '',
      website: profile.website || '',
      linkedin: profile.linkedin || '',
      github: profile.github || '',
      whatsapp: profile.whatsapp || '',
      instagram: profile.instagram || '',
      pronouns: pronouns,
      bio: profile.bio || ''
    };

    console.log('✅ Insights générés:', {
      name: insights.name,
      role: insights.currentRole,
      years: insights.yearsOfExperience,
      projects: insights.totalProjects,
      skills: insights.topSkillsNames
    });

    return insights;
  }

  _determinePronouns(fullname = '') {
    // Détecter le genre depuis le prénom (première partie du nom complet)
    const firstName = fullname.split(' ')[0].toLowerCase();
    
    // Liste de prénoms féminins courants
    const femaleNames = [
      'marie', 'julie', 'sarah', 'laura', 'émilie', 'sophie', 'camille', 
      'léa', 'manon', 'chloé', 'laura', 'pauline', 'alice', 'clara',
      'amélie', 'anaïs', 'jessica', 'aurélie', 'céline', 'nathalie'
    ];
    
    // Liste de prénoms masculins courants
    const maleNames = [
      'pierre', 'paul', 'jean', 'marc', 'luc', 'françois', 'nicolas',
      'julien', 'thomas', 'alexandre', 'maxime', 'antoine', 'lucas',
      'matthieu', 'simon', 'hugo', 'nathan', 'théo', 'louis', 'arthur',
      'frédérick', 'frederick', 'frédéric', 'frederic'
    ];
    
    // Vérifier si le prénom est dans une des listes
    if (femaleNames.includes(firstName)) {
      return {
        subject: 'elle',
        object: 'la',
        possessive: 'sa',
        article: 'une',
        adjective: 'e',
        title: 'Mme'
      };
    }
    
    // Par défaut masculin (incluant les prénoms masculins reconnus)
    return {
      subject: 'il',
      object: 'le',
      possessive: 'son',
      article: 'un',
      adjective: '',
      title: 'M.'
    };
  }

  _calculateYearsOfExperience(experiences) {
    if (!experiences || experiences.length === 0) return 1;

    let totalMs = 0;
    const now = Date.now();

    for (const exp of experiences) {
      if (!exp.start_date) continue;
      const start = new Date(exp.start_date).getTime();
      const end = exp.end_date === null || !exp.end_date
        ? now
        : new Date(exp.end_date).getTime();
      totalMs += end - start;
    }

    return totalMs / (365.25 * 24 * 60 * 60 * 1000);
  }
}

const profileAnalyzer = new ProfileAnalyzer();

// ==========================================
// 6. AI PROVIDER (CLASS)
// ==========================================

class AIProvider {
  constructor(config) {
    this.config = config;
  }

  async call(prompt, maxRetries = 2) {
    const cacheKey = this._hash(prompt);
    const cached = cache.getAIResponse(cacheKey);
    
    if (cached) {
      console.log('✅ [IA] Réponse depuis le cache');
      return cached;
    }

    const provider = this.config.providers[this.config.AI_PROVIDER];
    
    if (!provider?.key) {
      console.warn(`⚠️ [${this.config.AI_PROVIDER}] Clé API manquante`);
      return { response: null, source: 'no-api-key' };
    }

    console.log(`🚀 [${this.config.AI_PROVIDER}] Appel API...`);

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const result = await this._executeRequest(provider, prompt);
        
        if (result) {
          // Tronquer si trop long
          const truncated = this._truncateResponse(result);
          cache.setAIResponse(cacheKey, truncated, this.config.AI_PROVIDER);
          console.log(`✅ [${this.config.AI_PROVIDER}] Réponse générée!`);
          return { response: truncated, source: this.config.AI_PROVIDER };
        }
      } catch (error) {
        console.error(`❌ [${this.config.AI_PROVIDER}] Tentative ${attempt + 1}:`, error.message);
        if (attempt < maxRetries - 1) {
          await this._sleep(1000 * (attempt + 1));
        }
      }
    }

    return { response: null, source: 'api-failed' };
  }

  _truncateResponse(text) {
    if (!text) return text;
    
    // Limiter au nombre de mots maximum
    const words = text.trim().split(/\s+/);
    if (words.length > CONFIG.MAX_WORDS) {
      return words.slice(0, CONFIG.MAX_WORDS).join(' ') + '...';
    }
    
    return text;
  }

  async _executeRequest(provider, prompt) {
    const body = this._buildRequestBody(provider, prompt);
    
    const response = await fetch(provider.url, {
      method: 'POST',
      headers: this._buildHeaders(provider),
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    return this._extractResponse(provider, data);
  }

  _buildHeaders(provider) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${provider.key}`
    };

    if (provider.format === 'openai' && this.config.AI_PROVIDER === 'openrouter') {
      headers['HTTP-Referer'] = 'http://localhost:5000';
      headers['X-Title'] = 'Portfolio AI';
    }

    return headers;
  }

  _buildRequestBody(provider, prompt) {
    if (provider.format === 'openai') {
      return {
        model: provider.model,
        messages: [
          {
            role: 'system',
            content: 'Tu es un assistant professionnel. Réponds en français de manière TRÈS COURTE (maximum 40 mots), directe et concise. Utilise 1 emoji pertinent. Sois courtois mais va droit au but.'
          },
          { role: 'user', content: prompt }
        ],
        temperature: CONFIG.TEMPERATURE,
        max_tokens: CONFIG.MAX_AI_TOKENS
      };
    }

    if (provider.format === 'cohere') {
      return {
        model: provider.model,
        message: prompt,
        temperature: CONFIG.TEMPERATURE,
        max_tokens: CONFIG.MAX_AI_TOKENS
      };
    }

    if (provider.format === 'hf') {
      return {
        inputs: prompt,
        parameters: {
          max_new_tokens: CONFIG.MAX_AI_TOKENS,
          temperature: CONFIG.TEMPERATURE
        }
      };
    }

    return { prompt };
  }

  _extractResponse(provider, data) {
    if (provider.format === 'openai') {
      return data.choices?.[0]?.message?.content?.trim();
    }

    if (provider.format === 'cohere') {
      return data.text?.trim();
    }

    if (provider.format === 'hf') {
      return data[0]?.generated_text?.trim();
    }

    return null;
  }

  _hash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash = hash & hash;
    }
    return hash.toString();
  }

  _sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async test() {
    console.log(`\n🔍 Test connexion ${this.config.AI_PROVIDER}...`);
    const result = await this.call("Réponds juste 'OK'");
    
    if (result.response) {
      console.log('✅ IA opérationnelle!');
      return { success: true, provider: this.config.AI_PROVIDER };
    }
    
    console.error('❌ Connexion échouée');
    return { success: false, error: result.source };
  }
}

const aiProvider = new AIProvider(CONFIG);

// ==========================================
// 7. RESPONSE BUILDER (CLASS) - OPTIMISÉ
// ==========================================

class ResponseBuilder {
  buildPrompt(intent, insights, message, isFirstMessage) {
    const conversationContext = isFirstMessage 
      ? ''
      : '\n\nCeci est une conversation en cours, ne redis pas bonjour.';
    
    const adjective = insights.pronouns.adjective;
    const article = insights.pronouns.article;
    
    return `Tu es ${insights.name}, ${article} ${insights.currentRole} passionné${adjective} basé${adjective} à ${insights.city}, ${insights.country}.
Expérience: ${insights.yearsOfExperience}+ ans
Compétences clés: ${insights.topSkillsNames}
Bio: ${insights.bio.substring(0, 150)}...${conversationContext}

Question de l'utilisateur: "${message}"

IMPORTANT: Réponds à la première personne ("je", "mon", "ma") avec accord masculin.
Ton style: professionnel${adjective}, enthousiaste, direct${adjective}.
Réponds en 2-3 phrases courtes (40 mots max). Utilise 1 emoji pertinent.`;
  }

  buildLocalResponse(intent, insights, isFirstMessage) {
    const { pronouns, name, currentRole, yearsOfExperience, expertSkillsCount, totalProjects, topSkills, recentProjects, email, phone, socialLinks, mainTech, city, country, linkedin, github, whatsapp } = insights;
    const adj = pronouns.adjective;
    const article = pronouns.article;
    
    const responses = {
      greeting: {
        text: isFirstMessage 
          ? `Bonjour ! 👋 Je suis ${name}, ${currentRole} basé${adj} à ${city}. Comment puis-je vous aider ?`
          : `Oui ? Comment puis-je vous aider ? 😊`,
        emoji: '👋',
        type: 'welcome'
      },
      
      presentation: {
        text: `Je suis ${name}, ${article} ${currentRole} passionné${adj} basé${adj} à ${city}, ${country}. ${yearsOfExperience} ans d'expérience, ${expertSkillsCount} technologies maîtrisées, ${totalProjects} projets livrés.`,
        emoji: '👨‍💻',
        type: 'profile'
      },
      
      skills: {
        text: `Voici mes compétences principales :`,
        emoji: '💻',
        type: 'skills',
        data: {
          skills: topSkills.map(s => ({
            name: s.name,
            level: s.level,
            icon: s.icon || null
          })),
          total: expertSkillsCount,
          summary: `${expertSkillsCount} technologies au niveau avancé/expert`
        }
      },
      
      projects: {
        text: `J'ai réalisé ${totalProjects} projets professionnels :`,
        emoji: '🚀',
        type: 'projects',
        data: {
          projects: recentProjects.map(p => ({
            title: p.name,
            description: p.description || 'Projet web professionnel',
            technologies: p.technologies || [],
            url: p.project_url || p.link_url || null,
            image: p.image_url || null
          })),
          total: totalProjects
        }
      },
      
      experience: {
        text: `${yearsOfExperience} années d'expérience en ${currentRole}. Spécialisé${adj} en ${mainTech} et développement full-stack (React, Node.js, MySQL).`,
        emoji: '💼',
        type: 'experience'
      },
      
      contact: {
        text: `Voici mes coordonnées :`,
        emoji: '📬',
        type: 'contact',
        data: {
          contacts: [
            { type: 'email', label: 'Email', value: email, icon: '📧', link: `mailto:${email}` },
            { type: 'phone', label: 'Téléphone', value: phone, icon: '📱', link: `tel:${phone}` },
            { type: 'linkedin', label: 'LinkedIn', value: 'Profil LinkedIn', icon: '💼', link: linkedin },
            { type: 'github', label: 'GitHub', value: 'Profil GitHub', icon: '💻', link: github },
            { type: 'whatsapp', label: 'WhatsApp', value: 'Contacter sur WhatsApp', icon: '📞', link: whatsapp }
          ].filter(c => c.link)
        }
      },

      availability: {
        text: `Je suis actuellement disponible et ouvert${adj} aux opportunités ! N'hésitez pas à me contacter pour discuter de votre projet.`,
        emoji: '✅',
        type: 'availability'
      },

      strengths: {
        text: `Mes atouts principaux :`,
        emoji: '⭐',
        type: 'strengths',
        data: {
          strengths: [
            { title: 'Expérience', value: `${yearsOfExperience} ans`, description: 'Développement web professionnel' },
            { title: 'Technologies', value: `${expertSkillsCount} technologies`, description: 'Niveau avancé/expert' },
            { title: 'Projets', value: `${totalProjects} projets`, description: 'Livrés avec succès' },
            { title: 'Stack', value: topSkills.slice(0, 3).map(s => s.name).join(', '), description: 'Technologies principales' }
          ]
        }
      },
      
      education: {
        text: `Mon parcours de formation :`,
        emoji: '🎓',
        type: 'education',
        data: {
          education: [
            {
              school: 'Webitech',
              diploma: 'Bachelor - Concepteur développeur d\'applications',
              period: '2024-2025',
              status: 'Terminé'
            },
            {
              school: 'Institut Voltaire',
              diploma: 'BTS - Réseaux Informatique & Télécommunication',
              period: '2019-2022',
              status: 'Terminé'
            }
          ],
          certifications: [
            {
              institute: 'OpenClassrooms',
              name: 'Développeur Web Full Stack',
              status: 'En cours',
              year: '2024-2025'
            }
          ]
        }
      },

      why: {
        text: `Je suis passionné${adj} par le développement web et la création digitale. J'aime allier technique et créativité pour transformer des idées en expériences interactives impactantes.`,
        emoji: '💡',
        type: 'motivation'
      },
      
      thanks: {
        text: `Merci beaucoup ! 🙏 N'hésitez pas si vous avez d'autres questions sur mes projets ou compétences.`,
        emoji: '🙏',
        type: 'acknowledgment'
      }
    };

    const fallback = {
      text: isFirstMessage 
        ? `Je suis ${name}, ${currentRole}. Posez-moi des questions sur mes compétences, projets ou expériences !`
        : `Que souhaitez-vous savoir d'autre sur mon parcours ?`,
      emoji: '💡',
      type: 'general'
    };

    return responses[intent] || fallback;
  }

  async build(intent, profile, message) {
    const isFirstMessage = !cache.isConversationStarted();
    cache.addTopic(intent);
    const insights = profileAnalyzer.analyze(profile);

    if (!insights) {
      return this._formatResponse('error', {
        text: 'Impossible de charger le profil.',
        emoji: '⚠️',
        type: 'error'
      });
    }

    // TOUJOURS utiliser les réponses locales pour les intents avec données précises
    const useLocalResponse = ['skills', 'projects', 'contact', 'education', 'presentation'].includes(intent);

    if (useLocalResponse) {
      console.log(`📋 Utilisation de la réponse locale pour: ${intent}`);
      const localResponse = this.buildLocalResponse(intent, insights, isFirstMessage);
      return this._formatResponse('local', localResponse);
    }

    // Tentative avec IA pour les autres intents
    if (CONFIG.USE_AI) {
      try {
        const prompt = this.buildPrompt(intent, insights, message, isFirstMessage);
        const aiResult = await aiProvider.call(prompt);

        if (aiResult.response && aiResult.response.length > 10) {
          return this._formatResponse(aiResult.source, {
            text: aiResult.response,
            emoji: aiResult.source === 'cache' ? '⚡' : '🤖',
            type: 'ai',
            intent
          });
        }
      } catch (error) {
        console.error('❌ Erreur IA:', error.message);
      }
    }

    // Fallback sur réponse locale
    console.log(`📋 Fallback réponse locale pour: ${intent}`);
    const localResponse = this.buildLocalResponse(intent, insights, isFirstMessage);
    return this._formatResponse('local', localResponse);
  }

  _formatResponse(source, data) {
    return {
      text: data.text,
      emoji: data.emoji,
      type: data.type,
      source,
      intent: data.intent,
      data: data.data,
      timestamp: Date.now()
    };
  }
}

const responseBuilder = new ResponseBuilder();

// ==========================================
// 8. SUGGESTIONS GENERATOR (CLASS)
// ==========================================

class SuggestionsGenerator {
  constructor() {
    this.questions = {
      skills: { text: "Quelles sont tes compétences ?", emoji: "🛠️", priority: 1 },
      projects: { text: "Montre-moi tes projets", emoji: "🚀", priority: 2 },
      experience: { text: "Parle-moi de ton parcours", emoji: "💼", priority: 3 },
      contact: { text: "Comment te contacter ?", emoji: "📧", priority: 4 },
      availability: { text: "Es-tu disponible ?", emoji: "📅", priority: 5 },
      strengths: { text: "Quels sont tes points forts ?", emoji: "⭐", priority: 6 }
    };
  }

  generate() {
    const exploredTopics = cache.getTopics();
    const available = Object.entries(this.questions)
      .filter(([key]) => !exploredTopics.includes(key))
      .sort(([, a], [, b]) => a.priority - b.priority);

    if (available.length === 0) {
      return Object.entries(this.questions)
        .sort(([, a], [, b]) => a.priority - b.priority)
        .slice(0, CONFIG.MAX_SUGGESTIONS)
        .map(([key, q]) => ({ text: `${q.emoji} ${q.text}`, topic: key }));
    }

    return available
      .slice(0, CONFIG.MAX_SUGGESTIONS)
      .map(([key, q]) => ({ text: `${q.emoji} ${q.text}`, topic: key }));
  }
}

const suggestionsGenerator = new SuggestionsGenerator();

// ==========================================
// 9. API PUBLIQUE
// ==========================================

export async function generateAIResponse(message, conversationHistory = []) {
  const trimmed = message?.trim();

  if (!trimmed) {
    return responseBuilder._formatResponse('system', {
      text: 'Posez-moi une question !',
      emoji: '💬',
      type: 'prompt'
    });
  }

  try {
    const profile = await dbService.getCompleteProfile();

    if (!profile) {
      return responseBuilder._formatResponse('error', {
        text: 'Impossible de charger le profil.',
        emoji: '⚠️',
        type: 'error'
      });
    }

    const intent = intentDetector.detect(trimmed);
    const response = await responseBuilder.build(intent, profile, trimmed);

    return response;
  } catch (error) {
    console.error('AI Error:', error.message);
    return responseBuilder._formatResponse('error', {
      text: 'Une erreur est survenue.',
      emoji: '🔧',
      type: 'error'
    });
  }
}

export function getSuggestedQuestions() {
  return suggestionsGenerator.generate();
}

export function resetConversation() {
  cache.reset();
}

export function getConversationStats() {
  return {
    messagesCount: cache.getMessageCount(),
    topicsExplored: cache.getTopics(),
    conversationStarted: cache.isConversationStarted(),
    provider: CONFIG.AI_PROVIDER,
    aiEnabled: CONFIG.USE_AI,
    cacheSize: {
      queries: cache.queries.size,
      aiResponses: cache.aiResponses.size
    }
  };
}

export async function testAIConnection() {
  return aiProvider.test();
}

export function setAIProvider(provider) {
  if (CONFIG.providers[provider]) {
    CONFIG.AI_PROVIDER = provider;
    console.log(`✅ Provider changé: ${provider}`);
    return true;
  }
  console.error(`❌ Provider inconnu: ${provider}`);
  return false;
}

export async function getCompleteProfile(forceRefresh = false) {
  return dbService.getCompleteProfile(forceRefresh);
}

export function clearCache() {
  cache.clear();
  console.log('✅ Cache vidé');
}