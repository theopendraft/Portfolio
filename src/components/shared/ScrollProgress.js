"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const { theme } = useTheme();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[9999] origin-left pointer-events-none"
      style={{
        scaleX,
        backgroundColor: theme === "dark" ? "#C4F047" : "#3b82f6",
      }}
    />
  );
}
