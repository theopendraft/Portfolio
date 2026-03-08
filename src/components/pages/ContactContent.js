"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import { useCursor } from "@/hooks/useCursor";
import MagneticButton from "@/components/shared/MagneticButton";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

const services = [
  "Web Development",
  "Full-Stack Engineering",
  "UI/UX Design",
  "Consulting",
  "Other",
];

const CONTACT_INFO = [
  { icon: Mail, label: "Email", value: "siddarth8818@gmail.com", href: "mailto:siddarth8818@gmail.com" },
  { icon: MapPin, label: "Location", value: "Chennai, Tamil Nadu, India", href: null },
];

export default function ContactContent() {
  const { theme } = useTheme();
  const { setCursorType, resetCursor } = useCursor();
  const isDark = theme === "dark";

  const [formData, setFormData] = useState({ name: "", email: "", service: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = "Name is required";
    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Enter a valid email";
    if (!formData.service) e.service = "Please select a service";
    if (!formData.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) { setStatus("error"); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", service: "", message: "" });
        setTimeout(() => setStatus(null), 5000);
      } else {
        setStatus("send_error");
      }
    } catch {
      setStatus("send_error");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 border rounded-xl transition-all duration-300 text-base focus:outline-none focus:ring-2 focus:border-transparent ${
      isDark
        ? `bg-zinc-900/50 text-white placeholder-zinc-600 focus:ring-[#C4F047] ${errors[field] ? "border-red-500" : "border-zinc-800"}`
        : `bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-blue-500 ${errors[field] ? "border-red-500" : "border-gray-300"}`
    }`;

  return (
    <main
      className={`min-h-screen transition-colors duration-500  ${
        isDark ? "bg-transparent" : "bg-gray-50"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 pt-38 sm:px-10 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-20 ">

          {/* LEFT — Form */}
          <motion.div {...fadeUp(0.15)} className="items-start">
            
        {/* Header */}
        <motion.div {...fadeUp(0.08)} className="mb-14">
          <p className={`text-xs uppercase tracking-[0.3em] font-medium mb-3 ${isDark ? "text-zinc-500" : "text-gray-400"}`}>
            Get in Touch
          </p>
          <h1
            className={`text-5xl sm:text-6xl lg:text-7xl font-bold leading-none tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}
            style={{ fontFamily: "'Haffer', sans-serif", letterSpacing: "-0.03em" }}
          >
            LET'S WORK
            <br />
            <span className={isDark ? "text-[#C4F047]" : "text-blue-500"}>TOGETHER.</span>
          </h1>
        </motion.div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? "text-[#C4F047]" : "text-blue-500"}`}>Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} className={inputClass("name")} placeholder="John Smith" />
                  {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? "text-[#C4F047]" : "text-blue-500"}`}>Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass("email")} placeholder="john@example.com" />
                  {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
                </div>
              </div>

              {/* Service */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-[#C4F047]" : "text-blue-500"}`}>Service Needed</label>
                <select 
                  name="service" 
                  value={formData.service} 
                  onChange={handleChange} 
                  className={`${inputClass("service")} ${!formData.service ? (isDark ? "text-zinc-600" : "text-gray-400") : ""}`}
                >
                  <option value="">Select a service...</option>
                  {services.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.service && <p className="mt-1.5 text-xs text-red-400">{errors.service}</p>}
              </div>

              {/* Message */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-[#C4F047]" : "text-blue-500"}`}>Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows={5} className={`${inputClass("message")} resize-none`} placeholder="Tell me about your project..." />
                {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>}
              </div>

              {/* Status messages */}
              {status === "success" && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                  <p className="text-green-400 text-sm">Message sent! I'll get back to you soon.</p>
                </motion.div>
              )}
              {status === "send_error" && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <p className="text-red-400 text-sm">Something went wrong. Email me at siddarth8818@gmail.com</p>
                </motion.div>
              )}
              {status === "error" && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <p className="text-red-400 text-sm">Please fix the errors above and try again.</p>
                </motion.div>
              )}

              {/* Submit */}
              <MagneticButton>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-10 py-4 rounded-full border-2 font-bold text-sm uppercase tracking-wider transition-all duration-300 cursor-none disabled:opacity-60 ${
                    isDark
                      ? "border-[#C4F047] text-[#C4F047] hover:bg-[#C4F047] hover:text-black"
                      : "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                  }`}
                  onMouseEnter={() => setCursorType("active")}
                  onMouseLeave={resetCursor}
                >
                  {loading ? "Sending…" : "Send Message"}
                </button>
              </MagneticButton>
            </form>
          </motion.div>

          {/* RIGHT — Info panel */}
          <motion.div {...fadeUp(0.22)} className="space-y-8">
            {/* Portrait */}
            <div className="relative w-3/4 aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-900 align-middle justify-center mx-auto lg:items-start lg:mx-0">
              <Image
                src="/image/Pankaj_Yadav.jpg"
                alt="Pankaj Yadav"
                fill
                className="object-cover object-top"
                sizes="420px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            {/* Contact details */}
            <div className="space-y-4 ">
              {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className={`mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isDark ? "bg-zinc-800" : "bg-gray-100"}`}>
                    <Icon size={14} className={isDark ? "text-[#C4F047]" : "text-blue-500"} />
                  </div>
                  <div>
                    <p className={`text-[10px] uppercase tracking-widest mb-0.5 ${isDark ? "text-zinc-600" : "text-gray-400"}`}>{label}</p>
                    {href ? (
                      <a href={href} className={`text-sm font-medium transition-colors ${isDark ? "text-zinc-300 hover:text-[#C4F047]" : "text-gray-700 hover:text-blue-500"}`}>{value}</a>
                    ) : (
                      <p className={`text-sm font-medium ${isDark ? "text-zinc-300" : "text-gray-700"}`}>{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="flex gap-3">
              <MagneticButton>
                <a
                  href="https://github.com/theopendraft"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-none ${isDark ? "border-zinc-700 text-zinc-400 hover:border-[#C4F047] hover:text-[#C4F047]" : "border-gray-300 text-gray-500 hover:border-blue-500 hover:text-blue-500"}`}
                  onMouseEnter={() => setCursorType("active")}
                  onMouseLeave={resetCursor}
                >
                  GitHub <ArrowUpRight size={11} />
                </a>
              </MagneticButton>
              <MagneticButton>
                <a
                  href="https://www.linkedin.com/in/pankaj-yadav-5998b3249/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-none ${isDark ? "border-zinc-700 text-zinc-400 hover:border-[#C4F047] hover:text-[#C4F047]" : "border-gray-300 text-gray-500 hover:border-blue-500 hover:text-blue-500"}`}
                  onMouseEnter={() => setCursorType("active")}
                  onMouseLeave={resetCursor}
                >
                  LinkedIn <ArrowUpRight size={11} />
                </a>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
