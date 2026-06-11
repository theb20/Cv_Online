import { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { profile } from '../data/profile';
import SEO from '../components/SEO';
import {
  ArrowUpRight, Mail, Github, Linkedin, MapPin,
  Cpu, Wifi, Code2, Brain, Download,
  ExternalLink, ChevronRight
} from 'lucide-react';

// ── Animated skill bar ──────────────────────────────────────────────────────
const SkillBar = ({ name, level, delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="group">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-slate-300">{name}</span>
        <span className="text-xs text-slate-500 font-mono">{level}%</span>
      </div>
      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#E85D04] to-orange-400 rounded-full"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 0.8, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

// ── Journey steps ────────────────────────────────────────────────────────────
const journey = [
  { step: '01', icon: Cpu,   year: '2019–2020', title: 'Électronique',         desc: 'Systèmes embarqués, composants, rigueur technique.', active: false },
  { step: '02', icon: Wifi,  year: '2020–2022', title: 'Réseaux & Télécoms',   desc: 'Infrastructures filaires, Wi-Fi, protocoles réseau.', active: false },
  { step: '03', icon: Code2, year: '2022–2024', title: 'Web Full Stack',        desc: 'React, Node.js, bases de données, mise en production.', active: false },
  { step: '04', icon: Brain, year: '2024 →',    title: 'Intelligence Artificielle', desc: "Intégration d'IA, automatisation, agents conversationnels.", active: true },
];

// ── Skill tabs ───────────────────────────────────────────────────────────────
const tabs = [
  { id: 'frontend',     label: 'Frontend',   key: 'frontend'     },
  { id: 'backend',      label: 'Backend',    key: 'backend'      },
  { id: 'database',     label: 'Bases de données', key: 'database' },
  { id: 'devops',       label: 'DevOps',     key: 'devops'       },
  { id: 'architecture', label: 'Architecture', key: 'architecture' },
];

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState('frontend');
  const activeSkills = profile.skills[activeTab] || [];

  return (
    <>
      <SEO title="À propos | Frédérick Ahobaut" description={profile.bio} />

      <div className="bg-[#080C14] text-white min-h-screen font-sans">

        {/* ══════════════════════════════════════════
            HERO
        ══════════════════════════════════════════ */}
        <section className="relative min-h-screen flex flex-col overflow-hidden">

          {/* Background grid */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

          {/* Orange glow */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E85D04]/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative flex-1 flex flex-col md:flex-row items-center max-w-7xl mx-auto px-6 md:px-12 lg:px-20 w-full py-20 gap-12">

            {/* Left — Text */}
            <div className="flex-1 flex flex-col justify-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-[0.2em]">Disponible</span>
                  <span className="text-slate-600 mx-2">·</span>
                  <span className="flex items-center gap-1 text-xs text-slate-400"><MapPin className="w-3 h-3" />{profile.location}</span>
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1] mb-6">
                  Frédérick<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E85D04] to-orange-300">Ahobaut</span>
                </h1>

                <p className="text-lg md:text-xl text-slate-400 font-medium mb-2">
                  {profile.role}
                </p>
                <p className="text-sm text-slate-500 max-w-md leading-relaxed mb-8">
                  {profile.bio}
                </p>

                <div className="flex flex-wrap gap-3">
                  <a href={`mailto:${profile.email}`}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#E85D04] hover:bg-orange-500 text-white text-sm font-semibold rounded-xl transition-all">
                    <Mail className="w-4 h-4" /> Me contacter
                  </a>
                  <a href={profile.github} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold rounded-xl border border-white/10 transition-all">
                    <Github className="w-4 h-4" /> GitHub
                  </a>
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold rounded-xl border border-white/10 transition-all">
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Right — Portrait */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative flex-shrink-0"
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                {/* Orange ring */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#E85D04]/40 to-transparent blur-xl" />
                <img
                  src={profile.heroImage}
                  alt={profile.fullname}
                  className="relative w-full h-full object-cover object-top rounded-3xl ring-1 ring-white/10"
                />
                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-4 bg-[#111827] border border-white/10 rounded-2xl px-4 py-2 shadow-xl">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider">Stack</p>
                  <p className="text-sm font-bold text-white">React · Node.js · IA</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            className="relative flex justify-center pb-8"
          >
            <div className="flex flex-col items-center gap-2 text-slate-600">
              <div className="w-px h-12 bg-gradient-to-b from-transparent to-slate-600" />
              <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
            </div>
          </motion.div>
        </section>

        {/* ══════════════════════════════════════════
            PARCOURS
        ══════════════════════════════════════════ */}
        <section className="py-20 md:py-28 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#E85D04]">Parcours</span>
              <h2 className="mt-2 text-3xl md:text-4xl font-black">Une progression logique</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {journey.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`relative p-6 rounded-2xl border transition-all ${
                      step.active
                        ? 'bg-gradient-to-br from-[#E85D04]/15 to-[#E85D04]/5 border-[#E85D04]/30'
                        : 'bg-white/[0.03] border-white/[0.06] hover:border-white/10'
                    }`}
                  >
                    {step.active && (
                      <span className="absolute top-4 right-4 text-[9px] font-bold text-[#E85D04] bg-[#E85D04]/15 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Actuel
                      </span>
                    )}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${step.active ? 'bg-[#E85D04]' : 'bg-white/5'}`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-[10px] font-mono text-slate-500 mb-1">{step.step} — {step.year}</p>
                    <h3 className="font-bold text-white text-sm mb-2">{step.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                    {i < journey.length - 1 && (
                      <ChevronRight className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/10 z-10" />
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Story */}
            <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {profile.story.slice(0, 2).map((para, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex gap-4"
                >
                  <span className="text-3xl font-black text-white/5 font-mono leading-none mt-1 flex-shrink-0">
                    0{i + 1}
                  </span>
                  <p className="text-sm text-slate-400 leading-loose">{para}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            PHILOSOPHY
        ══════════════════════════════════════════ */}
        <section className="py-20 md:py-28 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-br from-[#E85D04]/10 via-transparent to-transparent border border-[#E85D04]/20 rounded-3xl p-8 md:p-14 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#E85D04]/10 rounded-full blur-[80px] pointer-events-none" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#E85D04] mb-6 block">Philosophie</span>
              <blockquote className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight max-w-4xl relative z-10">
                <span className="text-[#E85D04]">"</span>
                {profile.philosophy.quote}
                <span className="text-[#E85D04]">"</span>
              </blockquote>
              <p className="mt-6 text-sm text-slate-400 font-mono">— {profile.philosophy.author}</p>
              <p className="mt-4 text-sm text-slate-400 max-w-2xl leading-relaxed">{profile.philosophy.description}</p>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SKILLS
        ══════════════════════════════════════════ */}
        <section className="py-20 md:py-28 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#E85D04]">Compétences</span>
              <h2 className="mt-2 text-3xl md:text-4xl font-black">Stack technique</h2>
            </motion.div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#E85D04] text-white'
                      : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Skill bars grid */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5"
            >
              {Array.isArray(activeSkills) && activeSkills.map((skill, i) =>
                typeof skill === 'object' && skill.level ? (
                  <SkillBar key={i} name={skill.name} level={skill.level} delay={i * 0.04} />
                ) : (
                  <div key={i} className="flex items-center gap-2 py-1.5 border-b border-white/5">
                    <span className="w-1 h-1 rounded-full bg-[#E85D04] flex-shrink-0" />
                    <span className="text-sm text-slate-300">{skill.name || skill}</span>
                  </div>
                )
              )}
            </motion.div>

            {/* Tools pills */}
            <div className="mt-14">
              <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-4">Outils</p>
              <div className="flex flex-wrap gap-2">
                {profile.skills.tools.map((tool, i) => (
                  <span key={i} className="px-3 py-1 text-xs font-medium text-slate-300 bg-white/5 border border-white/5 rounded-xl hover:border-[#E85D04]/30 hover:text-white transition-all cursor-default">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SERVICES
        ══════════════════════════════════════════ */}
        <section className="py-20 md:py-28 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#E85D04]">Services</span>
              <h2 className="mt-2 text-3xl md:text-4xl font-black">Ce que je peux faire pour vous</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {profile.services.map((service, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-[#E85D04]/20 rounded-2xl p-6 transition-all cursor-default"
                >
                  <span className="text-3xl font-black text-white/5 font-mono">0{i + 1}</span>
                  <h3 className="mt-3 font-bold text-white text-base mb-2">{service.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            CTA CONTACT
        ══════════════════════════════════════════ */}
        <section className="py-20 md:py-32 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#E85D04] mb-4">Contact</p>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-4">
                Travaillons<br/>ensemble.
              </h2>
              <p className="text-slate-400 max-w-md mx-auto mb-10 text-sm">
                {profile.availability}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href={`mailto:${profile.email}`}
                  className="flex items-center gap-2 px-8 py-3.5 bg-[#E85D04] hover:bg-orange-500 text-white font-bold rounded-2xl transition-all text-sm">
                  {profile.email} <ArrowUpRight className="w-4 h-4" />
                </a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-2xl border border-white/10 transition-all text-sm">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  );
};

export default AboutPage;
