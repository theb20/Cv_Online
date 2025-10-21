// ==========================================
// AI SERVICE - ARCHITECTURE OPTIMISÉE
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
  
  // Réponses
  MAX_SUGGESTIONS: 4,
  MAX_AI_TOKENS: 300,
  TEMPERATURE: 0.7,
  
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
  }

  // Profile cache
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

  // Query cache
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

  // AI Response cache
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

  // Topics tracking
  addTopic(topic) {
    this.topics.add(topic);
  }

  getTopics() {
    return Array.from(this.topics);
  }

  // Cache cleanup
  _cleanCache(cache) {
    if (cache.size > CONFIG.MAX_CACHE_SIZE) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
  }

  // Reset
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
          this.fetchTable('education', { orderBy: 'end_year DESC' }),
          this.fetchTable('certification', { orderBy: 'end_year DESC' }),
          this.fetchTable('projects', { orderBy: 'created_at DESC' }),
          this.fetchTable('skills', { orderBy: 'level DESC' }),
          this.fetchTable('social_links')
        ]);

      const user = users[0];
      if (!user) return null;

      const profile = {
        ...user,
        experiences,
        education,
        certifications,
        projects: projects.map(p => ({
          ...p,
          technologies: [p.techno_1, p.techno_2, p.techno_3, p.techno_4].filter(Boolean)
        })),
        skills,
        socialLinks
      };

      cache.setProfile(profile);
      return profile;
    } catch (error) {
      console.error('Profile fetch error:', error.message);
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
      greeting: /^(salut|bonjour|hello|hey|hi|coucou|yo|bonsoir)\b/i,
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
    if (!profile) return null;

    const experiences = profile.experiences || [];
    const skills = profile.skills || [];
    const projects = profile.projects || [];

    const totalYears = this._calculateYearsOfExperience(experiences);
    const expertSkills = skills.filter(s => ['expert', 'advanced'].includes(s.level));
    const topSkills = skills.slice(0, 5);

    return {
      name: profile.fullname || 'Développeur',
      currentRole: experiences[0]?.position || 'Développeur',
      yearsOfExperience: Math.round(totalYears),
      totalProjects: projects.length,
      totalCertifications: (profile.certifications || []).length,
      expertSkillsCount: expertSkills.length,
      topSkills: topSkills.map(s => ({ name: s.name, level: s.level })),
      topSkillsNames: topSkills.map(s => s.name).join(', '),
      mainTech: skills[0]?.name || 'Développement web',
      recentProjects: projects.slice(0, 3),
      email: profile.email,
      phone: profile.phone,
      socialLinks: profile.socialLinks || []
    };
  }

  _calculateYearsOfExperience(experiences) {
    let totalMs = 0;
    const now = Date.now();

    for (const exp of experiences) {
      if (!exp.start_date) continue;
      const start = new Date(exp.start_date).getTime();
      const end = exp.end_date === 'Present' || !exp.end_date
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
          cache.setAIResponse(cacheKey, result, this.config.AI_PROVIDER);
          console.log(`✅ [${this.config.AI_PROVIDER}] Réponse générée!`);
          return { response: result, source: this.config.AI_PROVIDER };
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
            content: 'Tu es un assistant professionnel et enthousiaste. Réponds en français de manière concise et engageante.'
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
        temperature: CONFIG.TEMPERATURE
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
// 7. RESPONSE BUILDER (CLASS)
// ==========================================

class ResponseBuilder {
  buildPrompt(intent, insights, message) {
    return `Tu es ${insights.name}, ${insights.currentRole} avec ${insights.yearsOfExperience}+ ans d'expérience.

Compétences principales: ${insights.topSkillsNames}
Projets réalisés: ${insights.totalProjects}
Spécialité: ${insights.mainTech}

Question de l'utilisateur: "${message}"

Instructions:
- Réponds de manière professionnelle et enthousiaste
- Maximum 150 mots
- Utilise 1-2 emojis pertinents
- Sois concret et précis
- Réponds en français

Réponse:`;
  }

  buildLocalResponse(intent, insights) {
    const responses = {
      greeting: {
        text: `Bonjour ! Je suis ${insights.name}, ${insights.currentRole} avec ${insights.yearsOfExperience}+ ans d'expérience. Comment puis-je vous aider ?`,
        emoji: '👋',
        type: 'welcome'
      },
      
      presentation: {
        text: `Je suis ${insights.name}, ${insights.currentRole} passionné avec ${insights.yearsOfExperience}+ années d'expérience.\n\n✨ ${insights.expertSkillsCount} technologies maîtrisées\n🚀 ${insights.totalProjects} projets livrés\n🎯 Spécialisé en ${insights.mainTech}`,
        emoji: '👨‍💻',
        type: 'profile'
      },
      
      skills: {
        text: `Mes compétences principales:\n\n${insights.topSkills.map(s => `• ${s.name} - ${s.level}`).join('\n')}\n\nTotal: ${insights.expertSkillsCount} technologies de niveau expert/avancé`,
        emoji: '💻',
        type: 'skills',
        data: insights.topSkills
      },
      
      projects: {
        text: `J'ai réalisé ${insights.totalProjects} projets professionnels.\n\nProjets récents:\n${insights.recentProjects.map(p => `• ${p.name}`).join('\n')}`,
        emoji: '🚀',
        type: 'projects',
        data: insights.recentProjects
      },
      
      contact: {
        text: `Contactez-moi facilement:\n\n📧 Email: ${insights.email || 'Voir profil'}\n📱 Téléphone: ${insights.phone || 'Voir profil'}\n\nRéseaux: ${insights.socialLinks.map(s => s.platform).join(', ')}`,
        emoji: '📬',
        type: 'contact',
        data: {
          email: insights.email,
          phone: insights.phone,
          social: insights.socialLinks
        }
      },
      
      thanks: {
        text: `Merci ! N'hésitez pas si vous avez d'autres questions sur mon parcours ou mes compétences.`,
        emoji: '🙏',
        type: 'acknowledgment'
      }
    };

    const fallback = {
      text: `Je suis ${insights.name}, ${insights.currentRole}. Posez-moi des questions sur mes compétences, projets ou expériences !`,
      emoji: '💡',
      type: 'general'
    };

    return responses[intent] || fallback;
  }

  async build(intent, profile, message) {
    cache.addTopic(intent);
    const insights = profileAnalyzer.analyze(profile);

    if (!insights) {
      return this._formatResponse('error', {
        text: 'Impossible de charger les données du profil.',
        emoji: '⚠️',
        type: 'error'
      });
    }

    // Tentative avec IA
    if (CONFIG.USE_AI) {
      try {
        const prompt = this.buildPrompt(intent, insights, message);
        const aiResult = await aiProvider.call(prompt);

        if (aiResult.response && aiResult.response.length > 20) {
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
    const localResponse = this.buildLocalResponse(intent, insights);
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
      text: 'Posez-moi n\'importe quelle question !',
      emoji: '💬',
      type: 'prompt'
    });
  }

  try {
    const profile = await dbService.getCompleteProfile();

    if (!profile) {
      return responseBuilder._formatResponse('error', {
        text: 'Impossible de charger les données du profil.',
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
      text: 'Une erreur est survenue. Veuillez réessayer.',
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
    messagesCount: cache.topics.size,
    topicsExplored: cache.getTopics(),
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