"use client";
import React, { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

export const FlipWords = ({ words, duration = 3000, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextWord = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % words.length);
  }, [words.length]);

  useEffect(() => {
    const timer = setTimeout(() => {
      nextWord();
    }, duration);

    return () => clearTimeout(timer); // nettoie le timer pour éviter les fuites
  }, [currentIndex, duration, nextWord]);

  return (
    <div className={twMerge("relative inline-block", className)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center"
        >
          {words[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
