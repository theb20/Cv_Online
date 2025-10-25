import React, { useState, useEffect, useRef } from 'react';
import { Send, MessageSquare, X, ExternalLink, Award, Building2, GraduationCap, Mail, Phone, Linkedin, Github } from 'lucide-react';
import {
  fetchSuggestions,
  fetchStats,
  sendChatMessage,
  resetChatSession
} from '../config/Services/aiServices.js';

// ==========================================
// COMPOSANTS D'AFFICHAGE - STYLE PROFESSIONNEL
// ==========================================

const SkillsList = ({ skills, total, summary }) => (
  <div className="mt-3 space-y-2">
    {skills.map((skill, i) => (
      <div key={i} className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center text-base">
            {skill.icon || '📌'}
          </div>
          <span className="font-medium text-slate-800 text-sm">{skill.name}</span>
        </div>
        <span className={`px-2.5 py-1 rounded text-[11px] font-semibold uppercase tracking-wider ${
          skill.level === 'Expert' || skill.level === 'expert'
            ? 'bg-emerald-100 text-emerald-700'
            : skill.level === 'Avancé' || skill.level === 'advanced'
            ? 'bg-blue-100 text-blue-700'
            : 'bg-slate-200 text-slate-600'
        }`}>
          {skill.level}
        </span>
      </div>
    ))}
    {summary && (
      <p className="text-[11px] text-slate-500 text-center mt-2">{summary}</p>
    )}
  </div>
);

const ProjectsList = ({ projects, total }) => (
  <div className="mt-3 space-y-3">
    {projects.map((project, i) => (
      <div key={i} className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-sm transition-shadow">
        {project.image && (
          <div className="h-32 overflow-hidden bg-slate-100">
            <img 
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-semibold text-slate-800 text-sm leading-snug">
              {project.title}
            </h4>
            {project.url && (
              <a href={project.url} target="_blank" rel="noopener noreferrer" 
                 className="text-blue-600 hover:text-blue-700 ml-2 flex-shrink-0">
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
          <p className="text-xs text-slate-600 mb-3 leading-relaxed">{project.description}</p>
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech, j) => (
                <span key={j} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px] font-medium">
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    ))}
    {total > projects.length && (
      <p className="text-[11px] text-slate-500 text-center">
        Et {total - projects.length} autre{total - projects.length > 1 ? 's' : ''} projet{total - projects.length > 1 ? 's' : ''}
      </p>
    )}
  </div>
);

const ContactsList = ({ contacts }) => (
  <div className="mt-3 space-y-2">
    {contacts.map((contact, i) => (
      <a
        key={i}
        href={contact.link}
        target={contact.type === 'email' || contact.type === 'phone' ? '_self' : '_blank'}
        rel="noopener noreferrer"
        className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors group"
      >
        <div className="text-xl">{contact.icon}</div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-0.5">{contact.label}</p>
          <p className="text-xs font-medium text-slate-700 truncate group-hover:text-blue-600 transition-colors">
            {contact.value}
          </p>
        </div>
        <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors flex-shrink-0" />
      </a>
    ))}
  </div>
);

const StrengthsList = ({ strengths }) => (
  <div className="mt-3 grid grid-cols-2 gap-2.5">
    {strengths.map((strength, i) => (
      <div key={i} className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
        <div className="text-2xl font-bold text-blue-600 mb-1">
          {strength.value}
        </div>
        <div className="text-[11px] font-semibold text-slate-800 mb-1 uppercase tracking-wide">
          {strength.title}
        </div>
        <div className="text-[11px] text-slate-600 leading-snug">
          {strength.description}
        </div>
      </div>
    ))}
  </div>
);

const EducationList = ({ education, certifications }) => (
  <div className="mt-3 space-y-4">
    {education && education.length > 0 && (
      <div className="space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
          <GraduationCap className="w-4 h-4 text-blue-600" />
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Formation</h4>
        </div>
        {education.map((edu, i) => (
          <div key={i} className="pl-4 border-l-2 border-slate-200">
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg">
              <div className="flex items-start justify-between mb-1.5">
                <h5 className="font-semibold text-slate-800 text-xs leading-snug">{edu.diploma}</h5>
                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide whitespace-nowrap ml-2 ${
                  edu.status === 'Terminé'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {edu.status}
                </span>
              </div>
              <p className="text-xs text-slate-600 mb-1">{edu.school}</p>
              <p className="text-[11px] text-slate-500">{edu.period}</p>
            </div>
          </div>
        ))}
      </div>
    )}
    
    {certifications && certifications.length > 0 && (
      <div className="space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
          <Award className="w-4 h-4 text-amber-600" />
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Certifications</h4>
        </div>
        {certifications.map((cert, i) => (
          <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="w-8 h-8 bg-amber-100 rounded flex items-center justify-center flex-shrink-0">
              <Award className="w-4 h-4 text-amber-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h5 className="font-semibold text-slate-800 text-xs mb-1 leading-snug">{cert.name}</h5>
              <p className="text-[11px] text-slate-600 mb-1.5">{cert.institute}</p>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-500">{cert.year}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide ${
                  cert.status === 'En cours'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-emerald-100 text-emerald-700'
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
// MESSAGE COMPONENT
// ==========================================

const Message = ({ message, isUser }) => {
  if (isUser) {
    return (
      <div className="flex justify-end animate-fadeIn">
        <div className="max-w-[75%] px-4 py-2.5 rounded-lg bg-blue-600 text-white shadow-sm">
          <p className="text-sm leading-relaxed">{message.text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start animate-fadeIn">
      <div className="max-w-[85%] space-y-2">
        <div className="px-4 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-800 shadow-sm">
          <p className="text-sm leading-relaxed">
            {message.emoji && <span className="mr-1.5">{message.emoji}</span>}
            {message.text}
          </p>
        </div>
        
        {message.data && (
          <>
            {message.type === 'skills' && message.data.skills && (
              <SkillsList skills={message.data.skills} total={message.data.total} summary={message.data.summary} />
            )}
            {message.type === 'projects' && message.data.projects && (
              <ProjectsList projects={message.data.projects} total={message.data.total} />
            )}
            {message.type === 'contact' && message.data.contacts && (
              <ContactsList contacts={message.data.contacts} />
            )}
            {message.type === 'strengths' && message.data.strengths && (
              <StrengthsList strengths={message.data.strengths} />
            )}
            {message.type === 'education' && (
              <EducationList education={message.data.education} certifications={message.data.certifications} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

const TypingIndicator = () => (
  <div className="flex justify-start animate-fadeIn">
    <div className="px-5 py-3 rounded-lg bg-white border border-slate-200 shadow-sm">
      <div className="flex gap-1.5">
        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  </div>
);

// ==========================================
// MAIN CHATBOT COMPONENT
// ==========================================

const AIChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [stats, setStats] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const [sug, st] = await Promise.all([fetchSuggestions(), fetchStats()]);
      setSuggestions(sug);
      setStats(st);
    } catch (error) {
      console.error('Error loading initial data:', error);
    }
  };

  const sendMessage = async (text = input) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    setMessages(prev => [...prev, { text: trimmed, timestamp: Date.now(), isUser: true }]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await sendChatMessage(trimmed, messages);
      setMessages(prev => [...prev, { ...aiResponse, isUser: false }]);
      await loadInitialData();
    } catch (error) {
      setMessages(prev => [...prev, {
        text: 'Désolé, une erreur est survenue. Veuillez réessayer.',
        isUser: false
      }]);
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

  const resetChat = async () => {
    try {
      await resetChatSession();
      setMessages([]);
      await loadInitialData();
    } catch (error) {
      console.error('Error resetting chat:', error);
    }
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-slideUp { animation: slideUp 0.3s ease-out; }
        
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f8fafc; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>

      <div className="relative">
        {/* Floating Button - Minimal & Professional */}
        <button 
          onClick={() => setIsActive(!isActive)}
          className={`fixed bottom-6 right-6 z-[1001] transition-all duration-300 ${
            isActive ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
          }`}
        >
          <div className="w-14 h-14 bg-purple-900 bg-linear-to-r from-purple-900 to-purple-700 animate-pulse hover:bg-purple-700 rounded-full shadow-lg flex items-center justify-center transition-all">
            <MessageSquare className="w-6 h-6 text-white" />
            <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
          </div>
        </button>

        {/* Chat Window - Clean Professional Design */}
        {isActive && (
          <div className="fixed inset-4 md:bottom-6 md:right-6 md:left-auto md:top-auto md:w-[440px] md:h-[580px] z-[1000] animate-slideUp">
            <div className="flex flex-col h-full bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
              
              {/* Header - Minimal */}
              <div className="bg-white border-b border-slate-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h1 className="text-sm font-semibold text-slate-800">
                        Assistant virtuel
                      </h1>
                      <p className="text-xs text-slate-500">
                        {stats ? `${stats.provider}` : 'Connexion...'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={resetChat}
                      className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      Réinitialiser
                    </button>
                    <button
                      onClick={() => setIsActive(false)}
                      className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center px-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                      <MessageSquare className="w-8 h-8 text-blue-600" />
                    </div>
                    <h2 className="text-lg font-semibold text-slate-800 mb-2">
                      Bienvenue
                    </h2>
                    <p className="text-sm text-slate-600 leading-relaxed max-w-xs mb-6">
                      Posez vos questions sur le parcours professionnel, les compétences techniques ou les projets réalisés.
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {['Parcours', 'Compétences', 'Projets', 'Contact'].map((tag, i) => (
                        <span key={i} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-600 font-medium">
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
                <div className="px-4 py-3 bg-white border-t border-slate-200 flex gap-2 overflow-x-auto">
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(s.text || s)}
                      disabled={isLoading}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg text-xs text-slate-700 whitespace-nowrap transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                      {s.text || s}
                    </button>
                  ))}
                </div>
              )}

              {/* Input Area */}
              <div className="p-4 bg-white border-t border-slate-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Votre question..."
                    disabled={isLoading}
                    className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-slate-400 text-sm text-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  />
                  <button
                    onClick={() => sendMessage()}
                    disabled={!input.trim() || isLoading}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium flex items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors disabled:hover:bg-blue-600"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                  <span>Appuyez sur Entrée pour envoyer</span>
                  {stats?.aiEnabled && (
                    <span className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                      <span>En ligne</span>
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