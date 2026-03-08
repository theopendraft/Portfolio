"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

/**
 * Tech Stack section
 * Shows all technologies grouped by category with brand-color indicators.
 *
 * TO ADD MORE TOOLS: append items to the relevant category in `techCategories`.
 * TO ADD A NEW CATEGORY: push a new { label, items } object to `techCategories`.
 */

const techCategories = [
  {
    label: "Languages",
    items: [
      { name: "JavaScript", dot: "#F7DF1E" },
      { name: "TypeScript", dot: "#3178C6" },
      { name: "Python", dot: "#3776AB" },
      { name: "SQL", dot: "#4479A1" },
      // placeholder - add more languages as you learn them
    ],
  },
  {
    label: "Frameworks & Libraries",
    items: [
      { name: "React.js", dot: "#61DAFB" },
      { name: "Next.js", dot: "#aaaaaa" },
      { name: "Node.js", dot: "#339933" },
      { name: "Express.js", dot: "#888888" },
      { name: "Tailwind CSS", dot: "#06B6D4" },
      { name: "Framer Motion", dot: "#FF0055" },
      // placeholder - add new frameworks here
    ],
  },
  {
    label: "Databases & ORM",
    items: [
      { name: "PostgreSQL", dot: "#4169E1" },
      { name: "Prisma", dot: "#5A67D8" },
      // placeholder - add Redis, MongoDB etc. when applicable
    ],
  },
  {
    label: "AI & Integrations",
    items: [
      { name: "LLM APIs", dot: "#10B981" },
      { name: "OpenAI", dot: "#10B981" },
      { name: "Vector Search", dot: "#8B5CF6" },
      // placeholder - add specific AI tools / providers as you work with them
    ],
  },
  {
    label: "Tools & Platforms",
    items: [
      { name: "Git", dot: "#F05032" },
      { name: "Docker", dot: "#2496ED" },
      { name: "Postman", dot: "#FF6C37" },
      { name: "Figma", dot: "#F24E1E" },
      { name: "Vercel", dot: "#000000" },
      { name: "AWS", dot: "#FF9900" },
    ],
  },
];

export default function TechStack() {
  const { theme } = useTheme();

  const titleStyle = {
    fontFamily: "'Haffer', sans-serif",
    lineHeight: "100%",
    letterSpacing: "-0.03em",
  };

  return (
    <section
      className={`relative px-6 sm:px-10 lg:px-16 py-20 lg:py-28 transition-colors duration-500 ${
        theme === "dark" ? "bg-transparent" : "bg-white"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`text-xs uppercase tracking-[0.25em] font-medium mb-3 ${
                theme === "dark" ? "text-zinc-500" : "text-gray-400"
              }`}
            >
              Stack
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className={`text-5xl lg:text-6xl font-bold tracking-tight ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
              style={titleStyle}
            >
              Tech I Work With
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`text-sm max-w-xs lg:text-right ${
              theme === "dark" ? "text-zinc-500" : "text-gray-400"
            }`}
          >
            Tools chosen for each project based on fit - not trend.
          </motion.p>
        </div>

        {/* Categories */}
        <div className="space-y-10">
          {techCategories.map((category, catIndex) => (
            <motion.div
              key={category.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: catIndex * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`flex flex-col sm:flex-row sm:items-start gap-5 pb-10 ${
                catIndex < techCategories.length - 1
                  ? theme === "dark"
                    ? "border-b border-zinc-800/60"
                    : "border-b border-gray-100"
                  : ""
              }`}
            >
              {/* Category label */}
              <div className="sm:w-48 shrink-0">
                <span
                  className={`text-xs font-semibold uppercase tracking-widest ${
                    theme === "dark" ? "text-zinc-600" : "text-gray-400"
                  }`}
                >
                  {category.label}
                </span>
              </div>

              {/* Tech pills */}
              <div className="flex flex-wrap gap-2.5">
                {category.items.map((tech, techIndex) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -2 }}
                    transition={{
                      default: { duration: 0.3, delay: catIndex * 0.04 + techIndex * 0.03 },
                      y: { type: "spring", stiffness: 400, damping: 20 },
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium cursor-default select-none transition-colors duration-200 ${
                      theme === "dark"
                        ? "bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-600"
                        : "bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    {/* Brand color dot */}
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: tech.dot }}
                    />
                    {tech.name}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
