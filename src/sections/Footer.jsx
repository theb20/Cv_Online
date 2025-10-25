import { mySocials } from "../constants";
import { useState, useEffect } from "react";

const Footer = ({ onOpenTerms, onOpenPrivacy }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const currentYear = new Date().getFullYear();

  // Observer pour l'apparition du footer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    const footer = document.getElementById("footer");
    if (footer) observer.observe(footer);

    return () => {
      if (footer) observer.unobserve(footer);
    };
  }, []);

  // Suivi de la souris pour gradient interactif
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <footer id="footer" className="relative w-screen text-neutral-400">
      {/* Gradient interactif */}
      <div
        className="absolute inset-0 opacity-30 transition-all duration-1000 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(99,102,241,0.15), transparent 50%)`,
        }}
      />

      {/* Particules flottantes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full animate-float opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <section className="relative flex flex-col gap-8 items-center justify-between pb-8 pt-16 c-space">
        {/* Animated Top Border */}
        <div className="relative mb-8 w-full h-[1px] overflow-hidden">
          <div
            className={`absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent transition-all duration-1000 ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse" />
        </div>

        {/* Brand */}
        <div
          className={`text-center space-y-4 transition-all duration-1000 delay-100 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 via-white-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
            Frédérick Ahobaut
          </h3>
          <p className="text-sm md:text-base text-neutral-500 max-w-md mx-auto">
            Créateur d'expériences digitales innovantes et passionnées
          </p>
        </div>

        {/* Socials */}
        <div
          className={`flex gap-4 transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {mySocials.map((social, index) => (
            <a
              href={social.href}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-md opacity-0 group-hover:opacity-75 transition-all duration-500 scale-0 group-hover:scale-150" />
              <div className="relative flex items-center justify-center w-12 h-12 bg-neutral-900 rounded-full border border-neutral-800 transition-all duration-500 group-hover:border-blue-500 group-hover:scale-110 group-hover:rotate-12">
                <img
                  src={social.icon}
                  className="w-5 h-5 transition-all duration-500 group-hover:scale-125 group-hover:brightness-125"
                  alt={social.name}
                />
              </div>
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none border border-neutral-700">
                {social.name}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-neutral-900 rotate-45 border-r border-b border-neutral-700" />
              </div>
            </a>
          ))}
        </div>

        {/* Navigation Links */}
        <div
          className={`flex flex-wrap gap-6 justify-center text-sm transition-all duration-1000 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {["about", "projects", "contact", "blog"].map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className="relative group text-neutral-400 hover:text-white transition-colors duration-300"
            >
              <span className="relative z-10 capitalize">{id}</span>
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </a>
          ))}
        </div>

        {/* Legal Links */}
        <div
          className={`flex gap-4 text-xs transition-all duration-1000 delay-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <button
            onClick={onOpenTerms}
            className="hover:text-blue-400 transition-colors duration-300 relative group"
          >
            Termes & Conditions
            <span className="absolute inset-x-0 -bottom-0.5 h-px bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </button>
          <span className="text-neutral-700">|</span>
          <button
            onClick={onOpenPrivacy}
            className="hover:text-blue-400 transition-colors duration-300 relative group"
          >
            Politique de Confidentialité
            <span className="absolute inset-x-0 -bottom-0.5 h-px bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </button>
        </div>

        {/* Divider */}
        <div className="w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />

        {/* Copyright */}
        <div
          className={`text-center space-y-2 transition-all duration-1000 delay-900 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <p className="text-xs text-neutral-500">
            © {currentYear} Frédérick Ahobaut. Tous droits réservés.
          </p>
        </div>

        {/* Scroll to Top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`group fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-110 z-50 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          aria-label="Scroll to top"
        >
          <svg
            className="w-6 h-6 mx-auto text-white transition-transform duration-500 group-hover:-translate-y-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </section>

      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-t from-blue-600/10 via-purple-600/5 to-transparent blur-3xl pointer-events-none" />
    </footer>
  );
};

export default Footer;
