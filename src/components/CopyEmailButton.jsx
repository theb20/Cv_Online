import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { profile } from "../data/profile";

const CopyEmailButton = () => {
  const [copied, setCopied] = useState(false);
  
  // 🔹 Utilisation directe du profil local
  const email = profile.email || "test@example.com";

  // 🔹 Fallback pour anciens navigateurs
  const fallbackCopyToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);
      return successful;
    } catch (err) {
      console.error("Fallback : échec de la copie", err);
      document.body.removeChild(textArea);
      return false;
    }
  };

  // 🔹 Copie vers le presse-papier (API moderne + fallback)
  const copyToClipboard = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        const success = fallbackCopyToClipboard(email);
        if (!success) throw new Error("Fallback échoué");
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erreur lors de la copie :", err);
      alert(`Copiez manuellement : ${email}`);
    }
  };

  // 🔹 Rendu principal
  return (
    <motion.button
      onClick={copyToClipboard}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 1.05 }}
      aria-label="Copier l'email"
      className={`relative px-6 py-3 text-sm text-center rounded-full font-medium w-full md:w-auto cursor-pointer overflow-hidden transition-all duration-300 shadow-sm ${
        copied 
          ? "bg-green-500 text-white" 
          : "bg-white text-neutral-900 border border-neutral-200 hover:bg-neutral-50"
      }`}
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.p
            key="copied"
            className="flex items-center justify-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
          >
            <img src="assets/copy-done.svg" className="w-5" alt="Icône copie réussie" />
            Copié !
          </motion.p>
        ) : (
          <motion.p
            key="copy"
            className="flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <img src="assets/copy.svg" className="w-5" alt="Icône copier" />
            Copier l'email
          </motion.p>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default CopyEmailButton;
