"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { faqs } from "@/data/faq";

/**
 * FAQ - Frequently Asked Questions section
 *
 * Features:
 * - Two-column layout (sticky left, scrollable right)
 * - Accordion-style Q&A
 * - Only one item open at a time
 * - Smooth height animations
 * - Numbered questions
 * - Keyboard accessible
 */
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const faqContainerRef = useRef(null);
  const { theme } = useTheme();

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleKeyPress = (e, index) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleFAQ(index);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        faqContainerRef.current &&
        !faqContainerRef.current.contains(event.target)
      ) {
        setOpenIndex(null);
      }
    };

    if (openIndex !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openIndex]);

  return (
    <section
      className={`relative px-4 sm:px-8 py-16 sm:py-24 lg:py-32 transition-colors duration-500 ${
        theme === "dark" ? "bg-black" : "bg-gray-50"
      }`}
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24">
          {/* LEFT COLUMN - Sticky Header */}
          <div className="lg:sticky lg:top-32 lg:self-start space-y-4 sm:space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight uppercase leading-tight ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Frequently Asked Questions
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
              className={`text-base sm:text-lg leading-relaxed ${
                theme === "dark" ? "text-zinc-400" : "text-gray-600"
              }`}
            >
              Have questions? I've compiled answers to the most common inquiries
              about my services, process, and approach.
            </motion.p>
          </div>

          {/* RIGHT COLUMN - FAQ Accordion */}
          <div ref={faqContainerRef} className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div
                  className={`border rounded-2xl overflow-hidden backdrop-blur-sm transition-colors duration-300 ${
                    theme === "dark"
                      ? "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700"
                      : "border-gray-300 bg-white/50 hover:border-gray-400"
                  }`}
                >
                  {/* Question Button */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    className={`w-full px-6 sm:px-8 py-5 sm:py-6 flex items-start gap-4 sm:gap-6 text-left focus:outline-none focus:ring-0 focus:ring-inset ${
                      theme === "dark"
                        ? "focus:ring-[#C4F047]"
                        : "focus:ring-blue-500"
                    }`}
                    aria-expanded={openIndex === index}
                    aria-controls={`faq-answer-${faq.id}`}
                  >
                    {/* Number */}
                    <div className="shrink-0 w-8 h-8 flex items-center justify-center">
                      <span
                        className={`
                        text-sm font-bold transition-colors duration-300
                        ${
                          openIndex === index
                            ? theme === "dark"
                              ? "text-[#C4F047]"
                              : "text-blue-500"
                            : theme === "dark"
                              ? "text-zinc-600"
                              : "text-gray-400"
                        }
                      `}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Question */}
                    <div className="grow">
                      <h3
                        className={`
                        text-lg lg:text-xl font-semibold transition-colors duration-300
                        ${
                          openIndex === index
                            ? theme === "dark"
                              ? "text-[#C4F047]"
                              : "text-blue-500"
                            : theme === "dark"
                              ? "text-white"
                              : "text-gray-900"
                        }
                      `}
                      >
                        {faq.question}
                      </h3>
                    </div>

                    {/* Chevron Icon */}
                    <div className="shrink-0">
                      <motion.svg
                        className={`
                          w-6 h-6 transition-colors duration-300
                          ${
                            openIndex === index
                              ? theme === "dark"
                                ? "text-[#C4F047]"
                                : "text-blue-500"
                              : theme === "dark"
                                ? "text-zinc-500"
                                : "text-gray-400"
                          }
                        `}
                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </motion.svg>
                    </div>
                  </button>

                  {/* Answer */}
                  <AnimatePresence initial={false}>
                    {openIndex === index && (
                      <motion.div
                        id={`faq-answer-${faq.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-8 pb-6 pl-22">
                          <p
                            className={`leading-relaxed ${
                              theme === "dark"
                                ? "text-zinc-400"
                                : "text-gray-600"
                            }`}
                          >
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
