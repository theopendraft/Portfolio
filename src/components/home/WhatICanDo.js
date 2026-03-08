"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Server, Database, Sparkles, Palette, Zap } from "lucide-react";
import { useCursor } from "@/hooks/useCursor";
import { useTheme } from "@/contexts/ThemeContext";
import AnimatedCard from "@/components/shared/AnimatedCard";
import { skills } from "@/data/skills";
import { useAnimatedCardContext } from "@/contexts/AnimatedCardContext";

const ICONS = [Code2, Server, Database, Sparkles, Palette, Zap];

export default function WhatICanDo() {
  const sectionRef = useRef(null);
  const skillsContainerRef = useRef(null);
  const { setCursorType, setPreviewImage, resetCursor } = useCursor();
  const { registerSection, isMobile } = useAnimatedCardContext();
  const { theme } = useTheme();
  const [openIndex, setOpenIndex] = useState(null);

  const titleStyle = {
    fontFamily: "'Haffer', sans-serif",
    lineHeight: "100%",
    letterSpacing: "-0.03em",
  };

  useEffect(() => {
    if (sectionRef.current) {
      registerSection("SKILLS", sectionRef.current);
    }
  }, [registerSection]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        skillsContainerRef.current &&
        !skillsContainerRef.current.contains(event.target)
      ) {
        setOpenIndex(null);
      }
    };
    if (openIndex !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openIndex]);

  const handleSkillHover = (skill) => {
    setCursorType("hover");
    setPreviewImage(skill.image);
  };

  const toggleSkill = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleSkill(index);
    }
  };

  const isPerformance = (index) => index === 5;
  const isAI = (index) => index === 3;

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-screen flex items-center justify-center px-6 sm:px-10 py-24 transition-colors duration-500 ${
        theme === "dark" ? "bg-transparent" : "bg-gray-50"
      }`}
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT COLUMN */}
          <div className="space-y-12">
            {/* Section Header */}
            <div className="space-y-4">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`text-xs uppercase tracking-[0.25em] font-medium ${
                  theme === "dark" ? "text-zinc-500" : "text-gray-400"
                }`}
              >
                Capabilities
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`text-5xl lg:text-6xl font-bold tracking-tight ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
                style={titleStyle}
              >
                What I Can Do
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`text-base max-w-md ${
                  theme === "dark" ? "text-zinc-400" : "text-gray-600"
                }`}
              >
                Click any capability to see the tools, context, and outcomes.
              </motion.p>
            </div>

            {/* Skills Accordion */}
            <div ref={skillsContainerRef} className="space-y-2">
              {skills.map((skill, index) => {
                const Icon = ICONS[index];
                const isOpen = openIndex === index;
                const accent = isAI(index);

                return (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.07,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onMouseEnter={() => handleSkillHover(skill)}
                    onMouseLeave={resetCursor}
                    className="group cursor-none"
                  >
                    <div
                      className={`rounded-2xl border backdrop-blur-sm overflow-hidden transition-all duration-300 ${
                        isOpen
                          ? accent
                            ? theme === "dark"
                              ? "border-[#C4F047]/40 bg-[#C4F047]/5"
                              : "border-blue-400 bg-blue-50"
                            : theme === "dark"
                              ? "border-zinc-700 bg-zinc-900"
                              : "border-gray-400 bg-white"
                          : theme === "dark"
                            ? "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700"
                            : "border-gray-300 bg-white/50 hover:border-gray-400"
                      }`}
                    >
                      {/* Toggle Header */}
                      <button
                        onClick={() => toggleSkill(index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className="w-full py-5 px-6 flex items-center justify-between gap-4 text-left focus:outline-none"
                        aria-expanded={isOpen}
                        aria-controls={`skill-content-${skill.id}`}
                      >
                        {/* Icon + Title */}
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${
                              isOpen
                                ? accent
                                  ? theme === "dark"
                                    ? "bg-[#C4F047]/15 text-[#C4F047]"
                                    : "bg-blue-100 text-blue-600"
                                  : theme === "dark"
                                    ? "bg-zinc-700 text-white"
                                    : "bg-gray-200 text-gray-800"
                                : theme === "dark"
                                  ? "bg-zinc-800 text-zinc-400 group-hover:text-zinc-200"
                                  : "bg-gray-100 text-gray-500 group-hover:text-gray-700"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>

                          <h3
                            className={`text-lg font-semibold transition-colors duration-300 ${
                              isOpen
                                ? accent
                                  ? theme === "dark"
                                    ? "text-[#C4F047]"
                                    : "text-blue-600"
                                  : theme === "dark"
                                    ? "text-white"
                                    : "text-gray-900"
                                : theme === "dark"
                                  ? "text-zinc-300 group-hover:text-white"
                                  : "text-gray-700 group-hover:text-gray-900"
                            }`}
                          >
                            {skill.title}
                          </h3>
                        </div>

                        {/* Chevron */}
                        <motion.svg
                          className={`w-5 h-5 shrink-0 transition-colors duration-300 ${
                            isOpen
                              ? accent
                                ? theme === "dark"
                                  ? "text-[#C4F047]"
                                  : "text-blue-500"
                                : theme === "dark"
                                  ? "text-zinc-300"
                                  : "text-gray-600"
                              : theme === "dark"
                                ? "text-zinc-600 group-hover:text-zinc-400"
                                : "text-gray-400 group-hover:text-gray-600"
                          }`}
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </motion.svg>
                      </button>

                      {/* Expanded Content */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            id={`skill-content-${skill.id}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div
                              className={`px-6 pb-6 pt-1 border-t space-y-4 ${
                                theme === "dark" ? "border-zinc-800" : "border-gray-200"
                              }`}
                            >
                              {/* Description */}
                              <p
                                className={`text-sm leading-relaxed ${
                                  theme === "dark" ? "text-zinc-400" : "text-gray-600"
                                }`}
                              >
                                {skill.description}
                              </p>

                              {/* Tech tags */}
                              {skill.tags && (
                                <div className="flex flex-wrap gap-2">
                                  {skill.tags.map((tag) => (
                                    <span
                                      key={tag}
                                      className={`text-xs px-3 py-1 rounded-full border font-medium ${
                                        accent
                                          ? theme === "dark"
                                            ? "border-[#C4F047]/20 bg-[#C4F047]/5 text-[#C4F047]"
                                            : "border-blue-200 bg-blue-50 text-blue-600"
                                          : theme === "dark"
                                            ? "border-zinc-700 bg-zinc-800 text-zinc-400"
                                            : "border-gray-200 bg-gray-50 text-gray-600"
                                      }`}
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}

                              {/* Metric callout - Performance card only */}
                              {isPerformance(index) && (
                                <div
                                  className={`flex items-center gap-4 pt-2 rounded-xl px-4 py-3 ${
                                    theme === "dark" ? "bg-zinc-800/60" : "bg-gray-100"
                                  }`}
                                >
                                  <span
                                    className={`text-3xl font-bold ${
                                      theme === "dark" ? "text-[#C4F047]" : "text-blue-500"
                                    }`}
                                    style={titleStyle}
                                  >
                                    25%
                                  </span>
                                  <span
                                    className={`text-xs leading-tight ${
                                      theme === "dark" ? "text-zinc-500" : "text-gray-500"
                                    }`}
                                  >
                                    API response time improvement
                                    <br />
                                    measured in production at Adrig AI
                                  </span>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN - Mobile inline card */}
          {isMobile && (
            <div className="flex justify-center lg:justify-end hidden lg:inline-flex">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <AnimatedCard
                  imageSrc="/image/Pankaj_Yadav_2.jpg"
                  alt="Skills showcase"
                  rotateOnScroll={false}
                  className="w-80 h-120"
                >
                  <div className="absolute inset-0 bg-linear-to-br from-[#C4F047]/5 to-transparent pointer-events-none" />
                </AnimatedCard>
              </motion.div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
