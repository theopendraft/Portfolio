"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCursor } from "@/hooks/useCursor";
import { useTheme } from "@/contexts/ThemeContext";
import { X, Menu } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { setCursorType, resetCursor } = useCursor();
  const { theme } = useTheme();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY <= 60) {
        setIsScrolled(false);
      } else if (currentY > lastY) {
        setIsScrolled(true);   // scrolling down → compact
      } else {
        setIsScrolled(false);  // scrolling up → expand
      }
      lastY = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const isDark = theme === "dark";

  const linkClass = (href) => {
    const active = isActive(href);
    const base = "text-sm font-medium transition-colors duration-200";
    if (active) return `${base} ${isDark ? "text-[#C4F047]" : "text-blue-600"}`;
    return `${base} ${isDark ? "text-zinc-300 hover:text-white" : "text-gray-600 hover:text-gray-900"}`;
  };

  return (
    <>
      {/* ── Pill navbar ─────────────────────────────────────────────────── */}
      <nav
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isScrolled ? "top-4 w-auto" : "top-6 w-[calc(100%-2rem)] max-w-2xl"
        } px-0`}
      >
        <div
          className={`mx-auto backdrop-blur-md rounded-full shadow-sm transition-all duration-700 px-4 py-2 ${
            isDark
              ? "bg-zinc-900/80 border border-zinc-800"
              : "bg-white/80 border border-gray-200"
          }`}
        >
          {isScrolled ? (
            /* Compact — available for work + hamburger */
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Avatar isDark={isDark} />
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${isDark ? "text-zinc-300" : "text-gray-700"}`}>
                    Available for work
                  </span>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                </div>
              </div>
              <div className="lg:hidden">
                <HamburgerButton open={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)} isDark={isDark} />
              </div>
            </div>
          ) : (
            /* Full nav */
            <div className="flex items-center justify-between gap-6">
              <Avatar isDark={isDark} />

              {/* Desktop links */}
              <div className="hidden lg:flex items-center gap-7">
                {NAV_LINKS.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className={linkClass(href)}
                    onMouseEnter={() => setCursorType("hover")}
                    onMouseLeave={resetCursor}
                  >
                    {label}
                    {isActive(href) && (
                      <span className={`block h-0.5 mt-0.5 rounded-full ${isDark ? "bg-[#C4F047]" : "bg-blue-500"}`} />
                    )}
                  </Link>
                ))}
              </div>

              {/* Desktop resume CTA */}
              <a
                href="/resume/Pankaj_Yadav_SDE_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={`hidden lg:inline-flex shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:shadow-md cursor-none ${
                  isDark
                    ? "bg-[#C4F047] text-black hover:bg-[#d4ff5a]"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
                onMouseEnter={() => setCursorType("active")}
                onMouseLeave={resetCursor}
              >
                Resume
              </a>

              {/* Mobile hamburger */}
              <HamburgerButton
                open={mobileOpen}
                onClick={() => setMobileOpen(!mobileOpen)}
                isDark={isDark}
                className="lg:hidden"
              />
            </div>
          )}
        </div>
      </nav>

      {/* ── Mobile menu overlay ──────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed inset-0 z-40 flex flex-col px-6 pt-28 pb-10 transition-colors duration-200 ${
              isDark ? "bg-zinc-950/98 backdrop-blur-lg" : "bg-white/98 backdrop-blur-lg"
            }`}
          >
            {/* Links */}
            <nav className="flex flex-col gap-1 flex-1">
              {NAV_LINKS.map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={href}
                    className={`flex items-center justify-between py-4 border-b text-2xl font-bold tracking-tight transition-colors duration-200 ${
                      isDark ? "border-zinc-800" : "border-gray-100"
                    } ${
                      isActive(href)
                        ? isDark ? "text-[#C4F047]" : "text-blue-600"
                        : isDark ? "text-white" : "text-gray-900"
                    }`}
                    style={{ fontFamily: "'Haffer', sans-serif" }}
                  >
                    {label}
                    {isActive(href) && (
                      <span className={`text-sm font-medium ${isDark ? "text-[#C4F047]" : "text-blue-500"}`}>
                        ●
                      </span>
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom actions */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.3 }}
              className="flex flex-col gap-3 mt-8"
            >
              <a
                href="/resume/Pankaj_Yadav_SDE_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-4 rounded-full text-center font-bold text-sm uppercase tracking-wider transition-all ${
                  isDark
                    ? "bg-[#C4F047] text-black"
                    : "bg-blue-500 text-white"
                }`}
              >
                Download Resume
              </a>
              <a
                href="mailto:siddarth8818@gmail.com"
                className={`w-full py-4 rounded-full text-center font-bold text-sm uppercase tracking-wider border-2 transition-all ${
                  isDark
                    ? "border-zinc-700 text-zinc-300"
                    : "border-gray-300 text-gray-700"
                }`}
              >
                siddarth8818@gmail.com
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Avatar({ isDark }) {
  return (
    <div className="shrink-0">
      <div className="w-9 h-9 relative">
        <Image
          src={isDark ? "/logo/py_dark.svg" : "/logo/py_light.svg"}
          alt="Logo"
          width={36}
          height={36}
          className="w-full h-full object-contain"
          priority
        />
      </div>
    </div>
  );
}

function HamburgerButton({ open, onClick, isDark, className = "" }) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center border transition-colors duration-200 ${
        isDark
          ? "border-zinc-700 text-zinc-300 hover:border-zinc-500"
          : "border-gray-300 text-gray-600 hover:border-gray-400"
      } ${className}`}
    >
      {open ? <X size={16} /> : <Menu size={16} />}
    </button>
  );
}
