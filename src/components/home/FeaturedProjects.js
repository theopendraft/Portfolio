"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useCursor } from "@/hooks/useCursor";
import { useTheme } from "@/contexts/ThemeContext";
import Image from "next/image";
import { featuredProjects } from "@/data/projects";

/**
 * FeaturedProjects - Cinematic project showcase with sticky card stacking
 *
 * Features:
 * - Full-screen sticky cards that stack as user scrolls
 * - CSS sticky positioning for smooth native scroll
 * - Framer Motion for entrance animations
 * - Cursor integration (active mode on hover)
 * - Mobile-responsive (simple list on small screens)
 */
export default function FeaturedProjects() {
  const { setCursorType, resetCursor } = useCursor();
  const { theme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  const titleStyle = {
    fontFamily: "'Haffer', sans-serif",
    lineHeight: "100%",
    letterSpacing: "-0.01em",
  };

  useEffect(() => {
    // Check for mobile devices
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      id="projects"
      className={`relative transition-colors duration-500 ${
        theme === "dark" ? "bg-transparent" : "bg-gray-100"
      }`}
    >
      {/* Section Intro */}
      <div className="relative px-4 sm:px-8 py-16 sm:py-24 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`text-6xl lg:text-7xl font-bold tracking-tight uppercase mb-6 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
          style={titleStyle}
        >
          Featured Projects
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`text-lg max-w-2xl mx-auto ${
            theme === "dark" ? "text-zinc-400" : "text-gray-600"
          }`}
        >
          A curated selection of projects that showcase my approach to solving
          complex problems with elegant solutions.
        </motion.p>
      </div>

      {/* Sticky Cards Container */}
      {isMobile ? (
        /* Mobile: Simple Stack */
        <div className="space-y-6 px-4 sm:px-8 pb-16 sm:pb-24">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative w-full"
            >
              {/* Project Card */}
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block group cursor-none"
                onMouseEnter={() => setCursorType("active")}
                onMouseLeave={resetCursor}
              >
                <div
                  className={`relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center rounded-3xl overflow-hidden border p-8 lg:p-16 transition-all duration-500 ${
                    theme === "dark"
                      ? "bg-zinc-900 border-zinc-800 hover:border-[#C4F047]"
                      : "bg-white border-gray-300 hover:border-blue-500"
                  }`}
                >
                  {/* Left: Project Image */}
                  <div className="relative aspect-4/3 lg:aspect-square rounded-2xl overflow-hidden bg-zinc-900">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width:1024px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Right: Project Info */}
                  <div className="space-y-5">
                    {/* Badge + Number row */}
                    <div className="flex items-center gap-3">
                      {project.badge && (
                        <span
                          className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                            theme === "dark"
                              ? "bg-[#C4F047]/10 text-[#C4F047]"
                              : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {project.badge}
                        </span>
                      )}
                      <span
                        className={`text-xs font-bold tracking-widest uppercase ${
                          theme === "dark" ? "text-zinc-600" : "text-gray-400"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className={`text-4xl lg:text-5xl font-bold leading-tight transition-colors duration-300 ${
                        theme === "dark"
                          ? "text-white group-hover:text-[#C4F047]"
                          : "text-gray-900 group-hover:text-blue-500"
                      }`}
                      style={titleStyle}
                    >
                      {project.title}
                    </h3>

                    {/* Subtitle */}
                    {project.subtitle && (
                      <p
                        className={`text-sm font-medium uppercase tracking-wider ${
                          theme === "dark" ? "text-zinc-500" : "text-gray-400"
                        }`}
                      >
                        {project.subtitle}
                      </p>
                    )}

                    {/* Description */}
                    <p
                      className={`text-base leading-relaxed ${
                        theme === "dark" ? "text-zinc-400" : "text-gray-600"
                      }`}
                    >
                      {project.shortDescription}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, i) => (
                        <span
                          key={i}
                          className={`px-3 py-1.5 text-xs font-medium rounded-full border ${
                            theme === "dark"
                              ? "bg-zinc-800 text-zinc-300 border-zinc-700"
                              : "bg-gray-100 text-gray-700 border-gray-300"
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links Row */}
                    <div className="flex items-center gap-4 pt-2">
                      <div
                        className={`flex items-center gap-2 transition-colors duration-300 ${
                          theme === "dark"
                            ? "text-white group-hover:text-[#C4F047]"
                            : "text-gray-900 group-hover:text-blue-500"
                        }`}
                      >
                        <span className="text-sm font-semibold uppercase tracking-wider">
                          View Project
                        </span>
                        <svg
                          className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-300 ${
                            theme === "dark"
                              ? "text-zinc-600 hover:text-[#C4F047]"
                              : "text-gray-400 hover:text-blue-500"
                          }`}
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                          </svg>
                          Source
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Desktop: Sticky Stacking Cards */
        <div
          ref={containerRef}
          className="relative"
          style={{
            height: `${featuredProjects.length * 85}vh`,
            position: "relative",
          }}
        >
          <div className="relative">
            {featuredProjects.map((project, index) => {
              const targetScale = 1 - (featuredProjects.length - index) * 0.05;

              return (
                <StickyCard
                  key={project.id}
                  project={project}
                  index={index}
                  totalCards={featuredProjects.length}
                  targetScale={targetScale}
                  containerRef={containerRef}
                  setCursorType={setCursorType}
                  resetCursor={resetCursor}
                  theme={theme}
                  titleStyle={titleStyle}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Exit CTA */}
      <div
        className={`relative px-8 pb-16 sm:pb-20 text-center transition-colors duration-500 ${
          theme === "dark"
            ? "bg-black-800"
            : "bg-linear-to-b from-gray-100 to-gray-200"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <p
            className={`text-lg ${
              theme === "dark" ? "text-zinc-500" : "text-gray-500"
            }`}
          >
            Want to see more?
          </p>
          <Link
            href="/projects"
            className={`inline-flex items-center gap-3 px-10 py-5 rounded-full border-2 bg-transparent font-semibold text-base uppercase tracking-wider transition-all duration-300 ${
              theme === "dark"
                ? "border-zinc-700 text-white hover:border-[#C4F047] hover:text-[#C4F047] hover:shadow-[0_0_30px_rgba(196,240,71,0.3)]"
                : "border-gray-400 text-gray-900 hover:border-blue-500 hover:text-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
            }`}
            onMouseEnter={() => setCursorType("active")}
            onMouseLeave={resetCursor}
          >
            Browse All Projects
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// Separate component for each sticky card with scroll-linked animations
function StickyCard({
  project,
  index,
  totalCards,
  targetScale,
  containerRef,
  setCursorType,
  resetCursor,
  theme,
  titleStyle,
}) {
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate this card's specific range based on its index
  const cardStart = index / totalCards;
  const cardEnd = (index + 1) / totalCards;

  const scale = useTransform(
    scrollYProgress,
    [cardStart, cardEnd],
    [1, targetScale],
  );

  // Only fade out non-last cards
  const isLastCard = index === totalCards - 1;
  const opacity = useTransform(
    scrollYProgress,
    [cardStart, cardEnd - 0.1, cardEnd],
    isLastCard ? [1, 1, 1] : [1, 0.8, 0],
  );

  return (
    <motion.section
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="sticky px-5 bg-transparent flex items-center"
      style={{
        top: "80px",
        scale,
        opacity,
        willChange: "transform, opacity",
        height: "calc(100vh - 160px)",
      }}
    >
      <div className="max-w-7xl mx-auto w-full h-7xl">
        {/* Project Card */}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block group cursor-none h-full"
          onMouseEnter={() => setCursorType("active")}
          onMouseLeave={resetCursor}
        >
          <div
            className={`relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center rounded-3xl overflow-hidden border p-8 lg:p-16 transition-all duration-500 h-full ${
              theme === "dark"
                ? "bg-zinc-900 border-zinc-800 hover:border-[#C4F047]"
                : "bg-white border-gray-300 hover:border-blue-500"
            }`}
          >
            {/* Left: Project Image */}
            <div className="relative aspect-4/3 lg:aspect-square rounded-2xl overflow-hidden bg-zinc-900">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Right: Project Info */}
            <div className="space-y-5">
              {/* Badge + Number row */}
              <div className="flex items-center gap-3">
                {project.badge && (
                  <span
                    className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                      theme === "dark"
                        ? "bg-[#C4F047]/10 text-[#C4F047]"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {project.badge}
                  </span>
                )}
                <span
                  className={`text-xs font-bold tracking-widest uppercase ${
                    theme === "dark" ? "text-zinc-600" : "text-gray-400"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Title */}
              <h3
                className={`text-4xl lg:text-5xl font-bold leading-tight transition-colors duration-300 ${
                  theme === "dark"
                    ? "text-white group-hover:text-[#C4F047]"
                    : "text-gray-900 group-hover:text-blue-500"
                }`}
                style={titleStyle}
              >
                {project.title}
              </h3>

              {/* Subtitle */}
              {project.subtitle && (
                <p
                  className={`text-sm font-medium uppercase tracking-wider ${
                    theme === "dark" ? "text-zinc-500" : "text-gray-400"
                  }`}
                >
                  {project.subtitle}
                </p>
              )}

              {/* Description */}
              <p
                className={`text-base leading-relaxed ${
                  theme === "dark" ? "text-zinc-400" : "text-gray-600"
                }`}
              >
                {project.shortDescription}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full border ${
                      theme === "dark"
                        ? "bg-black-800 text-zinc-300 border-zinc-700"
                        : "bg-gray-100 text-gray-700 border-gray-300"
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links Row */}
              <div className="flex items-center gap-4 pt-2">
                <div
                  className={`flex items-center gap-2 transition-colors duration-300 ${
                    theme === "dark"
                      ? "text-white group-hover:text-[#C4F047]"
                      : "text-gray-900 group-hover:text-blue-500"
                  }`}
                >
                  <span className="text-sm font-semibold uppercase tracking-wider">
                    View Project
                  </span>
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-300 ${
                      theme === "dark"
                        ? "text-zinc-600 hover:text-[#C4F047]"
                        : "text-gray-400 hover:text-blue-500"
                    }`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    Source
                  </a>
                )}
              </div>
            </div>
          </div>
        </a>
      </div>
    </motion.section>
  );
}
