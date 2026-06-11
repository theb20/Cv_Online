import { useState, useMemo, useEffect } from "react";
import { useData } from "../context/DataContext";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Home, Bell, MessageCircle, Plus, Settings,
  Search, X, ExternalLink, Github, Compass,
  Star, Zap, Heart, ChevronDown, Package,
  CheckCircle, Clock, Filter, Camera
} from "lucide-react";
import Masonry from "react-masonry-css";
import SEO from "../components/SEO";
import { auth } from "../config/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { useLike } from "../hooks/useProjectFirestore.js";
import ReviewModal from "../components/ReviewModal.jsx";
import AuthPrompt from "../components/AuthPrompt.jsx";

// ─── helpers ──────────────────────────────────────────────────────────────────
const CAT_COLOR = {
  "E-commerce":"#3b82f6","E-commerce / Dropshipping":"#3b82f6",
  "Comparateur / E-commerce":"#6366f1","Application Web":"#8b5cf6",
  "App Mobile":"#ec4899","Automatisation":"#7c3aed",
  "Design / Flyers":"#f43f5e","Portfolio / CV":"#10b981",
  "Plateforme Digitale / SaaS":"#0ea5e9","SaaS / Fintech":"#06b6d4",
  "SaaS / Signature électronique":"#14b8a6","Site Vitrine / Agence":"#0d9488",
  "Customer Feedback / Franchise":"#f97316","Jeu / Quiz":"#eab308",
  "Streaming / Catalogue":"#ef4444","Outil interne / Restauration":"#f59e0b",
  "Autre":"#94a3b8",
};
const cc = (c) => CAT_COLOR[c] || "#94a3b8";
const ts = (p) => [p.techno_1, p.techno_2, p.techno_3, p.techno_4].filter(Boolean);
const PROD = ["En Production", "En production", "En Ligne"];

const TYPE_STYLE = {
  entreprise:     { label: "Entreprise",     bg: "#dbeafe", color: "#1d4ed8" },
  professionnel:  { label: "Professionnel",  bg: "#ccfbf1", color: "#0d9488" },
  personnel:      { label: "Personnel",      bg: "#f3f4f6", color: "#374151" },
  école:          { label: "École",          bg: "#ede9fe", color: "#6d28d9" },
};
const typeStyle = (t = "") => {
  const low = t.toLowerCase();
  if (low.includes("entreprise"))    return TYPE_STYLE.entreprise;
  if (low.includes("professionnel")) return TYPE_STYLE.professionnel;
  if (low.includes("école") || low.includes("ecole") || low.includes("school")) return TYPE_STYLE.école;
  return TYPE_STYLE.personnel;
};

// ─── SIDEBAR TOOLTIP ──────────────────────────────────────────────────────────
const SidebarTip = ({ label, children }) => (
  <div className="relative group flex justify-center">
    {children}
    <span className="
      absolute left-full ml-3 top-1/2 -translate-y-1/2
      bg-gray-900 text-white text-xs px-2.5 py-1.5 rounded-lg
      whitespace-nowrap pointer-events-none z-[60]
      opacity-0 group-hover:opacity-100
      translate-x-1 group-hover:translate-x-0
      transition-all duration-150
    ">{label}</span>
  </div>
);

// ─── SIDEBAR (icônes uniquement) ───────────────────────────────────────────────
const PinterestSidebar = ({ active, setActive, projects, onMessage }) => {
  const inProd = projects.filter(p => ["En Production","En production","En Ligne"].includes(p.status)).length;
  const inDev  = projects.filter(p => p.status?.toLowerCase().includes("développement")).length;

  const navItems = [
    { icon: MessageCircle, label: "Laisser un avis", id: "msg",  action: onMessage },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-16 hidden lg:flex flex-col items-center py-4 z-50"
      style={{ background: "#fff", borderRight: "1px solid #efefef" }}>

      {/* Logo */}
      <SidebarTip label="Devfolio">
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-sm cursor-pointer hover:scale-110 transition-transform mb-3"
          style={{ background: "#ffffffff" }}></div>
      </SidebarTip>

      {/* Nav */}
      <nav className="flex flex-col gap-1 w-full px-2">
        {navItems.map(({ icon: Icon, label, id, action }) => (
          <SidebarTip key={id} label={label}>
            <button onClick={() => action ? action() : setActive(id)}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:bg-gray-100"
              style={{
                color:      active === id ? "#111" : "#767676",
                background: active === id ? "#f0f0f0" : "transparent",
              }}>
              <Icon size={20} />
            </button>
          </SidebarTip>
        ))}
      </nav>

      <div className="w-8 h-px my-3" style={{ background: "#efefef" }} />

      {/* Stats */}
      <div className="flex flex-col gap-1 w-full px-2">
        {[
          { icon: Package,     val: projects.length, label: `${projects.length} projets`, color: "#6366f1" },
          { icon: CheckCircle, val: inProd,           label: `${inProd} en production`,   color: "#22c55e" },
          { icon: Clock,       val: inDev,            label: `${inDev} en développement`, color: "#f59e0b" },
        ].map(({ icon: Icon, val, label, color }) => (
          <SidebarTip key={label} label={label}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center relative hover:bg-gray-50 cursor-default transition-colors">
              <Icon size={18} style={{ color }} />
              <span className="absolute -top-0.5 -right-0.5 text-[9px]  text-white px-1 py-0.5 rounded-full leading-none"
                style={{ background: color }}>{val}</span>
            </div>
          </SidebarTip>
        ))}
      </div>

      <div className="flex-1" />

      {/* Bottom */}
      <div className="flex flex-col gap-1 w-full px-2 pb-1 pt-3 border-t border-gray-100">
     
        
        <SidebarTip label="Frédérick Ahobaut — Développeur Full Stack">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm cursor-pointer hover:scale-105 transition-transform mt-1"
            style={{ background: "linear-gradient(135deg,#E85D04,#e60023)" }}>
            <img src="/assets/favicon/favicon.svg" alt="" />
          </div>
        </SidebarTip>
      </div>
    </aside>
  );
};

// ─── HEADER ───────────────────────────────────────────────────────────────────
const PinterestHeader = ({ search, setSearch, activeFilter, setActiveFilter, categories }) => (
  <header className="sticky top-0 z-40 px-5 py-3"
    style={{ background: "rgba(250,250,250,.95)", backdropFilter: "blur(8px)", borderBottom: "1px solid #efefef" }}>

    {/* Search row */}
    <div className="flex items-center gap-3 mb-3">
      <div className="flex-1 flex items-center gap-3 rounded-full px-4 py-2.5 transition-all focus-within:ring-2 focus-within:ring-black/10"
        style={{ background: "#efefef" }}>
        <Search size={17} className="text-gray-500 flex-shrink-0" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Rechercher des projets"
          className="flex-1 bg-transparent text-sm outline-none text-gray-900 placeholder-gray-500"
        />
        {search && (
          <button onClick={() => setSearch("")} className="text-gray-400 hover:text-gray-600 flex-shrink-0">
            <X size={16} />
          </button>
        )}
      </div>
    </div>

    {/* Category chips */}
    <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
      {categories.map(cat => {
        const active = activeFilter === cat;
        return (
          <button key={cat} onClick={() => setActiveFilter(cat)}
            className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95"
            style={{
              background: active ? "#111" : "#efefef",
              color:       active ? "#fff" : "#111",
            }}>
            {cat}
          </button>
        );
      })}
    </div>
  </header>
);

// ─── PINTEREST CARD ───────────────────────────────────────────────────────────
const PinterestCard = ({ project, user }) => {
  const [hovered,    setHovered]    = useState(false);
  const [showAuth,   setShowAuth]   = useState(false);
  const { liked, count: likeCount, toggle } = useLike(project.id, user);
  const [saved, setSaved] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("saved_projects") || "[]").includes(project.id);
    } catch { return false; }
  });
  const color   = cc(project.category);
  const techArr = ts(project);
  const imgH    = 200 + ((project.id * 73) % 220);

  const handleLike = async (e) => {
    e.preventDefault();
    const ok = await toggle();
    if (ok === false) setShowAuth(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    try {
      const list = JSON.parse(localStorage.getItem("saved_projects") || "[]");
      const next = saved ? list.filter(id => id !== project.id) : [...list, project.id];
      localStorage.setItem("saved_projects", JSON.stringify(next));
      setSaved(!saved);
    } catch {}
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className="mb-4 break-inside-avoid relative"
    >
      {/* Image */}
      <div className="relative rounded-2xl overflow-hidden cursor-pointer" style={{ background: "#e9e9e9" }}>
        <Link to={`/project/${project.id}`}>
          <img
            src={project.image_url || project.image || "/assets/grid.png"}
            alt={project.title}
            className="w-full object-cover transition-transform duration-500"
            style={{ height: imgH, transform: hovered ? "scale(1.04)" : "scale(1)" }}
            onError={e => { e.target.src = "/assets/grid.png"; }}
          />
        </Link>

        <div className="absolute inset-0 transition-opacity duration-200 pointer-events-none"
          style={{ background: "rgba(0,0,0,.15)", opacity: hovered ? 1 : 0 }} />

        {/* Save button */}
        <AnimatePresence>
          {hovered && (
            <motion.button
              initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.15 }}
              onClick={handleSave}
              className="absolute top-3 right-3 px-4 py-2 rounded-full text-sm font-bold text-white transition-all hover:scale-105 active:scale-95"
              style={{ background: saved ? "#ad081b" : "#e60023" }}
            >
              {saved ? "Sauvegardé ✓" : "Enregistrer"}
            </motion.button>
          )}
        </AnimatePresence>

        {/* Like button — dans overflow-hidden pour l'overlay visuel */}
        <AnimatePresence>
          {hovered && (
            <motion.button
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={handleLike}
              className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-all hover:scale-110"
              style={{ background: "rgba(255,255,255,.92)" }}
            >
              <Heart size={14} fill={liked ? "#e60023" : "none"} style={{ color: liked ? "#e60023" : "#111" }} />
              {likeCount > 0 && <span className="text-[11px] text-gray-700">{likeCount}</span>}
            </motion.button>
          )}
        </AnimatePresence>

        {/* Category badge */}
        <div className="absolute bottom-3 left-3">
          <span className="text-[10px] uppercase text-white px-2 py-1 rounded-full"
            style={{ background: `${color}cc`, backdropFilter: "blur(4px)" }}>
            {project.category?.split(" /")[0]}
          </span>
        </div>

        {/* Status dot */}
        <div className="absolute top-3 left-3 w-2.5 h-2.5 rounded-full ring-2 ring-white"
          style={{ background: PROD.includes(project.status) ? "#22c55e" : "#f59e0b" }} />
      </div>

      {/* AuthPrompt — hors du overflow-hidden, positionné en bas à droite de la carte */}
      <AnimatePresence>
        {showAuth && (
          <div className="absolute bottom-16 right-2 z-50">
            <AuthPrompt onClose={() => setShowAuth(false)} />
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="pt-2.5 px-1">
        <Link to={`/project/${project.id}`}>
          <h3 className="font-bold text-sm text-gray-900 line-clamp-2 leading-snug hover:underline cursor-pointer">
            {project.title}
          </h3>
        </Link>

        {project.type && (() => {
          const s = typeStyle(project.type);
          return <span className="inline-block mt-1.5 text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full" style={{ background: s.bg, color: s.color }}>{s.label}</span>;
        })()}

        {techArr.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1.5">
            {techArr.slice(0, 2).map((t, i) => (
              <span key={i} className="text-[11px] text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded-full">{t}</span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            {project.rating > 0 && (
              <span className="flex items-center gap-1 text-[12px] font-bold text-gray-600">
                <Star size={11} fill="#f59e0b" color="#f59e0b" /> {project.rating}
              </span>
            )}
            {likeCount > 0 && (
              <span className="flex items-center gap-1 text-[11px] text-gray-400">
                <Heart size={10} fill="#e60023" color="#e60023" /> {likeCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {project.repo_url && (
              <a href={project.repo_url} target="_blank" rel="noopener noreferrer"
                className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-700">
                <Github size={13} />
              </a>
            )}
            {project.link_url && (
              <a href={project.link_url} target="_blank" rel="noopener noreferrer"
                className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-700">
                <ExternalLink size={13} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── MASONRY GRID ─────────────────────────────────────────────────────────────
const PinterestGrid = ({ projects, user }) => (
  <>
    <style>{`
      .pinterest-grid { display: flex; gap: 16px; padding: 0 20px 40px; }
      .pinterest-col  { background-clip: padding-box; }
    `}</style>
    <Masonry
      breakpointCols={{ default: 6, 1600: 5, 1280: 4, 960: 3, 640: 2, 480: 2 }}
      className="pinterest-grid"
      columnClassName="pinterest-col"
    >
      {projects.map(p => <PinterestCard key={p.id} project={p} user={user} />)}
    </Masonry>
    {projects.length === 0 && (
      <div className="flex flex-col items-center justify-center py-32 text-center gap-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
          <Search size={28} className="text-gray-300" />
        </div>
        <h3 className="text-lg text-gray-700">Aucun résultat</h3>
        <p className="text-sm text-gray-400">Essayez d'autres mots-clés.</p>
      </div>
    )}
  </>
);

// ─── MOBILE BOTTOM BAR ────────────────────────────────────────────────────────
const MobileBottomBar = ({ onMessage }) => {
  const navigate = useNavigate();
  const items = [
    { icon: Home,          label: "Accueil",  action: () => navigate("/") },
    { icon: Compass,       label: "Projets",  action: null, active: true },
    { icon: MessageCircle, label: "Avis",     action: onMessage },
  ];
  return (
    <nav className="fixed bottom-[23.9px] rounded-full max-w-[200px] w-full mx-10 left-0 right-0 z-50 lg:hidden"
      style={{ background: "#fff", borderTop: "1px solid #efefef", paddingBottom: "env(safe-area-inset-bottom)" }}>
      <div className="flex items-center justify-around px-2 h-14">
        {items.map(({ icon: Icon, label, action, active }) => (
          <button key={label} onClick={action || undefined}
            className="flex flex-col items-center gap-0.5 px-4 py-2 rounded-full transition-colors"
            style={{ color: active ? "#ffffffff" : "#aaa", backgroundColor: active ? "#ff0303ff" : "transparent" }}>
            <Icon size={20} strokeWidth={active ? 2.5 : 1.8} />
            <span className="text-[10px] font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function ProjectCatalog() {
  const { projects } = useData();
  const [search,       setSearch]       = useState("");
  const [activeFilter, setActiveFilter] = useState("Tous");
  const [sideActive,   setSideActive]   = useState("home");
  const [user,         setUser]         = useState(null);
  const [reviewOpen,   setReviewOpen]   = useState(false);

  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);

  const allCats = useMemo(
    () => ["Tous", ...new Set(projects.map(p => p.category))],
    [projects]
  );

  const displayed = useMemo(() => {
    let r = [...projects];
    if (activeFilter !== "Tous") r = r.filter(p => p.category === activeFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      r = r.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        ts(p).some(t => t.toLowerCase().includes(q))
      );
    }
    return r;
  }, [projects, activeFilter, search]);

  return (
    <>
      <SEO title="Projets · Frédérick Ahobaut" description={`${projects.length} projets web.`} />

      <ReviewModal isOpen={reviewOpen} onClose={() => setReviewOpen(false)} />

      <div className="min-h-screen pt-15" style={{ background: "#fafafa" }}>

        {/* Sidebar */}
        <PinterestSidebar
          active={sideActive} setActive={setSideActive}
          projects={projects}
          onMessage={() => setReviewOpen(true)}
        />

        {/* Main content */}
        <div className="lg:ml-16 pb-16 lg:pb-0">
          <PinterestHeader
            search={search}
            setSearch={setSearch}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            categories={allCats}
          />
          <PinterestGrid projects={displayed} user={user} />
        </div>

        <MobileBottomBar onMessage={() => setReviewOpen(true)} />

      </div>
    </>
  );
}
