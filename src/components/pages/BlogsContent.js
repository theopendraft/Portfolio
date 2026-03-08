"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import MagneticButton from "@/components/shared/MagneticButton";
import { useCursor } from "@/hooks/useCursor";
import { PenLine, ArrowUpRight } from "lucide-react";

export default function BlogsContent() {
  const { theme } = useTheme();
  const { setCursorType, resetCursor } = useCursor();
  const isDark = theme === "dark";

  return (
    <main
      className={`min-h-screen flex flex-col items-center justify-center px-6 transition-colors duration-500 ${
        isDark ? "bg-transparent" : "bg-gray-50"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-xl"
      >
        {/* Icon */}
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8 ${
            isDark ? "bg-zinc-800" : "bg-gray-200"
          }`}
        >
          <PenLine
            size={28}
            className={isDark ? "text-[#C4F047]" : "text-blue-500"}
          />
        </div>

        {/* Label */}
        <p
          className={`text-xs uppercase tracking-[0.3em] font-medium mb-4 ${
            isDark ? "text-zinc-500" : "text-gray-400"
          }`}
        >
          Writing
        </p>

        {/* Heading */}
        <h1
          className={`text-5xl sm:text-6xl font-bold leading-none tracking-tight mb-6 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
          style={{ fontFamily: "'Haffer', sans-serif", letterSpacing: "-0.03em" }}
        >
          BLOGS
        </h1>

        {/* Sub */}
        <p
          className={`text-base leading-relaxed mb-10 ${
            isDark ? "text-zinc-400" : "text-gray-600"
          }`}
        >
          Writing on full-stack engineering, system design, and lessons from
          building production software. First post coming soon.
        </p>

        {/* Accent bar */}
        <div
          className={`h-1 w-12 rounded-full mx-auto mb-10 ${
            isDark ? "bg-[#C4F047]" : "bg-blue-500"
          }`}
        />

        {/* CTA back to work */}
        <MagneticButton>
          <a
            href="/projects"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 font-semibold text-sm uppercase tracking-wider transition-all duration-300 cursor-none ${
              isDark
                ? "border-zinc-700 text-white hover:border-[#C4F047] hover:text-[#C4F047]"
                : "border-gray-300 text-gray-800 hover:border-blue-500 hover:text-blue-500"
            }`}
            onMouseEnter={() => setCursorType("active")}
            onMouseLeave={resetCursor}
          >
            See my projects instead
            <ArrowUpRight size={14} />
          </a>
        </MagneticButton>
      </motion.div>
    </main>
  );
}
