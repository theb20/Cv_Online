import { Sparkle } from "lucide-react";
import Marquee from "@/components/Marquee";
import { projects } from "../data/projects.js"

const WhoIAm = () => {
  return (
    <section className="w-full bg-white overflow-hidden ">
      <div className="c-space">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-black/5 border border-black/10 px-3.5 py-1.5 mb-6">
          <Sparkle className="w-3.5 h-3.5 text-black" strokeWidth={2.5} />
          <span className="text-[11px] font-mono uppercase tracking-widest text-black">Qui suis-je</span>
        </div>

        {/* Headline + lien */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 md:mb-16">
          <h2 className="font- text-black tracking-tight leading-[1.05] text-4xl sm:text-5xl md:text-6xl max-w-3xl">
            Des expériences digitales pensées pour être utiles, belles et performantes.
          </h2>
          <a
            href="/projects"
            className="shrink-0 text-black text-base md:text-lg font-medium underline decoration-orange-600 decoration-2 underline-offset-4 hover:text-orange-600 transition-colors whitespace-nowrap"
          >
            Démarrer un projet
          </a>
        </div>
      </div>

      {/* Images défilantes */}
      <div className="relative">
        <Marquee duration="30s" repeat={2} className="[--gap:1rem] gap-4">
          {projects.map((img, i) => (
            <div
              key={i}
              className="shrink-0 w-[220px] sm:w-[260px] md:w-[300px] h-[320px] sm:h-[380px] md:h-[400px] mx-2 rounded-2xl overflow-hidden bg-neutral-100"
            >
              <img
                src={img.image_url}
                alt={img.title}
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </div>
          ))}
        </Marquee>

      </div>
    </section>
  );
};

export default WhoIAm;
