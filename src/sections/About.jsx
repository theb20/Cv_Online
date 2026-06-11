import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { profile } from "../data/profile";
import {
  Mail, Github, Linkedin, MapPin,
  Cpu, Wifi, Code2, Brain,
  ArrowUpRight,
} from "lucide-react";

const F_DISPLAY = `"Space Grotesk", ui-sans-serif, system-ui, sans-serif`;
const F_BODY    = `"Inter", ui-sans-serif, system-ui, sans-serif`;
const E = [0.22, 1, 0.36, 1];

const ACCENT = "#E85D04";

const JOURNEY = [
  { step: "01", icon: Cpu,    title: "Électronique",       desc: "Systèmes & matériel",           year: "2019" },
  { step: "02", icon: Wifi,   title: "Réseaux & Télécoms", desc: "Infrastructures & protocoles",  year: "2020" },
  { step: "03", icon: Code2,  title: "Web Full Stack",     desc: "React, Node.js, bases de données", year: "2022" },
  { step: "04", icon: Brain,  title: "Intelligence Artificielle", desc: "Orientation actuelle",   year: "2024", current: true },
];

const SKILLS = [
  { cat: "Frontend",   items: ["React 19", "Next.js", "TypeScript", "JavaScript ES6+", "Tailwind CSS v4", "Framer Motion", "HTML5 / CSS3"] },
  { cat: "Backend",    items: ["Node.js", "Express.js", "API REST", "JWT / Auth", "Architecture MVC", "Zod", "Rate limiting"] },
  { cat: "Base de données", items: ["MySQL", "PostgreSQL", "Prisma ORM", "Firebase Firestore", "Modélisation SQL"] },
  { cat: "DevOps",     items: ["Docker", "GitHub Actions", "Firebase Hosting", "Railway", "Git", "Vite", "Figma", "Linux"] },
];

const STATS = [
  { value: "4+",    label: "ans d'expérience" },
  { value: "30+",   label: "projets livrés" },
  { value: "2",     label: "pays, 1 timezone" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const p = profile;

  return (
    <section id="about" className="lg:px-50 px-0" style={{ background: "#FAFAF8", fontFamily: F_BODY, overflow: "hidden" }}>

      {/* ── Bloc titre éditorial ── */}
      <div ref={ref} style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 32px 0" }}>
        <motion.p
          initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: E }}
          style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: ACCENT, margin: "0 0 20px" }}
        >
          À propos
        </motion.p>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, paddingBottom: 32, borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
          

          <motion.div
            initial={{ opacity: 0, x: 16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.18, ease: E }}
            style={{ textAlign: "right" }}
            className="flex items-center justify-between w-full"
          >
            <p className="text-start" style={{ fontSize: "clamp(13px, 1.4vw, 16px)", color: "#555", maxWidth: 320, lineHeight: 1.6, margin: "0 0 12px", fontFamily: F_BODY }}>
              {p.role}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "flex-start" }}>
              <span style={{ fontSize: 12, color: "#aaa", marginLeft: 8 }}>
                <MapPin size={11} style={{ display: "inline", marginRight: 3 }} />{p.location}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Bloc bio + photo + stats ── */}
      <div style={{  margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr", gap: 48, padding: "48px 0", borderBottom: "1px solid rgba(0,0,0,0.07)", alignItems: "start" }}
          className="about-bio-grid">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.55, ease: E }}
            style={{ position: "relative" }}
          >
            <img
              src={p.heroImage} alt={p.fullname}
              style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", objectPosition: "top", borderRadius: 16, display: "block" }}
            />
            <div style={{
              position: "absolute", bottom: 12, left: 12, right: 12,
              background: "rgba(10,10,10,0.85)", backdropFilter: "blur(8px)",
              borderRadius: 10, padding: "10px 14px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: "#fff", margin: 0 }}>{p.fullname}</p>
                <p style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", margin: 0 }}>Développeur Full Stack</p>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <a href={p.github} target="_blank" rel="noopener noreferrer"
                  style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Github size={13} color="#fff" />
                </a>
                <a href={p.linkedin} target="_blank" rel="noopener noreferrer"
                  style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Linkedin size={13} color="#fff" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1, ease: E }}
          >
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#aaa", margin: "0 0 20px" }}>
              Présentation
            </p>
            <p style={{ fontSize: "clamp(15px, 1.5vw, 18px)", color: "#1a1a1a", lineHeight: 1.75, margin: "0 0 28px", fontFamily: F_DISPLAY, fontWeight: 500, letterSpacing: "-0.01em" }}>
              {p.bio}
            </p>
            <p style={{ fontSize: 13.5, color: "#666", lineHeight: 1.7, margin: "0 0 32px" }}>
              {p.philosophy.description}
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a href={`mailto:${p.email}`} style={{
                display: "flex", alignItems: "center", gap: 7,
                padding: "10px 18px", borderRadius: 10,
                background: "#0A0A0A", color: "#fff",
                fontSize: 13, fontWeight: 600, textDecoration: "none",
                fontFamily: F_BODY, transition: "background 0.18s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = ACCENT; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#0A0A0A"; }}
              >
                <Mail size={14} /> Contacter
              </a>
              <a href={p.github} target="_blank" rel="noopener noreferrer" style={{
                display: "flex", alignItems: "center", gap: 7,
                padding: "10px 18px", borderRadius: 10,
                background: "transparent", color: "#333",
                border: "1px solid rgba(0,0,0,0.12)",
                fontSize: 13, fontWeight: 600, textDecoration: "none",
                fontFamily: F_BODY,
              }}>
                <Github size={14} /> GitHub <ArrowUpRight size={12} color="#aaa" />
              </a>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2, ease: E }}
            style={{ display: "flex", flexDirection: "column", gap: 0 }}
          >
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#aaa", margin: "0 0 20px" }}>
              En chiffres
            </p>
            {STATS.map((s, i) => (
              <div key={i} style={{ padding: "20px 0", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
                <p style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 800, color: "#0A0A0A", margin: 0, fontFamily: F_DISPLAY, letterSpacing: "-0.04em" }}>
                  {s.value}
                </p>
                <p style={{ fontSize: 12, color: "#999", margin: "4px 0 0" }}>{s.label}</p>
              </div>
            ))}
            <div style={{ padding: "20px 0" }}>
              <p style={{ fontSize: 13, color: "#555", fontStyle: "italic", lineHeight: 1.5, margin: 0 }}>
                "{p.availability}"
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Parcours horizontal ── */}
      <div style={{ margin: "0 auto", padding: "48px 32px", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#aaa", margin: "0 0 32px" }}>
          Parcours
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, position: "relative" }}
          className="journey-grid">
          {/* Ligne de connexion */}
          <div style={{ position: "absolute", top: 20, left: "12.5%", right: "12.5%", height: 1, background: "rgba(0,0,0,0.1)", zIndex: 0 }} />

          {JOURNEY.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1, ease: E }}
                style={{ padding: "0 16px", position: "relative", zIndex: 1 }}
              >
                {/* Dot */}
                <div style={{
                  width: 40, height: 40, borderRadius: "50%", marginBottom: 20,
                  background: step.current ? ACCENT : "#0A0A0A",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: step.current ? `0 0 0 6px ${ACCENT}22` : "none",
                }}>
                  <Icon size={18} color="#fff" />
                </div>
                <p style={{ fontSize: 10, color: "#bbb", fontFamily: "monospace", margin: "0 0 4px" }}>
                  {step.step} — {step.year}
                </p>
                <p style={{ fontSize: 15, fontWeight: 700, color: "#0A0A0A", margin: "0 0 4px", fontFamily: F_DISPLAY, letterSpacing: "-0.02em" }}>
                  {step.title}
                </p>
                <p style={{ fontSize: 12, color: "#888", margin: 0, lineHeight: 1.4 }}>
                  {step.desc}
                </p>
                {step.current && (
                  <span style={{
                    display: "inline-block", marginTop: 8,
                    fontSize: 9, fontWeight: 800, letterSpacing: "0.1em",
                    textTransform: "uppercase", color: ACCENT,
                    background: `${ACCENT}15`, padding: "2px 8px", borderRadius: 999,
                  }}>
                    En cours
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Compétences ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 32px", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#aaa", margin: "0 0 32px" }}>
          Compétences techniques
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {SKILLS.map((group, gi) => (
            <motion.div key={gi}
              initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: gi * 0.06, ease: E }}
              style={{ display: "flex", alignItems: "flex-start", gap: 24, flexWrap: "wrap" }}
            >
              <span style={{ fontSize: 11, fontWeight: 700, color: "#bbb", width: 100, flexShrink: 0, paddingTop: 4, letterSpacing: "0.04em" }}>
                {group.cat}
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, flex: 1 }}>
                {group.items.map((skill, si) => (
                  <span key={si} style={{
                    padding: "4px 12px", borderRadius: 999,
                    fontSize: 12, fontWeight: 500, color: "#333",
                    background: "#fff", border: "1px solid rgba(0,0,0,0.1)",
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Citation philosophie ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6, ease: E }}
        style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 32px 80px", textAlign: "center" }}
      >
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#bbb", margin: "0 0 24px" }}>
          Philosophie
        </p>
        <blockquote style={{ fontSize: "clamp(18px, 2.5vw, 28px)", fontWeight: 600, color: "#0A0A0A", lineHeight: 1.5, maxWidth: 700, margin: "0 auto 16px", fontFamily: F_DISPLAY, letterSpacing: "-0.02em" }}>
          <span style={{ color: ACCENT, fontSize: "1.5em", lineHeight: 0, verticalAlign: "middle", marginRight: 6 }}>"</span>
          {p.philosophy.quote}
          <span style={{ color: ACCENT, fontSize: "1.5em", lineHeight: 0, verticalAlign: "middle", marginLeft: 6 }}>"</span>
        </blockquote>
        <p style={{ fontSize: 13, color: "#aaa", margin: 0 }}>— {p.philosophy.author}</p>
      </motion.div>

      <style>{`
        @media (max-width: 860px) {
          .about-bio-grid { grid-template-columns: 1fr !important; }
          .journey-grid   { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 520px) {
          .journey-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
