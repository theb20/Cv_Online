import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Globe, Github, Star, Zap, CheckCircle, Code2,
  RefreshCw, Share2, Send, Trash2, MessageCircle, Heart,
  Smartphone, Home, Compass, Plus, Settings,
  ChevronDown, Users, Clock, Briefcase, Target, Lightbulb,
  TrendingUp, Shield, AlertTriangle, Link2
} from "lucide-react";
import Masonry from "react-masonry-css";
import { useData } from "../context/DataContext";
import pageSpeedService from "../config/Services/pageSpeedService.js";
import SEO from "../components/SEO";
import { db, auth } from "../config/firebase.js";
import {
  collection, addDoc, deleteDoc, doc,
  query, orderBy, onSnapshot, serverTimestamp
} from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { loginWithGoogle } from "../config/Services/googleAuthService.js";
import { useLike, useRating } from "../hooks/useProjectFirestore.js";
import AuthPrompt from "../components/AuthPrompt.jsx";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const CAT_COLOR = {
  "E-commerce":"#3b82f6","E-commerce / Dropshipping":"#3b82f6",
  "Comparateur / E-commerce":"#6366f1","Application Web":"#8b5cf6",
  "App Mobile":"#ec4899","Automatisation":"#7c3aed","Design / Flyers":"#f43f5e",
  "Portfolio / CV":"#10b981","Plateforme Digitale / SaaS":"#0ea5e9",
  "SaaS / Fintech":"#06b6d4","SaaS / Signature électronique":"#14b8a6",
  "Site Vitrine / Agence":"#0d9488","Customer Feedback / Franchise":"#f97316",
  "Jeu / Quiz":"#eab308","Streaming / Catalogue":"#ef4444",
  "Outil interne / Restauration":"#f59e0b","Autre":"#94a3b8",
};
const PROD    = ["En Production", "En production", "En Ligne"];
const ts      = (p) => [p.techno_1, p.techno_2, p.techno_3, p.techno_4].filter(Boolean);
const ACOLORS = ["#e60023","#3b82f6","#10b981","#f59e0b","#8b5cf6","#06b6d4","#f97316","#0d9488"];
const acolor  = (n = "A") => { let h=0; for(let i=0;i<n.length;i++) h=n.charCodeAt(i)+((h<<5)-h); return ACOLORS[Math.abs(h)%ACOLORS.length]; };
const rdate   = (iso) => { const s=Math.floor((Date.now()-new Date(iso))/1000); if(s<60) return "à l'instant"; if(s<3600) return `il y a ${Math.floor(s/60)} min`; if(s<86400) return `il y a ${Math.floor(s/3600)} h`; return new Date(iso).toLocaleDateString("fr-FR",{day:"numeric",month:"short"}); };

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const Tip = ({ label, children }) => (
  <div className="relative group flex justify-center">
    {children}
    <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg whitespace-nowrap pointer-events-none z-[60] opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-150">{label}</span>
  </div>
);

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <aside className="fixed left-0 top-0 h-screen w-16 hidden lg:flex flex-col items-center py-4 z-50 bg-white border-r border-gray-100">
      <Tip label="Devfolio">
        <div onClick={() => navigate("/")} className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-sm cursor-pointer hover:scale-110 transition-transform mb-3" style={{ background: "#e60023" }}>
          <img src='/assets/favicon/favicon.svg' alt='avatar'/>
        </div>
      </Tip>
      <nav className="flex flex-col gap-1 w-full px-2">
        {[
          { icon: Home,    label: "Accueil",  fn: () => navigate("/") },
          { icon: Compass, label: "Projets",  fn: () => navigate("/projects") },
        ].map(({ icon: Icon, label, fn }) => (
          <Tip key={label} label={label}>
            <button onClick={fn} className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors"><Icon size={20} /></button>
          </Tip>
        ))}
      </nav>
      <div className="flex-1" />
      <div className="flex flex-col gap-1 w-full px-2 pb-2 pt-3 border-t border-gray-100">
        <Tip label="Paramètres"></Tip>
      </div>
    </aside>
  );
};

// ─── Comment Section ──────────────────────────────────────────────────────────
const CommentSection = ({ projectId }) => {
  const colRef = collection(db, "projects", String(projectId), "comments");
  const [user,       setUser]       = useState(null);
  const [authReady,  setAuthReady]  = useState(false);
  const [comments,   setComments]   = useState([]);
  const [loadingC,   setLoadingC]   = useState(true);
  const [text,       setText]       = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [signingIn,  setSigningIn]  = useState(false);
  const [submitErr,  setSubmitErr]  = useState("");

  useEffect(() => { const unsub = onAuthStateChanged(auth, (u) => { setUser(u); setAuthReady(true); }); return unsub; }, []);
  useEffect(() => {
    const q = query(colRef, orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => { setComments(snap.docs.map(d => ({ id: d.id, ...d.data() }))); setLoadingC(false); }, () => setLoadingC(false));
    return unsub;
  }, [projectId]);

  const handleLogin = async () => { setSigningIn(true); try { await loginWithGoogle(); } catch {} finally { setSigningIn(false); } };
  const submit = async () => {
    if (!text.trim() || submitting || !user) return;
    setSubmitting(true); setSubmitErr("");
    try {
      await addDoc(colRef, { uid: user.uid, name: user.displayName || "Anonyme", photoURL: user.photoURL || null, text: text.trim(), createdAt: serverTimestamp() });
      setText("");
    } catch (e) {
      setSubmitErr(e.code === "permission-denied" ? "Permission refusée." : "Erreur lors de la publication.");
    } finally { setSubmitting(false); }
  };
  const remove = (id) => deleteDoc(doc(db, "projects", String(projectId), "comments", id));
  const fmtDate = (ts) => { if (!ts) return "…"; return rdate(ts.toDate ? ts.toDate().toISOString() : ts); };

  const CommentCard = ({ c }) => (
    <motion.div initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }}
      className="flex gap-4 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm group">
      {c.photoURL ? <img src={c.photoURL} alt="" className="w-9 h-9 rounded-full object-cover shrink-0" /> : <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-black shrink-0" style={{ background: acolor(c.name) }}>{c.name.charAt(0).toUpperCase()}</div>}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-sm font-black text-gray-900">{c.name}</span>
          <span className="text-xs text-gray-300">{fmtDate(c.createdAt)}</span>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">{c.text}</p>
      </div>
      {user?.uid === c.uid && (
        <button onClick={() => remove(c.id)} className="opacity-0 group-hover:opacity-100 transition-opacity self-start text-gray-300 hover:text-red-400 mt-0.5"><Trash2 size={14} /></button>
      )}
    </motion.div>
  );

  return (
    <section className="mt-10">
      <div className="flex items-center gap-3 mb-6">
        <MessageCircle size={20} className="text-gray-400" />
        <h2 className="text-lg font-black text-gray-900">Commentaires</h2>
        {comments.length > 0 && <span className="text-xs font-black text-white px-2 py-0.5 rounded-full" style={{ background: "#e60023" }}>{comments.length}</span>}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm sticky top-20">
            {!authReady ? (
              <div className="flex justify-center py-6"><RefreshCw size={18} className="animate-spin text-gray-300" /></div>
            ) : !user ? (
              <div className="text-center space-y-4 py-2">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto"><MessageCircle size={22} className="text-gray-300" /></div>
                <div>
                  <p className="text-sm font-black text-gray-900">Connectez-vous pour commenter</p>
                  <p className="text-xs text-gray-400 mt-1">Votre nom Google sera affiché, jamais votre email.</p>
                </div>
                <button onClick={handleLogin} disabled={signingIn} className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors font-semibold text-sm text-gray-700 disabled:opacity-50">
                  {signingIn ? <RefreshCw size={16} className="animate-spin" /> : <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20H24v8h11.3C33.6 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.1-4z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.1 18.9 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.5 29.3 4 24 4c-7.7 0-14.4 4.4-17.7 10.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.4-5l-6.2-5.2C29.3 35.3 26.8 36 24 36c-5.2 0-9.6-2.9-11.3-7l-6.5 5C9.6 39.6 16.4 44 24 44z"/><path fill="#1976D2" d="M43.6 20H24v8h11.3c-.9 2.4-2.5 4.5-4.6 5.9l6.2 5.2C41 35.5 44 30.2 44 24c0-1.3-.1-2.7-.4-4z"/></svg>}
                  {signingIn ? "Connexion…" : "Continuer avec Google"}
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                  {user.photoURL ? <img src={user.photoURL} alt="" className="w-8 h-8 rounded-full object-cover" /> : <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black" style={{ background: acolor(user.displayName||"A") }}>{(user.displayName||"A").charAt(0).toUpperCase()}</div>}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black text-gray-900 truncate">{user.displayName || "Anonyme"}</p>
                    <p className="text-[10px] text-gray-400">Email masqué · <button onClick={() => signOut(auth)} className="underline hover:text-gray-600">Déconnexion</button></p>
                  </div>
                </div>
                <textarea value={text} onChange={e => setText(e.target.value)} onKeyDown={e => { if (e.key==="Enter" && (e.metaKey||e.ctrlKey)) submit(); }} placeholder="Votre commentaire sur ce projet…" rows={4} className="w-full text-sm px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all resize-none" />
                <button onClick={submit} disabled={!text.trim() || submitting} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90 active:scale-[.98] disabled:opacity-30 disabled:cursor-not-allowed" style={{ background: "#111" }}>
                  {submitting ? <RefreshCw size={14} className="animate-spin" /> : <Send size={14} />}
                  {submitting ? "Publication…" : "Publier"}
                </button>
                {submitErr && <p className="text-xs text-red-500 text-center font-medium">{submitErr}</p>}
                <p className="text-[11px] text-gray-300 text-center">⌘ + Entrée pour publier</p>
              </div>
            )}
          </div>
        </div>
        <div className="lg:col-span-3 space-y-4">
          {loadingC ? (
            <div className="flex items-center justify-center py-16 bg-white rounded-2xl border border-gray-100"><RefreshCw size={20} className="animate-spin text-gray-300" /></div>
          ) : comments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-gray-100 text-center">
              <MessageCircle size={36} className="text-gray-200 mb-3" />
              <p className="text-sm font-semibold text-gray-400">Aucun commentaire pour l'instant</p>
              <p className="text-xs text-gray-300 mt-1">{user ? "Soyez le premier à commenter" : "Connectez-vous pour réagir"}</p>
            </div>
          ) : comments.map(c => <CommentCard key={c.id} c={c} />)}
        </div>
      </div>
    </section>
  );
};

// ─── Related Card ─────────────────────────────────────────────────────────────
const RelatedCard = ({ project: p }) => {
  const [hovered, setHovered] = useState(false);
  const h = 160 + ((p.id * 53) % 120);
  return (
    <div className="mb-4 break-inside-avoid" onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}>
      <Link to={`/project/${p.id}`}>
        <div className="relative rounded-2xl overflow-hidden bg-gray-100">
          <img src={p.image_url||"/assets/grid.png"} alt={p.title} className="w-full object-cover transition-transform duration-500" style={{ height:h, transform:hovered?"scale(1.04)":"scale(1)" }} onError={e=>{e.target.src="/assets/grid.png";}} />
          <AnimatePresence>
            {hovered && (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0 bg-black/20 flex items-start justify-end p-3">
                <span className="px-3 py-1.5 rounded-full text-xs font-bold text-white" style={{background:"#e60023"}}>Voir</span>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="absolute bottom-2 left-2">
            <span className="text-[10px] font-black uppercase text-white px-2 py-0.5 rounded-full" style={{ background:`${CAT_COLOR[p.category]||"#94a3b8"}dd` }}>{p.category?.split(" /")[0]}</span>
          </div>
        </div>
        <div className="pt-2 px-1">
          <p className="font-bold text-sm text-gray-900 line-clamp-1">{p.title}</p>
          <div className="flex gap-1 mt-1 flex-wrap">{ts(p).slice(0,2).map((t,i) => <span key={i} className="text-[11px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{t}</span>)}</div>
        </div>
      </Link>
    </div>
  );
};

// ─── Challenge Accordion ──────────────────────────────────────────────────────
const ChallengeItem = ({ challenge, index }) => {
  const [open, setOpen] = useState(false);
  const colors = ["#3b82f6","#8b5cf6","#f59e0b","#10b981","#e60023"];
  const color = colors[index % colors.length];
  return (
    <motion.div layout className="border border-gray-100 rounded-2xl overflow-hidden bg-white">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-4 p-5 text-left hover:bg-gray-50 transition-colors">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white text-xs font-black" style={{ background: color }}>
          {index + 1}
        </div>
        <span className="flex-1 text-sm font-bold text-gray-900">{challenge.title}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={16} className="text-gray-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: "easeInOut" }} className="overflow-hidden">
            <div className="px-5 pb-5 pt-0">
              <div className="h-px bg-gray-100 mb-4" />
              <p className="text-sm text-gray-600 leading-relaxed">{challenge.body}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ProjectDetails() {
  const { id }       = useParams();
  const navigate     = useNavigate();
  const { projects } = useData();

  const [project,       setProject]       = useState(null);
  const [loading,       setLoading]       = useState(true);
  const [activeTab,     setActiveTab]     = useState("overview");
  const [activeImage,   setActiveImage]   = useState(null);
  const [copied,        setCopied]        = useState(false);
  const [copiedComment, setCopiedComment] = useState(false);
  const [previewMode,   setPreviewMode]   = useState("desktop");
  const [realMetrics,   setRealMetrics]   = useState(null);
  const [analyzing,     setAnalyzing]     = useState(false);
  const [analysisError, setAnalysisError] = useState(null);
  const [user,          setUser]          = useState(null);
  const [starHover,     setStarHover]     = useState(0);
  const [showAuthLike,  setShowAuthLike]  = useState(false);
  const [showAuthRate,  setShowAuthRate]  = useState(false);

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  const { liked, count: likeCount, toggle: toggleLike } = useLike(project?.id, user);
  const { average: ratingAvg, count: ratingCount, userRating, rate } = useRating(project?.id, user);

  useEffect(() => {
    const found = projects.find(p => p.id.toString() === id);
    setProject(found); setActiveImage(null); setRealMetrics(null);
    setActiveTab("overview"); setLoading(false);
    if (window.location.hash === "#comments") {
      setTimeout(() => {
        document.getElementById("comments")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 400);
    } else {
      window.scrollTo(0, 0);
    }
  }, [id, projects]);

  useEffect(() => {
    if (activeTab !== "perf" || !project?.link_url || realMetrics || analyzing) return;
    const ok = project.link_url.startsWith("http") && !project.link_url.includes("localhost");
    if (!ok) return;
    setAnalyzing(true); setAnalysisError(null);
    pageSpeedService.runAudit(project.link_url).then(m => setRealMetrics(m)).catch(() => setAnalysisError("URL inaccessible.")).finally(() => setAnalyzing(false));
  }, [activeTab, project]);

  const handleShare = async () => {
    if (navigator.share) { try { await navigator.share({ title: project?.title, url: window.location.href }); } catch {} }
    else { navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 2000); }
  };

  const handleShareComment = () => {
    const url = `${window.location.origin}/project/${id}#comments`;
    navigator.clipboard.writeText(url);
    setCopiedComment(true);
    setTimeout(() => setCopiedComment(false), 2500);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="w-8 h-8 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin" /></div>;
  if (!project) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
      <p className="text-lg font-black text-gray-900">Projet introuvable</p>
      <button onClick={() => navigate("/projects")} className="px-6 py-2.5 rounded-xl font-bold text-white text-sm bg-gray-900 hover:bg-gray-800 transition-colors">Retour aux projets</button>
    </div>
  );

  const techList = ts(project);
  const catColor = CAT_COLOR[project.category] || "#94a3b8";
  const isProd   = PROD.includes(project.status);
  const related  = projects.filter(p => p.id !== project.id && p.category === project.category).slice(0, 8);
  let hostname   = ""; try { hostname = new URL(project.link_url).hostname.replace("www.",""); } catch {}

  const TABS = [
    { id:"overview", label:"Vue d'ensemble" },
    { id:"stack",    label:"Stack" },
    { id:"perf",     label:"Performance" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO title={project.title} description={project.description} image={project.image_url} url={`/project/${project.id}`} />
      <Sidebar />

      <div className="lg:ml-16">

        {/* ── Sticky nav ─────────────────────────────────────────────────── */}
        <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors shrink-0">
            <ArrowLeft size={16} /><span className="hidden sm:inline">Retour</span>
          </button>
          <p className="text-sm font-bold text-gray-900 truncate hidden md:block">{project.title}</p>
          <div className="flex items-center gap-2 shrink-0">
            {/* Bouton lien commentaires */}
            <div className="relative">
              <button onClick={handleShareComment}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border hover:bg-gray-50"
                style={ copiedComment
                  ? { background:"#f0fdf4", borderColor:"#bbf7d0", color:"#16a34a" }
                  : { background:"#fff", borderColor:"#e5e7eb", color:"#374151" }
                }>
                {copiedComment ? <CheckCircle size={13} className="text-green-500" /> : <Link2 size={13} />}
                <span className="hidden sm:inline">{copiedComment ? "Lien copié !" : "Laisser un avis"}</span>
              </button>
            </div>
            <button onClick={handleShare} className="w-9 h-9 rounded-xl hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors">
              {copied ? <CheckCircle size={16} className="text-green-500" /> : <Share2 size={16} />}
            </button>
            <div className="relative">
              <button onClick={async () => { const ok = await toggleLike(); if (ok === false) setShowAuthLike(true); }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90 active:scale-95"
                style={{ background: liked ? "#ad081b" : "#e60023" }}>
                <Heart size={14} fill={liked ? "white" : "none"} />
                {liked ? "Sauvegardé" : "Enregistrer"}
                {likeCount > 0 && <span className="text-xs opacity-80">· {likeCount}</span>}
              </button>
              <AnimatePresence>
                {showAuthLike && (
                  <div className="absolute top-full right-0 mt-2 z-50">
                    <AuthPrompt onClose={() => setShowAuthLike(false)} />
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </nav>

        {/* ── Hero ───────────────────────────────────────────────────────── */}
        <div className="relative h-64 sm:h-80 lg:h-[420px] overflow-hidden bg-gray-200">
          <motion.img key={activeImage||"hero"} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.3 }}
            src={activeImage || project.image_url || "/assets/grid.png"} alt={project.title}
            className="w-full h-full object-cover" onError={e=>{e.target.src="/assets/grid.png";}} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 px-5 sm:px-8 pb-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-[11px] font-black uppercase tracking-wide text-white px-2.5 py-1 rounded-full" style={{ background:`${catColor}ee` }}>
                {project.category?.split(" /")[0]}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-white/90 bg-white/15 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: isProd ? "#4ade80" : "#fbbf24" }} />
                {project.status}
              </span>
              {project.client_type && (
                <span className="text-[11px] font-semibold text-white/80 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
                  {project.client_type}
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight drop-shadow-sm">
              {project.title}
            </h1>
            <p className="text-sm text-white/60 mt-1.5">{project.type} · {project.version}</p>
          </div>
        </div>

        {/* Gallery strip */}
        {project.gallery?.length > 0 && (
          <div className="bg-white border-b border-gray-100 px-4 py-3 flex gap-2 overflow-x-auto" style={{ scrollbarWidth:"none" }}>
            <button onClick={() => setActiveImage(null)} className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${!activeImage?"border-gray-900":"border-transparent hover:border-gray-300"}`}>
              <img src={project.image_url} alt="" className="w-full h-full object-cover" onError={e=>{e.target.src="/assets/grid.png";}} />
            </button>
            {project.gallery.map((img,i) => (
              <button key={i} onClick={() => setActiveImage(img)} className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${activeImage===img?"border-gray-900":"border-transparent hover:border-gray-300"}`}>
                <img src={img} alt="" className="w-full h-full object-cover" onError={e=>{e.target.src="/assets/grid.png";}} />
              </button>
            ))}
          </div>
        )}

        {/* ── Highlights bar ─────────────────────────────────────────────── */}
        {project.highlights?.length > 0 && (
          <div className="bg-white border-b border-gray-100">
            <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4">
              <div className="flex gap-6 sm:gap-10 overflow-x-auto" style={{ scrollbarWidth:"none" }}>
                {project.highlights.map((h, i) => (
                  <div key={i} className="flex flex-col items-center shrink-0 min-w-[80px]">
                    <span className="text-xl sm:text-2xl font-black text-gray-900 leading-none">{h.value}</span>
                    <span className="text-[11px] text-gray-400 mt-1 text-center whitespace-nowrap">{h.label}</span>
                  </div>
                ))}
                <div className="w-px bg-gray-100 self-stretch mx-2 hidden sm:block" />
                {project.timeline && (
                  <div className="flex flex-col items-center shrink-0 min-w-[80px]">
                    <span className="text-xl sm:text-2xl font-black text-gray-900 leading-none">{project.timeline}</span>
                    <span className="text-[11px] text-gray-400 mt-1 text-center">Durée</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── Main grid ──────────────────────────────────────────────────── */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* ── Left: Content (2 cols) ─────────────────────────────────── */}
            <div className="lg:col-span-2 space-y-5">

              {/* Problem / Solution / Impact */}
              {(project.problem || project.solution || project.impact) && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {project.problem && (
                    <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 rounded-lg bg-red-500 flex items-center justify-center shrink-0">
                          <AlertTriangle size={13} className="text-white" />
                        </div>
                        <span className="text-xs font-black text-red-600 uppercase tracking-wide">Problème</span>
                      </div>
                      <p className="text-sm text-red-700 leading-relaxed">{project.problem}</p>
                    </div>
                  )}
                  {project.solution && (
                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center shrink-0">
                          <Lightbulb size={13} className="text-white" />
                        </div>
                        <span className="text-xs font-black text-blue-600 uppercase tracking-wide">Solution</span>
                      </div>
                      <p className="text-sm text-blue-700 leading-relaxed">{project.solution}</p>
                    </div>
                  )}
                  {project.impact && (
                    <div className="bg-green-50 border border-green-100 rounded-2xl p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 rounded-lg bg-green-500 flex items-center justify-center shrink-0">
                          <TrendingUp size={13} className="text-white" />
                        </div>
                        <span className="text-xs font-black text-green-600 uppercase tracking-wide">Impact</span>
                      </div>
                      <p className="text-sm text-green-700 leading-relaxed">{project.impact}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Description */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h2 className="text-base font-black text-gray-900 mb-3">À propos du projet</h2>
                <p className="text-sm text-gray-600 leading-relaxed">{project.description}</p>
                {project.context && project.context !== project.description && (
                  <p className="text-sm text-gray-500 leading-relaxed mt-3 pt-3 border-t border-gray-50">{project.context}</p>
                )}
              </div>

              {/* Features */}
              {project.features?.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h2 className="text-base font-black text-gray-900 mb-4">Fonctionnalités</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {project.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <CheckCircle size={15} className="text-green-500 mt-0.5 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Challenges */}
              {project.challenges?.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Shield size={16} className="text-gray-400" />
                    <h2 className="text-base font-black text-gray-900">Défis techniques</h2>
                  </div>
                  <div className="space-y-2">
                    {project.challenges.map((c, i) => <ChallengeItem key={i} challenge={c} index={i} />)}
                  </div>
                </div>
              )}

              {/* Tabs */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex border-b border-gray-100 overflow-x-auto" style={{ scrollbarWidth:"none" }}>
                  {TABS.map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                      className={`px-5 py-3.5 text-sm font-bold whitespace-nowrap relative transition-colors shrink-0 ${activeTab===tab.id ? "text-gray-900" : "text-gray-400 hover:text-gray-600"}`}>
                      {tab.label}
                      {activeTab===tab.id && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />}
                    </button>
                  ))}
                </div>

                <div className="p-6 min-h-[260px]">
                  <AnimatePresence mode="wait">

                    {activeTab==="overview" && (
                      <motion.div key="ov" initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}} transition={{duration:0.2}}>
                        <div className="p-5 bg-gray-900 text-white rounded-xl">
                          <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-3">À propos de l'équipe</p>
                          <p className="text-sm text-gray-300 leading-relaxed">{project.team_text || "Projet développé en autonomie."}</p>
                        </div>
                        {project.security_text && (
                          <div className="mt-4 p-4 rounded-xl bg-blue-50 border border-blue-100">
                            <p className="text-xs font-black text-blue-700 uppercase tracking-wide mb-1">Sécurité</p>
                            <p className="text-sm text-blue-600 leading-relaxed">{project.security_text}</p>
                          </div>
                        )}
                        {project.performance_text && (
                          <div className="mt-3 p-4 rounded-xl bg-green-50 border border-green-100">
                            <p className="text-xs font-black text-green-700 uppercase tracking-wide mb-1">Performance</p>
                            <p className="text-sm text-green-600 leading-relaxed">{project.performance_text}</p>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {activeTab==="stack" && (
                      <motion.div key="st" initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}} transition={{duration:0.2}} className="space-y-6">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {techList.map((t,i) => (
                            <div key={i} className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-white hover:shadow-sm transition-all text-center">
                              <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                                <Code2 size={16} className="text-gray-400" />
                              </div>
                              <span className="text-xs font-bold text-gray-900">{t}</span>
                            </div>
                          ))}
                        </div>
                        {project.architecture && (
                          <div className="bg-gray-900 rounded-xl p-5 font-mono text-sm">
                            <div className="flex gap-2 mb-4">{["bg-red-500","bg-yellow-400","bg-green-500"].map(c=><div key={c} className={`w-3 h-3 rounded-full ${c}`}/>)}</div>
                            {Object.entries(project.architecture).map(([k,v]) => (
                              <div key={k} className="flex flex-col sm:flex-row sm:gap-4 py-2 border-b border-gray-700/40 last:border-0">
                                <span className="text-blue-400 w-24 shrink-0 capitalize text-xs">{k}</span>
                                <span className="text-green-400 text-xs leading-relaxed">{v}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}

                    {activeTab==="perf" && (
                      <motion.div key="pf" initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}} transition={{duration:0.2}}>
                        <div className="flex items-center gap-3 mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                          {analyzing ? <RefreshCw size={16} className="text-amber-500 animate-spin" /> : <Zap size={16} className="text-amber-500" />}
                          <div>
                            <p className="text-sm font-bold text-gray-900">{analyzing?"Analyse en cours…":realMetrics?"Audit temps réel":"Dernière analyse"}</p>
                            <p className="text-xs text-gray-400">{realMetrics?.timestamp||project.metrics?.lastUpdate}</p>
                          </div>
                          {analysisError && <span className="ml-auto text-xs text-red-400">{analysisError}</span>}
                        </div>
                        <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 transition-opacity ${analyzing?"opacity-40":""}`}>
                          {[
                            {label:"Performance",   val:realMetrics?.performance  ||project.metrics?.performance  ||0, color:"#f59e0b"},
                            {label:"Accessibilité", val:realMetrics?.accessibility||project.metrics?.accessibility||0, color:"#3b82f6"},
                            {label:"Best Practices",val:realMetrics?.bestPractices||project.metrics?.bestPractices||0, color:"#22c55e"},
                            {label:"SEO",           val:realMetrics?.seo          ||project.metrics?.seo          ||0, color:"#8b5cf6"},
                          ].map((m,i) => (
                            <div key={i} className="flex flex-col items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                              <div className="relative w-20 h-20 mb-2">
                                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                  <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                                  <motion.circle cx="50" cy="50" r="40" fill="none" stroke={m.color} strokeWidth="10" strokeLinecap="round"
                                    initial={{strokeDasharray:251.2,strokeDashoffset:251.2}}
                                    animate={{strokeDashoffset:251.2-(m.val/100)*251.2}}
                                    transition={{duration:1.2,ease:"easeOut",delay:i*0.1}} />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <span className="text-lg font-black" style={{color:m.color}}>{m.val}</span>
                                </div>
                              </div>
                              <p className="text-xs font-bold text-gray-600 text-center">{m.label}</p>
                            </div>
                          ))}
                        </div>
                        {project.link_url && (
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="text-sm font-black text-gray-900">Aperçu live</h3>
                              <div className="flex bg-gray-100 p-1 rounded-lg">
                                {[["mobile","Mobile",Smartphone],["desktop","Desktop",Globe]].map(([mode,lbl,Icon])=>(
                                  <button key={mode} onClick={()=>setPreviewMode(mode)}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${previewMode===mode?"bg-white shadow-sm text-gray-900":"text-gray-500"}`}>
                                    <Icon size={12}/>{lbl}
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div className={`mx-auto bg-gray-900 rounded-xl overflow-hidden border-4 border-gray-900 shadow-xl transition-all duration-500 ${previewMode==="mobile"?"max-w-sm h-[520px]":"w-full h-[420px]"}`}>
                              <div className="bg-gray-800 h-7 flex items-center px-3 gap-1.5">
                                {["bg-red-500","bg-yellow-400","bg-green-500"].map(c=><div key={c} className={`w-2.5 h-2.5 rounded-full ${c}`}/>)}
                                <div className="flex-1 text-center text-[10px] text-gray-500 truncate px-4">{project.link_url}</div>
                              </div>
                              <iframe src={project.link_url} className="w-full h-full border-0" title="Preview" loading="lazy" sandbox="allow-scripts allow-same-origin allow-forms" />
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>
              </div>

              {/* Comments */}
              <div id="comments" className="scroll-mt-16">
                <CommentSection projectId={project.id} />
              </div>
            </div>

            {/* ── Right: Info sidebar (1 col) ────────────────────────────── */}
            <div className="space-y-4 lg:order-last">

              {/* Creator */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0" style={{ background:"linear-gradient(135deg,#E85D04,#e60023)" }}>
                    <img src='/assets/favicon/favicon.svg' alt='avatar'/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-sm text-gray-900">Frédérick Ahobaut</p>
                    <p className="text-xs text-gray-400">Développeur Full Stack</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-50 relative">
                  <div className="flex items-center gap-1 mb-1">
                    {[1,2,3,4,5].map(i => {
                      const active = (starHover || userRating || ratingAvg) >= i;
                      return (
                        <button key={i}
                          onClick={async () => { const ok = await rate(i); if (ok === false) setShowAuthRate(true); }}
                          onMouseEnter={() => setStarHover(i)}
                          onMouseLeave={() => setStarHover(0)}
                          className="cursor-pointer hover:scale-125 transition-transform">
                          <Star size={16} fill={active ? "#f59e0b" : "none"} color={active ? "#f59e0b" : "#d1d5db"} />
                        </button>
                      );
                    })}
                    <span className="text-sm font-black text-gray-900 ml-1">{ratingAvg > 0 ? ratingAvg : (project.rating || "—")}</span>
                    <span className="text-xs text-gray-400 ml-1">({ratingCount > 0 ? ratingCount : (project.reviews || 0)} avis)</span>
                  </div>
                  <p className="text-[11px] text-gray-400">{user ? userRating > 0 ? `Votre note : ${userRating}/5` : "Cliquez pour noter" : "Connectez-vous pour noter"}</p>
                  <AnimatePresence>
                    {showAuthRate && (
                      <div className="absolute bottom-full right-0 mb-2 z-50">
                        <AuthPrompt onClose={() => setShowAuthRate(false)} />
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Links */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-2">
                {hostname && (
                  <a href={project.link_url} target="_blank" rel="noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group border border-gray-100">
                    <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center shrink-0"><Globe size={15} className="text-white"/></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900">Voir le site</p>
                      <p className="text-xs text-gray-400 truncate">{hostname}</p>
                    </div>
                  </a>
                )}
                {project.repo_url && (
                  <a href={project.repo_url} target="_blank" rel="noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group border border-gray-100">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0"><Github size={15} className="text-gray-700"/></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900">Code source</p>
                      <p className="text-xs text-gray-400">GitHub</p>
                    </div>
                  </a>
                )}
              </div>

              {/* Tech */}
              {techList.length > 0 && (
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {techList.map((t,i) => <span key={i} className="text-xs font-semibold bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full">{t}</span>)}
                  </div>
                </div>
              )}

              {/* Project meta — enriched */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Informations</p>
                <div className="space-y-3">
                  {[
                    { icon: Briefcase, label: "Type",      val: project.type },
                    { icon: Target,    label: "Client",    val: project.client_type },
                    { icon: Users,     label: "Équipe",    val: project.team_size },
                    { icon: Clock,     label: "Durée",     val: project.timeline },
                    { icon: null,      label: "Version",   val: project.version },
                    { icon: null,      label: "Statut",    val: project.status },
                    { icon: null,      label: "Mise à jour", val: project.metrics?.lastUpdate },
                  ].filter(item => item.val).map((item) => (
                    <div key={item.label} className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {item.icon && <item.icon size={13} className="text-gray-400 shrink-0" />}
                        <dt className="text-xs text-gray-400">{item.label}</dt>
                      </div>
                      <dd className="text-xs font-semibold text-gray-700 text-right">{item.val}</dd>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance quick */}
              {project.metrics?.performance > 0 && (
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Score Lighthouse</p>
                  <div className="space-y-2.5">
                    {[
                      {label:"Performance",   val:project.metrics.performance,  color:"#f59e0b"},
                      {label:"Accessibilité", val:project.metrics.accessibility, color:"#3b82f6"},
                      {label:"SEO",           val:project.metrics.seo,           color:"#8b5cf6"},
                    ].map(m => (
                      <div key={m.label}>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-gray-500">{m.label}</span>
                          <span className="text-xs font-black" style={{color:m.color}}>{m.val}</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div className="h-full rounded-full" style={{background:m.color}}
                            initial={{width:0}} animate={{width:`${m.val}%`}} transition={{duration:1,ease:"easeOut"}} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* ── Téléchargements ────────────────────────────────────────────── */}
          {project.downloadFiles?.length > 0 && (
            <div className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-gray-900 flex items-center justify-center shrink-0">
                  <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                </div>
                <div>
                  <h2 className="text-base font-black text-gray-900">Fichiers à télécharger</h2>
                  <p className="text-xs text-gray-400">{project.downloadFiles.length} fichier{project.downloadFiles.length > 1 ? "s" : ""} disponible{project.downloadFiles.length > 1 ? "s" : ""}</p>
                </div>
              </div>
              <div className="space-y-3">
                {project.downloadFiles.map((f, i) => (
                  <a key={i} href={f.file} download className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-300 hover:bg-gray-50 transition-all group">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center shrink-0 transition-colors">
                      <svg width="18" height="18" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate">{f.name}</p>
                      <p className="text-xs text-gray-400">{f.size}</p>
                    </div>
                    <div className="shrink-0 flex items-center gap-1.5 text-xs font-semibold text-gray-500 group-hover:text-gray-900 transition-colors">
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                      Télécharger
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-10 pb-10">
              <h2 className="text-lg font-black text-gray-900 mb-5">Projets similaires</h2>
              <style>{`.rl{display:flex;gap:14px;}.rl-c{background-clip:padding-box;}`}</style>
              <Masonry breakpointCols={{default:4,1200:3,800:2,500:2}} className="rl" columnClassName="rl-c">
                {related.map(p => <RelatedCard key={p.id} project={p} />)}
              </Masonry>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
