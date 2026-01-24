import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronUp, ArrowRight, Menu, X } from "lucide-react";
import { useData } from "../context/DataContext";

function NavItem({ item, onLinkClick, mobile = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);
  const hasMegaMenu = item.type === "mega";
  const hasSubLinks = item.subLinks && item.subLinks.length > 0;
  const [activeSection, setActiveSection] = useState(0);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  if (mobile) {
    return (
      <div className="w-full border-b border-white/5 last:border-none">
        {hasMegaMenu || hasSubLinks ? (
          <>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-between w-full py-6 group"
            >
              <span className={`text-4xl font-black tracking-tighter transition-colors ${isOpen ? "text-white" : "text-neutral-500 group-hover:text-white"}`}>
                {item.label}
              </span>
              <span className={`p-2 rounded-full border border-white/10 transition-all duration-300 ${isOpen ? "bg-white text-black rotate-180" : "text-white bg-white/5"}`}>
                 <ChevronDown size={24} />
              </span>
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "circOut" }}
                  className="overflow-hidden"
                >
                  <div className="pb-8 flex flex-col gap-8 pl-2">
                    {item.sections ? (
                      item.sections.map((section, idx) => (
                        <div key={idx} className="flex flex-col gap-4">
                          <h4 className="text-xs font-bold text-neutral-600 uppercase tracking-[0.2em] flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-neutral-600"></span>
                            {section.title}
                          </h4>
                          <div className="flex flex-col gap-4 pl-4 border-l border-white/10">
                            {section.items.map((subItem, subIdx) => (
                              <a
                                key={subIdx}
                                href={subItem.href}
                                className="flex items-center gap-4 group/item"
                                onClick={onLinkClick}
                              >
                                {subItem.image && (
                                  <img 
                                    src={subItem.image} 
                                    alt="" 
                                    className="w-12 h-12 rounded-lg object-cover opacity-60 grayscale group-hover/item:grayscale-0 group-hover/item:opacity-100 transition-all duration-300" 
                                  />
                                )}
                                <div className="flex flex-col">
                                  <span className="text-lg font-medium text-neutral-300 group-hover/item:text-white transition-colors">
                                    {subItem.label}
                                  </span>
                                  {subItem.desc && (
                                    <span className="text-xs text-neutral-600 line-clamp-1">
                                      {subItem.desc}
                                    </span>
                                  )}
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      ))
                    ) : (
                      <ul className="flex flex-col gap-4 pl-4 border-l border-white/10">
                        {item.subLinks.map((subLink) => (
                          <li key={subLink.href}>
                            <a
                              href={subLink.href}
                              className="block text-lg text-neutral-400 hover:text-white transition-colors"
                              onClick={onLinkClick}
                            >
                              {subLink.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <a 
            href={item.href} 
            className="block w-full py-6 text-4xl font-black tracking-tighter text-neutral-500 hover:text-white transition-colors" 
            onClick={onLinkClick}
          >
            {item.label}
          </a>
        )}
      </div>
    );
  }

  // Desktop
  return (
    <li
      className="static group h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative flex items-center gap-1 cursor-pointer nav-link py-6 h-full z-50">
        {hasMegaMenu || hasSubLinks ? (
          <>
             <a href={item.href || "#"} className={`text-sm font-medium transition-colors ${isOpen ? "text-white" : "text-neutral-400 group-hover:text-neutral-200"}`}>{item.label}</a>
             <ChevronDown size={14} className={`transition-transform duration-300 text-neutral-500 ${isOpen ? "rotate-180 text-white" : ""}`} />
          </>
        ) : (
          <a href={item.href} className="nav-link py-2 block text-sm font-medium text-neutral-400 hover:text-white transition-colors">
            {item.label}
          </a>
        )}
      </div>

      {/* Mega Menu Dropdown - Tabbed Design */}
      {hasMegaMenu && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "circOut" }}
              className="fixed left-0 w-screen bg-[#000000] border-b border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.8)] z-40 overflow-hidden"
              style={{ top: "var(--navbar-height, 50px)", height: "500px" }}
            >
              <div className="container mx-auto c-space h-full flex">
                
                {/* Left Sidebar: Categories */}
                <div className="w-1/4 h-full border-r border-white/10 py-10 pr-10">
                  <div className="flex flex-col gap-2">
                    {item.sections.map((section, idx) => (
                      <button
                        key={idx}
                        onMouseEnter={() => setActiveSection(idx)}
                        className={`text-left px-6 py-4 rounded-lg transition-all duration-300 group flex items-center justify-between ${
                          activeSection === idx 
                            ? "bg-white text-black" 
                            : "text-neutral-500 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <span className="text-lg font-bold tracking-tight">{section.title}</span>
                        {activeSection === idx && <ArrowRight size={18} className="animate-pulse" />}
                      </button>
                    ))}
                  </div>
                  
                  {/* Footer of Sidebar */}
                  <div className="mt-auto pt-10 px-6">
                    <p className="text-neutral-600 text-xs uppercase tracking-widest mb-2">Statut Actuel</p>
                    <div className="flex flex-col gap-3">
                      {[
                        { label: "Disponible pour freelance", color: "bg-green-500", ping: "bg-green-400" },
                        { label: "En recherche active", color: "bg-green-500", ping: "bg-blue-400" },
                        { label: "Ouvert aux projets", color: "bg-green-500", ping: "bg-purple-400" }
                      ].map((status, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                           <span className="relative flex h-3 w-3">
                              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${status.ping}`}></span>
                              <span className={`relative inline-flex rounded-full h-3 w-3 ${status.color}`}></span>
                            </span>
                            <span className="text-sm font-medium text-neutral-300">{status.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Content Area: Dynamic */}
                <div className="w-3/4 h-full relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSection}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="h-full w-full p-10"
                    >
                      {/* HEADER of Section */}
                      <div className="mb-8 flex items-end justify-between border-b border-white/10 pb-4">
                         <h2 className="text-4xl font-black text-white uppercase tracking-tighter">
                           {item.sections[activeSection].title}
                         </h2>
                         <a href={item.sections[activeSection].href || "#"} className="text-sm text-neutral-400 hover:text-white flex items-center gap-2 group/link">
                           Voir tout <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform"/>
                         </a>
                      </div>

                      {/* CONTENT Grid */}
                      <div className="grid grid-cols-2 gap-8 h-[300px]">
                        {item.sections[activeSection].items.slice(0, 4).map((subItem, idx) => (
                          <a 
                            key={idx} 
                            href={subItem.href}
                            className="group relative flex flex-col justify-end overflow-hidden rounded-2xl bg-neutral-900 border border-white/5 hover:border-white/20 transition-all duration-500"
                          >
                            {/* Image Background if available */}
                            {subItem.image ? (
                                <>
                                  <div className="absolute inset-0">
                                     <img src={subItem.image} alt={subItem.label} className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-40 transition-all duration-700" />
                                  </div>
                                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                                </>
                            ) : (
                                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-black group-hover:from-[#252525] transition-colors duration-500" />
                            )}
                            
                            {/* Content */}
                            <div className="relative z-10 p-6">
                              <div className="flex items-center gap-3 mb-2">
                                {subItem.icon && (
                                  <div className="p-2 bg-white/10 backdrop-blur-md rounded-lg text-white">
                                     <subItem.icon size={20} />
                                  </div>
                                )}
                                {subItem.tags && (
                                  <div className="flex gap-2">
                                    {subItem.tags.map((tag, tIdx) => (
                                      <span key={tIdx} className="text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white px-2 py-1 rounded-full backdrop-blur-sm">{tag}</span>
                                    ))}
                                  </div>
                                )}
                              </div>
                              
                              <h3 className="text-2xl font-bold text-white mb-1 transition-colors">{subItem.label}</h3>
                              <p className="text-sm text-neutral-400 line-clamp-2">{subItem.desc}</p>
                            </div>

                            {/* Hover Arrow */}
                            <div className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                               <ArrowRight size={20} className="-rotate-45" />
                            </div>
                          </a>
                        ))}
                      </div>

                    </motion.div>
                  </AnimatePresence>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </li>
  );
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { projects, experiences } = useData();

  const navLinks = [
    { href: "/#hero", label: "Accueil" },
    { href: "/#about", label: "À Propos" },
    {
      label: "Portfolio",
      type: "mega",
      sections: [
        {
          title: "Projets Récents",
          href: "/#projects",
          colSpan: "col-span-2",
          items: projects.slice(0, 4).map(project => ({
              label: project.title,
              href: `/project/${project.id}`,
              desc: project.description ? project.description.split('\n')[0] : "", // Take first line of description
              image: project.image_url,
              tags: [project.techno_1, project.techno_2].filter(Boolean)
          }))
        },
        {
          title: "Parcours Pro",
          href: "/#experience",
          colSpan: "col-span-1",
          items: experiences.map(exp => ({
              label: exp.company,
              href: `/experience/${exp.id}`,
              desc: exp.position,
              image: exp.image,
              tags: exp.technologies ? exp.technologies.slice(0, 2) : []
          }))
        },
      ],
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-100 transition-all duration-300" style={{ "--navbar-height": "50px" }}>
       {/* Background Blur only when scrolled or specific condition? For now, let's keep it clean but dark */}
       <div className="absolute inset-0 bg-[#000000]/80 backdrop-blur-md border-b border-white/5"></div>
       
      <div className="container mx-auto c-space h-[50px] relative z-50">
        <div className="flex items-center justify-between h-full">
          <a
            href="/"
            className="text-xl font-black tracking-tighter text-white flex items-center gap-2 z-50 uppercase"
            onClick={() => setIsOpen(false)}
          >
            Frédérick<span className="text-neutral-500">.A</span>
          </a>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex cursor-pointer text-white focus:outline-none sm:hidden p-2 z-50"
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>

          {/* Desktop Menu */}
          <nav className="hidden sm:flex h-full" aria-label="Navigation principale">
            <ul className="flex items-center gap-10 h-full">
              {navLinks.map((item, index) => (
                <NavItem key={index} item={item} />
              ))}
            </ul>
          </nav>
          
          {/* CTA Button */}
          <div className="hidden sm:block">
             <a href="#contact" className="px-6 py-1.5 bg-white text-black text-sm font-bold rounded-full hover:bg-neutral-200 transition-colors">
                Me Contacter
             </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col pt-24 px-6 pb-10 overflow-y-auto sm:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((item, index) => (
                <NavItem
                  key={index}
                  item={item}
                  mobile={true}
                  onLinkClick={() => setIsOpen(false)}
                />
              ))}
            </nav>

            <div className="mt-auto pt-10 border-t border-white/10">
               <a href="#contact" onClick={() => setIsOpen(false)} className="block w-full py-4 text-center bg-white text-black font-bold rounded-full text-lg hover:bg-neutral-200 transition-colors">
                 Me Contacter
               </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
