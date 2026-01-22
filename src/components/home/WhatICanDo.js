"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCursor } from "@/hooks/useCursor";
import { useTheme } from "@/contexts/ThemeContext";
import AnimatedCard from "@/components/shared/AnimatedCard";
import { skills } from "@/data/skills";
import { useAnimatedCardContext } from "@/contexts/AnimatedCardContext";

/**
 * WhatICanDo - Interactive skills showcase section
 *
 * Features:
 * - Two-column layout: capabilities list + AnimatedCard
 * - Cursor-following image previews on skill hover
 * - Mobile-responsive with disabled cursor effects
 */
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

  // Close dropdown when clicking outside
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

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openIndex]);

  const handleSkillHover = (skill) => {
    setCursorType("hover");
    setPreviewImage(skill.image);
  };

  const handleSkillLeave = () => {
    resetCursor();
  };

  const toggleSkill = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleKeyPress = (e, index) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleSkill(index);
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-screen flex items-center justify-center px-8 py-24 transition-colors duration-500 ${
        theme === "dark" ? "bg-transparent" : "bg-gray-50"
      }`}
      style={{ position: "relative" }}
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT COLUMN - Capabilities List */}
          <div className="space-y-12">
            {/* Section Header */}
            <div className="space-y-4">
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
                className={`text-lg max-w-md ${
                  theme === "dark" ? "text-zinc-400" : "text-gray-600"
                }`}
              >
                Hover over each capability to see examples of my work and
                expertise.
              </motion.p>
            </div>

            {/* Skills List */}
            <div ref={skillsContainerRef} className="space-y-2">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onMouseEnter={() => handleSkillHover(skill)}
                  onMouseLeave={handleSkillLeave}
                  className="group cursor-none"
                >
                  <div
                    className={`rounded-2xl border backdrop-blur-sm transition-all duration-300 overflow-hidden ${
                      theme === "dark"
                        ? "border-zinc-800 bg-zinc-900/50"
                        : "border-gray-300 bg-white/50"
                    }`}
                  >
                    {/* Skill Header - Clickable */}
                    <button
                      onClick={() => toggleSkill(index)}
                      onKeyPress={(e) => handleKeyPress(e, index)}
                      className="w-full py-5 px-6 flex items-center justify-between gap-4 text-left focus:outline-none focus:ring-0 focus:ring-inset"
                      aria-expanded={openIndex === index}
                      aria-controls={`skill-content-${skill.id}`}
                    >
                      <h3
                        className={`text-xl font-semibold transition-colors duration-300 ${
                          theme === "dark"
                            ? "text-white group-hover:text-[#C4F047]"
                            : "text-gray-900 group-hover:text-blue-500"
                        }`}
                      >
                        {skill.title}
                      </h3>

                      <div className="flex items-center gap-2">
                        {/* Arrow Animation */}

                        {/* Expand/Collapse Icon */}
                        <motion.svg
                          className={`w-5 h-5 transition-colors duration-300 ${
                            theme === "dark"
                              ? "text-zinc-600 group-hover:text-[#C4F047]"
                              : "text-gray-400 group-hover:text-blue-500"
                          }`}
                          animate={{ rotate: openIndex === index ? 180 : 0 }}
                          transition={{
                            duration: 0.3,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </motion.svg>
                      </div>
                    </button>

                    {/* Skill Description - Expandable */}
                    <AnimatePresence>
                      {openIndex === index && (
                        <motion.div
                          id={`skill-content-${skill.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.3,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <div
                            className={`px-6 pb-5 border-t ${
                              theme === "dark"
                                ? "border-zinc-800"
                                : "border-gray-300"
                            }`}
                          >
                            <p
                              className={`pt-4 leading-relaxed ${
                                theme === "dark"
                                  ? "text-zinc-400"
                                  : "text-gray-600"
                              }`}
                            >
                              {skill.description}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN - Animated Card (Mobile only) */}
          {isMobile && (
            <div className="flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <AnimatedCard
                  imageSrc={null}
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
