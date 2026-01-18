"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

/**
 * AnimatedCard - Reusable portrait card component with scroll-based animations
 *
 * @param {string} imageSrc - Image source URL or path
 * @param {string} alt - Alt text for the image
 * @param {boolean} rotateOnScroll - Enable/disable scroll-linked rotation (default: true)
 * @param {array} rotationRange - Y-axis rotation range in degrees [min, max] (default: [-8, 8])
 * @param {boolean} translateOnScroll - Enable/disable vertical parallax translation (default: false)
 * @param {array} translateRange - Y-axis translation range in pixels [start, end] (default: [0, -50])
 * @param {array} scrollOffset - Scroll progress offset for animation ["start", "end"] (default: ["start start", "end start"])
 * @param {string} className - Additional Tailwind classes for the card wrapper
 * @param {ReactNode} children - Optional content to overlay on the card (e.g., icons, badges)
 */
export default function AnimatedCard({
  imageSrc,
  alt = "Portrait",
  rotateOnScroll = true,
  rotationRange = [-8, 8],
  translateOnScroll = false,
  translateRange = [0, -50],
  scrollOffset = ["start start", "end start"],
  className = "",
  children,
}) {
  const cardRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Scroll-based animation setup
  // Maps scroll progress (0 → 1) to rotation values
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: scrollOffset,
  });

  // Transform scroll progress into Y-axis rotation
  // Example: scrollYProgress 0 → rotationRange[0], scrollYProgress 1 → rotationRange[1]
  const rotateY = useTransform(scrollYProgress, [0, 1], rotationRange);

  // Transform scroll progress into vertical translation (parallax effect)
  // Example: scrollYProgress 0 → translateRange[0], scrollYProgress 1 → translateRange[1]
  const translateY = useTransform(scrollYProgress, [0, 1], translateRange);

  // Disable rotation if user prefers reduced motion or prop is false
  const shouldRotate = rotateOnScroll && !prefersReducedMotion;
  const shouldTranslate = translateOnScroll && !prefersReducedMotion;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1,
        ease: [0.22, 1, 0.36, 1], // Custom easing for premium feel
      }}
      style={{
        rotateY: shouldRotate ? rotateY : 0,
        y: shouldTranslate ? translateY : 0,
        transformStyle: "preserve-3d",
        transformOrigin: "center center",
      }}
      className={`relative group ${className}`}
    >
      {/* Main Card Container */}
      <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-zinc-800 bg-linear-to-br from-zinc-200 to-zinc-300">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={alt}
            fill
            className="object-cover"
            priority
          />
        ) : (
          // Placeholder when no image is provided
          <div className="w-full h-full flex items-center justify-center bg-[#E5E1D8]">
            <div className="text-zinc-400 text-center">
              <div className="w-40 h-40 mx-auto rounded-full bg-linear-to-br from-zinc-400 to-zinc-500 mb-4" />
              <p className="text-sm">Add portrait image here</p>
            </div>
          </div>
        )}

        {/* Optional children (icons, overlays, etc.) */}
        {children}
      </div>

      {/* Subtle glow effect on hover */}
      <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-green-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
    </motion.div>
  );
}
