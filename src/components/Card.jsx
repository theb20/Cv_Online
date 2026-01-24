import { motion } from "motion/react";
const Card = ({ style, text, image, containerRef, className = "" }) => {
  return image && !text ? (
    <motion.img
      className={`absolute w-15 cursor-grab ${className}`}
      src={image}
      style={style}
      whileHover={{ scale: 1.05 }}
      drag
      dragConstraints={containerRef}
      dragElastic={1}
    />
  ) : (
    <motion.div
      className={`absolute px-1 py-4 text-xl text-center rounded-full ring ring-gray-700/10 font-extralight bg-white shadow-sm w-[12rem] cursor-grab ${className}`}
      style={style}
      whileHover={{ scale: 1.05 }}
      drag
      dragConstraints={containerRef}
      dragElastic={1}
    >
      {text}
    </motion.div>
  );
};

export default Card;
