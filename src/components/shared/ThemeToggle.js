"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

/**
 * ThemeToggle - persistent dark/light toggle, rendered in the root layout
 * so it stays visible on every page (home, about, projects, blogs, etc.)
 */
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.95 }}
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[1201] w-9 h-5 rounded-full shadow-lg flex items-center transition-all duration-300 cursor-pointer ${
        theme === "dark"
          ? "bg-[#C4F047] justify-end"
          : "bg-blue-400 justify-start"
      }`}
      aria-label="Toggle theme"
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="w-3 h-3 bg-white rounded-full shadow-md mx-1"
      />
    </motion.button>
  );
}
