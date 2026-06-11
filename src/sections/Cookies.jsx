import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Globe, ChevronRight, ChevronDown } from "lucide-react";
import { setConsent } from "firebase/analytics";

export default function CookieConsent() {
  const [visible, setVisible]       = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    essential:  true,
    analytics:  false,
    marketing:  false,
  });

  useEffect(() => {
    setConsent({ ad_storage: "denied", analytics_storage: "denied" });
    const stored = localStorage.getItem("cookie_consent");
    if (!stored) {
      setTimeout(() => setVisible(true), 1800);
    } else {
      try {
        const p = JSON.parse(stored);
        if (p === "accepted" || (typeof p === "object" && p.analytics)) {
          setConsent({ ad_storage: "granted", analytics_storage: "granted" });
        }
      } catch {
        localStorage.removeItem("cookie_consent");
        setTimeout(() => setVisible(true), 1800);
      }
    }
  }, []);

  const acceptAll = () => {
    const all = { essential: true, analytics: true, marketing: true };
    localStorage.setItem("cookie_consent", JSON.stringify(all));
    setConsent({ ad_storage: "granted", analytics_storage: "granted" });
    setVisible(false);
  };

  const rejectAll = () => {
    const none = { essential: true, analytics: false, marketing: false };
    localStorage.setItem("cookie_consent", JSON.stringify(none));
    setConsent({ ad_storage: "denied", analytics_storage: "denied" });
    setVisible(false);
  };

  const savePrefs = () => {
    localStorage.setItem("cookie_consent", JSON.stringify(preferences));
    setConsent({
      ad_storage:       preferences.marketing ? "granted" : "denied",
      analytics_storage: preferences.analytics ? "granted" : "denied",
    });
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9990]"
            style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(3px)" }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 16 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{   opacity: 0, scale: 0.97, y: 16  }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 flex items-center justify-center z-[9999] px-4"
          >
            <div className="w-full max-w-[560px] bg-white shadow-2xl overflow-hidden">

              {/* ── Top bar ── */}
              <div className="flex items-center justify-between px-7 pt-6 pb-2">
                {/* Logo */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#1a237e" }}>
                    <img src="/assets/favicon/favicon.svg" alt="logo" />
                  </div>
                  <span className="font-bold text-gray-900 text-sm">Frédérick Ahobaut</span>
                </div>

                {/* Language selector */}
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition-colors">
                  <Globe size={14} />
                  <span>Français</span>
                  <ChevronDown size={13} className="text-gray-400" />
                </button>
              </div>

              {/* ── Content ── */}
              <div className="px-7 py-5">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Paramètres de confidentialité
                </h2>

                <p className="text-sm text-gray-600 leading-relaxed text-justify">
                  J'utilise des cookies pour faire fonctionner mon portfolio. Cela me permet de
                  garantir que toutes les fonctions seront continuellement améliorées et que les publicités
                  basées sur vos intérêts seront affichées.
                </p>
                <p className="text-sm text-gray-600 leading-relaxed text-justify mt-3">
                  En confirmant le bouton « Accepter », vous consentez à leur utilisation. Vous pouvez utiliser le
                  bouton « Paramètres supplémentaires » pour sélectionner les cookies que vous souhaitez
                  autoriser. Vous pouvez également{" "}
                  <button onClick={rejectAll} className="underline text-gray-700 hover:text-gray-900 font-medium">refuser</button>
                  {" "}l'utilisation des cookies. De plus amples informations sont disponibles dans notre{" "}
                  <a href="/privacy" className="underline text-gray-700 hover:text-gray-900">Politique de confidentialité</a>.
                </p>

                {/* Détails */}
                <AnimatePresence>
                  {showDetails && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                      className="overflow-hidden mt-5">
                      <div className="space-y-3 border-t border-gray-100 pt-5">
                        {[
                          { key: "essential", label: "Cookies essentiels", desc: "Nécessaires au fonctionnement du site. Ne peuvent pas être désactivés.", locked: true },
                          { key: "analytics", label: "Cookies analytiques", desc: "Nous aident à comprendre comment les visiteurs interagissent avec le site.", locked: false },
                          { key: "marketing", label: "Cookies marketing",   desc: "Utilisés pour vous proposer des publicités pertinentes.", locked: false },
                        ].map(({ key, label, desc, locked }) => (
                          <div key={key} className="flex items-start justify-between gap-4 py-2">
                            <div>
                              <p className="text-sm font-semibold text-gray-800">{label}</p>
                              <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                            </div>
                            <button
                              disabled={locked}
                              onClick={() => !locked && setPreferences(p => ({ ...p, [key]: !p[key] }))}
                              className={`relative w-11 h-6 rounded-full shrink-0 mt-0.5 transition-colors ${
                                preferences[key] ? "bg-orange-600" : "bg-gray-200"
                              } ${locked ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}>
                              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${preferences[key] ? "translate-x-5" : "translate-x-0.5"}`} />
                            </button>
                          </div>
                        ))}
                        <button onClick={savePrefs}
                          className="mt-2 w-full py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                          Enregistrer mes préférences
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Legal links */}
                <div className="flex flex-wrap gap-x-5 gap-y-1 mt-5">
                  {[
                    { label: "Politique de confidentialité", href: "/privacy" },
                    { label: "Mentions légales",             href: "/terms"   },
                    { label: "CGU",                          href: "/terms"   },
                  ].map(({ label, href }) => (
                    <a key={label} href={href} className="text-sm font-medium" style={{ color: "#7e2e1aff" }}>
                      {label}
                    </a>
                  ))}
                </div>
              </div>

              {/* ── Buttons ── */}
              <div className="px-7 pb-5 flex gap-3">
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-white transition-all"
                  style={{ background: "#9e9e9e" }}>
                  Paramètres supplémentaires
                  <ChevronRight size={15} />
                </button>
                <button
                  onClick={acceptAll}
                  className="flex-1 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
                  style={{ background: "#ff3700ff" }}>
                  Accepter
                </button>
              </div>

              {/* ── Footer ── */}
              <div className="px-7 pb-5 text-center">
                <p className="text-xs text-gray-300">
                  Propulsé par <span className="font-semibold text-gray-400">Frédérick Ahobaut Consent Management</span>
                </p>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
