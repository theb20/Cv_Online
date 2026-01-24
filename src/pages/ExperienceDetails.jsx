"use client";

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowLeft, Calendar, MapPin, Tag, Clock, ChevronRight, User, Share2, Bookmark, MessageSquare } from "lucide-react";
import { useData } from "../context/DataContext";
import SEO from "../components/SEO";

const ExperienceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { experiences } = useData();

  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const found = experiences.find(e => e.id.toString() === id);
    setExperience(found);
    setLoading(false);
  }, [id, experiences]);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fffbf7]">
        <div className="h-2 w-24 bg-stone-200 overflow-hidden rounded-full">
            <div className="h-full bg-stone-800 animate-progress origin-left"></div>
        </div>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-[#fcfcfc] text-neutral-900">
        <h2 className="text-4xl font-serif italic">404</h2>
        <button
          onClick={() => navigate("/")}
          className="text-xs font-serif uppercase tracking-widest border-b border-neutral-300 pb-1 hover:text-neutral-500 transition-colors"
        >
          Retour
        </button>
      </div>
    );
  }

  const wordCount = experience.description.split(' ').length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-neutral-800 font-sans selection:bg-neutral-900 selection:text-white">
        <SEO 
          title={`${experience.position} - ${experience.company}`}
          description={experience.description.substring(0, 160)}
          keywords={experience.technologies?.join(', ')}
          image={experience.image}
          url={`/experience/${experience.id}`}
        />
        
        {/* Nav - Clean & Minimal */}
        <nav className="fixed mt-10 top-0 left-0 right-0 z-50 bg-[#fcfcfc]/90 backdrop-blur-md h-20 md:h-24 flex items-center justify-between px-6 md:px-12 transition-all border-b border-transparent">
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => navigate(-1)} 
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all text-neutral-900"
                >
                    <ArrowLeft size={18} />
                </button>
            </div>
            
            <div className="flex items-center gap-4 md:gap-8 text-xs font-sans font-medium tracking-wide text-neutral-500 uppercase">
                 <span className="inline md:inline">{experience.company}</span>
                 <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 hidden md:block"></span>
                 <span className="hidden md:inline">{experience.start_date_formatted} — {experience.end_date_formatted}</span>
            </div>
        </nav>

        <main className="pt-28 md:pt-32 pb-16 md:pb-24">
            
            {/* HERO - Architectural & Asymmetric */}
            <header className="max-w-[90rem] mx-auto px-6 md:px-12 mb-16 md:mb-24 pt-8 md:pt-20">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end">
                    
                    {/* Left: Massive Title */}
                    <div className="md:col-span-8">
                         <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-block mb-6 md:mb-8 px-4 py-1.5 rounded-full border border-neutral-900/10 bg-neutral-50 text-neutral-600 text-xs md:text-sm font-sans font-medium uppercase tracking-widest"
                        >
                            {experience.position}
                        </motion.div>
                        
                        <motion.h1 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                            className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-bold text-neutral-900 tracking-tighter leading-[0.9] md:leading-[0.85] -ml-1"
                        >
                            {experience.company}
                        </motion.h1>
                    </div>

                    {/* Right: Meta Grid */}
                    <div className="md:col-span-4 md:border-l border-neutral-200 md:pl-12 pb-3 mt-8 md:mt-0">
                        <motion.div 
                             initial={{ opacity: 0 }}
                             animate={{ opacity: 1 }}
                             transition={{ delay: 0.4 }}
                             className="space-y-6 md:space-y-8"
                        >
                            <div className="grid grid-cols-2 gap-6 md:gap-8">
                                <div>
                                    <span className="block text-[10px] font-sans uppercase tracking-widest text-neutral-400 mb-2">Date</span>
                                    <span className="font-sans text-base md:text-lg font-medium text-neutral-900">{experience.start_date_formatted}</span>
                                </div>
                                <div>
                                    <span className="block text-[10px] font-sans uppercase tracking-widest text-neutral-400 mb-2">Lieu</span>
                                    <span className="font-sans text-base md:text-lg font-medium text-neutral-900">{experience.country}</span>
                                </div>
                            </div>
                            <div>
                                <span className="block text-[10px] font-sans uppercase tracking-widest text-neutral-400 mb-3">Contexte</span>
                                <p className="text-sm text-neutral-500 font-sans leading-relaxed">
                                     {experience.description.split('\n')[0]}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </header>

            {/* Visual - Full Width with Parallax feel */}
            <div className="w-full h-[50vh] md:h-[80vh] overflow-hidden mb-16 md:mb-24 relative">
                <motion.img 
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    src={experience.image} 
                    alt={experience.company}
                    className="w-full h-full object-cover grayscale-[20%] contrast-[1.1]"
                />
                 <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-end text-white/90">
                    <span className="text-xs font-sans uppercase tracking-widest">Project Gallery</span>
                    <span className="text-xs font-sans uppercase tracking-widest hidden md:inline">{experience.country}</span>
                </div>
            </div>

            {/* CONTENT GRID - Consistent Serif Typography */}
            <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
                
                {/* Sidebar - Dynamic Data */}
                <aside className="md:col-span-4 lg:col-span-3">
                    <div className="sticky top-32 space-y-12">
                        
                        <div className="space-y-4 border-t border-neutral-200 pt-4">
                             <h3 className="text-xs font-sans font-bold uppercase tracking-widest text-neutral-400">
                                 Compétences Clés
                             </h3>
                             <div className="flex flex-wrap gap-x-4 gap-y-2">
                                 {experience.technologies && experience.technologies.length > 0 ? (
                                     experience.technologies.map(tech => (
                                        <span key={tech} className="text-sm font-sans font-medium text-neutral-900 border-b border-neutral-200 pb-0.5 hover:border-neutral-900 transition-colors cursor-default">
                                            {tech}
                                        </span>
                                     ))
                                 ) : (
                                     <span className="text-sm text-neutral-400 italic">Non spécifié</span>
                                 )}
                             </div>
                        </div>

                        {/* Optional: Add a 'Share' or 'Back' explicit action if needed, or keep minimal */}
                    </div>
                </aside>

                {/* Main Content - Fully Dynamic & Scalable */}
                <article className="md:col-span-8 lg:col-span-8 lg:col-start-5 prose prose-lg prose-neutral max-w-none prose-headings:font-display prose-headings:font-bold prose-p:font-sans prose-p:text-neutral-600 prose-p:leading-loose prose-a:text-black prose-a:underline hover:prose-a:text-neutral-600 transition-colors">
                    
                    {/* Render Description Paragraphs dynamically */}
                    {experience.description.split('\n').map((paragraph, index) => (
                        paragraph.trim() && (
                            <div key={index}>
                                <p className={index === 0 ? "text-xl md:text-2xl font-display font-medium text-neutral-900 mb-8 md:mb-12 leading-normal" : "mb-6 md:mb-8"}>
                                    {paragraph}
                                </p>
                                
                                {/* Insert Stats after the first paragraph if available */}
                                {index === 0 && experience.stats && experience.stats.length > 0 && (
                                    <div className="my-12 md:my-16 py-8 md:py-12 border-y border-neutral-100">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                                            {experience.stats.map((stat, idx) => (
                                                <div key={idx} className="text-center">
                                                    <span className="block text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-2 tracking-tighter">{stat.value}</span>
                                                    <span className="text-xs font-sans uppercase tracking-widest text-neutral-500">{stat.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    ))}

                    <p className="text-sm text-neutral-400 font-sans uppercase tracking-widest text-center mt-16 md:mt-20 border-t border-neutral-100 pt-8 md:pt-12">
                        Fin de la section — {experience.company}
                    </p>

                </article>

            </div>

        </main>
    </div>
  );
};

export default ExperienceDetails;
