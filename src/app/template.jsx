"use client";

import { motion } from "framer-motion";

export default function Template({ children }) {
  const pageTransition = {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
    transition: { type: "spring", stiffness: 50, damping: 20, duration: 0.5 },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      {children}
    </motion.div>
  );
}
