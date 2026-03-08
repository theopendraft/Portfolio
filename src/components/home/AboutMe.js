"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCursor } from "@/hooks/useCursor";
import { useTheme } from "@/contexts/ThemeContext";
import AnimatedCard from "@/components/shared/AnimatedCard";
import { useAnimatedCardContext } from "@/contexts/AnimatedCardContext";

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

  const stats = [
    { value: "3+", label: "Live Projects" },
    { value: "Top 2", label: "SIH '24 Finalist" },
    { value: "25%", label: "Backend Perf. Gain" },
  ];

  const contactInfo = [
    { label: "Email", value: "siddarth8818@gmail.com" },
    { label: "Phone", value: "+91 9174867756" },
    { label: "Base", value: "Chennai, India" },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/theopendraft",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/pankaj-yadav-5998b3249/",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: "Twitter",
      url: "https://twitter.com",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
  ];

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-screen flex items-center justify-center px-6 sm:px-10 py-16 sm:py-24 transition-colors duration-500 ${
        theme === "dark" ? "bg-transparent" : "bg-white"
      }`}
      style={{ position: "relative" }}
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT COLUMN - Content */}
          <div className="space-y-10">
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

            {/* Intro */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`text-lg leading-relaxed max-w-lg ${
                theme === "dark" ? "text-zinc-400" : "text-gray-600"
              }`}
            >
              Hi, I&apos;m{" "}
              <span
                className={`font-semibold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Pankaj Yadav
              </span>{" "}
              - a Full-Stack Software Engineer based in Chennai, building
              production-grade web systems with React, Node.js, and PostgreSQL.
              Currently shipping AI-integrated features at{" "}
              <a
                href="https://www.adrig.co.in/"
                target="_blank"
                rel="noopener noreferrer"
                className={`font-medium underline underline-offset-2 transition-colors duration-200 ${
                  theme === "dark"
                    ? "text-[#C4F047] hover:text-[#d4ff5a]"
                    : "text-blue-500 hover:text-blue-600"
                }`}
              >
                Adrig AI Technologies
              </a>
              .
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
                    className={`text-3xl sm:text-4xl font-bold ${
                      theme === "dark" ? "text-[#C4F047]" : "text-blue-500"
                    }`}
                    style={titleStyle}
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
              className="space-y-3"
            >
              {contactInfo.map((contact, index) => (
                <div key={index} className="flex items-baseline gap-3">
                  <span
                    className={`text-xs uppercase tracking-widest w-12 shrink-0 ${
                      theme === "dark" ? "text-zinc-600" : "text-gray-400"
                    }`}
                  >
                    {contact.label}
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      theme === "dark" ? "text-zinc-300" : "text-gray-700"
                    }`}
                  >
                    {contact.value}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-3"
            >
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    theme === "dark"
                      ? "border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:border-[#C4F047] hover:text-[#C4F047] hover:bg-[#C4F047]/5"
                      : "border-gray-300 bg-gray-50 text-gray-500 hover:border-blue-500 hover:text-blue-500 hover:bg-blue-50"
                  }`}
                  onMouseEnter={() => setCursorType("hover")}
                  onMouseLeave={resetCursor}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link
                href="/about"
                className={`inline-flex items-center px-8 py-4 rounded-full border-2 bg-transparent font-semibold text-sm uppercase tracking-wider transition-all duration-300 ${
                  theme === "dark"
                    ? "border-zinc-700 text-white hover:border-[#C4F047] hover:text-[#C4F047]"
                    : "border-gray-400 text-gray-900 hover:border-blue-500 hover:text-blue-500"
                }`}
                onMouseEnter={() => setCursorType("active")}
                onMouseLeave={resetCursor}
              >
                MY STORY
              </Link>
              <a
                href="/resume/Pankaj_Yadav_SDE_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm uppercase tracking-wider transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-[#C4F047] text-black hover:bg-[#d4ff5a]"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
                onMouseEnter={() => setCursorType("active")}
                onMouseLeave={resetCursor}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download CV
              </a>
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
                  imageSrc="/image/Pankaj_Yadav_3.jpg"
                  alt="Pankaj Yadav - About Me"
                  rotateOnScroll={false}
                  className="w-72 h-100 border-0"
                />
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
