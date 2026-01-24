"use client";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowLeft, MapPin, Calendar, Building2 } from "lucide-react";

// Images de haute qualité pour illustrer chaque expérience
// Dans un cas réel, ces images viendraient du CMS ou du fichier data

export const Timeline = ({ data = [] }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance slide every 8 seconds if user doesn't interact
  useEffect(() => {
    if (!data || data.length === 0) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 8000);
    return () => clearInterval(timer);
  }, [currentIndex, data]);

  const nextSlide = () => {
    if (!data || data.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % data.length);
  };

  const prevSlide = () => {
    if (!data || data.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
  };

  if (!data || data.length === 0) {
    return (
      <section className="h-screen w-full flex items-center justify-center bg-neutral-900 text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-mono opacity-50">Chargement des expériences...</p>
        </div>
      </section>
    );
  }

  const currentExp = data[currentIndex];
  const nextExpIndex = (currentIndex + 1) % data.length;
  const nextExp = data[nextExpIndex];
  
  // Prepare "upcoming" cards (the next 2-3 items in the loop)
  const upcomingIndices = [
    (currentIndex + 1) % data.length,
    (currentIndex + 2) % data.length,
    (currentIndex + 3) % data.length,
  ].filter(i => i < data.length); // Safety check

  return (
    <section className="relative h-screen w-full overflow-hidden bg-neutral-900 text-white">
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-black/40 z-10" /> {/* Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
            <img
              src={data[currentIndex].image}
              alt="Background"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-50 h-full flex flex-col justify-between p-6 md:p-12 lg:px-24 lg:py-6">
        
        {/* Top Navigation / Header */}
        <div className="flex justify-between items-center">
          
          <div className="text-xs end-0 absolute me-5 font-mono opacity-50">
            {currentIndex + 1} / {data.length}
          </div>
        </div>

        {/* Main Content (Middle-Left) */}
        <div className="flex-1 flex items-center">
          <div className="max-w-2xl">
            <motion.div
              key={`text-${currentIndex}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4 text-slate-300 font-medium">
                <span className="uppercase tracking-wider text-sm">{currentExp.position}</span>
              </div>
              
              <h1 className="text-5xl md:text-8xl font-black mb-6 leading-[0.9] tracking-tighter uppercase">
                {currentExp.company}
              </h1>
              
              <p className="text-lg md:text-xl text-neutral-300 mb-8 max-w-lg leading-relaxed line-clamp-3">
                {currentExp.description}
              </p>

              <div className="flex flex-wrap gap-4 text-sm font-mono text-neutral-400">
                 <div className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
                    <Calendar className="w-4 h-4" />
                    {currentExp.start_date_formatted} - {currentExp.end_date_formatted}
                 </div>
                 <div className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
                    <MapPin className="w-4 h-4" />
                    {currentExp.country}
                 </div>
              </div>

              <button
                onClick={() => navigate(`/experience/${currentExp.id}`)}
                className="mt-8 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-neutral-200 transition-all flex items-center gap-3 group shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
              >
                <span className="uppercase tracking-wider text-sm">Voir le détail</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section: Controls & Thumbnails */}
        <div className="flex flex-col lg:flex-row items-end justify-between gap-8">
          
          {/* Controls */}
          <div className="flex items-center gap-4">
            <button 
              onClick={prevSlide}
              className="p-4 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-300 group"
            >
              <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={nextSlide}
              className="p-4 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-300 group"
            >
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            
            {/* Progress Bar */}
            <div className="hidden md:flex items-center gap-4 ml-8">
               <span className="text-sm font-mono opacity-50">0{currentIndex + 1}</span>
               <div className="w-32 h-[1px] bg-white/20 relative overflow-hidden">
                 <motion.div 
                   className="absolute inset-0 bg-blue-500"
                   initial={{ x: "-100%" }}
                   animate={{ x: "0%" }}
                   transition={{ duration: 8, ease: "linear", repeat: Infinity }}
                   key={currentIndex} // Reset animation on slide change
                 />
               </div>
               <span className="text-sm font-mono opacity-50">0{data.length}</span>
            </div>
          </div>

          {/* Thumbnails / Next Items */}
          <div className="flex gap-4 overflow-x-auto pb-2 w-full lg:w-auto mask-gradient-right min-h-[260px]">
            <AnimatePresence mode="popLayout">
              {upcomingIndices.map((idx) => {
                const item = data[idx];
                return (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, x: 100, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -50, scale: 0.9, transition: { duration: 0.3 } }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                    onClick={() => setCurrentIndex(idx)}
                    className="relative shrink-0 w-40 h-56 md:w-48 md:h-64 rounded-2xl overflow-hidden cursor-pointer group border border-white/10 hover:border-blue-500/50 transition-colors"
                  >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                    <img 
                      src={item.image} 
                      alt={item.company}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-20 bg-gradient-to-t from-black/90 to-transparent">
                      <p className="text-xs text-blue-300 mb-1 uppercase tracking-wider">{item.position}</p>
                      <p className="text-sm font-bold text-white leading-tight">{item.company}</p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};
