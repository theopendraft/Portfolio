"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.95 }}
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[1201] w-14 h-7 rounded-full shadow-lg flex items-center px-1 gap-1 cursor-pointer transition-colors duration-300 ${
        isDark ? "bg-[#1a1a1a] border border-[#C4F047]/30" : "bg-blue-100 border border-blue-300"
      }`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Sun — left */}
      <span className={`flex items-center justify-center w-5 h-5 rounded-full transition-colors duration-300 ${
        !isDark ? "text-yellow-500" : "text-gray-500"
      }`}>
        <SunIcon />
      </span>

      {/* Moon — right */}
      <span className={`flex items-center justify-center w-5 h-5 rounded-full transition-colors duration-300 ${
        isDark ? "text-[#C4F047]" : "text-gray-400"
      }`}>
        <MoonIcon />
      </span>

      {/* Sliding pill indicator */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`absolute w-5 h-5 rounded-full shadow-md ${
          isDark ? "bg-[#C4F047]" : "bg-blue-400"
        }`}
        style={{ left: isDark ? "calc(100% - 1.625rem)" : "0.25rem" }}
      />
    </motion.button>
  );
}
