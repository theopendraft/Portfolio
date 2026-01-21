"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { useAnimatedCardContext } from "@/contexts/AnimatedCardContext";

/**
 * SharedAnimatedCard - Floating card with section-based rotations
 *
 * Features:
 * - Only visible on home page
 * - 3 different images that flip (next image appears behind)
 * - Flips based on actual section positions
 * - Complete 180° rotation between each section
 */
export default function SharedAnimatedCard() {
  const { theme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [isHomePage, setIsHomePage] = useState(true);
  const { sections } = useAnimatedCardContext();

  const { scrollY } = useScroll();

  // Get section positions
  const heroSection = sections?.get("HERO");
  const whatICanDoSection = sections?.get("WHATICANDO");
  const aboutSection = sections?.get("ABOUT");

  // Dynamic section positions
  const [sectionPositions, setSectionPositions] = useState({
    heroEnd: 800,
    whatICanDoEnd: 1600,
    aboutEnd: 2100,
  });

  useEffect(() => {
    const updatePositions = () => {
      if (heroSection && whatICanDoSection && aboutSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const whatICanDoBottom =
          whatICanDoSection.offsetTop + whatICanDoSection.offsetHeight;
        const aboutBottom = aboutSection.offsetTop + aboutSection.offsetHeight;

        setSectionPositions({
          heroEnd: heroBottom,
          whatICanDoEnd: whatICanDoBottom,
          aboutEnd: aboutBottom,
        });
      }
    };

    updatePositions();
    window.addEventListener("resize", updatePositions);
    window.addEventListener("load", updatePositions);
    const timer = setTimeout(updatePositions, 500);

    return () => {
      window.removeEventListener("resize", updatePositions);
      window.removeEventListener("load", updatePositions);
      clearTimeout(timer);
    };
  }, [heroSection, whatICanDoSection, aboutSection]);

  // Check if on home page
  useEffect(() => {
    setIsHomePage(window.location.pathname === "/");
  }, []);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Position transforms
  const x = useTransform(
    scrollY,
    [0, sectionPositions.heroEnd, sectionPositions.aboutEnd],
    [0, 400, 400],
  );

  // Move with AboutMe section instead of staying fixed
  const y = useTransform(
    scrollY,
    [0, sectionPositions.heroEnd, sectionPositions.whatICanDoEnd, sectionPositions.aboutEnd],
    [0, -50, -50, -50],
  );

  // Complete flip between sections: 0° → 180° → 360°
  const rotateY = useTransform(
    scrollY,
    [
      0,
      sectionPositions.heroEnd,
      sectionPositions.whatICanDoEnd,
      sectionPositions.aboutEnd,
    ],
    [0, 180, 360, 360],
  );

  // Keep visible throughout, no fade
  const opacity = useTransform(
    scrollY,
     [0, sectionPositions.whatICanDoEnd, sectionPositions.aboutEnd],
    [1, 1, 0],
  );

  const scale = useTransform(
    scrollY,
    [0, sectionPositions.heroEnd, sectionPositions.aboutEnd],
    [1, 1, 1],
  );

  // Track current section for content
  const [currentSection, setCurrentSection] = useState(0);
  const [displaySection, setDisplaySection] = useState(0);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      // Update current section
      if (latest < sectionPositions.heroEnd) {
        setCurrentSection(0);
      } else if (latest < sectionPositions.whatICanDoEnd) {
        setCurrentSection(1);
      } else {
        setCurrentSection(2);
      }

      // Calculate rotation progress and change content at 90° (halfway)
      const heroProgress = (latest / sectionPositions.heroEnd) * 180;
      const whatICanDoProgress =
        ((latest - sectionPositions.heroEnd) /
          (sectionPositions.whatICanDoEnd - sectionPositions.heroEnd)) *
          180 +
        180;

      if (latest < sectionPositions.heroEnd) {
        // Hero section: 0° to 180°
        setDisplaySection(heroProgress > 90 ? 1 : 0);
      } else if (latest < sectionPositions.whatICanDoEnd) {
        // WhatICanDo section: 180° to 360°
        setDisplaySection(whatICanDoProgress > 270 ? 2 : 1);
      } else {
        setDisplaySection(2);
      }
    });
  }, [scrollY, sectionPositions]);

  // 3 different card contents with images
  const cardContents = [
    {
      image: "/images/hero-card.jpg", // TODO: Replace with actual image path
      placeholder: "👤",
      name: "Pankaj Yadav",
      subtitle: "Designer & Developer",
    },
    {
      image: "/images/skills-card.jpg", // TODO: Replace with actual image path
      placeholder: "💼",
      name: "Skills & Expertise",
      subtitle: "What I Can Do",
    },
    {
      image: "/images/about-card.jpg", // TODO: Replace with actual image path
      placeholder: "🎯",
      name: "About Me",
      subtitle: "My Story",
    },
  ];

  // Get next section content for "behind" effect
  const nextSection = displaySection < 2 ? displaySection + 1 : displaySection;

  // Don't render if mobile or not home page
  if (isMobile || !isHomePage) return null;

  return (
    <motion.div
      className="fixed top-1/2 left-1/2 pointer-events-none z-50"
      style={{
        x,
        y,
        scale,
        opacity,
        translateX: "-50%",
        translateY: "-50%",
        perspective: 1200,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      <motion.div
        className="relative w-80 h-120"
        style={{
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Front/Back Card - Single card with changing content */}
        <motion.div
          className={`absolute inset-0 rounded-2xl overflow-hidden border-2 shadow-2xl ${
            theme === "dark"
              ? "bg-linear-to-br from-zinc-800 to-zinc-900 border-lime-400/20"
              : "bg-linear-to-br from-white to-gray-100 border-blue-400/30"
          }`}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Image Container */}
          <div className="absolute inset-0">
            {/* Image Placeholder - Replace with actual image */}
            <div
              className={`w-full h-full flex items-center justify-center ${
                theme === "dark"
                  ? "bg-linear-to-br from-zinc-700 to-zinc-800"
                  : "bg-linear-to-br from-gray-200 to-gray-300"
              }`}
            >
              {/* TODO: Replace with <Image src={cardContents[displaySection].image} /> */}
              <div className="text-9xl">
                {cardContents[displaySection].placeholder}
              </div>
            </div>
          </div>

          {/* Overlay with gradient and text */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent flex items-end">
            <div className="w-full p-8 text-white">
              <h3 className="text-2xl font-bold mb-2">
                {cardContents[displaySection].name}
              </h3>
              <p className="text-sm text-zinc-300">
                {cardContents[displaySection].subtitle}
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
          style={{
            transformStyle: "preserve-3d",
            transform: "translateZ(50px)",
          }}
          aria-hidden="true"
        >
          <span className="text-5xl">👋</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
