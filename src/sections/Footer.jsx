import { mySocials } from "../constants";

const Footer = ({ onOpenTerms, onOpenPrivacy }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#050505] text-neutral-400 border-t border-white/5 relative overflow-hidden">
       {/* Decorative subtle gradient top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Column 1: Brand & Bio */}
          <div className="md:col-span-4 space-y-6">
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Frédérick Ahobaut
            </h3>
            <p className="text-sm leading-relaxed text-neutral-500 max-w-xs">
              Développeur Full Stack passionné par la création d'expériences web immersives et performantes. Transformons vos idées en réalité digitale.
            </p>
            <div className="pt-2">
               <a 
                href="#contact" 
                className="inline-flex items-center gap-2 text-sm font-bold text-white border-b border-white/20 pb-1 hover:border-white transition-colors"
               >
                 Démarrer un projet
               </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="md:col-span-2 md:col-start-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Navigation</h4>
            <ul className="space-y-4 text-sm">
              {[
                { label: "Accueil", href: "#home" },
                { label: "À propos", href: "#about" },
                { label: "Projets", href: "#projects" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="hover:text-white transition-colors block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Socials */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Réseaux</h4>
            <ul className="space-y-4 text-sm">
              {mySocials.map((social) => (
                <li key={social.name}>
                  <a 
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 hover:text-white transition-colors group"
                  >
                    <img 
                        src={social.icon} 
                        alt={social.name} 
                        className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" 
                    />
                    <span>{social.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div className="md:col-span-3">
             <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Légal</h4>
             <ul className="space-y-4 text-sm">
               <li>
                 <button onClick={onOpenTerms} className="hover:text-white transition-colors text-left">
                   Conditions Générales
                 </button>
               </li>
               <li>
                 <button onClick={onOpenPrivacy} className="hover:text-white transition-colors text-left">
                   Politique de Confidentialité
                 </button>
               </li>
             </ul>
             
             <div className="mt-8 pt-8 border-t border-white/5">
                <p className="text-xs text-neutral-600">
                  © {currentYear} Frédérick Ahobaut.<br />
                  Tous droits réservés.
                </p>
             </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
