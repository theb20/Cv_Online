import { useRef } from "react";
import { motion } from "motion/react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { DiCode } from "react-icons/di";
import { profile } from "@/data/profile";

// ─────────────────────────────────────────────────────────────────────────
// ANCIEN HERO — nom géant + astronaute 3D animé + fond parallax de mockups.
// Conservé ici en commentaire pour pouvoir revenir en arrière facilement.
// ─────────────────────────────────────────────────────────────────────────
//
// import { Canvas, useFrame } from "@react-three/fiber";
// import HeroText from "../components/HeroText";
// import ParallaxBackground from "../components/parallaxBackground";
// import { Astronaut } from "../components/Astronaut";
// import { Float } from "@react-three/drei";
// import { useMediaQuery } from "react-responsive";
// import { easing } from "maath";
// import { Suspense } from "react";
// import Loader from "../components/Loader";
//
// const HeroOld = () => {
//   const isSmall = useMediaQuery({ maxWidth: 639 });
//   const isTablet = useMediaQuery({ minWidth: 640, maxWidth: 1023 });
//   const prefersReducedMotion = useMediaQuery({
//     query: "(prefers-reduced-motion: reduce)",
//   });
//
//   const astronautScale = isSmall ? 0.18 : 0.3;
//   const astronautPosition = isSmall ? [0, -2.5, 0] : [2.6, -0.5, 0];
//   const showAstronaut = !prefersReducedMotion && !isTablet;
//
//   return (
//     <section id="hero" className="relative flex flex-col items-center justify-start pt-24 md:pt-0 md:justify-start min-h-dvh w-full z-10 overflow-hidden c-space">
//         <HeroText />
//         <ParallaxBackground />
//         {showAstronaut && (
//           <figure className="absolute inset-0 z-0" style={{ width: "100%", height: "100%" }}>
//             <Canvas camera={{ position: [0, 1, 3] }}>
//               <Suspense fallback={<Loader />}>
//                 <Float speed={4} rotationIntensity={1} floatIntensity={2}>
//                   <Astronaut scale={astronautScale} position={astronautPosition} />
//                 </Float>
//                 <Rig />
//               </Suspense>
//             </Canvas>
//           </figure>
//         )}
//     </section>
//   );
// };
//
// function Rig() {
//   return useFrame((state, delta) => {
//     easing.damp3(
//       state.camera.position,
//       [state.mouse.x / 10, 1 + state.mouse.y / 10, 3],
//       0.5,
//       delta
//     );
//   });
// }

// ─────────────────────────────────────────────────────────────────────────
// NOUVEAU HERO — inspiré du template "Stodio" : photo sombre en fond, badge,
// gros titre (nom conservé), sous-titre, bandeau meta et bloc CTA en bas.
// ─────────────────────────────────────────────────────────────────────────

const Hero = () => {
  const containerRef = useRef(null);

  // Timeline d'entrée GSAP : titre, sous-titre et boutons CTA en cascade.
  // Scopée au conteneur du Hero pour que useGSAP nettoie correctement les
  // tweens au démontage (important sous React StrictMode, qui monte/démonte
  // chaque composant deux fois en dev).
  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Si l'utilisateur a demandé moins d'animations, on laisse le contenu
    // tel quel (déjà visible dans le DOM) et on ne joue rien.
    if (prefersReducedMotion) return;

    const targets = gsap.utils.toArray(".hero-title, .hero-subtitle, .hero-cta");

    gsap.set(targets, { opacity: 0, y: 24 });
    gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.15,
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="p-6 w-full">
      <section
        id="hero"
        className="relative w-full h-[910px] overflow-hidden flex flex-col z-10 rounded-4xl"
      >
        {/* Fond photo sombre + overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={profile.heroImage}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/70 to-black/90" />
        </div>

        {/* Contenu principal */}
        <div className="relative z-10 flex-1 flex flex-col justify-center c-space pt-28 pb-16 md:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] }}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-white backdrop-blur-md border border-white/15 px-4 py-1.5 mb-6"
          >
            <span className="relative">
              <DiCode size={24} color="#000"/>
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-black">
              Frédérick Ahobaut
            </span>
          </motion.div>

          <h1
            className="hero-title font- text-white tracking-tighter leading-[0.9] text-[3.1rem] min-[400px]:text-[3.6rem] sm:text-[6rem] md:text-[8rem] lg:text-[6rem]"
          >
            Full Stack Engineer
            <br />
            & Product Builder
          </h1>

          <p
            className="hero-subtitle mt-6 max-w-xl text-white/70 text-base md:text-lg font-light leading-relaxed"
          >
            Je conçois et développe des produits numériques qui résolvent des problèmes précis. Passionné par React, TypeScript, Node.js et l’architecture logicielle, <span className="text-white font-medium">je transforme des idées en solutions idéals, évolutives et centrées sur l’utilisateur </span> . Mon ambition est de bâtir des technologies qui créent un impact durable.
          </p>
        </div>

        {/* Bandeau bas : meta (gauche) + tagline & CTA (droite) */}
        <div className="relative z-10 c-space pb-8 md:pb-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          {/* Meta strip */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[19px] uppercase tracking-widest text-white/45 font-medium">
            <span>+ Full Stack</span>
            <span>+ Depuis 2024</span>
            <span>+ Paris, France</span>
            <div className="flex items-center gap-3 ml-1">
              <SocialIcon href="https://github.com/theb20" icon={<FaGithub size={25} />} label="GitHub" />
              <SocialIcon href="https://www.linkedin.com/in/fr%C3%A9d%C3%A9rick-ahobaut-b85301322/" icon={<FaLinkedin size={25} />} label="LinkedIn" />
              <SocialIcon href="mailto:frederick@ahobaut.fr" icon={<FaEnvelope size={25} />} label="Email" />
            </div>
          </div>

          {/* Tagline + CTA */}
          <div className="max-w-[400px]  lg:text-right">

            <p className="text-white text-left lg:text-[25px] leading-[1.2] md:text-base mb-4">
              Outils sur mesure pour indépendants et PME.
            </p>
            <div className="hero-cta flex items-center gap-3 lg:justify-start">
              <a
                href="#projects"
                className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm rounded-full transition-all duration-300 ease-out transform hover:scale-105 active:scale-95 whitespace-nowrap hover:rounded-2xl"
              >
                Voir mes projets
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border border-white/25 text-white font-medium text-sm rounded-full hover:bg-white/10 hover:border-white/40 transition-all duration-300 ease-out transform hover:scale-105 active:scale-95 whitespace-nowrap hover:rounded-2xl"
              >
                Me contacter
              </a>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

const SocialIcon = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="text-white/50 hover:text-white transition-colors"
  >
    {icon}
  </a>
);

export default Hero;
