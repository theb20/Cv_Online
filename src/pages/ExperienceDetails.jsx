import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { useData } from "../context/DataContext";
import SEO from "../components/SEO";

const TYPE_COLOR = {
  "CDI":                    { bg: "#d1fae5", color: "#065f46" },
  "CDD":                    { bg: "#dbeafe", color: "#1e40af" },
  "Stage":                  { bg: "#ede9fe", color: "#5b21b6" },
  "Alternance":             { bg: "#fef3c7", color: "#92400e" },
  "Freelance / Entreprise": { bg: "#e0f2fe", color: "#075985" },
};
const typeStyle = (t) => TYPE_COLOR[t] || { bg: "#f1f5f9", color: "#334155" };

export default function ExperienceDetails() {
  const { id }          = useParams();
  const navigate        = useNavigate();
  const { experiences } = useData();
  const [exp, setExp]   = useState(null);
  const [loading, setLoading] = useState(true);
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale   = useTransform(scrollY, [0, 400], [1, 1.06]);
  const heroY       = useTransform(scrollY, [0, 400], [0, 80]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setExp(experiences.find(e => e.id.toString() === id) || null);
    setLoading(false);
  }, [id, experiences]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#f5f5f7" }}>
      <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
    </div>
  );

  if (!exp) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: "#f5f5f7" }}>
      <p className="text-xl font-bold text-gray-900">Expérience introuvable</p>
      <button onClick={() => navigate(-1)} className="text-sm font-semibold text-blue-600 hover:underline">← Retour</button>
    </div>
  );

  const ts     = typeStyle(exp.type);
  const accent = exp.color || "#0071e3";
  const related = experiences.filter(e => e.id !== exp.id).slice(0, 3);
  const paras   = exp.description.split("\n\n").filter(Boolean);

  return (
    <div className="min-h-screen" style={{ background: "#f5f5f7", fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif" }}>
      <SEO
        title={`${exp.position} — ${exp.company}`}
        description={exp.description.substring(0, 160)}
        image={exp.image}
        url={`/experience/${exp.id}`}
      />

      {/* ── Nav ──────────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-12 flex items-center justify-between px-5 sm:px-10"
        style={{ background: "rgba(245,245,247,0.85)", backdropFilter: "saturate(180%) blur(20px)", WebkitBackdropFilter: "saturate(180%) blur(20px)", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: accent }}>
          <ArrowLeft size={14} /> Retour
        </button>
        <span className="text-sm font-semibold text-gray-800 hidden sm:block">{exp.company}</span>
        <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: ts.bg, color: ts.color }}>{exp.type}</span>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div ref={heroRef} className="relative h-[70vh] min-h-[520px] overflow-hidden">
        <motion.img
          src={exp.image} alt={exp.company}
          style={{ scale: heroScale, y: heroY }}
          className="absolute inset-0 w-full h-full object-cover"
          onError={e => { e.target.parentElement.style.background = `linear-gradient(135deg, ${accent}22, ${accent}08)`; e.target.style.display = "none"; }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)" }} />

        <motion.div style={{ opacity: heroOpacity }} className="absolute bottom-0 left-0 right-0 px-6 sm:px-12 pb-10 pt-20">
          <div className="max-w-[980px] mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
              className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-3">
              {exp.type} · {exp.location || exp.country} · {exp.start_date_formatted}–{exp.end_date_formatted}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
              className="font-bold text-white leading-none tracking-tight mb-2"
              style={{ fontSize: "clamp(2.6rem, 7vw, 5.5rem)", letterSpacing: "-0.02em" }}>
              {exp.company}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
              className="text-white/60 font-medium"
              style={{ fontSize: "clamp(1rem, 2.5vw, 1.4rem)" }}>
              {exp.position}
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* ── Highlights / Quick facts ──────────────────────────────────────── */}
      {exp.highlights?.length > 0 && (
        <div style={{ background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
          <div className="max-w-[980px] mx-auto px-6 sm:px-10 py-7">
            <div className="flex gap-10 sm:gap-16 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
              {exp.highlights.map((h, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.08 }}
                  className="shrink-0">
                  <p className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: accent }}>{h.value}</p>
                  <p className="text-xs text-gray-400 mt-1 font-medium">{h.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── INTRO — Apple-style large editorial text ───────────────────── */}
      <section style={{ background: "#fff" }}>
        <div className="max-w-[740px] mx-auto px-6 sm:px-10 py-20 sm:py-28">
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="text-[11px] font-semibold uppercase tracking-widest mb-5"
            style={{ color: accent }}>
            À propos
          </motion.p>
          {paras.map((p, i) => (
            <motion.p key={i}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.55 }}
              className={`leading-relaxed mb-5 last:mb-0 ${i === 0 ? "font-semibold text-gray-900" : "text-gray-500"}`}
              style={{ fontSize: i === 0 ? "clamp(1.1rem, 2vw, 1.3rem)" : "1rem" }}>
              {p}
            </motion.p>
          ))}
        </div>
      </section>

      {/* ── MISSIONS — full-width dark section ───────────────────────────── */}
      {exp.missions?.length > 0 && (
        <section style={{ background: "#1d1d1f" }}>
          <div className="max-w-[980px] mx-auto px-6 sm:px-10 py-20 sm:py-28">
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="text-[11px] font-semibold uppercase tracking-widest mb-4"
              style={{ color: accent }}>
              Missions
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}
              className="text-white font-bold tracking-tight mb-14"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}>
              Responsabilités & missions clés.
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ background: "rgba(255,255,255,0.07)" }}>
              {exp.missions.map((m, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="p-7 group"
                  style={{ background: "#1d1d1f" }}>
                  <div className="flex items-start gap-4">
                    <span className="text-[11px] font-black shrink-0 mt-0.5" style={{ color: `${accent}80` }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">{m}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SKILLS + META — light grid ────────────────────────────────────── */}
      <section style={{ background: "#f5f5f7" }}>
        <div className="max-w-[980px] mx-auto px-6 sm:px-10 py-20 sm:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

            {/* Skills */}
            {exp.technologies?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                className="rounded-3xl p-8 sm:p-10" style={{ background: "#fff" }}>
                <p className="text-[11px] font-semibold uppercase tracking-widest mb-2" style={{ color: accent }}>Compétences</p>
                <h3 className="text-xl font-bold text-gray-900 tracking-tight mb-7">Technologies & Savoir-faire</h3>
                <div className="flex flex-wrap gap-2.5">
                  {exp.technologies.map((t, i) => (
                    <motion.span key={i}
                      initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                      className="text-sm font-medium px-4 py-2 rounded-full"
                      style={{ background: "#f5f5f7", color: "#1d1d1f" }}>
                      {t}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Stats + Meta stacked */}
            <div className="flex flex-col gap-5">

              {/* Meta */}
              <motion.div
                initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08, duration: 0.5 }}
                className="rounded-3xl p-8" style={{ background: "#fff" }}>
                <p className="text-[11px] font-semibold uppercase tracking-widest mb-6" style={{ color: accent }}>Fiche de poste</p>
                <dl className="space-y-4">
                  {[
                    ["Entreprise", exp.company],
                    ["Période",    `${exp.start_date_formatted} — ${exp.end_date_formatted}`],
                    ["Durée",      exp.duration],
                    ["Lieu",       exp.location || exp.country],
                    ["Contrat",    exp.type],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between items-baseline gap-4 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                      <dt className="text-sm text-gray-400 shrink-0">{k}</dt>
                      <dd className="text-sm font-semibold text-gray-800 text-right">{v}</dd>
                    </div>
                  ))}
                </dl>
              </motion.div>

              {/* Stats */}
              {exp.stats?.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15, duration: 0.5 }}
                  className="rounded-3xl p-8 flex-1"
                  style={{ background: accent }}>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-white/50 mb-6">En résumé</p>
                  <dl className="space-y-4">
                    {exp.stats.map((s, i) => (
                      <div key={i} className="flex justify-between items-baseline pb-4 border-b border-white/10 last:border-0 last:pb-0">
                        <dt className="text-sm text-white/50">{s.label}</dt>
                        <dd className="text-sm font-bold text-white">{s.value}</dd>
                      </div>
                    ))}
                  </dl>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── RELATED ───────────────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section style={{ background: "#fff", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <div className="max-w-[980px] mx-auto px-6 sm:px-10 py-20 sm:py-24">
            <p className="text-[11px] font-semibold uppercase tracking-widest mb-2" style={{ color: accent }}>Parcours</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-10" style={{ letterSpacing: "-0.02em" }}>
              Autres expériences.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((r, i) => {
                const rs = typeStyle(r.type);
                const rc = r.color || "#0071e3";
                return (
                  <motion.button key={r.id}
                    initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    onClick={() => navigate(`/experience/${r.id}`)}
                    className="relative text-left rounded-3xl overflow-hidden group"
                    style={{ background: "#f5f5f7" }}>

                    {/* Image */}
                    <div className="relative h-40 overflow-hidden">
                      <img src={r.image} alt={r.company}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={e => { e.target.parentElement.style.background = `${rc}15`; e.target.style.display = "none"; }}
                      />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)" }} />
                      <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: rc }} />
                    </div>

                    <div className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: rs.bg, color: rs.color }}>{r.type}</span>
                        <ChevronRight size={14} className="text-gray-300 group-hover:text-gray-600 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <p className="font-bold text-sm text-gray-900 mb-1">{r.company}</p>
                      <p className="text-xs text-gray-400 line-clamp-1 mb-3">{r.position}</p>
                      <p className="text-[11px] text-gray-300">{r.start_date_formatted} — {r.end_date_formatted}</p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Footer padding */}
      <div style={{ background: "#f5f5f7", height: 60 }} />
    </div>
  );
}
