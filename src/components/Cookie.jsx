// CookieConsent.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const [accepted, setAccepted] = useState(null);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (consent === null) {
      // Montre le consent 1 seconde après le chargement
      setTimeout(() => setShow(true), 1000);
    } else {
      setAccepted(consent === "true");
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "true");
    setAccepted(true);
    setShow(false);
    // Ici tu peux activer Google Analytics par exemple
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "false");
    setAccepted(false);
    setShow(false);
    // Analytics ne sera pas chargé
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-md border border-gray-300 rounded-xl shadow-lg p-5 max-w-lg w-full z-50 flex flex-col gap-4"
        >
          <p className="text-gray-800 text-sm">
            Nous utilisons des cookies pour améliorer votre expérience et analyser le trafic.{" "}
            <a
              href="/privacy"
              target="_blank"
              className="underline text-blue-600 hover:text-blue-800"
            >
              En savoir plus
            </a>
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={handleDecline}
              className="px-4 py-2 rounded-lg border border-gray-400 text-gray-700 hover:bg-gray-100 transition"
            >
              Refuser
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Accepter
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
