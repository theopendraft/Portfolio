"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimatedCardContext } from "@/contexts/AnimatedCardContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useCursor } from "@/hooks/useCursor";
import AnimatedCard from "@/components/shared/AnimatedCard";
import MagneticButton from "@/components/shared/MagneticButton";

const CYCLING_WORDS = ["ENGINEER", "DEVELOPER", "DESIGNER"];

const TECH_STACK = [
  "React.js",
  "Node.js",
  "PostgreSQL",
  "Express",
  "JavaScript",
  "TypeScript",
  "Prisma",
  "REST APIs",
  "Tailwind CSS",
  "Framer Motion",
  "Python",
  "Docker",
  "Git",
  "LLM Integration",
  "Next.js",
  "SQL",
];

export default function HeroSection() {
  const sectionRef = useRef(null);
  const { registerSection, isMobile } = useAnimatedCardContext();
  const { theme } = useTheme();
  const { setCursorType, resetCursor } = useCursor();

  const [wordIndex, setWordIndex] = useState(0);

  const titleStyle = {
    fontFamily: "'Haffer', sans-serif",
    lineHeight: "100%",
    letterSpacing: "-0.03em",
  };

  useEffect(() => {
    if (sectionRef.current) {
      registerSection("HERO", sectionRef.current);
    }
  }, [registerSection]);

  // Cycle through words every 2.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % CYCLING_WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Duplicate tech stack for seamless loop
  const tickerItems = [...TECH_STACK, ...TECH_STACK];

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden transition-colors duration-500 ${
        theme === "dark" ? "bg-transparent" : "bg-gray-50"
      }`}
    >
      {/* Subtle radial overlay */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_100%)]" />

      {/* Main Content */}
      <div className="relative z-10 w-full flex-1 flex items-center">
        <div className="w-full lg:w-2/3 max-w-7xl mx-auto px-6 sm:px-10 lg:px-0">

          {/* MOBILE LAYOUT */}
          <div className="flex flex-col gap-4 text-center lg:hidden pt-8 pb-6">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-xs uppercase tracking-[0.3em] font-medium ${
                theme === "dark" ? "text-zinc-500" : "text-gray-400"
              }`}
            >
              Full-Stack Software Engineer
            </motion.p>

            {/* Heading: DIGITAL + cycling word stacked */}
            <div >
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className={`text-[clamp(3rem,14vw,5rem)] font-bold tracking-tight leading-none  ${
                  theme === "dark" ? "text-white" : "text-blue-500"
                }`}
                style={titleStyle}
              >
                DIGITAL
              </motion.h1>
              <div className="overflow-hidden" style={{ height: "4.0em" }}>
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={CYCLING_WORDS[wordIndex]}
                    initial={{ opacity: 0, y: "100%" }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: "-100%" }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className={`text-[clamp(3rem,14vw,5rem)] font-bold tracking-tight leading-none ${
                      theme === "dark" ? "text-white" : "text-blue-500"
                    }`}
                    style={titleStyle}
                  >
                    {CYCLING_WORDS[wordIndex]}
                  </motion.h1>
                </AnimatePresence>
              </div>
            </div>

            {/* Card (mobile, compact) */}
            {isMobile && (
              <div className="w-full flex justify-center my-4">
                <AnimatedCard
                  imageSrc="/image/Pankaj_Yadav.jpg"
                  alt="Pankaj Yadav - Full-Stack Engineer"
                  rotateOnScroll={false}
                  className="w-64 h-80"
                >

                </AnimatedCard>
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
                    className={`absolute bottom-60 sm:bottom-60 sm:left-40 left-20 w-16 h-16 rounded-full flex items-center justify-center shadow-xl z-10 ${
                      theme === "dark" ? "bg-[#C4F047]" : "bg-blue-500"
                    }`}
                    aria-hidden="true"
                  >
                    <span className="text-3xl">🖐️</span>
                  </motion.div>                
              </div>
            )}

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={`text-sm leading-relaxed max-w-sm text-center ${
                theme === "dark" ? "text-zinc-400" : "text-gray-600"
              }`}
            >
              React · Node.js · PostgreSQL - building performant,
              production-grade web systems from Chennai, India.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-3 justify-between w-full"
            >
              <a
                href="#projects"
                className={`px-5 py-2.5 rounded-full font-semibold text-sm uppercase tracking-wider transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-[#C4F047] text-black hover:bg-[#d4ff5a]"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                View Work
              </a>
              <a
                href="/resume/Pankaj_Yadav_SDE_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-5 py-2.5 rounded-full border-2 font-semibold text-sm uppercase tracking-wider transition-all duration-300 ${
                  theme === "dark"
                    ? "border-zinc-700 text-white hover:border-[#C4F047] hover:text-[#C4F047]"
                    : "border-gray-400 text-gray-900 hover:border-blue-500 hover:text-blue-500"
                }`}
              >
                Download CV
              </a>
            </motion.div>
          </div>

          {/* DESKTOP LAYOUT (3-col grid) */}
          <div className="hidden lg:grid grid-cols-3 gap-8 items-center">

            {/* LEFT TEXT BLOCK */}
            <div className="flex flex-col justify-center lg:text-right max-w-[560px] justify-self-end pb-6">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className={`text-xs uppercase tracking-[0.3em] font-medium mb-3 text-left ${
                  theme === "dark" ? "text-zinc-500" : "text-gray-400"
                }`}
              >
                Full-Stack Software Engineer
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className={`text-8xl font-bold tracking-tight leading-none ${
                  theme === "dark" ? "text-white" : "text-blue-500"
                }`}
                style={titleStyle}
              >
                DIGITAL
              </motion.h1>
            </div>

            {/* CENTER COLUMN - SharedAnimatedCard placeholder */}
            <div className="h-[520px]" aria-hidden="true" />

            {/* RIGHT TEXT BLOCK */}
            <div className="flex flex-col justify-center max-w-[560px] justify-self-start pt-16">
              {/* Cycling word */}
              <div className="overflow-hidden" style={{ height: "5.5em" }}>
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={CYCLING_WORDS[wordIndex]}
                    initial={{ opacity: 0, y: "100%" }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: "-100%" }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className={`text-8xl font-bold tracking-tight leading-none ${
                      theme === "dark" ? "text-white" : "text-blue-500"
                    }`}
                    style={titleStyle}
                  >
                    {CYCLING_WORDS[wordIndex]}
                  </motion.h1>
                </AnimatePresence>
              </div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={`text-base leading-relaxed max-w-xs mt-4 ${
                  theme === "dark" ? "text-zinc-400" : "text-gray-600"
                }`}
              >
                React · Node.js · PostgreSQL — building performant,
                production-grade web systems from Chennai, India.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap gap-3 mt-6"
              >
                <MagneticButton>
                  <a
                    href="#projects"
                    className={`px-6 py-3 rounded-full font-semibold text-sm uppercase tracking-wider transition-all duration-300 cursor-none ${
                      theme === "dark"
                        ? "bg-[#C4F047] text-black hover:bg-[#d4ff5a]"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                    onMouseEnter={() => setCursorType("active")}
                    onMouseLeave={resetCursor}
                  >
                    View Work
                  </a>
                </MagneticButton>
                <MagneticButton>
                  <a
                    href="/resume/Pankaj_Yadav_SDE_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-6 py-3 rounded-full border-2 font-semibold text-sm uppercase tracking-wider transition-all duration-300 cursor-none ${
                      theme === "dark"
                        ? "border-zinc-700 text-white hover:border-[#C4F047] hover:text-[#C4F047]"
                        : "border-gray-400 text-gray-900 hover:border-blue-500 hover:text-blue-500"
                    }`}
                    onMouseEnter={() => setCursorType("active")}
                    onMouseLeave={resetCursor}
                  >
                    Download CV
                  </a>
                </MagneticButton>
              </motion.div>
            </div>
          </div>

        </div>
      </div>

      {/* Tech Stack Ticker - bottom of hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className={`relative z-10 w-full overflow-hidden border-t py-3.5 ${
          theme === "dark" ? "border-zinc-800/60" : "border-gray-200"
        }`}
      >
        <div className="animate-ticker flex whitespace-nowrap select-none">
          {tickerItems.map((item, i) => (
            <span
              key={i}
              className={`mx-5 text-xs font-medium uppercase tracking-[0.2em] ${
                theme === "dark" ? "text-zinc-700" : "text-gray-400"
              }`}
            >
              {item}
              <span
                className={`ml-5 ${
                  theme === "dark" ? "text-zinc-800" : "text-gray-300"
                }`}
              >
                ·
              </span>
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
