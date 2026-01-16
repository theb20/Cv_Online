import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import authService from "../config/Services/authServices.js";
import { profile } from "../data/profile";

const CopyEmailButton = () => {
  const [copied, setCopied] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Chargement de l'utilisateur
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await authService.getAuth();
        setUser(response);
      } catch (err) {
        console.error("Erreur lors de la récupération de l'utilisateur :", err);
        setUser(profile);
        setError(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // 🔹 Gestion sécurisée de l'email
  const email =
    Array.isArray(user) && user.length > 0
      ? user[0].email
      : user?.email || "test@example.com";

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

  // 🔹 États de chargement / erreur
  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  // 🔹 Rendu principal
  return (
    <motion.button
      onClick={copyToClipboard}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 1.05 }}
      aria-label="Copier l'email"
      className={`relative px-1 py-4 text-sm text-center rounded-full font-extralight w-[12rem] cursor-pointer overflow-hidden transition-colors duration-300 ${
        copied ? "bg-black/50 text-white" : "bg-primary"
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
