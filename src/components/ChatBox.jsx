import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, Bot, X, ExternalLink, Mail, Phone, Linkedin, Github, Award, Calendar, CheckCircle } from 'lucide-react';
import {
  fetchSuggestions,
  fetchStats,
  sendChatMessage,
  resetChatSession
} from '../config/Services/aiServices.js';

// ==========================================
// COMPOSANTS D'AFFICHAGE DES DONNÉES
// ==========================================

// Composant pour afficher les compétences
const SkillsList = ({ skills, total, summary }) => (
  <div className="mt-3 space-y-2">
    <div className="grid grid-cols-1 gap-2">
      {skills.map((skill, i) => (
        <div key={i} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:bg-gray-700/50 transition-all">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{skill.icon || '💻'}</span>
            <span className="font-medium text-white">{skill.name}</span>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            skill.level === 'Expert' || skill.level === 'expert' 
              ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30' 
              : skill.level === 'Avancé' || skill.level === 'advanced'
              ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
              : 'bg-gray-600/20 text-gray-300 border border-gray-500/30'
          }`}>
            {skill.level}
          </span>
        </div>
      ))}
    </div>
    {summary && (
      <p className="text-xs text-gray-400 mt-2 text-center">{summary}</p>
    )}
  </div>
);

// Composant pour afficher les projets
const ProjectsList = ({ projects, total }) => (
  <div className="mt-3 space-y-3">
    {projects.map((project, i) => (
      <div key={i} className="bg-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden hover:border-purple-500/50 transition-all group">
        {project.image && (
          <div className="w-full h-32 bg-gray-900 overflow-hidden">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-semibold text-white group-hover:text-purple-400 transition-colors">
              {project.title}
            </h4>
            {project.url && (
              <a 
                href={project.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
          <p className="text-sm text-gray-400 mb-3">{project.description}</p>
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech, j) => (
                <span key={j} className="px-2 py-1 bg-purple-600/20 text-purple-300 rounded-lg text-xs font-medium border border-purple-500/30">
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    ))}
    {total > projects.length && (
      <p className="text-xs text-gray-400 text-center mt-2">
        Et {total - projects.length} autres projet{total - projects.length > 1 ? 's' : ''}...
      </p>
    )}
  </div>
);

// Composant pour afficher les contacts
const ContactsList = ({ contacts }) => (
  <div className="mt-3 space-y-2">
    {contacts.map((contact, i) => (
      <a
        key={i}
        href={contact.link}
        target={contact.type === 'email' || contact.type === 'phone' ? '_self' : '_blank'}
        rel="noopener noreferrer"
        className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:bg-gray-700/50 hover:border-purple-500/50 transition-all group"
      >
        <span className="text-2xl">{contact.icon}</span>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-400">{contact.label}</p>
          <p className="text-sm text-white group-hover:text-purple-400 transition-colors">
            {contact.value}
          </p>
        </div>
        <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-purple-400 transition-colors" />
      </a>
    ))}
  </div>
);

// Composant pour afficher les points forts
const StrengthsList = ({ strengths }) => (
  <div className="mt-3 grid grid-cols-2 gap-3">
    {strengths.map((strength, i) => (
      <div key={i} className="p-4 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all">
        <div className="text-2xl font-bold text-purple-400 mb-1">
          {strength.value}
        </div>
        <div className="text-xs font-semibold text-white mb-1">
          {strength.title}
        </div>
        <div className="text-xs text-gray-400">
          {strength.description}
        </div>
      </div>
    ))}
  </div>
);

// Composant pour afficher l'éducation
const EducationList = ({ education, certifications }) => (
  <div className="mt-3 space-y-4">
    {/* Diplômes */}
    {education && education.length > 0 && (
      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Diplômes</h4>
        {education.map((edu, i) => (
          <div key={i} className="relative pl-6 pb-4 border-l-2 border-purple-500/30 last:pb-0">
            <div className="absolute -left-2 top-0 w-4 h-4 bg-purple-600 rounded-full border-2 border-gray-900"></div>
            <div className="bg-gray-800/50 p-3 rounded-xl border border-gray-700/50">
              <div className="flex items-start justify-between mb-1">
                <h5 className="font-semibold text-white text-sm">{edu.diploma}</h5>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  edu.status === 'Terminé' 
                    ? 'bg-green-600/20 text-green-300 border border-green-500/30' 
                    : 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
                }`}>
                  {edu.status}
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-1">{edu.school}</p>
              <p className="text-xs text-gray-500">{edu.period}</p>
            </div>
          </div>
        ))}
      </div>
    )}

    {/* Certifications */}
    {certifications && certifications.length > 0 && (
      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Certifications</h4>
        {certifications.map((cert, i) => (
          <div key={i} className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-xl border border-gray-700/50">
            <Award className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h5 className="font-semibold text-white text-sm mb-1">{cert.name}</h5>
              <p className="text-xs text-gray-400">{cert.institute}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-500">{cert.year}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  cert.status === 'En cours' 
                    ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30' 
                    : 'bg-green-600/20 text-green-300 border border-green-500/30'
                }`}>
                  {cert.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

// ==========================================
// COMPOSANT MESSAGE PRINCIPAL
// ==========================================

const Message = ({ message, isUser }) => {
  if (isUser) {
    return (
      <div className="flex justify-end animate-slideIn">
        <div className="p-3 rounded-2xl max-w-[75%] shadow-lg transition-all hover:scale-[1.02] bg-gradient-to-br from-purple-600 to-blue-600 text-white">
          <p className="text-sm leading-relaxed">{message.text}</p>
        </div>
      </div>
    );
  }

  // Message du bot avec détection du type
  return (
    <div className="flex justify-start animate-slideIn">
      <div className="max-w-[85%] space-y-2">
        {/* Texte principal */}
        <div className="p-3 rounded-2xl shadow-lg bg-gradient-to-br from-gray-700 to-gray-800 text-white border border-gray-600">
          <p className="text-sm leading-relaxed">
            {message.emoji && <span className="mr-2">{message.emoji}</span>}
            {message.text}
          </p>
        </div>

        {/* Affichage des données structurées selon le type */}
        {message.data && (
          <div className="w-full">
            {message.type === 'skills' && message.data.skills && (
              <SkillsList 
                skills={message.data.skills} 
                total={message.data.total}
                summary={message.data.summary}
              />
            )}

            {message.type === 'projects' && message.data.projects && (
              <ProjectsList 
                projects={message.data.projects} 
                total={message.data.total}
              />
            )}

            {message.type === 'contact' && message.data.contacts && (
              <ContactsList contacts={message.data.contacts} />
            )}

            {message.type === 'strengths' && message.data.strengths && (
              <StrengthsList strengths={message.data.strengths} />
            )}

            {message.type === 'education' && (
              <EducationList 
                education={message.data.education}
                certifications={message.data.certifications}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// COMPOSANT TYPING INDICATOR
// ==========================================

const TypingIndicator = () => (
  <div className="flex justify-start animate-slideIn">
    <div className="p-4 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600 shadow-lg">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2.5 h-2.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  </div>
);

// ==========================================
// COMPOSANT SUGGESTIONS
// ==========================================

const Suggestions = ({ suggestions, onSelect, disabled }) => (
  <div className="px-4 pb-3 flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
    {suggestions.map((s, i) => (
      <button
        key={i}
        onClick={() => onSelect(s.text || s)}
        disabled={disabled}
        className="px-4 py-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 hover:from-purple-600/40 hover:to-blue-600/40 border border-purple-500/30 rounded-full text-xs text-gray-200 whitespace-nowrap transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 hover:shadow-lg backdrop-blur-sm"
      >
        {s.text || s}
      </button>
    ))}
  </div>
);

// ==========================================
// COMPOSANT PRINCIPAL CHATBOT
// ==========================================

const AIChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [stats, setStats] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    loadSuggestions();
    loadStats();
  }, []);

  const loadSuggestions = async () => setSuggestions(await fetchSuggestions());
  const loadStats = async () => setStats(await fetchStats());

  const sendMessage = async (text = input) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMessage = { text: trimmed, timestamp: Date.now(), isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await sendChatMessage(trimmed, messages);
      setMessages(prev => [...prev, { ...aiResponse, isUser: false }]);
      await Promise.all([loadSuggestions(), loadStats()]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          text: '❌ Désolé, une erreur est survenue. Veuillez réessayer.',
          isUser: false
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSuggestionClick = suggestion => sendMessage(suggestion);

  const resetChat = async () => {
    await resetChatSession();
    setMessages([]);
    await Promise.all([loadSuggestions(), loadStats()]);
  };

  return (
    <>
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
        
        .animate-popIn {
          animation: popIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .animate-pulse-custom {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>

      <div className="relative">
        {/* Bouton flottant animé */}
        <button 
          onClick={() => setIsActive(!isActive)} 
          className={`fixed bottom-6 right-6 z-[1001] group transition-all duration-300 ${
            isActive ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full animate-ping opacity-75" />
          <div className="relative w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 animate-pulse-custom">
            <Bot className="w-8 h-8 text-white" />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold shadow-lg animate-bounce">
              <Sparkles className="w-3 h-3" />
            </div>
          </div>
        </button>

        {/* Fenêtre de chat */}
        {isActive && (
          <div 
            className="fixed bottom-6 right-6 w-[calc(100vw-3rem)] max-w-md h-[75vh] z-[1000] animate-slideUp"
            style={{ transformOrigin: 'bottom right' }}
          >
            <div className="flex flex-col h-full bg-gray-900 text-white rounded-3xl shadow-2xl overflow-hidden border border-gray-700/50 backdrop-blur-xl">
              
              {/* Header */}
              <div className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 p-4 shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" 
                     style={{ 
                       backgroundSize: '200% 100%',
                       animation: 'shimmer 3s infinite'
                     }} 
                />
                
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 p-3 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-lg animate-scaleIn">
                      <svg fill="#ffffffa9" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff25">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                          <path d="M11.999 0c-2.25 0-4.5.06-6.6.21a5.57 5.57 0 0 0-5.19 5.1c-.24 3.21-.27 6.39-.06 9.6a5.644 5.644 0 0 0 5.7 5.19h3.15v-3.9h-3.15c-.93.03-1.74-.63-1.83-1.56-.18-3-.15-6 .06-9 .06-.84.72-1.47 1.56-1.53 2.04-.15 4.2-.21 6.36-.21s4.32.09 6.36.18c.81.06 1.5.69 1.56 1.53.24 3 .24 6 .06 9-.12.93-.9 1.62-1.83 1.59h-3.15l-6 3.9V24l6-3.9h3.15c2.97.03 5.46-2.25 5.7-5.19.21-3.18.18-6.39-.03-9.57a5.57 5.57 0 0 0-5.19-5.1c-2.13-.18-4.38-.24-6.63-.24zm-5.04 8.76c-.36 0-.66.3-.66.66v2.34c0 .33.18.63.48.78 1.62.78 3.42 1.2 5.22 1.26 1.8-.06 3.6-.48 5.22-1.26.3-.15.48-.45.48-.78V9.42c0-.09-.03-.15-.09-.21a.648.648 0 0 0-.87-.36c-1.5.66-3.12 1.02-4.77 1.05-1.65-.03-3.27-.42-4.77-1.08a.566.566 0 0 0-.24-.06z"></path>
                        </g>
                      </svg>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-purple-600 animate-pulse" />
                    </div>
                    <div>
                      <h1 className="text-lg font-bold flex items-center gap-2">
                        Assistant IA
                        <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
                      </h1>
                      <p className="text-xs text-white/90 font-medium">
                        {stats ? `${stats.provider} • ${stats.topicsExplored?.length || 0} sujets explorés` : 'Chargement...'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={resetChat}
                      className="px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-medium transition-all backdrop-blur-md shadow-lg hover:scale-105"
                    >
                      Nouveau
                    </button>
                    <button
                      onClick={() => setIsActive(false)}
                      className="p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-all backdrop-blur-md shadow-lg hover:scale-105"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800">
                {messages.length === 0 ? (
                  <div className="text-center py-12 animate-scaleIn">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center mb-6 shadow-2xl animate-popIn relative">
                      <Bot className="w-12 h-12 text-white" />
                      <div className="absolute inset-0 bg-white/20 rounded-3xl animate-ping" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-3 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      Bienvenue ! 🤖
                    </h2>
                    <p className="text-gray-400 mb-6 text-sm max-w-xs mx-auto leading-relaxed">
                      Posez-moi des questions sur mon parcours, mes compétences ou mes projets.
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {['💼 Parcours', '🚀 Projets', '⚡ Compétences'].map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300 backdrop-blur-sm border border-white/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  messages.map((m, i) => <Message key={i} message={m} isUser={m.isUser} />)
                )}
                {isLoading && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggestions */}
              {!isLoading && suggestions.length > 0 && (
                <Suggestions
                  suggestions={suggestions}
                  onSelect={handleSuggestionClick}
                  disabled={isLoading}
                />
              )}

              {/* Input */}
              <div className="p-4 border-t border-gray-700/50 bg-gray-800/80 backdrop-blur-xl">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Posez votre question..."
                    disabled={isLoading}
                    className="flex-1 px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all backdrop-blur-sm"
                  />
                  <button
                    onClick={() => sendMessage()}
                    disabled={!input.trim() || isLoading}
                    className="px-5 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-2xl text-white font-medium flex items-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 hover:shadow-xl disabled:hover:scale-100"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-xs">Entrée</kbd>
                    pour envoyer
                  </span>
                  {stats?.aiEnabled && (
                    <span className="flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50" />
                      <span className="font-medium text-green-400">IA active</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AIChatbot;