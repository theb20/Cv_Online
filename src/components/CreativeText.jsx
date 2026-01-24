import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

const CreativeText = ({ items, className }) => {
  const [index, setIndex] = useState(0);
  const Icon = items[index].icon;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 4000); // Change every 4 seconds
    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div className={`flex flex-col w-full lg:flex-row items-center lg:gap-4 ${className}`}>
      {/* Icon Container */}
      <div className="relative flex items-center justify-center w-16 h-16 md:w-24 md:h-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, rotate: 180, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Background Glow */}
            <div className={`absolute inset-0 blur-xl opacity-50 ${items[index].color.replace("text-", "bg-")}/30`} />
            <Icon className={`w-12 h-12 md:w-20 md:h-20 ${items[index].color}`} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Text Container - Typewriter Effect */}
      <div className="relative h-10 md:h-32 flex w-full items-center justify-center lg:justify-start min-w-[300px] md:min-w-[800px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.5 }}
            className="absolute lg:left-0 text-center lg:text-left w-full"
          >
            <TypewriterText text={items[index].text} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const TypewriterText = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayedText("");
    let timeoutId;

    const typeChar = () => {
      if (i < text.length) {
        const char = text.charAt(i);
        setDisplayedText((prev) => prev + char);
        i++;
        
        // Vitesse de frappe dynamique : pause sur la ponctuation
        let delay = 50 + Math.random() * 30; // Légère variation naturelle
        if ([',', '.', '!', '?', ';', ':'].includes(char)) {
          delay = 500; // Pause marquée
        }
        
        timeoutId = setTimeout(typeChar, delay);
      }
    };

    timeoutId = setTimeout(typeChar, 100); // Petit délai initial

    return () => clearTimeout(timeoutId);
  }, [text]);

  return (
    <span className="block text-2xl sm:text-4xl text-center lg:text-left w-full md:text-7xl font-black tracking-tight text-white whitespace-normal md:whitespace-nowrap leading-tight">
      {displayedText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-1 h-8 md:h-16 ml-1 bg-white align-middle"
      />
    </span>
  );
};

export default CreativeText;
