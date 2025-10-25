"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Building2, Clock, MapPin, Sparkles, ArrowUpRight } from "lucide-react";

// ✅ Timeline principale
export const Timeline = ({ data = [] }) => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // 🎯 Détection fluide de la carte active avec IntersectionObserver
  useEffect(() => {
    const cards = containerRef.current?.querySelectorAll(".experience-card");
    if (!cards || cards.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          const index = Array.from(cards).indexOf(visible[0].target);
          setActiveIndex(index);
        }
      },
      {
        root: null,
        threshold: [0.25, 0.5, 0.75],
      }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [data]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen  lg:px-20 px-6 scroll-smooth"
    >
      {/* --- Background animé --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />
      <div className="absolute top-40 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse delay-1000" />

      <div className="relative z-10 max-w-7xl mx-auto py-20">
        {/* --- Header --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-32"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <span className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-full border border-blue-500/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-blue-400 animate-spin-slow" />
              <span className="text-sm font-medium bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Mon Parcours Professionnel
              </span>
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-8xl font-black mb-6">
            <span className="block bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Expériences
            </span>
            <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              & Réalisations
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Une chronologie de mon évolution professionnelle et de mes contributions.
          </p>
        </motion.div>

        {/* --- Liste des expériences --- */}
        {data.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full" />
              <div className="absolute inset-0 border-4 border-t-blue-500 rounded-full animate-spin" />
            </div>
            <p className="text-gray-400 text-lg">Chargement des expériences...</p>
          </div>
        ) : (
          <div className="space-y-32">
            {data.map((item, index) => (
              <ExperienceCard
                key={index}
                item={item}
                index={index}
                isActive={activeIndex === index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ✅ Carte d'expérience
const ExperienceCard = ({ item, index, isActive }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px", amount: 0.3 });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 0.8 }}
      className={`experience-card relative ${isEven ? "lg:pr-20" : "lg:pl-20"}`}
    >
      <div
        className={`grid lg:grid-cols-2 gap-8 items-center ${
          isEven ? "" : "lg:grid-flow-dense"
        }`}
      >
        {/* --- Colonne infos --- */}
        <div className={`relative ${isEven ? "lg:order-1" : "lg:order-2"}`}>
          <motion.div
            animate={isActive ? { scale: 1.05 } : { scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            {/* Grand numéro */}
            <div className="absolute -top-16 -left-4 lg:-left-16 text-[180px] lg:text-[240px] font-black opacity-5 select-none">
              {String(index + 1).padStart(2, "0")}
            </div>

            {/* Badge date */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="inline-flex items-center gap-3 px-6 py-3 mb-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-xl rounded-2xl border border-blue-500/30 shadow-xl"
            >
              <Clock className="w-5 h-5 text-blue-400" />
              <span className="text-lg font-bold text-white">
                {item.start_date_formatted} – {item.end_date_formatted || "Présent"}
              </span>
            </motion.div>

            {/* Logo société */}
            <motion.div
              whileHover={{ rotate: 5, scale: 1.05 }}
              className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/50"
            >
              <Building2 className="w-10 h-10 text-white" />
            </motion.div>

            {/* Nom + Poste */}
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
              {item.company}
            </h2>
            <h3 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              {item.position}
            </h3>

            {item.country && (
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>{item.country}</span>
              </div>
            )}
          </motion.div>
        </div>

        {/* --- Colonne contenu --- */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`relative group ${isEven ? "lg:order-2" : "lg:order-1"}`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-2xl rounded-3xl p-8 lg:p-12 border border-gray-800 group-hover:border-blue-500/50 transition-all duration-500 overflow-hidden">
            {/* Overlay décoratif */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.1),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative z-10">
              <div className="space-y-4 mb-6">
                {item.description?.split("\n").map((line, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: idx * 0.1 + 0.2 }}
                    className="text-gray-300 text-lg leading-relaxed"
                  >
                    {line}
                  </motion.p>
                ))}
              </div>

              {/* Bouton */}
              <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300"
              >
                <span>En savoir plus</span>
                <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Ligne de connexion */}
      {index > 0 && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-blue-500 to-transparent origin-top"
        />
      )}
    </motion.div>
  );
};
