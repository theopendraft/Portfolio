"use client";

import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useCursor } from "@/hooks/useCursor";
import { useTheme } from "@/contexts/ThemeContext";
import { testimonials } from "@/data/testimonials";

// Defined outside Testimonials so React never re-mounts it on cursor/state changes
function AnimatedCounter({ value, suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 50, damping: 20 });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (isInView) {
      const numericValue = parseInt(value.toString().replace(/\D/g, "")) || 0;
      motionValue.set(numericValue);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest).toString() + suffix);
    });
  }, [springValue, suffix]);

  return <span ref={ref}>{displayValue}</span>;
}

export default function Testimonials() {
  const { setCursorType, resetCursor } = useCursor();
  const { theme } = useTheme();

  const titleStyle = {
    fontFamily: "'Haffer', sans-serif",
    lineHeight: "100%",
    letterSpacing: "-0.03em",
  };

  return (
    <section
      className={`relative px-6 sm:px-10 py-16 sm:py-24 lg:py-32 transition-colors duration-500 ${
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
            style={titleStyle}
          >
            Recognition & Impact
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
            Achievements, contributions, and measurable outcomes from real
            engineering work.
          </motion.p>
        </div>

        {/* Grid */}
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
              {item.type === "achievement" ? (
                // Achievement Card
                <div
                  className={`h-full p-8 rounded-2xl border transition-colors duration-300 ${
                    theme === "dark"
                      ? "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                      : "bg-white border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <div className="flex flex-col h-full space-y-4">
                    {/* Badge */}
                    <span
                      className={`self-start text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                        theme === "dark"
                          ? "bg-[#C4F047]/10 text-[#C4F047]"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {item.badge}
                    </span>

                    {/* Title */}
                    <h4
                      className={`text-xl font-bold leading-snug ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {item.title}
                    </h4>

                    {/* Description */}
                    <p
                      className={`text-sm leading-relaxed grow ${
                        theme === "dark" ? "text-zinc-400" : "text-gray-600"
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              ) : (
                // Stat Card
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
                    style={titleStyle}
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
