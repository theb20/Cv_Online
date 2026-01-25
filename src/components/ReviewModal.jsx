import React, { useState, useEffect } from 'react';
import { X, Star, Send, User, Briefcase, Github, Mail } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, googleProvider } from "../config/firebase";
import UtterancesComments from './UtterancesComments';

const ReviewModal = ({ isOpen, onClose }) => {
  // Initialize tab from localStorage to persist selection
  const [activeTab, setActiveTab] = useState(() => {
    try {
      return localStorage.getItem('review_modal_tab') || 'simple';
    } catch (e) {
      return 'simple';
    }
  }); 
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [user, setUser] = useState(null);

  // Sync tab with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('review_modal_tab', activeTab);
    } catch (e) {
      // Ignore write errors
    }
  }, [activeTab]);
  
  // Formulaire simple sans authentification complexe
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    rating: 5,
    message: ''
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser && isOpen) {
        setFormData(prev => ({
          ...prev,
          name: currentUser.displayName || prev.name,
          role: prev.role // On ne peut pas deviner le rôle
        }));
      }
    });
    return () => unsubscribe();
  }, [isOpen]);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("🚀 Début soumission avis...");
      
      // 1. Sauvegarde dans Firebase Firestore (avec timeout 10s)
      const firestorePromise = addDoc(collection(db, "messages"), {
        ...formData,
        photoURL: auth.currentUser?.photoURL || null,
        createdAt: serverTimestamp(),
        userId: auth.currentUser ? auth.currentUser.uid : 'anonymous',
        type: 'review_modal'
      });

      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Délai d'attente dépassé (Firestore)")), 10000)
      );

      await Promise.race([firestorePromise, timeoutPromise]);
      console.log("✅ Message sauvegardé dans Firestore");

      // 2. Tentative d'envoi EmailJS (optionnel, sans blocage critique)
      try {
          const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
          const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
          const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

          if (serviceId && templateId && publicKey) {
            console.log("📧 Envoi EmailJS...");
            await Promise.race([
                emailjs.send(
                  serviceId,
                  templateId,
                  {
                    from_name: formData.name,
                    from_email: "visiteur@portfolio.com",
                    company: formData.role,
                    message: `[NOTE: ${formData.rating}/5 étoiles]\n\n${formData.message}`,
                    project_type: "AVIS CLIENT SIMPLIFIÉ",
                  },
                  publicKey
                ),
                new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout EmailJS")), 5000))
            ]);
            console.log("✅ Email envoyé");
          } else {
            console.log("ℹ️ Mode simulation (pas de clés EmailJS)");
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
      } catch (emailError) {
          console.warn("⚠️ Erreur EmailJS (non critique):", emailError);
          // On continue même si l'email échoue
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', role: '', rating: 5, message: '' });
      }, 3000);

    } catch (error) {
      console.error("❌ Erreur critique:", error);
      alert(`Une erreur est survenue: ${error.message || "Erreur inconnue"}`);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-lg p-6 md:p-8 relative shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors z-10"
        >
          <X size={24} />
        </button>

        <h3 className="text-2xl font-display font-bold mb-2 text-white">Livre d'Or</h3>
        
        {/* Onglets de sélection */}
        <div className="flex p-1 bg-neutral-800 rounded-lg mb-6 shrink-0">
          <button
            onClick={() => setActiveTab('simple')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all ${
              activeTab === 'simple' 
                ? 'bg-neutral-700 text-white shadow-sm' 
                : 'text-neutral-400 hover:text-white hover:bg-neutral-700/50'
            }`}
          >
            <Mail size={16} />
            <span>Message Rapide</span>
          </button>
          <button
            onClick={() => setActiveTab('github')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all ${
              activeTab === 'github' 
                ? 'bg-neutral-700 text-white shadow-sm' 
                : 'text-neutral-400 hover:text-white hover:bg-neutral-700/50'
            }`}
          >
            <Github size={16} />
            <span>Commentaires</span>
          </button>
        </div>

        <div className="overflow-y-auto pr-2 custom-scrollbar">
          {activeTab === 'simple' ? (
            !submitted ? (
              <div className="animate-in slide-in-from-left-4 duration-300">
                {/* Auth Check: If not logged in, show ONLY login button */}
                {!user ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center space-y-6">
                    <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center">
                      <User size={32} className="text-neutral-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">Connexion requise</h4>
                      <p className="text-neutral-400 text-sm max-w-xs mx-auto">
                        Pour garantir l'authenticité des avis, vous devez vous connecter avec votre compte Google.
                      </p>
                    </div>
                    <button
                      onClick={handleGoogleLogin}
                      className="w-full max-w-sm bg-white text-black hover:bg-neutral-200 font-medium rounded-lg py-3 px-4 flex items-center justify-center gap-3 transition-colors shadow-lg hover:scale-[1.02] active:scale-[0.98] duration-200"
                    >
                      <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                      <span>Se connecter avec Google</span>
                    </button>
                  </div>
                ) : (
                  // Logged in: Show Form
                  <>
                    <div className="flex items-center gap-3 mb-6 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-neutral-800 shrink-0">
                         {user.photoURL ? (
                           <img 
                             src={user.photoURL} 
                             alt={user.displayName} 
                             className="w-full h-full object-cover" 
                             referrerPolicy="no-referrer"
                             onError={(e) => {
                               e.target.onerror = null; 
                               e.target.style.display = 'none';
                               e.target.nextSibling.style.display = 'block';
                             }}
                           />
                         ) : null}
                         <User className={`w-full h-full p-1.5 text-neutral-400 ${user.photoURL ? 'hidden' : ''}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">Connecté en tant que {user.displayName}</p>
                        <p className="text-xs text-green-400">Authentifié ✓</p>
                      </div>
                    </div>
                    
                    <p className="text-neutral-400 text-sm mb-6">Partagez votre expérience de collaboration.</p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Champ Nom */}
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-2">Votre Nom</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 w-4 h-4" />
                            <input 
                              required
                              readOnly // Read-only because it comes from Google
                              type="text" 
                              placeholder="Jean Dupont"
                              value={formData.name}
                              onChange={(e) => setFormData({...formData, name: e.target.value})}
                              className="w-full bg-neutral-800/30 border border-neutral-700/50 rounded-lg py-3 pl-10 pr-4 text-neutral-300 cursor-not-allowed focus:outline-none"
                              title="Nom récupéré depuis Google"
                            />
                        </div>
                      </div>

                      {/* Champ Poste/Entreprise */}
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-2">Poste / Entreprise</label>
                        <div className="relative">
                            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 w-4 h-4" />
                            <input 
                              required
                              type="text" 
                              className="w-full bg-neutral-800/50 border border-neutral-700 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                              placeholder="CEO @ MaBoite"
                              value={formData.role}
                              onChange={(e) => setFormData({...formData, role: e.target.value})}
                            />
                        </div>
                      </div>

                      {/* Notation Étoiles */}
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-2">Note</label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setFormData({...formData, rating: star})}
                              className="focus:outline-none transition-transform hover:scale-110"
                            >
                              <Star 
                                size={28} 
                                className={star <= formData.rating ? "fill-yellow-400 text-yellow-400" : "text-neutral-600"} 
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-2">Votre Message</label>
                        <textarea 
                          required
                          rows={4}
                          className="w-full bg-neutral-800/50 border border-neutral-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                          placeholder="C'était super de travailler avec vous..."
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                        />
                      </div>

                      {/* Bouton Envoyer */}
                      <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-white text-black font-medium py-3 rounded-lg hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 mt-2"
                      >
                        {loading ? (
                          <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
                        ) : (
                          <>
                            <span>Envoyer l'avis</span>
                            <Send size={18} />
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 animate-in zoom-in-50 duration-300">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 text-green-500">
                  <Star size={40} className="fill-current" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Merci !</h3>
                <p className="text-neutral-400 text-center max-w-xs">
                  Votre message a été envoyé directement.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-sm text-neutral-400 hover:text-white underline"
                >
                  Envoyer un autre avis
                </button>
              </div>
            )
          ) : (
            <div className="animate-in slide-in-from-right-4 duration-300">
               <p className="text-neutral-400 text-sm mb-4">
                 Connectez-vous avec GitHub pour laisser un commentaire public via Utterances.
               </p>
               <div className="bg-white/5 rounded-lg p-2 min-h-[300px]">
                 <UtterancesComments />
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;