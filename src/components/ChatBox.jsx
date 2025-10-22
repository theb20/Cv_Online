import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, Bot } from 'lucide-react';
import {
  fetchSuggestions,
  fetchStats,
  sendChatMessage,
  resetChatSession
} from '../config/Services/aiServices.js';

// Composant Message
const Message = ({ message, isUser }) => (
  <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
    <div className={`p-3 rounded-xl max-w-[70%] ${isUser ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
      {message.text}
    </div>
  </div>
);

// Composant TypingIndicator
const TypingIndicator = () => (
  <div className="flex justify-start">
    <div className="p-3 rounded-xl bg-gray-200 text-gray-800 max-w-[50%] animate-pulse">
      ...
    </div>
  </div>
);

// Composant Suggestions
const Suggestions = ({ suggestions, onSelect, disabled }) => (
  <div className="flex gap-2 overflow-x-auto p-2 bg-gray-100 border-t border-gray-200">
    {suggestions.map((s, i) => (
      <button
        key={i}
        onClick={() => onSelect(s.text || s)}
        disabled={disabled}
        className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all whitespace-nowrap"
      >
        {s.text || s}
      </button>
    ))}
  </div>
);

const AIChatbot = () => {
  const [messages, setMessages] = useState([]);
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
    <div className="relative h-screen w-full">

      <div className="flex flex-col fixed end-0 bottom-0 w-[100vw] max-w-sm h-[75vh] z-[1000] m-[2vw] bg-gray-900 text-white rounded-2xl shadow-2xl overflow-hidden">

      {/* Header */}
      <div className="bg-gradient-to-r from-green-900 via-indigo-700 to-blue-700 p-4 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 p-3 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
            <svg fill="#ffffffa9" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff25"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M11.999 0c-2.25 0-4.5.06-6.6.21a5.57 5.57 0 0 0-5.19 5.1c-.24 3.21-.27 6.39-.06 9.6a5.644 5.644 0 0 0 5.7 5.19h3.15v-3.9h-3.15c-.93.03-1.74-.63-1.83-1.56-.18-3-.15-6 .06-9 .06-.84.72-1.47 1.56-1.53 2.04-.15 4.2-.21 6.36-.21s4.32.09 6.36.18c.81.06 1.5.69 1.56 1.53.24 3 .24 6 .06 9-.12.93-.9 1.62-1.83 1.59h-3.15l-6 3.9V24l6-3.9h3.15c2.97.03 5.46-2.25 5.7-5.19.21-3.18.18-6.39-.03-9.57a5.57 5.57 0 0 0-5.19-5.1c-2.13-.18-4.38-.24-6.63-.24zm-5.04 8.76c-.36 0-.66.3-.66.66v2.34c0 .33.18.63.48.78 1.62.78 3.42 1.2 5.22 1.26 1.8-.06 3.6-.48 5.22-1.26.3-.15.48-.45.48-.78V9.42c0-.09-.03-.15-.09-.21a.648.648 0 0 0-.87-.36c-1.5.66-3.12 1.02-4.77 1.05-1.65-.03-3.27-.42-4.77-1.08a.566.566 0 0 0-.24-.06z"></path></g></svg>
          </div>
          <div>
            <h1 className="text-lg font-bold">Assistant IA</h1>
            <p className="text-xs text-white/80">
              {stats ? `${stats.provider} • ${stats.topicsExplored?.length || 0} sujets explorés` : 'Chargement...'}
            </p>
          </div>
        </div>
        <button
          onClick={resetChat}
          className="px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
        >
          Nouveau chat
        </button>
      </div>

  {/* Messages */}
  <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
    {messages.length === 0 ? (
      <div className="text-center py-12">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
          <Bot className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Bienvenue ! 🤖</h2>
        <p className="text-gray-300 mb-6">
          Posez-moi des questions sur mon parcours, mes compétences ou mes projets.
        </p>
      </div>
    ) : (
      messages.map((m, i) => <Message key={i} message={m} isUser={m.isUser} />)
    )}
    {isLoading && <TypingIndicator />}
    <div ref={messagesEndRef} />
  </div>

  {/* Suggestions */}
  {!isLoading && messages.length > 0 && (
    <Suggestions
      suggestions={suggestions}
      onSelect={handleSuggestionClick}
      disabled={isLoading}
    />
  )}

  {/* Input */}
  <div className="p-4 border-t border-gray-700 bg-gray-800">
    <div className="flex gap-2">
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Posez votre question..."
        disabled={isLoading}
        className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 text-white disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <button
        onClick={() => sendMessage()}
        disabled={!input.trim() || isLoading}
        className="px-5 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl text-white font-medium flex items-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <Send className="w-5 h-5" />
        <span className="hidden sm:inline">Envoyer</span>
      </button>
    </div>
    <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
      <span>Appuyez sur Entrée pour envoyer</span>
      {stats?.aiEnabled && (
        <span className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          IA active
        </span>
      )}
    </div>
  </div>
</div>

    
    </div>
  );
};

export default AIChatbot;
