"use client";
import { motion } from "framer-motion";

export const Boat = () => {
  return (
    <>
      <motion.div
        animate={{
          y: [-5, 5, -5],
          rotate: [0, -1, 1, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut",
        }}
      >
        <img alt="Boat SVG" src="/svg/boat.svg" />
      </motion.div>
      <div className="relative bottom-4">
        <img alt="Waves SVG" src="/svg/waves.svg" />
      </div>
    </>
  );
};
