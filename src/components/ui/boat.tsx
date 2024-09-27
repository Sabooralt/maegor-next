"use client";
import { motion } from "framer-motion";
import Image from "next/image";

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
        <Image
          width={0}
          height={0}
          fetchPriority="high"
          alt="Boat SVG"
          className="size-full"
          src="/svg/boat.svg"
        />
      </motion.div>
      <div className="relative bottom-4">
        <Image
          width={0}
          height={0}
          fetchPriority="high"
          alt="Waves SVG"
          className="size-full"
          src="/svg/waves.svg"
        />
      </div>
    </>
  );
};
