import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [consent, setConsent] = useState(null);

  useEffect(() => {
    const storedConsent = localStorage.getItem("cookie_consent");
    if (storedConsent) {
      setConsent(storedConsent);
      if (storedConsent === "accepted") {
        loadGoogleAnalytics();
      }
    } else {
      // Affiche la bannière si pas encore d’action
      setTimeout(() => setVisible(true), 1000);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setConsent("accepted");
    setVisible(false);
    loadGoogleAnalytics(); // ✅ active Google Analytics
  };

  const rejectCookies = () => {
    localStorage.setItem("cookie_consent", "rejected");
    setConsent("rejected");
    setVisible(false);
  };

  // --- Fonction pour charger Google Analytics dynamiquement ---
  const loadGoogleAnalytics = () => {
    if (window.gaLoaded) return; // évite le double chargement
    window.gaLoaded = true;

    // Remplace "G-XXXXXXXXXX" par ton ID Google Analytics 4
    const GA_ID = "G-L420DV0V5K";

    const script1 = document.createElement("script");
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_ID}');
    `;
    document.head.appendChild(script2);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-4 left-0 right-0 z-10000 flex justify-center px-4"
        >
          <div className="max-w-3xl w-full bg-slate-900/95 border border-slate-700 text-gray-200 backdrop-blur-md rounded-2xl shadow-2xl p-5 md:p-6 relative">
            <button
              onClick={() => setVisible(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-300 transition"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-semibold mb-2 text-white flex items-center gap-2">
              🍪 Gestion des cookies
            </h3>
            <p className="text-sm text-gray-400 mb-5 leading-relaxed">
              Ce site utilise des cookies à des fins d’analyse (Google Analytics)
              pour améliorer ton expérience. Tu peux accepter ou refuser à tout moment.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              <button
                onClick={rejectCookies}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-slate-600 text-gray-300 hover:bg-slate-800 transition"
              >
                Refuser
              </button>
              <button
                onClick={acceptCookies}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:scale-105 transition-all shadow-md hover:shadow-lg"
              >
                Accepter
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
