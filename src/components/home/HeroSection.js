"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useAnimatedCardContext } from "@/contexts/AnimatedCardContext";
import { useTheme } from "@/contexts/ThemeContext";
import AnimatedCard from "@/components/shared/AnimatedCard";

export default function HeroSection() {
  const sectionRef = useRef(null);
  const { registerSection, isMobile } = useAnimatedCardContext();
  const { theme, toggleTheme } = useTheme();

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
  return (
    <section
      ref={sectionRef}
      className={`relative min-h-screen flex items-center justify-center px-6 sm:px-10 lg:px-16 py-20 lg:py-24 overflow-hidden transition-colors duration-500 ${
        theme === "dark" ? "bg-transparent" : "bg-gray-50"
      }`}
      style={{ position: "relative" }}
    >
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_100%)]" />

      {/* Theme Toggle Switch */}
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
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
          className="w-3 h-3 bg-white rounded-full shadow-md mx-1"
        />
      </motion.button>

      <div className="relative z-10 w-2/3 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-center">
          {/* LEFT TEXT BLOCK */}
          <div className="flex flex-col justify-center  lg:text-right max-w-[560px] justify-self-start lg:justify-self-end">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`text-sm uppercase tracking-[0.3em] font-medium text-left ${
                theme === "dark" ? "text-zinc-500" : "text-gray-500"
              }
              
              `}
            >
              Pankaj Yadav
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`text-6xl sm:text-7xl lg:text-8xl xl:text-8xl font-bold tracking-tight leading-none ${
                theme === "dark" ? "text-white" : "text-blue-500"
              }`}
              style={titleStyle}
            >
              DIGITAL
            </motion.h1>
          </div>

          {/* EMPTY CENTER COLUMN TO RESERVE SPACE FOR FLOATING CARD */}
          <div className="hidden lg:block h-[520px]" aria-hidden="true" />

          {/* CENTER IMAGE CARD - Mobile only (desktop uses shared card) */}
          {isMobile && (
            <div className="flex justify-center">
              <AnimatedCard
                imageSrc={null}
                alt="Pankaj Yadav - Digital Designer"
                rotateOnScroll={false}
                className="w-80 h-120"
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 0.5,
                  }}
                  className={`absolute -bottom-6 -left-6 w-24 h-24 rounded-full flex items-center justify-center shadow-xl z-10 ${
                    theme === "dark" ? "bg-[#C4F047]" : "bg-blue-500"
                  }`}
                  aria-hidden="true"
                >
                  <span className="text-5xl">🖐️</span>
                </motion.div>
              </AnimatedCard>
            </div>
          )}

          {/* RIGHT TEXT BLOCK */}
          <div className="flex flex-col justify-center max-w-[560px] justify-self-start">
            <motion.h1
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`text-6xl sm:text-7xl lg:text-8xl xl:text-8xl font-bold tracking-tight leading-none pt-0 md:pt-12 ${
                theme === "dark" ? "text-white" : "text-blue-500"
              }`}
              style={titleStyle}
            >
              DESIGNER
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`text-base leading-relaxed max-w-xs ${
                theme === "dark" ? "text-zinc-400" : "text-gray-600"
              }`}
            >
              I'm a India-based digital designer and Web developer
            </motion.p>
          </div>
        </div>
      </div>

      {/* TODO: Add custom cursor system that follows mouse movements */}
      {/* TODO: Refine scroll-trigger animations with more sophisticated easing */}
    </section>
  );
}
