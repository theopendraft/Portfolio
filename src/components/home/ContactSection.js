"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useCursor } from "@/hooks/useCursor";
import { useTheme } from "@/contexts/ThemeContext";

/**
 * ContactSection - Conversion-focused contact form
 *
 * Features:
 * - Simple contact form (frontend-only)
 * - Basic validation
 * - Subtle success/error messages
 * - Cursor integration
 * - Calm, safe feeling
 */
export default function ContactSection() {
  const { setCursorType, resetCursor } = useCursor();
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });

    const titleStyle = {
    fontFamily: "'Haffer', sans-serif",
    lineHeight: "100%",
    letterSpacing: "-0.01em",
  };

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  const services = [
    "Web Development",
    "Mobile App Development",
    "UI/UX Design",
    "Consulting",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.service) {
      newErrors.service = "Please select a service";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Simulate form submission (frontend-only)
      console.log("Form data:", formData);
      setStatus("success");

      // Reset form
      setFormData({
        name: "",
        email: "",
        service: "",
        message: "",
      });

      // Clear success message after 5 seconds
      setTimeout(() => setStatus(null), 5000);
    } else {
      setStatus("error");
    }
  };

  return (
    <section
      className={`relative px-4 sm:px-8 py-16 sm:py-24 lg:py-32 transition-colors duration-500 ${
        theme === "dark" ? "bg-zinc-950" : "bg-white"
      }`}
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT COLUMN - Portrait with Hi Badge */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-full max-w-md">
              {/* Portrait Card */}
              <div
                className={`relative w-full  rounded-3xl overflow-hidden border shadow-2xl aspect-3/4 ${
                  theme === "dark"
                    ? "bg-linear-to-br from-zinc-800 to-zinc-900 border-zinc-700"
                    : "bg-linear-to-br from-gray-200 to-gray-300 border-gray-400"
                }`}
              >
                {/* Placeholder for portrait image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="text-6xl mb-4">👤</div>
                    <p
                      className={`uppercase tracking-wider text-sm ${
                        theme === "dark" ? "text-zinc-500" : "text-gray-500"
                      }`}
                    >
                      Portrait Image
                    </p>
                  </div>
                </div>
              </div>

              {/* Hi Badge - Bottom Left */}
              <motion.div
                animate={{
                  y: [0, -6, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 0.5,
                }}
                className={`absolute -bottom-6 -left-6 w-32 h-32 rounded-full flex items-center justify-center shadow-xl z-10 ${
                  theme === "dark" ? "bg-[#C4F047]" : "bg-blue-500"
                }`}
                aria-hidden="true"
              >
                <span
                  className={`text-5xl font-bold ${
                    theme === "dark" ? "text-black" : "text-white"
                  }`}
                >
                  Hi
                </span>
              </motion.div>
            </div>
          </div>

          {/* RIGHT COLUMN - Contact Form */}
          <div className="space-y-8">
            {/* Section Header */}
            <div className="space-y-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight uppercase leading-tight ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
                style={titleStyle}
              >
                Let's Work Together
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
                className={`text-base sm:text-lg ${
                  theme === "dark" ? "text-zinc-400" : "text-gray-600"
                }`}
              >
                Let's build something impactful together—whether it's your
                brand, your website, or your next big idea.
              </motion.p>
            </div>
            {/* Contact Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              onSubmit={handleSubmit}
              className="space-y-5 sm:space-y-6"
            >
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className={`block text-sm font-medium mb-2 ${
                      theme === "dark" ? "text-[#C4F047]" : "text-blue-500"
                    }`}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`
                      w-full px-4 py-3 border rounded-xl transition-all duration-300 text-base
                      focus:outline-none focus:ring-2 focus:border-transparent
                      ${
                        theme === "dark"
                          ? `bg-zinc-900/50 text-white placeholder-zinc-600 focus:ring-[#C4F047] ${errors.name ? "border-red-500" : "border-zinc-800"}`
                          : `bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-blue-500 ${errors.name ? "border-red-500" : "border-gray-300"}`
                      }
                    `}
                    placeholder="John Smith"
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-400">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className={`block text-sm font-medium mb-2 ${
                      theme === "dark" ? "text-[#C4F047]" : "text-blue-500"
                    }`}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`
                      w-full px-4 py-3 border rounded-xl transition-all duration-300 text-base
                      focus:outline-none focus:ring-2 focus:border-transparent
                      ${
                        theme === "dark"
                          ? `bg-zinc-900/50 text-white placeholder-zinc-600 focus:ring-[#C4F047] ${errors.email ? "border-red-500" : "border-zinc-800"}`
                          : `bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-blue-500 ${errors.email ? "border-red-500" : "border-gray-300"}`
                      }
                    `}
                    placeholder="johnsmith@gmail.com"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-400">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Service Select */}
              <div>
                <label
                  htmlFor="service"
                  className={`block text-sm font-medium mb-2 ${
                    theme === "dark" ? "text-[#C4F047]" : "text-blue-500"
                  }`}
                >
                  Service Needed ?
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className={`
                    w-full px-4 py-3 border rounded-xl cursor-pointer text-base
                    focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300
                    ${
                      theme === "dark"
                        ? `bg-zinc-900/50 text-white focus:ring-[#C4F047] ${errors.service ? "border-red-500" : "border-zinc-800"} ${!formData.service ? "text-zinc-600" : ""}`
                        : `bg-gray-50 text-gray-900 focus:ring-blue-500 ${errors.service ? "border-red-500" : "border-gray-300"} ${!formData.service ? "text-gray-400" : ""}`
                    }
                  `}
                >
                  <option value="">Select...</option>
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <p className="mt-2 text-sm text-red-400">{errors.service}</p>
                )}
              </div>

              {/* Message Textarea */}
              <div>
                <label
                  htmlFor="message"
                  className={`block text-sm font-medium mb-2 ${
                    theme === "dark" ? "text-[#C4F047]" : "text-blue-500"
                  }`}
                >
                  What Can I Help You...
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`
                    w-full px-4 py-3 border rounded-xl resize-none text-base
                    focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300
                    ${
                      theme === "dark"
                        ? `bg-zinc-900/50 text-white placeholder-zinc-600 focus:ring-[#C4F047] ${errors.message ? "border-red-500" : "border-zinc-800"}`
                        : `bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-blue-500 ${errors.message ? "border-red-500" : "border-gray-300"}`
                    }
                  `}
                  placeholder="Hello, I'd like to enquire about..."
                />
                {errors.message && (
                  <p className="mt-2 text-sm text-red-400">{errors.message}</p>
                )}
              </div>

              {/* Status Messages */}
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl"
                >
                  <p className="text-green-400 text-sm">
                    Thank you! Your message has been sent successfully.
                  </p>
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl"
                >
                  <p className="text-red-400 text-sm">
                    Please fix the errors above and try again.
                  </p>
                </motion.div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={() => setCursorType("active")}
                  onMouseLeave={resetCursor}
                  className={`px-10 py-4 bg-transparent border-2 font-bold text-base uppercase tracking-wider rounded-full transition-all duration-300 shadow-lg ${
                    theme === "dark"
                      ? "border-[#C4F047] text-[#C4F047] hover:bg-[#C4F047] hover:text-black hover:shadow-[0_0_30px_rgba(196,240,71,0.4)]"
                      : "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
                  }`}
                >
                  Submit
                </motion.button>
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}
