import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, LogIn } from "lucide-react";
import { loginWithGoogle } from "../config/Services/googleAuthService.js";

export default function AuthPrompt({ onClose }) {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try { await loginWithGoogle(); onClose(); }
    catch {} finally { setLoading(false); }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 8 }}
      transition={{ duration: 0.15 }}
      className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 w-64"
      onClick={e => e.stopPropagation()}
    >
      <button onClick={onClose} className="absolute top-2 right-2 text-gray-300 hover:text-gray-600 transition-colors">
        <X size={14} />
      </button>

      <p className="text-sm font-black text-gray-900 mb-1">Connexion requise</p>
      <p className="text-xs text-gray-400 mb-3 leading-relaxed">
        Connectez-vous avec Google pour interagir avec ce projet.
      </p>

      <button onClick={handleLogin} disabled={loading}
        className="w-full flex items-center justify-center gap-2.5 py-2 px-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors font-semibold text-sm text-gray-700 disabled:opacity-50">
        {loading
          ? <span className="w-4 h-4 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin" />
          : <svg width="16" height="16" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20H24v8h11.3C33.6 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.1-4z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.1 18.9 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.5 29.3 4 24 4c-7.7 0-14.4 4.4-17.7 10.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.4-5l-6.2-5.2C29.3 35.3 26.8 36 24 36c-5.2 0-9.6-2.9-11.3-7l-6.5 5C9.6 39.6 16.4 44 24 44z"/><path fill="#1976D2" d="M43.6 20H24v8h11.3c-.9 2.4-2.5 4.5-4.6 5.9l6.2 5.2C41 35.5 44 30.2 44 24c0-1.3-.1-2.7-.4-4z"/></svg>
        }
        {loading ? "Connexion…" : "Continuer avec Google"}
      </button>
    </motion.div>
  );
}
