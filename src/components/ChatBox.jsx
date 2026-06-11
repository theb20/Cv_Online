import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Send, X, ExternalLink, Award, GraduationCap, RotateCcw, ChevronRight,
  Mail, Phone, Linkedin, Github, Globe, Briefcase, Code2, Layers, MessageSquareText,
  Mic, MicOff, Volume2, VolumeX
} from 'lucide-react';
import MagicRings from './MagicRings';
import {
  fetchSuggestions,
  fetchStats,
  sendChatMessage,
  resetChatSession
} from '../config/Services/aiServices.js';

// ==========================================
// BRAND
// ==========================================
// Palette claire et professionnelle, cohérente avec l'identité :
//   --ink   : #0D1B2A (navy)   — texte fort, surfaces sombres
//   --accent: #E85D04 (orange) — accents, liens, états actifs (usage parcimonieux)
// Surfaces blanches/slate, bordures discrètes, ombres douces.

// Petit monogramme réutilisé partout en guise d'avatar de l'assistant
const Monogram = ({ size = 'md' }) => {
  const dims = size === 'sm' ? 'w-10 h-7 text-[11px]' : size === 'lg' ? 'w-12 h-12 text-base' : 'w-9 h-9 text-xs';
  return (
    <div className={`${dims}  text-white font-semibold tracking-tight flex items-center justify-center flex-shrink-0 `}>
      <img src="/ai.png" className="w-full" alt="logo ai" />
    </div>
  );
};

// Icône de contact en fonction du type (remplace les émojis)
const contactIcon = (type) => {
  const c = 'w-4 h-4';
  switch ((type || '').toLowerCase()) {
    case 'email':    return <Mail className={c} />;
    case 'phone':    return <Phone className={c} />;
    case 'linkedin': return <Linkedin className={c} />;
    case 'github':   return <Github className={c} />;
    default:         return <Globe className={c} />;
  }
};

// ==========================================
// RICH DATA COMPONENTS — light theme
// ==========================================

const levelStyles = (level) => {
  const l = (level || '').toLowerCase();
  if (l === 'expert')   return 'bg-emerald-50 text-emerald-700 border-emerald-100';
  if (l === 'avancé' || l === 'advanced') return 'bg-[#E85D04]/8 text-[#E85D04] border-[#E85D04]/15';
  return 'bg-slate-100 text-slate-500 border-slate-200';
};

const levelDot = (level) => {
  const l = (level || '').toLowerCase();
  if (l === 'expert') return 'bg-emerald-500';
  if (l === 'avancé' || l === 'advanced') return 'bg-[#E85D04]';
  return 'bg-slate-300';
};

const SkillsList = ({ skills, summary }) => (
  <div className="mt-3 space-y-1.5">
    {skills.map((skill, i) => (
      <div key={i} className="flex items-center justify-between px-3 py-2.5 bg-white border border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-sm transition-all">
        <div className="flex items-center gap-2.5">
          <span className={`w-1.5 h-1.5 rounded-full ${levelDot(skill.level)}`} />
          <span className="text-sm font-medium text-slate-800">{skill.name}</span>
        </div>
        <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider border ${levelStyles(skill.level)}`}>
          {skill.level}
        </span>
      </div>
    ))}
    {summary && (
      <p className="text-[11px] text-slate-400 text-center pt-1">{summary}</p>
    )}
  </div>
);

const ProjectsList = ({ projects, total }) => (
  <div className="mt-3 space-y-2.5">
    {projects.map((project, i) => (
      <div key={i} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-slate-300 hover:shadow-md transition-all group">
        {project.image && (
          <div className="h-28 overflow-hidden bg-slate-100">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
        )}
        <div className="p-3.5">
          <div className="flex items-start justify-between mb-1.5">
            <h4 className="font-semibold text-slate-900 text-sm leading-snug">{project.title}</h4>
            {project.url && (
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#E85D04] ml-2 flex-shrink-0 transition-colors">
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
          <p className="text-xs text-slate-500 mb-2.5 leading-relaxed">{project.description}</p>
          {project.technologies?.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech, j) => (
                <span key={j} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[10px] font-medium">
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    ))}
    {total > projects.length && (
      <p className="text-[11px] text-slate-400 text-center">+{total - projects.length} autre{total - projects.length > 1 ? 's' : ''}</p>
    )}
  </div>
);

const ContactsList = ({ contacts }) => (
  <div className="mt-3 space-y-1.5">
    {contacts.map((contact, i) => (
      <a key={i} href={contact.link}
        target={contact.type === 'email' || contact.type === 'phone' ? '_self' : '_blank'}
        rel="noopener noreferrer"
        className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl hover:border-[#E85D04]/30 hover:shadow-sm transition-all group"
      >
        <span className="w-9 h-9 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E85D04]/8 group-hover:text-[#E85D04] transition-colors">
          {contactIcon(contact.type)}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">{contact.label}</p>
          <p className="text-xs font-medium text-slate-700 truncate group-hover:text-[#E85D04] transition-colors">{contact.value}</p>
        </div>
        <ExternalLink className="w-3 h-3 text-slate-300 group-hover:text-[#E85D04] transition-colors flex-shrink-0" />
      </a>
    ))}
  </div>
);

const StrengthsList = ({ strengths }) => (
  <div className="mt-3 grid grid-cols-2 gap-2">
    {strengths.map((s, i) => (
      <div key={i} className="p-3.5 bg-white border border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-sm transition-all">
        <div className="text-2xl font-bold text-[#E85D04] mb-1 tracking-tight">{s.value}</div>
        <div className="text-[10px] font-semibold text-slate-800 uppercase tracking-wide mb-1">{s.title}</div>
        <div className="text-[10px] text-slate-400 leading-snug">{s.description}</div>
      </div>
    ))}
  </div>
);

const EducationList = ({ education, certifications }) => (
  <div className="mt-3 space-y-4">
    {education?.length > 0 && (
      <div className="space-y-2">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
          <GraduationCap className="w-3.5 h-3.5 text-[#0D1B2A]" />
          <h4 className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Formation</h4>
        </div>
        {education.map((edu, i) => (
          <div key={i} className="pl-3 border-l-2 border-slate-200">
            <div className="bg-white border border-slate-200 p-3 rounded-xl">
              <div className="flex items-start justify-between mb-1">
                <h5 className="font-semibold text-slate-900 text-xs leading-snug">{edu.diploma}</h5>
                <span className={`px-2 py-0.5 rounded-md text-[9px] font-semibold uppercase tracking-wide whitespace-nowrap ml-2 border ${
                  edu.status === 'Terminé' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-[#E85D04]/8 text-[#E85D04] border-[#E85D04]/15'
                }`}>{edu.status}</span>
              </div>
              <p className="text-xs text-slate-500">{edu.school}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{edu.period}</p>
            </div>
          </div>
        ))}
      </div>
    )}
    {certifications?.length > 0 && (
      <div className="space-y-2">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
          <Award className="w-3.5 h-3.5 text-[#E85D04]" />
          <h4 className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Certifications</h4>
        </div>
        {certifications.map((cert, i) => (
          <div key={i} className="flex items-start gap-3 p-3 bg-white border border-slate-200 rounded-xl">
            <div className="w-8 h-8 bg-[#E85D04]/8 rounded-lg flex items-center justify-center flex-shrink-0">
              <Award className="w-4 h-4 text-[#E85D04]" />
            </div>
            <div className="flex-1 min-w-0">
              <h5 className="font-semibold text-slate-900 text-xs mb-0.5 leading-snug">{cert.name}</h5>
              <p className="text-[10px] text-slate-500 mb-1.5">{cert.institute}</p>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-400">{cert.year}</span>
                <span className={`px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase border ${
                  cert.status === 'En cours' ? 'bg-[#E85D04]/8 text-[#E85D04] border-[#E85D04]/15' : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                }`}>{cert.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

// ==========================================
// UTILS
// ==========================================

const stripMarkdown = (text) => text
  .replace(/!\[.*?\]\(.*?\)/g, '')
  .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
  .replace(/\*\*(.+?)\*\*/gs, '$1')
  .replace(/\*(.+?)\*/gs, '$1')
  .replace(/#{1,6}\s/g, '')
  .replace(/`(.+?)`/gs, '$1')
  .replace(/[-*+]\s/g, '')
  .replace(/\n+/g, ' ')
  .trim();

// ==========================================
// MESSAGE
// ==========================================

const Message = ({ message, isUser, onSpeak }) => {
  if (isUser) {
    return (
      <div className="flex justify-end animate-fadeIn">
        <div className="max-w-[78%] px-4 py-2.5 rounded-2xl rounded-tr-sm bg-[#0D1B2A] text-white shadow-sm">
          <p className="text-sm leading-relaxed">{message.text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start gap-2.5 animate-fadeIn">
      <Monogram size="sm" />
      <div className="max-w-[85%] space-y-2">
        <div className="relative group px-4 py-2.5 rounded-2xl rounded-tl-sm bg-white border border-slate-200 text-slate-700 shadow-sm markdown-content">
          <div className="text-sm leading-relaxed">
            <ReactMarkdown>
              {message.text + (message.isStreaming ? ' ▎' : '')}
            </ReactMarkdown>
          </div>
          {!message.isStreaming && onSpeak && (
            <button
              onClick={() => onSpeak(message.text)}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 text-slate-300 hover:text-[#E85D04] transition-all rounded-lg hover:bg-slate-50"
              title="Écouter"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        {message.data && (
          <>
            {message.type === 'skills'    && message.data.skills    && <SkillsList    skills={message.data.skills}     summary={message.data.summary} />}
            {message.type === 'projects'  && message.data.projects  && <ProjectsList  projects={message.data.projects} total={message.data.total} />}
            {message.type === 'contact'   && message.data.contacts  && <ContactsList  contacts={message.data.contacts} />}
            {message.type === 'strengths' && message.data.strengths && <StrengthsList strengths={message.data.strengths} />}
            {message.type === 'education' && <EducationList education={message.data.education} certifications={message.data.certifications} />}
          </>
        )}
      </div>
    </div>
  );
};

const TypingIndicator = () => (
  <div className="flex justify-start gap-2.5 animate-fadeIn">
    <Monogram size="sm" />
    <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-white border border-slate-200 shadow-sm">
      <div className="flex gap-1.5 items-center">
        {[0, 150, 300].map(delay => (
          <div key={delay} className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: `${delay}ms` }} />
        ))}
      </div>
    </div>
  </div>
);

// ==========================================
// FLIP TEXT — cycles through question phrases
// ==========================================

const FLIP_PHRASES = [
  'Comment puis-je vous aider ?',
  'Parlez-moi de vos projets.',
  'Découvrez mon parcours.',
  'Explorez mes compétences.',
];

const FlipText = () => {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const cycle = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % FLIP_PHRASES.length);
        setVisible(true);
      }, 350);
    }, 2800);
    return () => clearInterval(cycle);
  }, []);

  return (
    <span
      style={{
        display: 'inline-block',
        transition: 'opacity 0.35s ease, transform 1.35s ease',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-8px)',
      }}
    >
      {FLIP_PHRASES[idx]}
    </span>
  );
};

// ==========================================
// WELCOME SCREEN — MagicRings + FlipText
// ==========================================

const WelcomeScreen = ({ onSuggestion }) => {
  const topics = [
    { label: 'Parcours',     icon: Briefcase },
    { label: 'Compétences',  icon: Code2 },
    { label: 'Projets',      icon: Layers },
    { label: 'Contact',      icon: Mail },
  ];

  return (
    <div className="relative flex flex-col w-full h-full overflow-hidden bg-white">
      {/* ── MagicRings background ── */}
      <div className="absolute inset-0 opacity-80 h-full w-full pointer-events-none">
        <MagicRings
          color='#ff0000ff'
          colorTwo='#9b27daff'
          colorThree='#40ee80ff'
          ringCount={5}
          speed={0.8}
          attenuation={12}
          lineThickness={1.8}
          baseRadius={0.28}
          radiusStep={0.09}
          scaleRate={0.08}
          opacity={0.85}
          noiseAmount={0.08}
          ringGap={1.6}
          fadeIn={.6}
          fadeOut={0.5}
          followMouse={true}
          mouseInfluence={0.08}
          parallax={0.03}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative flex flex-col items-center justify-center flex-1 px-6 text-center text-black/60 h-full">
        <div className="relative mb-5 pt-20">
          <div className="w-76 h-50  flex items-center justify-center "> 
            <img src="/ai.png" className="animate-fadeIn w-full h-full" alt="logo ai" />
          </div>
        </div>

        <p className="text-[10px] font-bold   text-black/40 uppercase tracking-[0.22em] mb-2">
          Assistant · Frédérick
        </p>

        <h2 className="text-xl font-bold leading-snug min-h-[2rem] flex items-center text-black/60">
          <FlipText />
        </h2>

        

        
      </div>
    </div>
  );
};

// ==========================================
// MAIN CHATBOT
// ==========================================

const AIChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [stats, setStats] = useState(null);
  const [hasUnread, setHasUnread] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);

  const speak = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(stripMarkdown(text));
    utterance.lang = 'fr-FR';
    utterance.rate = 1.05;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      return;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    const recognition = new SR();
    recognitionRef.current = recognition;
    recognition.lang = 'fr-FR';
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (e) => {
      const transcript = Array.from(e.results).map(r => r[0].transcript).join('');
      setInput(transcript);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.start();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => { loadInitialData(); }, []);

  useEffect(() => {
    if (isActive) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isActive]);

  const loadInitialData = async () => {
    try {
      const [sug, st] = await Promise.all([fetchSuggestions(), fetchStats()]);
      setSuggestions(sug);
      setStats(st);
    } catch {}
  };

  const sendMessage = async (text = input) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const snapshot = messages; // capture history before state update
    setMessages(prev => [...prev, { text: trimmed, timestamp: Date.now(), isUser: true }]);
    setInput('');
    setIsLoading(true);

    const aiId = Date.now() + 1;

    try {
      await sendChatMessage(trimmed, snapshot, (chunk) => {
        setIsLoading(false);
        setMessages(prev => {
          const exists = prev.find(m => m.id === aiId);
          if (exists) {
            return prev.map(m => m.id === aiId ? { ...m, text: chunk } : m);
          }
          return [...prev, { id: aiId, text: chunk, isUser: false, isStreaming: true }];
        });
      });

      // Mark stream done
      setMessages(prev => prev.map(m => m.id === aiId ? { ...m, isStreaming: false } : m));
      if (!isActive) setHasUnread(true);
      await loadInitialData();
    } catch (error) {
      console.error('Chat Error:', error);
      setIsLoading(false);
      setMessages(prev => {
        const exists = prev.find(m => m.id === aiId);
        const errorText = error?.message || 'Une erreur est survenue. Réessayez.';
        const errMsg = { id: aiId + 1, text: errorText, isUser: false };
        return exists ? prev.map(m => m.id === aiId ? { ...m, text: errorText, isStreaming: false } : m) : [...prev, errMsg];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const resetChat = async () => {
    try { await resetChatSession(); } catch {}
    setMessages([]);
    await loadInitialData();
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn  { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes popIn   { from { opacity: 0; transform: scale(0.7); } to { opacity: 1; transform: scale(1); } }
        .animate-fadeIn  { animation: fadeIn  0.25s ease-out; }
        .animate-slideUp { animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-popIn   { animation: popIn   0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }

        .chat-scrollbar::-webkit-scrollbar { width: 0px; }
        .chat-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .chat-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 1); border-radius: 1px;  }
        .chat-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 1); display: none;  }

        .suggestion-scroll { scrollbar-width: none; }
        .suggestion-scroll::-webkit-scrollbar { display: none; }

        @keyframes glowRotate {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .markdown-content p:not(:last-child) { margin-bottom: 0.75rem; }
        .markdown-content ul, .markdown-content ol { margin-bottom: 0.75rem; padding-left: 1.25rem; }
        .markdown-content ul { list-style-type: disc; }
        .markdown-content ol { list-style-type: decimal; }
        .markdown-content li { margin-bottom: 0.25rem; }
        .markdown-content li::marker { color: #E85D04; }
        .markdown-content strong { font-weight: 700; color: #0D1B2A; }
        .markdown-content h1, .markdown-content h2, .markdown-content h3 { font-weight: 700; margin-top: 1rem; margin-bottom: 0.5rem; color: #0D1B2A; }
        .markdown-content code { background: #f1f5f9; padding: 0.1rem 0.3rem; border-radius: 0.25rem; font-family: monospace; font-size: 0.85em; }
        .markdown-content a { color: #E85D04; text-decoration: underline; }
        .markdown-content img { max-width: 100%; height: auto; border-radius: 0.75rem; margin-top: 0.75rem; margin-bottom: 0.75rem; border: 1px solid #e2e8f0; }
        
      `}</style>

      <div className="relative z-[1000]">

        {/* ── Floating Button ── */}
        <button
  onClick={() => setIsActive(!isActive)}
  aria-label={isActive ? 'Fermer le chat' : 'Ouvrir le chat'}
  className={`fixed bottom-6 right-6 z-[1000] transition-all duration-500 ${
    isActive
      ? 'scale-0 opacity-0 pointer-events-none'
      : 'scale-100 opacity-100 animate-float'
  }`}
>
 <div className="relative w-14 h-14 rounded-2xl flex items-center justify-center">

  <div className="absolute inset-0 rounded-2xl animate-spin-slow">
    <div className="w-full h-full rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 blur-md opacity-70"></div>
  </div>

  <div className="relative w-14 h-14 rounded-2xl bg-black/10 backdrop-blur-sm flex items-center justify-center">
    <img
      src="/ai.png"
      alt="AI"
      className="w-12 h-12 rounded-2xl object-cover"
    />
  </div>

</div>
        </button>

        {/* ── Chat Window ── */}
        {isActive && (
          <div className="fixed inset-3 md:bottom-6 md:right-6 md:left-auto md:top-auto md:inset-auto md:w-[420px] md:h-[600px] z-[1000] animate-slideUp">
            <div className="flex flex-col h-full rounded-2xl overflow-hidden border border-slate-200 shadow-2xl shadow-slate-400/30 bg-white">

              {/* ── Header ── */}
              <div className="relative px-4 py-3.5 border-b border-slate-200 bg-white flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img src="/ai.png" className="w-12 h-12 rounded-2xl object-cover" alt="" />
                    </div>
                    <div>
                      <h1 className="text-sm font-semibold text-slate-900 tracking-tight">Assistant · Fredo</h1>
                      
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={resetChat}
                      className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all"
                      title="Réinitialiser">
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <button onClick={() => setIsActive(false)}
                      className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all"
                      title="Fermer">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* ── Messages ── */}
              <div
                className={`flex-1 overflow-y-auto chat-scrollbar space-y-4 transition-colors duration-500 ${
                  messages.length === 0 ? '' : 'px-4 py-4 bg-[#F8FAFC]'
                }`}
              >
                {messages.length === 0
                  ? <WelcomeScreen onSuggestion={sendMessage} />
                  : messages.map((m, i) => <Message key={i} message={m} isUser={m.isUser} onSpeak={!m.isUser ? speak : undefined} />)
                }
                {isLoading && !messages.some(m => m.isStreaming) && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </div>

              {/* ── Suggestions ── */}
              {!isLoading && suggestions.length > 0 && messages.length > 0 && (
                <div className="px-4 py-2.5 border-t border-slate-200 bg-white flex gap-2 overflow-x-auto suggestion-scroll flex-shrink-0">
                  {suggestions.map((s, i) => (
                    <button key={i} onClick={() => sendMessage(s.text || s)}
                      className="flex-shrink-0 px-3 py-1.5 bg-slate-50 border border-slate-200 hover:bg-[#E85D04]/8 hover:border-[#E85D04]/30 hover:text-[#E85D04] rounded-xl text-[11px] text-slate-600 whitespace-nowrap transition-all font-medium">
                      {s.text || s}
                    </button>
                  ))}
                </div>
              )}

              {/* ── Input ── */}
              <div className="px-4 pb-4 pt-3 border-t border-slate-200 bg-white flex-shrink-0">
                <div className="flex gap-2 items-center">
                  {/* Glow border wrapper */}
                  <div className="relative flex-1">
                    <div className="absolute -inset-[1.5px] rounded-xl opacity-0 transition-opacity duration-300 pointer-events-none input-glow-ring" />
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={isListening ? 'Écoute en cours…' : 'Posez une question…'}
                      disabled={isLoading}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none placeholder-slate-400 text-sm text-slate-900 disabled:opacity-40 transition-all focus:bg-white focus:border-transparent"
                      onFocus={e => e.target.closest('.relative').querySelector('.input-glow-ring').style.opacity = '1'}
                      onBlur={e => e.target.closest('.relative').querySelector('.input-glow-ring').style.opacity = '0'}
                    />
                  </div>
                  {(window.SpeechRecognition || window.webkitSpeechRecognition) && (
                    <button
                      onClick={toggleListening}
                      disabled={isLoading}
                      title={isListening ? 'Arrêter le micro' : 'Parler'}
                      className={`p-2.5 rounded-xl text-white shadow-sm transition-all flex-shrink-0 disabled:opacity-30 ${
                        isListening
                          ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                          : 'bg-slate-400 hover:bg-slate-500'
                      }`}
                    >
                      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </button>
                  )}
                  {isSpeaking ? (
                    <button
                      onClick={stopSpeaking}
                      title="Arrêter la lecture"
                      className="p-2.5 bg-[#E85D04] hover:bg-[#E85D04]/80 rounded-xl text-white shadow-sm transition-all flex-shrink-0"
                    >
                      <VolumeX className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => sendMessage()}
                      disabled={!input.trim() || isLoading}
                      className="p-2.5 bg-[#0D1B2A] hover:bg-[#E85D04] rounded-xl text-white shadow-sm disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-[#0D1B2A] transition-all flex-shrink-0"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <p className="mt-2 text-[10px] text-slate-300 text-center">Entrée pour envoyer · Micro pour parler</p>
              </div>

            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default AIChatbot;