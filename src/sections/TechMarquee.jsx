import { Asterisk } from "lucide-react";
import Marquee from "@/components/Marquee";

const logos = [
  { name: "React", src: "/assets/logos_/react.svg" },
  { name: "Tailwind CSS", src: "/assets/logos_/tailwindcss.svg" },
  { name: "Node.js", src: "/assets/logos_/nodejs.svg" },
  { name: "JavaScript", src: "/assets/logos_/javascript.svg" },
  { name: "Express.js", src: "/assets/logos_/expressjs.svg" },
  { name: "MySQL", src: "/assets/logos_/mysql.svg" },
  { name: "Git", src: "/assets/logos_/git.svg" },
  { name: "GitHub", src: "/assets/logos_/github.svg" },
  { name: "Figma", src: "/assets/logos_/figma.svg" },
  { name: "Vite", src: "/assets/logos_/vitejs.svg" },
  { name: "Framer Motion", src: "/assets/logos_/framer-motion.svg" },
];

const TechMarquee = () => {
  return (
    <section className="w-full bg-white  overflow-hidden">
      <div className="flex items-center justify-between">
        {/* Stat / accroche */}
        <div className="hidden md:flex items-center gap-3 shrink-0 max-w-[360px] px-6 lg:px-10 lg:py-8">
          <Asterisk className="w-15 h-15  text-black shrink-0" strokeWidth={1.5} />
          <p className="text-[11px] font-mono uppercase tracking-wide text-black leading-snug">
            18+ projets réalisés en full stack, design &amp; automatisation.
          </p>
        </div>

        {/* Logos défilants */}
        <div className="relative flex-1 py-6 min-w-0">
          <Marquee pauseOnHover repeat={2}>
            {logos.map((logo) => (
              <div
                key={logo.name}
                className="flex items-center gap-2.5 mx-8 shrink-0 opacity-60 hover:opacity-100 transition-opacity"
              >
                <img src={logo.src} alt="" className="h-13 w-13 object-contain" />
                <span className="font-bold text-black text-[19px] whitespace-nowrap">{logo.name}</span>
              </div>
            ))}
          </Marquee>

          {/* Fondus sur les bords pour un défilement propre */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 md:w-20 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 md:w-20 bg-gradient-to-l from-white to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default TechMarquee;
