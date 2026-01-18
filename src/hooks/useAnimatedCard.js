"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useSpring } from "framer-motion";

/**
 * useAnimatedCard - Global hook for managing the shared animated card
 *
 * This hook tracks scroll position and determines which section is active,
 * then outputs the appropriate animation values for the card.
 *
 * Sections register themselves with scroll ranges, and the card transitions
 * smoothly between states based on scroll progress.
 */

const CARD_STATES = {
  HERO: {
    x: 0, // Viewport center
    y: 0,
    scale: 1,
    rotateY: 0,
    opacity: 1,
  },
  SKILLS: {
    x: 300, // Right side offset
    y: -100,
    scale: 0.85,
    rotateY: 15, // Increased rotation for more dynamic effect
    opacity: 1,
  },
  ABOUT: {
    x: 350, // Further right
    y: -50,
    scale: 0.8,
    rotateY: -10, // Negative rotation for variety
    opacity: 1,
  },
  HIDDEN: {
    x: 0,
    y: 0,
    scale: 0,
    opacity: 0,
  },
};

export function useAnimatedCard() {
  const sectionsRef = useRef({});
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [currentSection, setCurrentSection] = useState("HIDDEN");

  const { scrollY } = useScroll();

  // Detect mobile and reduced motion
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    const checkReducedMotion = () => {
      setPrefersReducedMotion(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      );
    };

    checkMobile();
    checkReducedMotion();

    window.addEventListener("resize", checkMobile);
    const motionMediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    motionMediaQuery.addEventListener("change", checkReducedMotion);

    return () => {
      window.removeEventListener("resize", checkMobile);
      motionMediaQuery.removeEventListener("change", checkReducedMotion);
    };
  }, []);

  // Register a section with its scroll range (uses ref to avoid re-renders)
  const registerSection = useRef((id, element) => {
    if (!element) return;
    sectionsRef.current[id] = element;
  }).current;

  // Update current section based on scroll position
  useEffect(() => {
    const updateSection = () => {
      const scroll = scrollY.get();
      const sectionIds = Object.keys(sectionsRef.current);

      for (const id of sectionIds) {
        const element = sectionsRef.current[id];
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        const offsetTop = scroll + rect.top;
        const offsetBottom = offsetTop + element.offsetHeight;

        // Check if we're in this section's range
        if (
          scroll >= offsetTop - window.innerHeight / 2 &&
          scroll < offsetBottom - window.innerHeight / 3
        ) {
          setCurrentSection(id);
          return;
        }
      }

      setCurrentSection("HIDDEN");
    };

    const unsubscribe = scrollY.on("change", updateSection);
    updateSection(); // Initial check

    return () => unsubscribe();
  }, [scrollY]);

  // Calculate interpolated values based on current section
  const targetState = CARD_STATES[currentSection] || CARD_STATES.HIDDEN;

  // Spring animations for smooth transitions
  const springConfig = { stiffness: 100, damping: 30, mass: 1 };

  const x = useSpring(
    useTransform(scrollY, () => {
      if (isMobile || prefersReducedMotion) return 0;
      return targetState.x;
    }),
    springConfig,
  );

  const y = useSpring(
    useTransform(scrollY, () => {
      if (isMobile) return 0;
      return targetState.y;
    }),
    springConfig,
  );

  const scale = useSpring(
    useTransform(scrollY, () => {
      if (isMobile) return 1;
      return targetState.scale;
    }),
    springConfig,
  );

  const rotateY = useSpring(
    useTransform(scrollY, (latest) => {
      if (isMobile || prefersReducedMotion) return 0;

      // Add continuous scroll-based rotation on top of target state
      const scrollProgress = latest / 1000; // Normalize scroll
      const continuousRotation = Math.sin(scrollProgress * 0.5) * 8; // Oscillating rotation

      return targetState.rotateY + continuousRotation;
    }),
    springConfig,
  );

  const opacity = useSpring(
    useTransform(scrollY, () => targetState.opacity),
    { stiffness: 150, damping: 30 },
  );

  return {
    registerSection,
    animationValues: {
      x,
      y,
      scale,
      rotateY,
      opacity,
    },
    currentSection,
    isMobile,
    isDisabled: isMobile || prefersReducedMotion,
  };
}
