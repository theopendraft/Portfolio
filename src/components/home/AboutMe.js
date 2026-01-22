"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
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

    const titleStyle = {
    fontFamily: "'Haffer', sans-serif",
    lineHeight: "100%",
    letterSpacing: "-0.03em",
  };

  useEffect(() => {
    if (sectionRef.current) {
      registerSection("ABOUT", sectionRef.current);
    }
  }, [registerSection]);

  // Stats data
  const stats = [
    { value: "23+", label: "Projects Completed" },
    { value: "1", label: "Years Experience" },
    { value: "10+", label: "Happy Clients" },
  ];

  // Contact info
  const contactInfo = [
    { label: "Phone", value: "+91 9174867756" },
    { label: "Email", value: "py898969@gmail.com" },
  ];

  // Social links
  const socialLinks = [
    { name: "GitHub", url: "https://github/theopendraft.com", icon: "GH" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/pankaj-yadav-5998b3249/", icon: "IN" },
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
              style={titleStyle}
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
              Hi, I'm Pankaj Robert — a digital designer and developer focused
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
                    {stat.value}
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
                  alt="Pankaj Robert - About Me"
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
