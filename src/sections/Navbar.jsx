import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronDown, ArrowRight, Play,
} from "lucide-react";
import { useData } from "../context/DataContext";
import { useLocation } from "react-router-dom";
import StaggeredMenu from "../components/StaggeredMenu";

// ─────────────────────────────────────────────────────────────
// NAV ITEM
// ─────────────────────────────────────────────────────────────

function NavItem({ item, onLinkClick, mobile = false, isLight = true }) {
  const [isOpen, setIsOpen]           = useState(false);
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
      <div className="relative flex items-center gap-1 cursor-pointer h-full z-50">
        {hasMegaMenu || hasSubLinks ? (
          <>
            <a href={item.href || "#"} className={`text-sm font-medium transition-colors ${
              isOpen ? (isLight ? "text-white" : "text-black") : (isLight ? "text-neutral-300 group-hover:text-white" : "text-neutral-600 group-hover:text-black")
            }`}>{item.label}</a>
            <ChevronDown size={14} className={`transition-transform duration-300 ${isLight ? "text-neutral-500" : "text-neutral-400"} ${isOpen ? `rotate-180 ${isLight ? "text-white" : "text-black"}` : ""}`} />
          </>
        ) : (
          <a href={item.href} className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
            isLight ? "text-neutral-300 hover:text-white" : "text-neutral-600 hover:text-black"
          }`}>
            {item.label}
            {item.badge != null && (
              <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-orange-600 text-white text-[10px] font-bold leading-none">
                {item.badge}
              </span>
            )}
          </a>
        )}
      </div>

      {/* ── MEGA MENU — pleine largeur, style entreprise ── */}
      {hasMegaMenu && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-0 z-40 bg-white border-t border-gray-100"
              style={{ top: "var(--navbar-height, 50px)", boxShadow: "0 40px 60px -30px rgba(0,0,0,.18)" }}
            >
              <div className="max-w-[1440px] mx-auto px-10 lg:px-16 py-14 grid grid-cols-12 gap-12">

                {/* INTRO — colonne gauche */}
                <div className="col-span-12 lg:col-span-3 lg:border-r lg:border-gray-100 lg:pr-10">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.18em] mb-3">Portfolio</p>
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight leading-snug mb-3">
                    Plus qu'un simple portfolio
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-5">
                    Projets, expériences et compétences s'articulent pour livrer des produits complets, du design au déploiement.
                  </p>
                  <a href="/projects" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-900 hover:text-[#E85D04] transition-colors">
                    Voir tous les projets <ArrowRight size={13} />
                  </a>
                </div>

                {/* NAVIGATION — grille sobre */}
                <div className="col-span-12 lg:col-span-6 grid grid-cols-2 gap-x-12 gap-y-9">
                  {item.sections.map((section, idx) => (
                    <a key={idx} href={section.href} className="group block">
                      <h3 className="text-[15px] font-semibold text-gray-900 leading-tight">{section.title}</h3>
                      <p className="text-[13px] text-gray-400 mt-1.5 leading-snug">{section.subtitle}</p>
                      <span className="inline-flex items-center gap-1 text-[13px] font-medium text-gray-500 group-hover:text-gray-900 transition-colors mt-2.5">
                        {section.linkLabel}
                        <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </a>
                  ))}
                </div>

                {/* FEATURED — carte neutre */}
                <div className="col-span-12 lg:col-span-3 rounded-xl border border-gray-100 bg-gray-50/70 p-5 flex flex-col">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.18em] mb-3">Collaboration</p>

                  {item.sections[0]?.items?.[0] && (
                    <a href={item.sections[0].items[0].href} className="group relative block rounded-lg overflow-hidden mb-4 aspect-video bg-gray-200">
                      {item.sections[0].items[0].image && (
                        <img src={item.sections[0].items[0].image} alt={item.sections[0].items[0].label}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                      )}
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-black/15 transition-colors flex items-center justify-center">
                        <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm">
                          <Play size={14} className="text-gray-900 ml-0.5" fill="currentColor" />
                        </span>
                      </div>
                    </a>
                  )}

                  <h4 className="text-sm font-semibold text-gray-900 leading-snug mb-1.5">
                    Un projet en tête ?
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4">
                    Discutons de votre besoin et de la meilleure façon d'y répondre.
                  </p>

                  <a href="#contact"
                    className="mt-auto flex items-center justify-center gap-1.5 text-[13px] font-semibold text-gray-900 border border-gray-900 hover:bg-gray-900 hover:text-white rounded-lg px-4 py-2.5 transition-colors">
                    Me contacter <ArrowRight size={12} />
                  </a>
                </div>
              </div>

              {/* FOOTER — ligne discrète */}
              <div className="border-t border-gray-100">
                <div className="max-w-[1440px] mx-auto px-10 lg:px-16 py-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-xs text-gray-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    Disponible pour de nouvelles missions
                  </span>
                  <a href="/about" className="text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors inline-flex items-center gap-1">
                    Découvrir mon profil complet <ArrowRight size={11} />
                  </a>
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
// NAVBAR
// ─────────────────────────────────────────────────────────────

const Navbar = () => {
  const { projects, experiences } = useData();
  const location = useLocation();

  const isProjectsDetailPage = location.pathname.startsWith("/project/");
  // "light" nav (white text) applies wherever the page opens on a dark, full-bleed hero
  const isHomePage = location.pathname === "/" || location.pathname.startsWith("/blog/");

  const navLinks = [
    { href: "/#hero", label: "Accueil" },
    { href: "/projects", label: "Projets", badge: projects.length },
    { href: "/about", label: "À Propos" },
    {
      label: "Portfolio",
      type: "mega",
      projectsCount: projects.length,
      experiencesCount: experiences.length,
      sections: [
        {
          title: "Projets",
          subtitle: "Réalisations récentes",
          linkLabel: "Voir les projets",
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
          linkLabel: "Voir le parcours",
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
          linkLabel: "Voir les compétences",
          href: "/about",
        },
        {
          title: "Contact",
          subtitle: "Entrons en relation",
          linkLabel: "Me contacter",
          href: "#contact",
        },
      ],
    },
    { href: "/blog", label: "Blog" },
    { href: "#contact", label: "Contact" },
  ];

  const staggeredMenuItems = [
    { label: "Accueil", ariaLabel: "Aller à l'accueil", link: "/#hero" },
    { label: "Projets", ariaLabel: "Voir mes projets", link: "/projects" },
    { label: "À Propos", ariaLabel: "En savoir plus sur moi", link: "/about" },
    { label: "Blog", ariaLabel: "Lire le blog", link: "/blog" },
    { label: "Contact", ariaLabel: "Me contacter", link: "#contact" },
  ];

  const staggeredSocialItems = [
    { label: "WhatsApp", link: "https://wa.me/33610694708" },
    { label: "LinkedIn", link: "https://www.linkedin.com/in/fr%C3%A9d%C3%A9rick-ahobaut-b85301322/" },
    { label: "Instagram", link: "https://www.instagram.com/y.o.u.y.o.u__/" },
    { label: "GitHub", link: "https://github.com/theb20" },
  ];

  return (
    <>
      {!isProjectsDetailPage && (
        <header
          className="absolute top-0 inset-x-0 z-100 c-space pt-8"
          style={{ "--navbar-height": "84px" }}
        >
          <div className="relative h-16 rounded-full ">
            {/* backdrop-filter must live on a background layer, not an ancestor of the
                mega-menu — it creates a new containing block for position:fixed children,
                which breaks the mega-menu's viewport-relative centering (bug fixed earlier). */}
            <div className="absolute inset-0 " />

            <div className="relative flex items-center justify-between h-16 px-3 lg:px-4">

            {/* Logo (desktop) */}
            <a href="/" className={`hidden lg:flex items-center gap-2 text-xl overflow-hidden font-black tracking-tighter google-flex font-bold shrink-0 pl-1 ${isHomePage ? "text-white" : "text-black"}`}>
              <img src="/assets/favicon/favicon.svg" alt="logo Frédérick Ahobaut" className="rounded-full w-8 h-8" />
              Frédérick<span className="text-neutral-500 google-yuyu text-2xl">.A</span>
            </a>

            {/* Desktop nav — always visible, à la Stodio */}
            <nav aria-label="Navigation principale" className="hidden lg:block">
              <ul className="flex items-center gap-8 h-16">
                {navLinks.map((item, index) => <NavItem key={index} item={item} isLight={isHomePage} />)}
              </ul>
            </nav>

            {/* Right: avatar + CTA (desktop) */}
            <a
              href="#contact"
              className="hidden lg:flex items-center gap-2 bg-white hover:bg-neutral-100 transition-colors rounded-full pl-1.5 pr-4 py-1.5 shrink-0"
            >
              <img src="/me.png" alt="" className="w-8 h-8 rounded-full object-cover" />
              <span className="text-black text-sm font-bold whitespace-nowrap">Me contacter ↗</span>
            </a>
            </div>
          </div>

          {/* Mobile menu — StaggeredMenu (React Bits) */}
          <div className="lg:hidden">
            <StaggeredMenu
              isFixed
              position="right"
              items={staggeredMenuItems}
              socialItems={staggeredSocialItems}
              displaySocials
              displayItemNumbering
              logoUrl="/assets/favicon/favicon.svg"
              menuButtonColor="#fff"
              openMenuButtonColor="#fff"
              changeMenuColorOnOpen={false}
              colors={["#111111", "#ff5a1f"]}
              accentColor="#ff5a1f"
            />
          </div>
        </header>
      )}
    </>
  );
};

export default Navbar;
