"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-zinc-950 select-none"
        >
          {/* Name - slides up from below */}
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl font-bold tracking-[0.05em] uppercase text-white"
              style={{ fontFamily: "var(--font-haffer), 'Haffer', sans-serif" }}
            >
              Pankaj Yadav
            </motion.p>
          </div>

          {/* Role - fades in slightly after */}
          <div className="overflow-hidden mt-2">
            <motion.p
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="text-xs uppercase tracking-[0.32em] text-zinc-500 text-center"
            >
              Full-Stack Software Engineer
            </motion.p>
          </div>

          {/* Progress bar sweeps from left */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-[#C4F047]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
