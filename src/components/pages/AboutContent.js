"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import { useCursor } from "@/hooks/useCursor";
import MagneticButton from "@/components/shared/MagneticButton";

// ─── Data ────────────────────────────────────────────────────────────────────

// ── To add a new role: push a new object into this array.
// ── Roles are displayed newest-first as a connected timeline.
const experience = [
  {
    company: "Adrig AI Technologies",
    url: "https://www.adrig.co.in/",
    role: "Software Developer",
    type: "Full-Time",
    period: "Jan 2026 – Present",
    location: "Chennai, Tamil Nadu",
    current: true,
    highlights: [
      "Delivered end-to-end full-stack features for enterprise AI workflow systems using React and Node.js.",
      "Designed and implemented REST APIs handling transactional database operations and secure data flows.",
      "Optimized SQL queries and indexing strategies, improving backend response time by 25%.",
      "Refactored frontend state management to reduce redundant API calls and improve UI responsiveness.",
      "Resolved cross-layer production issues (UI, API, DB), reducing recurring defects by 30%.",
      "Contributed to Agile sprint planning and peer code reviews across the engineering team.",
    ],
  },
  {
    company: "Adrig AI Technologies",
    url: "https://www.adrig.co.in/",
    role: "SDE Intern",
    type: "Internship",
    period: "Oct 2025 – Jan 2026",
    location: "Chennai, Tamil Nadu",
    current: false,
    highlights: [
      "Onboarded onto production AI workflow systems and began shipping features within the first sprint.",
      "Worked across the React frontend and Node.js backend, building reusable components and API integrations.",
      "Participated in Agile sprint cycles, code reviews, and cross-team technical discussions.",
    ],
  },
];

const education = [
  {
    degree: "B.Tech - Computer Science & Engineering",
    institution: "Samrat Ashok Technological Institute",
    location: "Vidisha, Madhya Pradesh",
    period: "2022 - 2026",
    cgpa: "7.27",
    note: null, // placeholder - add relevant coursework, electives, or thesis here
  },
];

const recognition = [
  {
    badge: "National Finalist",
    title: "Smart India Hackathon 2024",
    description:
      "Ranked in the top 2 nationally among 100+ competing teams. Led the engineering effort to build a production-grade government-scale solution within 36 hours.",
  },
  {
    badge: "Founder",
    title: "The Creator Dan",
    description:
      "Founded a creative-tech student community bridging design thinking and software engineering - cultivating a space for student makers and builders at university level.",
  },
  {
    badge: "Co-Organiser",
    title: "Google Developer Group, SATI",
    description:
      "Co-organised developer workshops, tech talks, and open-source events at the GDG chapter - building technical culture and developer community across 200+ students.",
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function AboutContent() {
  const { theme } = useTheme();
  const { setCursorType, resetCursor } = useCursor();

  const titleStyle = {
    fontFamily: "var(--font-haffer), 'Haffer', sans-serif",
    lineHeight: "100%",
    letterSpacing: "-0.03em",
  };

  const sectionLabel = (text) => (
    <p
      className={`text-xs uppercase tracking-[0.25em] font-medium mb-4 ${
        theme === "dark" ? "text-zinc-500" : "text-gray-400"
      }`}
    >
      {text}
    </p>
  );

  const divider = (
    <div
      className={`w-full h-px my-16 sm:my-20 ${
        theme === "dark" ? "bg-zinc-800" : "bg-gray-200"
      }`}
    />
  );

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <main
      className={`min-h-screen transition-colors duration-500 ${
        theme === "dark" ? "bg-transparent" : "bg-white"
      }`}
    >
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative px-6 sm:px-10 lg:px-16 pt-38 pb-0 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-0 lg:gap-16 items-end min-h-[82vh]">

          {/* LEFT — text block */}
          <div className="flex flex-col justify-end pb-16 lg:pb-20 z-10">
            <motion.p
              {...fadeUp(0.08)}
              className={`text-xs uppercase tracking-[0.3em] font-medium mb-6 ${
                theme === "dark" ? "text-zinc-500" : "text-gray-400"
              }`}
            >
              Full-Stack Engineer · Chennai, India
            </motion.p>

            {/* Giant name */}
            <motion.h1
              {...fadeUp(0.12)}
              className={`font-bold leading-[0.9] tracking-tight mb-8 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
              style={{ ...titleStyle, fontSize: "clamp(4rem, 10vw, 9rem)" }}
            >
              PANKAJ
              <br />
              <span className={theme === "dark" ? "text-[#C4F047]" : "text-blue-500"}>
                YADAV.
              </span>
            </motion.h1>

            {/* Tags row */}
            <motion.div {...fadeUp(0.18)} className="flex flex-wrap gap-2 mb-7">
              {[
                { label: "Available for Work", accent: true },
                { label: "React · Node.js · PostgreSQL", accent: false },
                { label: "Open to Opportunities", accent: false },
              ].map(({ label, accent }) => (
                <span
                  key={label}
                  className={`text-xs font-semibold px-3.5 py-1.5 rounded-full border ${
                    accent
                      ? theme === "dark"
                        ? "bg-[#C4F047]/10 border-[#C4F047]/40 text-[#C4F047]"
                        : "bg-blue-50 border-blue-300 text-blue-600"
                      : theme === "dark"
                        ? "border-zinc-700 text-zinc-400"
                        : "border-gray-300 text-gray-600"
                  }`}
                >
                  {label}
                </span>
              ))}
            </motion.div>

            {/* One-liner bio */}
            <motion.p
              {...fadeUp(0.22)}
              className={`text-base leading-relaxed max-w-md mb-8 ${
                theme === "dark" ? "text-zinc-400" : "text-gray-600"
              }`}
            >
              I build production-grade web systems — full-stack, from schema
              design to polished UI. Currently shipping AI-integrated enterprise
              features at{" "}
              <a
                href="https://www.adrig.co.in/"
                target="_blank"
                rel="noopener noreferrer"
                className={`font-medium underline underline-offset-2 transition-colors ${
                  theme === "dark"
                    ? "text-[#C4F047] hover:text-[#d4ff5a]"
                    : "text-blue-500 hover:text-blue-600"
                }`}
              >
                Adrig AI Technologies
              </a>
              .
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.26)} className="flex flex-wrap gap-3">
              <MagneticButton>
                <a
                  href="/resume/Pankaj_Yadav_SDE_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm uppercase tracking-wider transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-[#C4F047] text-black hover:bg-[#d4ff5a]"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                  onMouseEnter={() => setCursorType("active")}
                  onMouseLeave={resetCursor}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download CV
                </a>
              </MagneticButton>
              <MagneticButton>
                <Link
                  href="/contact"
                  className={`inline-flex items-center px-6 py-3 rounded-full border-2 font-semibold text-sm uppercase tracking-wider transition-all duration-300 ${
                    theme === "dark"
                      ? "border-zinc-700 text-white hover:border-[#C4F047] hover:text-[#C4F047]"
                      : "border-gray-400 text-gray-900 hover:border-blue-500 hover:text-blue-500"
                  }`}
                  onMouseEnter={() => setCursorType("active")}
                  onMouseLeave={resetCursor}
                >
                  Get in Touch
                </Link>
              </MagneticButton>
            </motion.div>
          </div>

          {/* RIGHT — portrait, flush to bottom */}
          <motion.div
            {...fadeUp(0.15)}
            className="hidden lg:block relative self-end h-[75vh] max-h-[680px] rounded-t-3xl overflow-hidden"
          >
            <Image
              src="/image/Pankaj_Yadav_4.jpg"
              alt="Pankaj Yadav"
              fill
              className="object-cover object-top"
              sizes="420px"
              priority
            />
            {/* Bottom fade */}
            <div
              className={`absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t ${
                theme === "dark" ? "from-zinc-950" : "from-white"
              } to-transparent`}
            />
          </motion.div>

          {/* Mobile portrait */}
          <motion.div
            {...fadeUp(0.18)}
            className="lg:hidden relative w-full h-64 rounded-2xl overflow-hidden mt-4 mb-10"
          >
            <Image
              src="/image/Pankaj_Yadav_4.jpg"
              alt="Pankaj Yadav"
              fill
              className="object-cover object-top"
              sizes="100vw"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* ── Story ────────────────────────────────────────────────────────── */}
      <section
        className={`px-6 sm:px-10 lg:px-16 py-16 sm:py-20 transition-colors duration-500 ${
          theme === "dark" ? "bg-zinc-900/40" : "bg-gray-50"
        }`}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 py-6 lg:py-16">
          <div className="lg:col-span-2 space-y-5">
            <motion.div {...fadeUp(0)}>
              {sectionLabel("Story")}
            </motion.div>
            <motion.h2
              {...fadeUp(0.05)}
              className={`text-4xl sm:text-5xl font-bold tracking-tight ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
              style={titleStyle}
            >
              The Engineer Behind the Work
            </motion.h2>
            <motion.div
              {...fadeUp(0.1)}
              className={`space-y-4 text-base leading-relaxed ${
                theme === "dark" ? "text-zinc-400" : "text-gray-600"
              }`}
            >
              <p>
                I'm a Full-Stack Software Engineer specializing in React,
                Node.js, and PostgreSQL - with hands-on experience building
                production-grade web and AI-integrated systems. My focus is on
                delivering reliable, scalable features across the entire stack:
                from schema design and API architecture down to frontend state
                management.
              </p>
              <p>
                I believe great software is reliable first, performant second,
                and polished third. That means investing in solid data models,
                clean API design, and a UI that doesn't fight its own data
                layer. I take a structured debugging approach and prefer
                understanding root causes over quick patches.
              </p>
              <p>
                Outside of shipping features, I actively engage with the
                developer community - as a GDG co-organiser at SATI and the
                founder of{" "}
                <span
                  className={
                    theme === "dark" ? "text-zinc-200" : "text-gray-800"
                  }
                >
                  The Creator Dan
                </span>
                , a creative-tech community where student builders share what
                they're making.
              </p>
            </motion.div>
          </div>

          {/* Quick stats */}
          <motion.div {...fadeUp(0.15)} className="space-y-6">
            {sectionLabel("At a Glance")}
            {[
              { label: "Current Role", value: "Software Developer", sub: "Adrig AI Technologies" },
              { label: "Education", value: "B.Tech CSE", sub: "SATI Vidisha · CGPA 7.27" },
              { label: "Location", value: "Chennai", sub: "Tamil Nadu, India" },
              { label: "Status", value: "Available", sub: "Open to new opportunities" },
            ].map((item) => (
              <div
                key={item.label}
                className={`pb-5 border-b last:border-0 ${
                  theme === "dark" ? "border-zinc-800" : "border-gray-200"
                }`}
              >
                <p
                  className={`text-xs uppercase tracking-widest mb-1 ${
                    theme === "dark" ? "text-zinc-600" : "text-gray-400"
                  }`}
                >
                  {item.label}
                </p>
                <p
                  className={`font-semibold ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {item.value}
                </p>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-zinc-500" : "text-gray-500"
                  }`}
                >
                  {item.sub}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Experience ───────────────────────────────────────────────────── */}
      <section className="px-6 sm:px-10 lg:px-16 py-16 sm:py-24 max-w-7xl mx-auto">
        <div className="py-6 lg:py-16">
          <motion.div {...fadeUp(0)} className="mb-14">
            {sectionLabel("Experience")}
            <h2
              className={`text-4xl sm:text-5xl font-bold tracking-tight ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
              style={titleStyle}
            >
              Where I've Worked
            </h2>
          </motion.div>

          {/* Connected timeline — add new roles to the experience[] array above */}
          <div className="relative">
            {/* Vertical connector line */}
            <div
              className={`absolute left-[7px] top-3 bottom-3 w-px ${
                theme === "dark" ? "bg-zinc-800" : "bg-gray-200"
              }`}
            />

            <div className="space-y-0">
              {experience.map((job, i) => (
                <motion.div
                  key={`${job.role}-${i}`}
                  {...fadeUp(i * 0.1)}
                  className="relative pl-10 pb-10 last:pb-0"
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-0 top-[10px] w-[15px] h-[15px] rounded-full border-2 z-10 ${
                      job.current
                        ? theme === "dark"
                          ? "bg-[#C4F047] border-[#C4F047]"
                          : "bg-blue-500 border-blue-500"
                        : theme === "dark"
                          ? "bg-zinc-950 border-zinc-600"
                          : "bg-white border-gray-400"
                    }`}
                  >
                    {/* Pulsing ring on current role */}
                    {job.current && (
                      <span
                        className={`absolute inset-0 rounded-full animate-ping opacity-40 ${
                          theme === "dark" ? "bg-[#C4F047]" : "bg-blue-500"
                        }`}
                      />
                    )}
                  </div>

                  {/* Card */}
                  <div
                    className={`rounded-2xl border p-7 lg:p-9 transition-colors duration-300 ${
                      theme === "dark"
                        ? "bg-zinc-900 border-zinc-800"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                      <div>
                        <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                          <h3
                            className={`text-xl font-bold ${
                              theme === "dark" ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {job.role}
                          </h3>
                          <span
                            className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full ${
                              job.current
                                ? theme === "dark"
                                  ? "bg-[#C4F047]/10 text-[#C4F047]"
                                  : "bg-blue-100 text-blue-600"
                                : theme === "dark"
                                  ? "bg-zinc-800 text-zinc-400"
                                  : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {job.type}
                          </span>
                          {job.current && (
                            <span
                              className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full flex items-center gap-1.5 ${
                                theme === "dark"
                                  ? "bg-green-500/10 text-green-400"
                                  : "bg-green-50 text-green-600"
                              }`}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                              Current
                            </span>
                          )}
                        </div>
                        <a
                          href={job.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-sm font-medium transition-colors ${
                            theme === "dark"
                              ? "text-zinc-400 hover:text-[#C4F047]"
                              : "text-gray-500 hover:text-blue-500"
                          }`}
                        >
                          {job.company} ↗
                        </a>
                      </div>
                      <div className="shrink-0 sm:text-right">
                        <p
                          className={`text-sm font-semibold ${
                            theme === "dark" ? "text-zinc-300" : "text-gray-700"
                          }`}
                        >
                          {job.period}
                        </p>
                        <p
                          className={`text-xs mt-0.5 ${
                            theme === "dark" ? "text-zinc-600" : "text-gray-400"
                          }`}
                        >
                          {job.location}
                        </p>
                      </div>
                    </div>

                    {/* Highlights */}
                    {job.highlights.length > 0 && (
                      <ul className="space-y-2.5">
                        {job.highlights.map((point, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <span
                              className={`mt-[7px] w-1.5 h-1.5 rounded-full shrink-0 ${
                                theme === "dark" ? "bg-[#C4F047]" : "bg-blue-500"
                              }`}
                            />
                            <span
                              className={`text-sm leading-relaxed ${
                                theme === "dark" ? "text-zinc-400" : "text-gray-600"
                              }`}
                            >
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Education ────────────────────────────────────────────────────── */}
      <section
        className={`px-6 sm:px-10 lg:px-16 py-16 sm:py-24 transition-colors duration-500 ${
          theme === "dark" ? "bg-zinc-900/40" : "bg-gray-50"
        }`}
      >
        <div className="max-w-7xl mx-auto py-6 lg:py-16">
          <motion.div {...fadeUp(0)} className="mb-12">
            {sectionLabel("Education")}
            <h2
              className={`text-4xl sm:text-5xl font-bold tracking-tight ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
              style={titleStyle}
            >
              Where I Studied
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {education.map((edu, i) => (
              <motion.div
                key={edu.institution}
                {...fadeUp(i * 0.08)}
                className={`rounded-2xl border p-8 ${
                  theme === "dark"
                    ? "bg-zinc-900 border-zinc-800"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="space-y-4">
                  <h3
                    className={`text-xl font-bold ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {edu.degree}
                  </h3>
                  <div
                    className={`text-sm ${
                      theme === "dark" ? "text-zinc-400" : "text-gray-600"
                    }`}
                  >
                    <p className="font-medium">{edu.institution}</p>
                    <p>{edu.location}</p>
                  </div>
                  <div className="flex gap-6">
                    <div>
                      <p
                        className={`text-xs uppercase tracking-widest mb-1 ${
                          theme === "dark" ? "text-zinc-600" : "text-gray-400"
                        }`}
                      >
                        Period
                      </p>
                      <p
                        className={`font-semibold ${
                          theme === "dark" ? "text-zinc-200" : "text-gray-800"
                        }`}
                      >
                        {edu.period}
                      </p>
                    </div>
                    <div>
                      <p
                        className={`text-xs uppercase tracking-widest mb-1 ${
                          theme === "dark" ? "text-zinc-600" : "text-gray-400"
                        }`}
                      >
                        CGPA
                      </p>
                      <p
                        className={`text-2xl font-bold ${
                          theme === "dark" ? "text-[#C4F047]" : "text-blue-500"
                        }`}
                        style={titleStyle}
                      >
                        {edu.cgpa}
                      </p>
                    </div>
                  </div>
                  {/* edu.note placeholder - fill to show additional details */}
                  {edu.note && (
                    <p
                      className={`text-sm ${
                        theme === "dark" ? "text-zinc-500" : "text-gray-500"
                      }`}
                    >
                      {edu.note}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* DSA / Problem Solving card */}
            <motion.div
              {...fadeUp(0.08)}
              className={`rounded-2xl border p-8 ${
                theme === "dark"
                  ? "bg-zinc-900 border-zinc-800"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="space-y-4">
                <h3
                  className={`text-xl font-bold ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Data Structures & Algorithms
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    theme === "dark" ? "text-zinc-400" : "text-gray-600"
                  }`}
                >
                  Regularly practising DSA - Arrays, Trees, Graphs, Dynamic
                  Programming. Strong understanding of time and space complexity
                  analysis. Comfortable solving medium-level algorithmic
                  challenges.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {["Arrays", "Trees", "Graphs", "Recursion", "Hashing", "DP"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className={`text-xs px-2.5 py-1 rounded-full border font-medium ${
                          theme === "dark"
                            ? "border-zinc-700 bg-zinc-800 text-zinc-400"
                            : "border-gray-200 bg-gray-50 text-gray-600"
                        }`}
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Recognition ──────────────────────────────────────────────────── */}
      <section className="px-6 sm:px-10 lg:px-16 py-16 sm:py-24 max-w-7xl mx-auto">
        <div className="py-6 lg:py-24 ">
        <motion.div {...fadeUp(0)} className="mb-12">
          {sectionLabel("Recognition")}
          <h2
            className={`text-4xl sm:text-5xl font-bold tracking-tight ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
            style={titleStyle}
          >
            Beyond the Code
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recognition.map((item, i) => (
            <motion.div
              key={item.title}
              {...fadeUp(i * 0.08)}
              className={`rounded-2xl border p-8 flex flex-col gap-4 ${
                theme === "dark"
                  ? "bg-zinc-900 border-zinc-800"
                  : "bg-white border-gray-200"
              }`}
            >
              <span
                className={`self-start text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                  theme === "dark"
                    ? "bg-[#C4F047]/10 text-[#C4F047]"
                    : "bg-blue-100 text-blue-600"
                }`}
              >
                {item.badge}
              </span>
              <h4
                className={`text-xl font-bold leading-snug ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {item.title}
              </h4>
              <p
                className={`text-sm leading-relaxed flex-1 ${
                  theme === "dark" ? "text-zinc-400" : "text-gray-600"
                }`}
              >
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section
        className={`px-6 sm:px-10 lg:px-16 py-20 sm:py-28 text-center transition-colors duration-500 ${
          theme === "dark" ? "bg-zinc-900/40" : "bg-gray-50"
        }`}
      >
        <div className="max-w-2xl mx-auto space-y-6 py-6 lg:py-24">
          <motion.h2
            {...fadeUp(0)}
            className={`text-5xl sm:text-6xl font-bold tracking-tight ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
            style={titleStyle}
          >
            Let's Build Something
          </motion.h2>
          <motion.p
            {...fadeUp(0.08)}
            className={`text-base ${
              theme === "dark" ? "text-zinc-400" : "text-gray-600"
            }`}
          >
            Open to full-time roles, freelance projects, and meaningful
            collaborations.
          </motion.p>
          <motion.div
            {...fadeUp(0.14)}
            className="flex flex-wrap justify-center gap-3 pt-2"
          >
            <MagneticButton>
              <Link
                href="/contact"
                className={`inline-flex items-center px-8 py-4 rounded-full font-semibold text-sm uppercase tracking-wider transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-[#C4F047] text-black hover:bg-[#d4ff5a]"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
                onMouseEnter={() => setCursorType("active")}
                onMouseLeave={resetCursor}
              >
                Get in Touch
              </Link>
            </MagneticButton>
            <MagneticButton>
              <a
                href="https://www.linkedin.com/in/pankaj-yadav-5998b3249/"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center px-8 py-4 rounded-full border-2 font-semibold text-sm uppercase tracking-wider transition-all duration-300 ${
                  theme === "dark"
                    ? "border-zinc-700 text-white hover:border-[#C4F047] hover:text-[#C4F047]"
                    : "border-gray-400 text-gray-900 hover:border-blue-500 hover:text-blue-500"
                }`}
                onMouseEnter={() => setCursorType("active")}
                onMouseLeave={resetCursor}
              >
                LinkedIn Profile
              </a>
            </MagneticButton>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
