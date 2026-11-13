import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'motion/react';
import { profile } from '../data/profile';
import { useData } from '../context/DataContext';
import SEO from '../components/SEO';
import {
  ArrowUpRight, ArrowRight, Mail, Linkedin,
} from 'lucide-react';

const INITIAL_VISIBLE = 6;

// ── Animated skill bar ──────────────────────────────────────────────────────
const SkillBar = ({ name, level, delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="group">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-neutral-700">{name}</span>
        <span className="text-xs text-neutral-400 font-mono">{level}%</span>
      </div>
      <div className="h-1 bg-black/5 rounded-full overflow-hidden">
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

const tabs = [
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'database', label: 'Bases de données' },
  { id: 'devops', label: 'DevOps' },
  { id: 'architecture', label: 'Architecture' },
];

const AboutPage = () => {
  const { experiences } = useData();
  const [activeTab, setActiveTab] = useState('frontend');
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const activeSkills = profile.skills[activeTab] || [];

  const sorted = [...experiences].sort((a, b) => b.id - a.id);
  const featured = sorted[0];
  const rest = sorted.slice(1);
  const visible = rest.slice(0, visibleCount);

  return (
    <>
      <SEO title="À propos | Frédérick Ahobaut" description={profile.bio} />

      <div className="bg-white text-neutral-900 min-h-screen font-sans">

        {/* ══════════════════════════════════════════
            FEATURED
        ══════════════════════════════════════════ */}
        <section className="max-w-6xl mx-auto px-6 md:px-10 pt-28 md:pt-32 pb-16 md:pb-20">
          <Link
            to={featured ? `/experience/${featured.id}` : '#'}
            className="group relative block w-full rounded-3xl overflow-hidden"
            style={{ minHeight: 420 }}
          >
            <img
              src={profile.heroImage}
              alt={profile.fullname}
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

            <div className="relative flex flex-col justify-end h-full min-h-[420px] p-6 md:p-10">
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/70 mb-3">Featured</span>
              <h1 className="text-3xl md:text-5xl font-black text-white leading-tight max-w-2xl mb-3">
                {profile.role}
              </h1>
              <p className="text-sm md:text-base text-white/70 max-w-xl leading-relaxed">
                {profile.bio}
              </p>
            </div>

            <span className="absolute top-6 right-6 md:top-10 md:right-10 w-11 h-11 rounded-full bg-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              <ArrowUpRight className="w-5 h-5 text-black" />
            </span>
          </Link>
        </section>

        {/* ══════════════════════════════════════════
            EXPÉRIENCES — grille façon "articles"
        ══════════════════════════════════════════ */}
        <section className="max-w-6xl mx-auto px-6 md:px-10 pb-20 md:pb-28">
          <h2 className="text-lg font-bold text-neutral-900 mb-8">Expériences récentes</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {visible.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 6) * 0.06 }}
              >
                <Link to={`/experience/${exp.id}`} className="group block">
                  <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 mb-4">
                    <img
                      src={exp.image}
                      alt={exp.company}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  </div>
                  <h3 className="font-bold text-neutral-900 text-base leading-snug mb-1.5 group-hover:text-[#E85D04] transition-colors">
                    {exp.position}
                  </h3>
                  <p className="text-sm text-neutral-500 leading-relaxed mb-4 line-clamp-2">
                    {exp.description?.split('\n')[0]}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#E85D04]/10 text-[#E85D04] text-[10px] font-bold flex items-center justify-center shrink-0">
                      {exp.company?.[0]}
                    </span>
                    <span className="text-xs text-neutral-500">
                      {exp.company} • {exp.start_date_formatted}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {visibleCount < rest.length && (
            <div className="flex justify-center mt-14">
              <button
                onClick={() => setVisibleCount((c) => c + INITIAL_VISIBLE)}
                className="px-5 py-2.5 text-sm font-semibold text-neutral-700 border border-neutral-200 rounded-full hover:border-neutral-400 hover:text-black transition-colors"
              >
                Charger plus…
              </button>
            </div>
          )}
        </section>

        {/* ══════════════════════════════════════════
            PHILOSOPHY
        ══════════════════════════════════════════ */}
        <section className="py-20 md:py-28 border-t border-black/5">
          <div className="max-w-6xl mx-auto px-6 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-br from-[#E85D04]/[0.06] via-transparent to-transparent border border-[#E85D04]/15 rounded-3xl p-8 md:p-14 overflow-hidden"
            >
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#E85D04] mb-6 block">Philosophie</span>
              <blockquote className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900 leading-tight max-w-4xl relative z-10">
                <span className="text-[#E85D04]">"</span>
                {profile.philosophy.quote}
                <span className="text-[#E85D04]">"</span>
              </blockquote>
              <p className="mt-6 text-sm text-neutral-500 font-mono">— {profile.philosophy.author}</p>
              <p className="mt-4 text-sm text-neutral-500 max-w-2xl leading-relaxed">{profile.philosophy.description}</p>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SKILLS
        ══════════════════════════════════════════ */}
        <section className="py-20 md:py-28 border-t border-black/5">
          <div className="max-w-6xl mx-auto px-6 md:px-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#E85D04]">Compétences</span>
              <h2 className="mt-2 text-3xl md:text-4xl font-black text-neutral-900">Stack technique</h2>
            </motion.div>

            <div className="flex flex-wrap gap-2 mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#E85D04] text-white'
                      : 'bg-black/[0.03] text-neutral-500 hover:bg-black/[0.06] hover:text-black border border-black/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

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
                  <div key={i} className="flex items-center gap-2 py-1.5 border-b border-black/5">
                    <span className="w-1 h-1 rounded-full bg-[#E85D04] flex-shrink-0" />
                    <span className="text-sm text-neutral-700">{skill.name || skill}</span>
                  </div>
                )
              )}
            </motion.div>

            <div className="mt-14">
              <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-4">Outils</p>
              <div className="flex flex-wrap gap-2">
                {profile.skills.tools.map((tool, i) => (
                  <span key={i} className="px-3 py-1 text-xs font-medium text-neutral-700 bg-black/[0.03] border border-black/5 rounded-xl hover:border-[#E85D04]/30 hover:text-black transition-all cursor-default">
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
        <section className="py-20 md:py-28 border-t border-black/5">
          <div className="max-w-6xl mx-auto px-6 md:px-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#E85D04]">Services</span>
              <h2 className="mt-2 text-3xl md:text-4xl font-black text-neutral-900">Ce que je peux faire pour vous</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {profile.services.map((service, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-black/[0.02] hover:bg-black/[0.04] border border-black/5 hover:border-[#E85D04]/20 rounded-2xl p-6 transition-all cursor-default"
                >
                  <span className="text-3xl font-black text-black/5 font-mono">0{i + 1}</span>
                  <h3 className="mt-3 font-bold text-neutral-900 text-base mb-2">{service.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            CTA CONTACT
        ══════════════════════════════════════════ */}
        <section className="py-20 md:py-32 border-t border-black/5">
          <div className="max-w-6xl mx-auto px-6 md:px-10 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#E85D04] mb-4">Contact</p>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-neutral-900 leading-tight mb-4">
                Travaillons<br />ensemble.
              </h2>
              <p className="text-neutral-500 max-w-md mx-auto mb-10 text-sm">
                {profile.availability}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href={`mailto:${profile.email}`}
                  className="flex items-center gap-2 px-8 py-3.5 bg-[#E85D04] hover:bg-orange-600 text-white font-bold rounded-2xl transition-all text-sm">
                  {profile.email} <ArrowRight className="w-4 h-4" />
                </a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3.5 bg-black/[0.03] hover:bg-black/[0.06] text-neutral-900 font-semibold rounded-2xl border border-black/10 transition-all text-sm">
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
