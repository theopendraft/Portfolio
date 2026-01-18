"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
import Link from "next/link";
import { useCursor } from "@/hooks/useCursor";
import { useTheme } from "@/contexts/ThemeContext";
import AnimatedCard from "@/components/shared/AnimatedCard";
import { useAnimatedCardContext } from "@/contexts/AnimatedCardContext";

/**
 * AboutMe - Trust-building about section with stats and personal info
 *
 * Layout:
 * - Left: Content (heading, intro, stats, contact, socials, CTA)
 * - Right: AnimatedCard with parallax effect
 */
export default function AboutMe() {
  const sectionRef = useRef(null);
  const { setCursorType, resetCursor } = useCursor();
  const { registerSection, isMobile } = useAnimatedCardContext();
  const { theme } = useTheme();

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

  useEffect(() => {
    if (sectionRef.current) {
      registerSection("ABOUT", sectionRef.current);
    }
  }, [registerSection]);

  // Stats data
  const stats = [
    { value: "50+", label: "Projects Completed" },
    { value: "5", label: "Years Experience" },
    { value: "30+", label: "Happy Clients" },
  ];

  // Contact info
  const contactInfo = [
    { label: "Phone", value: "+1 (555) 123-4567" },
    { label: "Email", value: "hello@duncanrobert.com" },
  ];

  // Social links
  const socialLinks = [
    { name: "GitHub", url: "https://github.com", icon: "GH" },
    { name: "LinkedIn", url: "https://linkedin.com", icon: "IN" },
    { name: "Twitter", url: "https://twitter.com", icon: "X" },
  ];

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-screen flex items-center justify-center px-4 sm:px-8 py-16 sm:py-24 transition-colors duration-500 ${
        theme === "dark" ? "bg-zinc-900" : "bg-white"
      }`}
      style={{ position: "relative" }}
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT COLUMN - Content */}
          <div className="space-y-12">
            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`text-6xl lg:text-7xl font-bold tracking-tight uppercase ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              ABOUT ME
            </motion.h2>

            {/* Intro Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`text-lg leading-relaxed max-w-lg ${
                theme === "dark" ? "text-zinc-400" : "text-gray-600"
              }`}
            >
              Hi, I'm Duncan Robert — a digital designer and developer focused
              on building meaningful and reliable digital products that make a
              real impact.
            </motion.p>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="grid grid-cols-3 gap-6 sm:gap-8"
            >
              {stats.map((stat, index) => (
                <div key={index} className="space-y-2">
                  <div
                    className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${
                      theme === "dark" ? "text-[#C4F047]" : "text-blue-500"
                    }`}
                  >
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.value.toString().replace(/[0-9]/g, "")}
                    />
                  </div>
                  <div
                    className={`text-xs sm:text-sm leading-tight ${
                      theme === "dark" ? "text-zinc-500" : "text-gray-500"
                    }`}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4"
            >
              {contactInfo.map((contact, index) => (
                <div key={index} className="flex items-baseline gap-3">
                  <span className="text-sm text-zinc-500 uppercase tracking-wider w-20">
                    {contact.label}
                  </span>
                  <span className="text-base text-zinc-300 font-medium">
                    {contact.value}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Social Media Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-4"
            >
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-zinc-700 bg-zinc-800 flex items-center justify-center text-zinc-400 hover:border-[#C4F047] hover:text-[#C4F047] transition-all duration-300"
                  onMouseEnter={() => setCursorType("hover")}
                  onMouseLeave={resetCursor}
                  aria-label={social.name}
                >
                  <span className="text-xs font-bold">{social.icon}</span>
                </a>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Link
                href="/about"
                className={`inline-flex items-center px-8 py-4 rounded-full border-2 bg-transparent font-semibold text-sm uppercase tracking-wider transition-all duration-300 ${
                  theme === "dark"
                    ? "border-zinc-700 text-white hover:border-[#C4F047] hover:text-[#C4F047] "
                    : "border-gray-400 text-gray-900 hover:border-blue-500 hover:text-blue-500 "
                }`}
                onMouseEnter={() => setCursorType("active")}
                onMouseLeave={resetCursor}
              >
                MY STORY
              </Link>
            </motion.div>
          </div>

          {/* RIGHT COLUMN - Animated Card (Mobile only) */}
          {isMobile && (
            <div className="flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{ rotate: -3 }}
              >
                <AnimatedCard
                  imageSrc={null}
                  alt="Duncan Robert - About Me"
                  rotateOnScroll={false}
                  className="w-72 h-100"
                />
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
