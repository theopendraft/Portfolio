"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

/**
 * SharedAnimatedCard - Floating card with scroll-driven Y-axis rotations
 *
 * Positions:
 * - Hero: Center of screen
 * - WhatICanDo: Right side with 360° rotation
 * - AboutMe: Right side with another 360° rotation
 */
export default function SharedAnimatedCard() {
  const { theme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();

  // Scroll-driven transformations
  // Hero section: 0-800px scroll - centered
  // WhatICanDo: 800-1600px - move right with 360° rotation
  // AboutMe: 1600-2400px - stay right with another 360° rotation

  const x = useTransform(
    scrollY,
    [-200, 800, 800, 2400],
    [-200, 200, 200, 200],
  );

  const y = useTransform(scrollY, [0, 800, 1600, 2400], [0, -100, -100, -100]);

  const rotateY = useTransform(
    scrollY,
    [0, 800, 1600, 2400],
    [0, 180, 360, 360], // Two full rotations
  );

  const opacity = useTransform(scrollY, [0, 100, 1600, 1900], [1, 1, 1, 0]);

  const scale = useTransform(scrollY, [0, 800, 1600], [1, 0.85, 0.8]);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Don't render on mobile (after all hooks are called)
  if (isMobile) return null;

  return (
    <motion.div
      className="fixed top-1/2 left-1/2 pointer-events-none z-50"
      style={{
        x,
        y,
        scale,
        rotateY,
        opacity,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      <div className="relative w-80 h-120 -translate-y-1/2">
        {/* Card Container */}
        <motion.div
          className={`w-full h-full rounded-2xl overflow-hidden border-2 shadow-2xl ${
            theme === "dark"
              ? "bg-linear-to-br from-zinc-800 to-zinc-900 border-lime-400/20"
              : "bg-linear-to-br from-white to-gray-100 border-blue-400/30"
          }`}
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
          }}
        >
          {/* Portrait Placeholder */}
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center space-y-3">
              <div className="text-8xl mb-6">👤</div>
              <p
                className={`text-lg font-medium uppercase tracking-wider ${
                  theme === "dark" ? "text-zinc-400" : "text-gray-600"
                }`}
              >
                Duncan
                <br />
                Robert
              </p>
            </div>
          </div>
        </motion.div>

        {/* Hello Icon (Bottom-left) */}
        <motion.div
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute -bottom-6 -left-6 w-24 h-24 rounded-full flex items-center justify-center shadow-xl ${
            theme === "dark" ? "bg-[#C4F047]" : "bg-blue-500"
          }`}
          aria-hidden="true"
        >
          <span className="text-5xl">👋</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
