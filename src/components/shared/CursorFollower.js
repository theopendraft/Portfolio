"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useCursor } from "@/hooks/useCursor";
import { useTheme } from "@/contexts/ThemeContext";
import Image from "next/image";

/**
 * CursorFollower - Global custom cursor component
 *
 * Features:
 * - Smooth spring-based mouse tracking
 * - Multiple cursor states (default, hover, active)
 * - Image preview support for skill hovers
 * - Auto-hides on mobile/touch devices
 * - Ignores pointer events to avoid interfering with interactions
 */
export default function CursorFollower() {
  const { cursorType, previewImage } = useCursor();
  const { theme } = useTheme();
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Motion values for smooth cursor position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animation for smooth lag effect
  // Reduced stiffness for smoother, more premium feel
  const springConfig = { stiffness: 120, damping: 25, mass: 0.6 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect touch devices and small screens
    const checkTouchDevice = () => {
      const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 1024;
      setIsTouchDevice(hasTouch || isSmallScreen);
    };

    checkTouchDevice();

    // Hide default cursor on desktop
    if (!isTouchDevice) {
      document.body.style.cursor = "none";
    }

    return () => {
      document.body.style.cursor = "auto";
    };
  }, [isTouchDevice]);

  useEffect(() => {
    // Track mouse movement
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    // Hide cursor when leaving window
    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Show cursor when entering window
    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  // Don't render on touch devices
  if (isTouchDevice) {
    return null;
  }

  // Cursor styling based on state
  const getCursorStyles = () => {
    switch (cursorType) {
      case "hover":
        return {
          width: 40,
          height: 40,
          backgroundColor:
            theme === "dark"
              ? "rgba(196, 240, 71, 0.3)"
              : "rgba(59, 130, 246, 0.3)",
          border:
            theme === "dark"
              ? "2px solid rgba(196, 240, 71, 0.8)"
              : "2px solid rgba(59, 130, 246, 0.8)",
          mixBlendMode: "screen",
        };
      case "active":
        return {
          width: 50,
          height: 50,
          backgroundColor:
            theme === "dark"
              ? "rgba(196, 240, 71, 0.5)"
              : "rgba(59, 130, 246, 0.5)",
          border:
            theme === "dark"
              ? "3px solid rgba(196, 240, 71, 1)"
              : "3px solid rgba(59, 130, 246, 1)",
          mixBlendMode: "screen",
        };
      default:
        return {
          width: 12,
          height: 12,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        };
    }
  };

  const cursorStyles = getCursorStyles();

  return (
    <>
      {/* Main Cursor Dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-9999 "
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          ...cursorStyles,
        }}
        animate={{
          width: cursorStyles.width,
          height: cursorStyles.height,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          width: { type: "spring", stiffness: 300, damping: 25 },
          height: { type: "spring", stiffness: 300, damping: 25 },
          opacity: { duration: 0.2 },
        }}
      />

      {/* Image Preview (appears when hovering skills) */}
      <AnimatePresence>
        {previewImage && isVisible && (
          <motion.div
            className="fixed pointer-events-none z-9998"
            style={{
              x: cursorX,
              y: cursorY,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              translateX: 20, // Offset from cursor
              translateY: -60,
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              opacity: { duration: 0.2 },
              scale: { type: "spring", stiffness: 300, damping: 25 },
            }}
          >
            <div className="w-48 h-32 rounded-xl overflow-hidden shadow-2xl border border-zinc-700 bg-zinc-800">
              {/* Placeholder or actual image */}
              <div className="w-full h-full bg-linear-to-br from-zinc-700 to-zinc-800 flex items-center justify-center">
                <span className="text-xs text-zinc-400">Preview</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
