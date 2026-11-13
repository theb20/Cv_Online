import { Workflow } from "lucide-react";
import MagicBento from "@/components/MagicBento";

const cards = [
  {
    color: "#120F17",
    label: "Interface",
    title: "Frontend",
    description: "React, TypeScript, Tailwind CSS, expérience responsive et accessible.",
    image: "https://quick-pop.web.app/og-image.png",
  },
  {
    color: "#120F17",
    label: "Serveur",
    title: "Backend",
    description: "Node.js, Express, API REST, authentification JWT et gestion des rôles.",
    image: "https://digital-company.web.app/img/wall.webp",
  },
  {
    color: "#120F17",
    label: "Data",
    title: "Bases de données",
    description: "MySQL, PostgreSQL, modélisation MCD/UML et requêtes SQL optimisées.",
    image: "/assets/walls/aut10.png",
  },
  {
    color: "#120F17",
    label: "Infra",
    title: "DevOps & Hébergement",
    description: "Docker, déploiement web, configuration serveur Apache/Nginx.",
    image: "/assets/walls/aut9.png",
  },
  {
    color: "#120F17",
    label: "Workflow",
    title: "Outils & Environnement",
    description: "Git/GitHub, Figma, Firebase, Postman, VS Code au quotidien.",
    image: "/assets/walls/aut11.png",
  },
  {
    color: "#120F17",
    label: "Qualité",
    title: "Méthodes & bonnes pratiques",
    description: "Clean code, séparation front/back, sécurité applicative, SEO technique.",
    image: "/assets/walls/aut1.png",
  },
];

const ExperienceBento = () => {
  return (
    <section className="w-full overflow-hidden py-16 md:py-24" style={{ background: "#0b090e" }}>
      <div className="c-space flex flex-col items-center text-center mb-12 md:mb-16">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3.5 py-1.5 mb-6">
          <Workflow className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
          <span className="text-[11px] font-mono uppercase tracking-widest text-white">Expérience</span>
        </div>
        <h2 className="text-white tracking-tight leading-[1.05] text-4xl sm:text-5xl md:text-7xl max-w-2xl">
          Un stack complet,
          <br />
          <span className="text-neutral-500">de l'interface à la donnée.</span>
        </h2>
      </div>

      <MagicBento
        cards={cards}
        textAutoHide={true}
        enableStars={true}
        enableSpotlight={true}
        enableBorderGlow={true}
        enableTilt={true}
        enableMagnetism={true}
        clickEffect={true}
        spotlightRadius={450}
        particleCount={12}
        glowColor="255, 90, 31"
      />
    </section>
  );
};

export default ExperienceBento;
