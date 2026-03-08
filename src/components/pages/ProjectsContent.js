"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { useCursor } from "@/hooks/useCursor";
import MagneticButton from "@/components/shared/MagneticButton";
import { featuredProjects } from "@/data/projects";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";

const FILTERS = ["All", "Live Product", "Open Source"];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function ProjectsContent() {
  const { theme } = useTheme();
  const { setCursorType, resetCursor } = useCursor();
  const [activeFilter, setActiveFilter] = useState("All");

  const isDark = theme === "dark";

  const filtered =
    activeFilter === "All"
      ? featuredProjects
      : featuredProjects.filter((p) => p.badge === activeFilter);

  const accentColor = isDark ? "#C4F047" : "#3b82f6";

  return (
    <main
      className={`min-h-screen pt-38 pb-24 transition-colors duration-500 ${
        isDark ? "bg-transparent" : "bg-gray-50"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-8">

        {/* Header */}
        <motion.div {...fadeUp(0.1)} className="mb-14">
          <p
            className={`text-xs uppercase tracking-[0.3em] font-medium mb-3 ${
              isDark ? "text-zinc-500" : "text-gray-400"
            }`}
          >
            Selected Work
          </p>
          <h1
            className={`text-5xl sm:text-6xl lg:text-7xl font-bold leading-none tracking-tight ${
              isDark ? "text-white" : "text-blue-500"
            }`}
            style={{ fontFamily: "'Haffer', sans-serif", letterSpacing: "-0.03em" }}
          >
            PROJECTS
          </h1>
          <p
            className={`mt-5 text-base leading-relaxed max-w-xl ${
              isDark ? "text-zinc-400" : "text-gray-600"
            }`}
          >
            Production systems and open-source tools built with React, Node.js,
            and PostgreSQL - each solving a real problem at scale.
          </p>
        </motion.div>

        {/* Filter Pills */}
        <motion.div {...fadeUp(0.2)} className="flex flex-wrap gap-2 mb-12">
          {FILTERS.map((f) => {
            const isActive = activeFilter === f;
            return (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                onMouseEnter={() => setCursorType("hover")}
                onMouseLeave={resetCursor}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all duration-200 cursor-none ${
                  isActive
                    ? isDark
                      ? "bg-[#C4F047] text-black border-[#C4F047]"
                      : "bg-blue-500 text-white border-blue-500"
                    : isDark
                    ? "bg-transparent text-zinc-400 border-zinc-700 hover:border-zinc-500"
                    : "bg-transparent text-gray-500 border-gray-300 hover:border-gray-400"
                }`}
              >
                {f}
              </button>
            );
          })}
        </motion.div>

        {/* Project Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6"
          >
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                isDark={isDark}
                accentColor={accentColor}
                setCursorType={setCursorType}
                resetCursor={resetCursor}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* GitHub CTA */}
        <motion.div {...fadeUp(0.5)} className="mt-16 text-center">
          <p
            className={`text-sm mb-5 ${
              isDark ? "text-zinc-500" : "text-gray-500"
            }`}
          >
            More experiments and contributions live on GitHub
          </p>
          <MagneticButton>
            <a
              href="https://github.com/theopendraft"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 font-semibold text-sm uppercase tracking-wider transition-all duration-300 cursor-none ${
                isDark
                  ? "border-zinc-700 text-white hover:border-[#C4F047] hover:text-[#C4F047]"
                  : "border-gray-300 text-gray-800 hover:border-blue-500 hover:text-blue-500"
              }`}
              onMouseEnter={() => setCursorType("active")}
              onMouseLeave={resetCursor}
            >
              <Github size={15} />
              More on GitHub
              <ArrowUpRight size={14} />
            </a>
          </MagneticButton>
        </motion.div>
      </div>
    </main>
  );
}

function ProjectCard({ project, index, isDark, setCursorType, resetCursor }) {
  const [hovered, setHovered] = useState(false);

  const badgeColor =
    project.badge === "Live Product"
      ? isDark
        ? "bg-[#C4F047]/10 text-[#C4F047] border-[#C4F047]/30"
        : "bg-blue-50 text-blue-600 border-blue-200"
      : isDark
      ? "bg-zinc-800 text-zinc-400 border-zinc-700"
      : "bg-gray-100 text-gray-500 border-gray-200";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => {
        setHovered(true);
        setCursorType("hover");
      }}
      onMouseLeave={() => {
        setHovered(false);
        resetCursor();
      }}
      className={`relative rounded-2xl border p-7 sm:p-9 transition-all duration-300 ${
        isDark
          ? `border-zinc-800 ${hovered ? "bg-zinc-900/70" : "bg-zinc-900/30"}`
          : `border-gray-200 ${hovered ? "bg-white shadow-md" : "bg-white/60"}`
      }`}
    >
      {/* Top row */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
        <div>
          {/* Badge */}
          <span
            className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border mb-3 ${badgeColor}`}
          >
            {project.badge}
          </span>
          <h2
            className={`text-2xl sm:text-3xl font-bold tracking-tight ${
              isDark ? "text-white" : "text-gray-900"
            }`}
            style={{ fontFamily: "'Haffer', sans-serif" }}
          >
            {project.title}
          </h2>
          <p
            className={`text-sm mt-0.5 ${
              isDark ? "text-zinc-500" : "text-gray-500"
            }`}
          >
            {project.subtitle}
          </p>
        </div>

        {/* Action links */}
        <div className="flex items-center gap-2 shrink-0">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full border transition-all duration-200 cursor-none ${
                isDark
                  ? "border-zinc-700 text-zinc-400 hover:border-[#C4F047] hover:text-[#C4F047]"
                  : "border-gray-200 text-gray-500 hover:border-blue-500 hover:text-blue-500"
              }`}
              aria-label={`GitHub source for ${project.title}`}
              onMouseEnter={() => setCursorType("active")}
              onMouseLeave={resetCursor}
            >
              <Github size={16} />
            </a>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full border transition-all duration-200 cursor-none ${
                isDark
                  ? "border-zinc-700 text-zinc-400 hover:border-[#C4F047] hover:text-[#C4F047]"
                  : "border-gray-200 text-gray-500 hover:border-blue-500 hover:text-blue-500"
              }`}
              aria-label={`Visit ${project.title}`}
              onMouseEnter={() => setCursorType("active")}
              onMouseLeave={resetCursor}
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      <p
        className={`text-sm leading-relaxed mb-6 max-w-2xl ${
          isDark ? "text-zinc-400" : "text-gray-600"
        }`}
      >
        {project.shortDescription}
      </p>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className={`px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-wider ${
              isDark
                ? "bg-zinc-800 text-zinc-400"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Hover accent line */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-b-2xl origin-left ${
          isDark ? "bg-[#C4F047]" : "bg-blue-500"
        }`}
      />
    </motion.div>
  );
}
