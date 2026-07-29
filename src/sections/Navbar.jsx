import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronDown, ChevronRight, ArrowRight, Menu, X,
  Code2, Briefcase, Zap, Mail,
  MapPin, ExternalLink, GitBranch, Globe, Star
} from "lucide-react";
import { useData } from "../context/DataContext";
import { useLocation } from "react-router-dom";

// ─────────────────────────────────────────────────────────────
// NAV ITEM
// ─────────────────────────────────────────────────────────────

function NavItem({ item, onLinkClick, mobile = false }) {
  const [isOpen, setIsOpen]           = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const timeoutRef = useRef(null);
  const hasMegaMenu = item.type === "mega";
  const hasSubLinks = item.subLinks && item.subLinks.length > 0;

  const open  = () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); setIsOpen(true); };
  const close = () => { timeoutRef.current = setTimeout(() => setIsOpen(false), 150); };

  // ── MOBILE ──────────────────────────────────────────────────
  if (mobile) {
    return (
      <div className="w-full border-b border-white/5 last:border-none">
        {hasMegaMenu || hasSubLinks ? (
          <>
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-between w-full py-6 group">
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
                    {item.sections?.map((section, idx) => (
                      <div key={idx} className="flex flex-col gap-4">
                        <h4 className="text-xs font-bold text-neutral-600 uppercase tracking-[0.2em] flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-neutral-600" />
                          {section.title}
                        </h4>
                        <div className="flex flex-col gap-4 pl-4 border-l border-white/10">
                          {section.items?.map((subItem, subIdx) => (
                            <a key={subIdx} href={subItem.href} className="flex items-center gap-4 group/item" onClick={onLinkClick}>
                              {subItem.image && (
                                <img src={subItem.image} alt="" className="w-12 h-12 rounded-lg object-cover opacity-60 grayscale group-hover/item:grayscale-0 group-hover/item:opacity-100 transition-all duration-300" />
                              )}
                              <div className="flex flex-col">
                                <span className="text-lg font-medium text-neutral-300 group-hover/item:text-white transition-colors">{subItem.label}</span>
                                {subItem.desc && <span className="text-xs text-neutral-600 line-clamp-1">{subItem.desc}</span>}
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <a href={item.href} className="block w-full py-6 text-4xl font-black tracking-tighter text-neutral-500 hover:text-white transition-colors" onClick={onLinkClick}>
            {item.label}
          </a>
        )}
      </div>
    );
  }

  // ── DESKTOP ──────────────────────────────────────────────────
  return (
    <li className="static rounded-5 overflow-hidden group h-full" onMouseEnter={open} onMouseLeave={close}>
      {/* Trigger */}
      <div className="relative flex items-center gap-1 cursor-pointer py-6 h-full z-50">
        {hasMegaMenu || hasSubLinks ? (
          <>
            <a href={item.href || "#"} className={`text-sm font-medium transition-colors ${isOpen ? "text-white" : "text-neutral-400 group-hover:text-neutral-200"}`}>{item.label}</a>
            <ChevronDown size={14} className={`transition-transform duration-300 text-neutral-500 ${isOpen ? "rotate-180 text-white" : ""}`} />
          </>
        ) : (
          <a href={item.href} className="py-2 block text-sm font-medium text-neutral-400 hover:text-white transition-colors">{item.label}</a>
        )}
      </div>

      {/* ── MEGA MENU — LIGHT ── */}
      {hasMegaMenu && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="fixed left-1/2 -translate-x-1/2 w-screen z-40 mt-4 w-[calc(100%-2.5rem)] max-w-[1000px] rounded-5 "
              style={{ top: "var(--navbar-height, 50px)" }}
            >
              <div className="bg-white border-b border-gray-200 shadow-[0_24px_80px_rgba(0,0,0,0.14)] rounded-2xl">

                {/* ── Main body ── */}
                <div className="flex" style={{ minHeight: 500 }}>

                  {/* LEFT SIDEBAR */}
                  <div className="bg-gray-50 border-r border-gray-100 flex flex-col flex-shrink-0 rounded-l-full" style={{ width: 220 }}>
                    <div className="flex flex-col gap-1 px-5 pt-7 pb-4 flex-1">
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 px-2">Navigation</p>

                      {item.sections.map((section, idx) => {
                        const Icon = section.icon;
                        const active = activeSection === idx;
                        return (
                          <button
                            key={idx}
                            onMouseEnter={() => setActiveSection(idx)}
                            className={`text-left px-3 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 group/tab ${
                              active ? "bg-black" : "hover:bg-white"
                            }`}
                          >
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                              active ? "bg-white/15" : "bg-gray-200 group-hover/tab:bg-gray-300"
                            }`}>
                              <Icon size={13} className={active ? "text-white" : "text-gray-500"} />
                            </div>
                            <div className="min-w-0">
                              <div className={`text-xs font-bold leading-tight ${active ? "text-white" : "text-gray-800"}`}>{section.title}</div>
                              <div className={`text-[9px] leading-tight mt-0.5 truncate ${active ? "text-white/55" : "text-gray-400"}`}>{section.subtitle}</div>
                            </div>
                            {active && <ArrowRight size={12} className="text-white/50 ml-auto flex-shrink-0" />}
                          </button>
                        );
                      })}
                    </div>

                    {/* Sidebar footer — status */}
                    <div className="px-5 pb-6 pt-4 border-t border-gray-200">
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2.5 px-2">Statut</p>
                      <div className="flex flex-col gap-2 px-2">
                        {[
                          "Product engineer",
                          "Freelance - Disponible",
                        ].map((s, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <span className="text-[10px] text-gray-600 font-medium">{s}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: Dynamic content */}
                  <div className="flex-1 overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeSection}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        transition={{ duration: 0.18 }}
                        className="h-full px-8 py-7 overflow-y-auto"
                      >
                        {/* Section header */}
                        {(() => {
                          const s = item.sections[activeSection];
                          const Icon = s.icon;
                          return (
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center border border-gray-200">
                                  <Icon size={16} className="text-gray-700" />
                                </div>
                                <div>
                                  <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight leading-none">{s.title}</h2>
                                  <p className="text-xs text-gray-400 mt-0.5">{s.subtitle}</p>
                                </div>
                              </div>
                              <a href={s.href}
                                className="text-[11px] font-semibold text-gray-500 hover:text-gray-900 flex items-center gap-1.5 border border-gray-200 hover:border-gray-400 px-3 py-1.5 rounded-lg transition-all">
                                Voir tout <ArrowRight size={11} />
                              </a>
                            </div>
                          );
                        })()}

                        {/* ── SECTION 0 : Projets ── */}
                        {activeSection === 0 && (
                          <div className="grid grid-cols-2 gap-3">
                            {item.sections[0].items.slice(0, 4).map((p, idx) => (
                              <a key={idx} href={p.href}
                                className="group flex items-start gap-3.5 p-4 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all">
                                <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-100">
                                  {p.image && <img src={p.image} alt={p.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-bold text-gray-900 text-sm truncate leading-tight">{p.label}</h3>
                                    {(p.status === 'En Production' || p.status === 'En production') && (
                                      <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-600 text-[8px] font-black uppercase rounded border border-emerald-100 flex-shrink-0">Live</span>
                                    )}
                                  </div>
                                  <p className="text-[11px] text-gray-500 line-clamp-1 mb-2">{p.desc}</p>
                                  <div className="flex flex-wrap gap-1">
                                    {p.tags.slice(0, 3).map((tag, j) => (
                                      <span key={j} className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[9px] font-semibold rounded border border-gray-200">{tag}</span>
                                    ))}
                                  </div>
                                </div>
                                <ArrowRight size={13} className="text-gray-300 group-hover:text-gray-600 -rotate-45 flex-shrink-0 mt-1 transition-colors" />
                              </a>
                            ))}
                          </div>
                        )}

                        {/* ── SECTION 1 : Expériences ── */}
                        {activeSection === 1 && (
                          <div className="grid grid-cols-2 gap-3">
                            {item.sections[1].items.slice(0, 4).map((exp, idx) => (
                              <a key={idx} href={exp.href}
                                className="group flex items-start gap-3.5 p-4 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all">
                                <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-100">
                                  {exp.image && <img src={exp.image} alt={exp.label} className="w-full h-full object-cover" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-1 mb-0.5">
                                    <h3 className="font-bold text-gray-900 text-sm leading-tight">{exp.label}</h3>
                                    <span className="text-[9px] text-gray-400 flex-shrink-0 mt-0.5 font-medium">{exp.country}</span>
                                  </div>
                                  <p className="text-[11px] text-gray-700 font-medium mb-0.5 leading-snug">{exp.desc}</p>
                                  <p className="text-[10px] text-gray-400 mb-2">{exp.period}</p>
                                  <div className="flex flex-wrap gap-1">
                                    {exp.tags.slice(0, 3).map((tag, j) => (
                                      <span key={j} className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[9px] font-semibold rounded border border-gray-200">{tag}</span>
                                    ))}
                                  </div>
                                </div>
                              </a>
                            ))}
                          </div>
                        )}

                        {/* ── SECTION 2 : Compétences ── */}
                        {activeSection === 2 && (
                          <div className="grid grid-cols-4 gap-6">
                            {[
                              {
                                title: "Frontend", color: "bg-blue-50 text-blue-700 border-blue-100",
                                skills: ["React 19", "Next.js", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS v4", "Framer Motion", "Responsive / a11y", "Routing & State"]
                              },
                              {
                                title: "Backend", color: "bg-violet-50 text-violet-700 border-violet-100",
                                skills: ["Node.js", "Express.js", "API REST", "JWT / Auth", "Zod Validation", "Bcrypt / Sécurité", "Architecture MVC", "Rate Limiting"]
                              },
                              {
                                title: "Base de données", color: "bg-amber-50 text-amber-700 border-amber-100",
                                skills: ["MySQL", "PostgreSQL", "Prisma ORM", "Firebase / Firestore", "Modélisation SQL", "Indexation", "Migrations", "Transactions"]
                              },
                              {
                                title: "DevOps & Outils", color: "bg-emerald-50 text-emerald-700 border-emerald-100",
                                skills: ["Docker", "GitHub Actions CI/CD", "Firebase Hosting", "Railway", "Render", "Git / GitHub", "Vite / Webpack", "Linux / Terminal"]
                              },
                            ].map((cat, i) => (
                              <div key={i}>
                                <span className={`inline-flex px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider border mb-3 ${cat.color}`}>
                                  {cat.title}
                                </span>
                                <ul className="space-y-1.5">
                                  {cat.skills.map((skill, j) => (
                                    <li key={j} className="flex items-center gap-2 text-xs text-gray-700">
                                      <span className="w-1 h-1 rounded-full bg-gray-300 flex-shrink-0" />
                                      {skill}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* ── SECTION 3 : Contact ── */}
                        {activeSection === 3 && (
                          <div className="grid grid-cols-3 gap-5">
                            {/* Profile card */}
                            <div className="col-span-1 bg-gray-50 rounded-2xl p-5 border border-gray-100 flex flex-col">
                              <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center mb-3 flex-shrink-0">
                                <span className="text-white font-black text-base">FA</span>
                              </div>
                              <h3 className="font-black text-gray-900 text-base tracking-tight leading-tight">Frédérick Ahobaut</h3>
                              <p className="text-xs text-gray-500 mt-0.5 mb-2">Développeur Web Full Stack</p>
                              <div className="flex items-center gap-1 text-[11px] text-gray-400 mb-3">
                                <MapPin size={10} /> Paris, France
                              </div>
                              <p className="text-[11px] text-gray-500 leading-relaxed mb-4 flex-1">
                                Disponible pour des missions freelance, projets long terme et opportunités CDI.
                              </p>
                              <div className="flex items-center gap-2 px-3 py-2.5 bg-emerald-50 rounded-xl border border-emerald-100">
                                <span className="relative flex h-2 w-2 flex-shrink-0">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                                </span>
                                <span className="text-[11px] font-bold text-emerald-700">Disponible pour missions</span>
                              </div>
                            </div>

                            {/* Contact cards */}
                            <div className="col-span-2 grid grid-cols-2 gap-3 content-start">
                              {[
                                { label: "Email", value: "frederick@ahobaut.fr", href: "mailto:frederick@ahobaut.fr", icon: Mail, desc: "Réponse sous 24h" },
                                { label: "LinkedIn", value: "in/frédérick-ahobaut-b85301322", href: "https://www.linkedin.com/in/frédérick-ahobaut-b85301322", icon: Briefcase, desc: "Réseau professionnel" },
                                { label: "GitHub", value: "github.com/theb20", href: "https://github.com/theb20", icon: GitBranch, desc: "14+ repos publics" },
                                { label: "Portfolio", value: "ahobaut.fr", href: "https://ahobaut.fr", icon: Globe, desc: "CV interactif en ligne" },
                              ].map((c, i) => {
                                const Icon = c.icon;
                                return (
                                  <a key={i} href={c.href}
                                    target={c.href.startsWith('mailto') ? '_self' : '_blank'}
                                    rel="noopener noreferrer"
                                    className="group flex items-start gap-3 p-4 rounded-xl bg-white border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all"
                                  >
                                    <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-black transition-colors">
                                      <Icon size={15} className="text-gray-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-wider mb-0.5">{c.label}</p>
                                      <p className="text-xs font-semibold text-gray-900 truncate">{c.value}</p>
                                      <p className="text-[10px] text-gray-400 mt-0.5">{c.desc}</p>
                                    </div>
                                    <ExternalLink size={11} className="text-gray-300 group-hover:text-gray-600 ml-auto flex-shrink-0 mt-0.5 transition-colors" />
                                  </a>
                                );
                              })}
                            </div>
                          </div>
                        )}

                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* ── Footer strip ── */}
                <div className="border-t border-gray-100 bg-gray-50/80 px-8 py-3 flex items-center justify-between rounded-2xl">
                  <div className="flex items-center gap-5">
                    {[
                      { href: "https://github.com/theb20",                        label: "GitHub" },
                      { href: "https://www.linkedin.com/in/frédérick-ahobaut-b85301322",   label: "LinkedIn" },
                      { href: "mailto:frederick@ahobaut.fr",               label: "Email" },
                    ].map((l, i) => (
                      <a key={i} href={l.href}
                        target={l.href.startsWith('mailto') ? '_self' : '_blank'}
                        rel="noopener noreferrer"
                        className="text-[11px] font-semibold text-gray-500 hover:text-gray-900 flex items-center gap-1.5 transition-colors group/link"
                      >
                        <ExternalLink size={10} className="text-gray-400 group-hover/link:text-gray-700" /> {l.label}
                      </a>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-[11px] text-gray-400">
                    <span className="flex items-center gap-1.5"><Star size={10} /> 14 projets</span>
                    <span className="text-gray-200">·</span>
                    <span className="flex items-center gap-1.5"><Briefcase size={10} /> 5 expériences</span>
                    <span className="text-gray-200">·</span>
                    <span className="flex items-center gap-1.5"><MapPin size={10} /> Paris, France</span>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </li>
  );
}

// ─────────────────────────────────────────────────────────────
// MOBILE ACCORDION — version compacte et discrète
// ─────────────────────────────────────────────────────────────
function MobileAccordion({ item, onLinkClick }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-3.5 text-sm font-semibold text-white/50 hover:text-white transition-colors">
        <span className="flex items-center gap-3">
          <ChevronRight size={14} className={`text-white/20 transition-transform duration-200 ${open ? "rotate-90" : ""}`} />
          {item.label}
        </span>
        <ChevronDown size={12} className={`text-white/20 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }}
            className="overflow-hidden">
            <div className="pl-7 pb-3 flex flex-col gap-1">
              {item.sections?.map((section, i) => (
                <a key={i} href={section.href} onClick={onLinkClick}
                  className="flex items-center gap-2 py-2 text-xs text-white/35 hover:text-white/80 transition-colors">
                  <span className="w-1 h-1 rounded-full bg-white/20 shrink-0" />
                  {section.title}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────────────────

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSubMenu, setIsOpenSubMenu] = useState(false);
  const { projects, experiences } = useData();
  const location = useLocation();

  const isProjectsDetailPage = location.pathname.startsWith("/project/");

  const navLinks = [
    { href: "/#hero", label: "Accueil" },
    { href: "/projects", label: "Catalogue" },
    { href: "/about", label: "À Propos" },
    {
      label: "Portfolio",
      type: "mega",
      sections: [
        {
          title: "Projets",
          subtitle: "Réalisations récentes",
          icon: Code2,
          href: "/projects",
          items: projects.slice(0, 4).map(p => ({
            label: p.title,
            href: `/project/${p.id}`,
            desc: p.description?.split('\n')[0] || "",
            image: p.image_url,
            tags: [p.techno_1, p.techno_2, p.techno_3].filter(Boolean),
            status: p.status,
          })),
        },
        {
          title: "Expériences",
          subtitle: "Parcours professionnel",
          icon: Briefcase,
          href: "/#experience",
          items: experiences.map(e => ({
            label: e.company,
            href: `/experience/${e.id}`,
            desc: e.position,
            image: e.image,
            tags: e.technologies?.slice(0, 3) || [],
            period: `${e.start_date_formatted} — ${e.end_date_formatted}`,
            country: e.country,
          })),
        },
        {
          title: "Compétences",
          subtitle: "Stack technique complet",
          icon: Zap,
          href: "/about",
        },
        {
          title: "Contact",
          subtitle: "Entrons en relation",
          icon: Mail,
          href: "#contact",
        },
      ],
    },
  ];

  return (
    <>
      {!isProjectsDetailPage && (
          <>
            <header 
            className="fixed shadow-md top-5 lg:left-10 sm:left-5 left-5 
            w-[calc(100%-0.5rem)] max-w-[250px] z-100 transition-all duration-300 rounded-full " 
            
            style={{ "--navbar-height": "50px" }}>
              
              <div className="absolute inset-0 bg-black/80 backdrop-blur-md rounded-full" />

              <div className=" mx-auto px-4 h-[50px] relative z-50">
                <div className="flex items-center justify-between
                 h-full">
                  <a href="/" className="text-xl font-black tracking-tighter text-white flex items-center gap-2 z-50  google-flex font-bold" onClick={() => setIsOpen(false)}>

                  <img src="/assets/favicon/favicon.svg" alt="logo Frédérick Ahobaut" className="w-8 h-8" />
                    Frédérick<span className="text-neutral-500 google-yuyu text-2xl">.A</span>
                  </a>

                  <button onClick={() => setIsOpen(!isOpen)} className="flex cursor-pointer text-white focus:outline-none sm:hidden p-2 z-50" aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}>
                    {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                  </button>

                  <button 
                  onClick={() => setIsOpenSubMenu(!isOpenSubMenu)}
                  className="hidden lg:block bg-white text-black px-1.5 py-1.5 rounded-full hover:bg-neutral-200 transition-colors"><ChevronRight/></button>
                </div>
              </div>


              {/* Mobile Menu — dropdown compact */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    className="absolute rounded-3xl  top-[0px] pt-10 left-0 right-0 z-40 sm:hidden overflow-hidden"
                    style={{ background: "#0e0e10", borderBottom: "1px solid rgba(206, 11, 11, 0.07)" }}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <nav className="px-4 py-2">
                      {navLinks.map((item, index) => (
                        <div key={index} className="border-b border-white/5 last:border-none">
                          {item.type === "mega" ? (
                            <MobileAccordion item={item} onLinkClick={() => setIsOpen(false)} />
                          ) : (
                            <a href={item.href} onClick={() => setIsOpen(false)}
                              className="flex items-center gap-3 py-3 text-sm font-medium text-white/50 hover:text-white transition-colors">
                              {item.label}
                            </a>
                          )}
                        </div>
                      ))}
                    </nav>
                    <div className="px-4 py-3 border-t border-white/5">
                      <a href="#contact" onClick={() => setIsOpen(false)}
                        className="block w-full py-2.5 text-center bg-white text-black text-sm font-bold rounded-lg hover:bg-neutral-100 transition-colors">
                        Me contacter
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              
          </header>
          
          {isOpenSubMenu && (
                <div className="fixed top-[82px] left-19 lg:left-10 z-100 hidden lg:block">
                  <nav
                    className="relative rounded-full shadow-[0_16px_50px_rgba(0,0,0,0.35)] px-6"
                    aria-label="Navigation principale"
                  >
                    {/* backdrop-filter must live on a background layer, not an ancestor of the
                        mega-menu — it creates a new containing block for position:fixed children,
                        which breaks the mega-menu's viewport-relative centering. */}
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-md rounded-full" />
                    <ul className="relative flex items-center gap-8 h-[50px]">
                      {navLinks.map((item, index) => <NavItem key={index} item={item} />)}
                    </ul>
                  </nav>
                </div>
              )}
            </>
      )}
    </>
  );
};

export default Navbar;
