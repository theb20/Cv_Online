import { useState } from "react";
import { motion } from "motion/react";

function Navigation({ onLinkClick }) {
  return (
    <ul className="nav-ul">
      {[
        { href: "/#hero", label: "Accueil" },
        { href: "/#about", label: "À Propos" },
        { href: "/#projects", label: "Projets" },
        { href: "/#work", label: "Expériences" },
        { href: "/#contact", label: "Contact"},
      ].map((link) => (
        <li key={link.href} className="nav-li">
          <a
            className="nav-link"
            href={link.href}
            onClick={() => onLinkClick?.()} // ✅ ferme la navbar au clic
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed inset-x-0 z-50 w-full backdrop-blur-lg bg-primary/40">
      <div className="mx-auto c-space max-w-7xl">
        <div className="flex items-center justify-between py-2 sm:py-0">
          <a
            href="/"
            className="text-xl font-bold transition-colors text-neutral-400 hover:text-white"
            onClick={() => setIsOpen(false)} // ferme aussi si on clique sur le logo
          >
            Frédérick A.
          </a>

          {/* Bouton burger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex cursor-pointer text-neutral-400 hover:text-white focus:outline-none sm:hidden"
          >
            <img
              src={isOpen ? "assets/close.svg" : "assets/menu.svg"}
              className="w-6 h-6"
              alt="toggle"
            />
          </button>

          {/* Menu desktop */}
          <nav className="hidden sm:flex">
            <Navigation onLinkClick={() => {}} /> {/* Desktop ne ferme rien */}
          </nav>
        </div>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <motion.div
          className="block overflow-hidden text-center sm:hidden"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="pb-5">
            {/* ✅ Passe la fonction pour fermer après clic */}
            <Navigation onLinkClick={() => setIsOpen(false)} />
          </nav>
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;
