import CreativeText from "./CreativeText";
import { motion } from "motion/react";
import { FaLaptopCode, FaRocket, FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { MdDesignServices } from "react-icons/md";
import { SiReact } from "react-icons/si";

const HeroText = () => {
  const items = [
    { text: "Développeur Full Stack", icon: FaLaptopCode, color: "text-blue-500" },
    { text: "Designer UI/UX", icon: MdDesignServices, color: "text-purple-500" },
    { text: "Développeur React & Next.js", icon: SiReact, color: "text-cyan-400" },
    { text: "Développeur Freelance", icon: FaRocket, color: "text-orange-500" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] } 
    },
  };

  return (
    <motion.div 
      className="relative z-10 flex flex-col justify-center w-full max-w-6xl mx-auto px-1 md:px-0 mt-0 md:mt-32"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      

        {/* Name - Massive & Clean */}
        <motion.h1 
            variants={itemVariants}
            className="text-[4.5rem] text-center lg:text-left sm:text-[6rem] md:text-[8rem] lg:text-[9rem] font-black text-white tracking-tighter mb-6 leading-[0.9]"
        >
            FRÉDÉRICK <br className="lg:block hidden"/>
            <span className="text-[3.5rem] sm:text-[6rem] md:text-[8rem] lg:text-[9rem] text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 via-white to-neutral-400">
                AHOBAUT
            </span>
        </motion.h1>

        {/* Dynamic Role */}
        <motion.div variants={itemVariants} className="mb-8 md:mb-12 w-full h-20 md:h-24 flex items-center">
            <CreativeText items={items} />
        </motion.div>

        {/* Description & Bio */}
        <motion.p 
            variants={itemVariants}
            className="text-white text-center lg:text-left text-lg md:text-2xl font-light max-w-2xl leading-relaxed mb-10 md:mb-14"
        >
            Je transforme des idées complexes en interfaces web fluides et performantes. 
            Spécialisé dans l'écosystème <span className="text-white font-medium">React</span> et le design minimaliste.
        </motion.p>

        {/* Actions & Socials */}
        <motion.div 
            variants={itemVariants} 
            className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8"
        >
            <div className="flex items-center gap-4 w-full md:w-auto">
                <a href="#projects" className="flex-1 md:flex-none px-8 whitespace-nowrap py-4 bg-white text-black font-bold text-sm md:text-base rounded-full hover:bg-neutral-200 transition-all transform hover:scale-105 active:scale-95 text-center">
                   Voir mes projets
                </a>
                <a href="#contact" className="flex-1 md:flex-none whitespace-nowrap px-8 py-4 border border-white/20 text-white font-medium text-sm md:text-base rounded-full hover:bg-white/10 transition-all hover:border-white/40 text-center">
                   Me contacter
                </a>
            </div>

            {/* Divider (Desktop only) */}
            <div className="hidden md:block w-px h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent mx-2"></div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
                <SocialLink href="https://github.com" icon={<FaGithub size={22}/>} label="GitHub" />
                <SocialLink href="https://linkedin.com" icon={<FaLinkedin size={22}/>} label="LinkedIn" />
                <SocialLink href="mailto:contact@example.com" icon={<FaEnvelope size={22}/>} label="Email" />
            </div>
        </motion.div>

    </motion.div>
  );
};

// Helper Component for Social Links
const SocialLink = ({ href, icon, label }) => (
    <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label={label}
        className="p-3 bg-white/5 border border-white/5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
    >
        {icon}
    </a>
);

export default HeroText;
