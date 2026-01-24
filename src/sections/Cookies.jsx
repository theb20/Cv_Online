import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Shield } from "lucide-react";
import { setConsent } from "firebase/analytics";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    // Default consent: denied
    setConsent({
      ad_storage: 'denied',
      analytics_storage: 'denied'
    });

    const storedConsent = localStorage.getItem("cookie_consent");
    if (!storedConsent) {
      setTimeout(() => setVisible(true), 2000);
    } else {
      try {
        const parsed = JSON.parse(storedConsent);
        if (parsed === "accepted" || (typeof parsed === 'object' && parsed.analytics)) {
          setConsent({
            ad_storage: 'granted',
            analytics_storage: 'granted'
          });
        }
      } catch (e) {
        console.error("Invalid cookie consent format, resetting.", e);
        localStorage.removeItem("cookie_consent");
        setTimeout(() => setVisible(true), 2000);
      }
    }
  }, []);

  const acceptAll = () => {
    const allAccepted = { essential: true, analytics: true, marketing: true };
    setPreferences(allAccepted);
    localStorage.setItem("cookie_consent", JSON.stringify(allAccepted));
    setVisible(false);
    
    // Grant consent
    setConsent({
      ad_storage: 'granted',
      analytics_storage: 'granted'
    });
  };

  const rejectAll = () => {
    const allRejected = { essential: true, analytics: false, marketing: false };
    setPreferences(allRejected);
    localStorage.setItem("cookie_consent", JSON.stringify(allRejected));
    setVisible(false);
    
    // Deny consent (explicitly)
    setConsent({
      ad_storage: 'denied',
      analytics_storage: 'denied'
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9990]"
            onClick={() => setVisible(false)}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-4 right-4 bottom-4 md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:bottom-auto z-[9999] w-auto md:w-[600px] max-h-[85vh] overflow-y-auto"
          >
            <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
              
              {/* Header */}
              <div className="p-6 md:p-8 border-b border-white/5 bg-white/[0.02]">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-500/10 rounded-lg text-blue-400">
                      <Shield size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white tracking-tight">Centre de Confidentialité</h2>
                      <p className="text-neutral-400 text-sm mt-1">Gérez vos préférences de données</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setVisible(false)}
                    className="p-2 hover:bg-white/5 rounded-full text-neutral-400 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 space-y-6">
                <p className="text-neutral-300 leading-relaxed">
                  Nous utilisons des cookies pour améliorer votre expérience et analyser le trafic. 
                  Vous pouvez choisir d'accepter uniquement les cookies essentiels ou d'autoriser tous les cookies.
                </p>
              </div>

              {/* Footer */}
              <div className="p-6 md:p-8 border-t border-white/5 bg-white/[0.02] flex flex-col sm:flex-row gap-3 justify-end">
                <button
                  onClick={rejectAll}
                  className="px-6 py-3 rounded-xl border border-white/10 text-neutral-300 font-medium hover:bg-white/5 transition-colors"
                >
                  Tout refuser
                </button>
                <button
                  onClick={acceptAll}
                  className="px-6 py-3 rounded-xl bg-white text-black font-bold hover:bg-neutral-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                >
                  Tout accepter
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
