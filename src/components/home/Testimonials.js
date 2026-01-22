"use client";

import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useCursor } from "@/hooks/useCursor";
import { useTheme } from "@/contexts/ThemeContext";
import { testimonials } from "@/data/testimonials";

/**
 * Testimonials - Social proof section with client testimonials and stats
 *
 * Features:
 * - 3x2 grid layout
 * - Mix of testimonial cards and stat highlight cards
 * - Star ratings
 * - Client avatars
 * - Subtle entrance animations
 */
export default function Testimonials() {
  const { setCursorType, resetCursor } = useCursor();
  const { theme } = useTheme();

  const titleStyle = {
    fontFamily: "'Haffer', sans-serif",
    lineHeight: "100%",
    letterSpacing: "-0.03em",
  };

  // Animated counter component
  const AnimatedCounter = ({ value, suffix = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
      stiffness: 50,
      damping: 20,
    });
    const [displayValue, setDisplayValue] = useState("0");

    useEffect(() => {
      if (isInView) {
        // Extract numeric value from string (e.g., "50+" -> 50)
        const numericValue = parseInt(value.toString().replace(/\D/g, "")) || 0;
        motionValue.set(numericValue);
      }
    }, [isInView, motionValue, value]);

    useEffect(() => {
      const unsubscribe = springValue.on("change", (latest) => {
        setDisplayValue(Math.floor(latest).toString() + suffix);
      });
      return () => unsubscribe();
    }, [springValue, suffix]);

    return <span ref={ref}>{displayValue}</span>;
  };

  // Star rating component
  const StarRating = ({ rating }) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${
              i < rating
                ? theme === "dark"
                  ? "text-[#C4F047]"
                  : "text-blue-500"
                : theme === "dark"
                  ? "text-zinc-700"
                  : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section
      className={`relative px-4 sm:px-8 py-16 sm:py-24 lg:py-32 transition-colors duration-500 ${
        theme === "dark" ? "bg-transparent" : "bg-white"
      }`}
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight uppercase mb-4 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}

          >
            What My Clients Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.6,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`text-base sm:text-lg max-w-2xl mx-auto ${
              theme === "dark" ? "text-zinc-400" : "text-gray-600"
            }`}
          >
            Don't just take my word for it — hear from the clients I've had the
            pleasure of working with.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              onMouseEnter={() => setCursorType("hover")}
              onMouseLeave={resetCursor}
            >
              {item.type === "testimonial" ? (
                // Standard Testimonial Card
                <div
                  className={`h-full p-8 rounded-2xl border transition-colors duration-300 ${
                    theme === "dark"
                      ? "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                      : "bg-white border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <div className="flex flex-col h-full space-y-6">
                    {/* Rating */}
                    <StarRating rating={item.rating} />

                    {/* Testimonial Text */}
                    <p
                      className={`leading-relaxed grow ${
                        theme === "dark" ? "text-zinc-300" : "text-gray-700"
                      }`}
                    >
                      "{item.text}"
                    </p>

                    {/* Client Info */}
                    <div
                      className={`flex items-center gap-4 pt-4 border-t ${
                        theme === "dark" ? "border-zinc-800" : "border-gray-300"
                      }`}
                    >
                      {/* Avatar */}
                      <div
                        className={`w-12 h-12 rounded-full shrink-0 overflow-hidden ${
                          theme === "dark"
                            ? "bg-linear-to-br from-zinc-700 to-zinc-800"
                            : "bg-linear-to-br from-gray-300 to-gray-400"
                        }`}
                      >
                        {/* Placeholder avatar */}
                        <div
                          className={`w-full h-full flex items-center justify-center text-sm font-semibold ${
                            theme === "dark" ? "text-zinc-400" : "text-gray-600"
                          }`}
                        >
                          {item.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                      </div>

                      {/* Name & Role */}
                      <div>
                        <div
                          className={`font-semibold ${
                            theme === "dark" ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {item.name}
                        </div>
                        <div
                          className={`text-sm ${
                            theme === "dark" ? "text-zinc-500" : "text-gray-500"
                          }`}
                        >
                          {item.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Stat Highlight Card
                <div
                  className={`
                  h-full p-8 rounded-2xl flex flex-col items-center justify-center text-center space-y-4
                  ${
                    theme === "dark"
                      ? index === 1
                        ? "bg-white"
                        : "bg-[#C4F047]"
                      : index === 1
                        ? "bg-blue-500"
                        : "bg-blue-400"
                  }
                `}
                >
                  <div
                    className={`
                    text-6xl lg:text-7xl font-bold tracking-tight
                    ${
                      theme === "dark"
                        ? index === 1
                          ? "text-zinc-900"
                          : "text-black"
                        : "text-white"
                    }
                  `}
                  >
                    <AnimatedCounter
                      value={item.value}
                      suffix={item.value.toString().replace(/[0-9]/g, "")}
                    />
                  </div>
                  <div
                    className={`
                    text-base font-medium uppercase tracking-wider
                    ${
                      theme === "dark"
                        ? index === 1
                          ? "text-zinc-600"
                          : "text-zinc-800"
                        : "text-white"
                    }
                  `}
                  >
                    {item.label}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
