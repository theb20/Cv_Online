import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

const stats = [
  {
    target: 18,
    decimals: 0,
    suffix: "+",
    label: "Projets livrés",
    desc: "Sites vitrines, e-commerce, SaaS et outils internes en production.",
  },
  {
    target: 2,
    decimals: 0,
    suffix: " ans+",
    label: "Expérience Full Stack",
    desc: "Développement web professionnel, du frontend au déploiement.",
  },
  {
    target: 4.8,
    decimals: 1,
    suffix: "/5",
    label: "Satisfaction client",
    desc: "Basé sur les avis clients collectés sur mes réalisations.",
  },
  {
    target: 3,
    decimals: 0,
    suffix: "",
    label: "Domaines d'expertise",
    desc: "Développement web, design graphique et management d'entreprise.",
  },
];

function CountUp({ target, decimals = 0, suffix = "", duration = 1.4 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / 1000 / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

const KeyStats = () => {
  return (
    <section className="w-full bg-white overflow-hidden py-16 md:py-24">
      <div className="c-space">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {stats.map((stat, i) => (
            <div key={i}>
              <p className="font- text-black tracking-tight leading-none text-4xl sm:text-5xl md:text-8xl mb-4">
                <CountUp target={stat.target} decimals={stat.decimals} suffix={stat.suffix} />
              </p>
              <div className="border-t border-dotted border-black/30 mb-4" />
              <h3 className="font-bold text-black text-base md:text-lg mb-1.5">{stat.label}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyStats;
