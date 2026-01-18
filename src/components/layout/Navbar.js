"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCursor } from "@/hooks/useCursor";
import { useTheme } from "@/contexts/ThemeContext";

export default function Navbar() {
  const { setCursorType, resetCursor } = useCursor();
  const { theme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isScrolled ? "top-4 w-auto" : "top-6 w-full max-w-2xl"
      } px-4`}
    >
      <div
        className={`mx-auto backdrop-blur-md rounded-full shadow-sm transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isScrolled ? "px-4 py-2" : "px-4 py-2"
        } ${
          theme === "dark"
            ? "bg-zinc-900/80 border border-zinc-800"
            : "bg-white/80 border border-gray-200"
        }`}
      >
        {isScrolled ? (
          /* Compact Version - Available for Work */
          <div className="flex items-center gap-3 animate-[fadeIn_2.5s_ease-in-out]">
            {/* Profile Avatar */}
            <div
              className={`w-9 h-9 rounded-full border overflow-hidden transition-all duration-500 ${
                theme === "dark"
                  ? "bg-linear-to-br from-zinc-700 to-zinc-800 border-zinc-700"
                  : "bg-linear-to-br from-gray-200 to-gray-300 border-gray-300"
              }`}
            >
              {/* TODO: Replace with actual profile image */}
              <div
                className={`w-full h-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                  theme === "dark" ? "text-zinc-400" : "text-gray-600"
                }`}
              >
                JS
              </div>
            </div>

            {/* Available for Work */}
            <div className="flex items-center gap-2">
              <span
                className={`text-sm font-medium transition-all duration-300 ${
                  theme === "dark" ? "text-zinc-300" : "text-gray-700"
                }`}
              >
                Available for work
              </span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            </div>
          </div>
        ) : (
          /* Full Version - Navigation */
          <div className="flex items-center justify-between gap-8 animate-[fadeIn_2.5s_ease-in-out]">
            {/* Profile Avatar */}
            <div className="shrink-0">
              <div
                className={`w-10 h-10 rounded-full border overflow-hidden transition-all duration-500 ${
                  theme === "dark"
                    ? "bg-linear-to-br from-zinc-700 to-zinc-800 border-zinc-700"
                    : "bg-linear-to-br from-gray-200 to-gray-300 border-gray-300"
                }`}
              >
                {/* TODO: Replace with actual profile image */}
                <div
                  className={`w-full h-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                    theme === "dark" ? "text-zinc-400" : "text-gray-600"
                  }`}
                >
                  JS
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center gap-8 transition-all duration-300">
              <Link
                href="/"
                className={`text-sm transition-colors duration-200 font-medium ${
                  theme === "dark"
                    ? "text-zinc-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onMouseEnter={() => setCursorType("hover")}
                onMouseLeave={resetCursor}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`text-sm transition-colors duration-200 font-medium ${
                  theme === "dark"
                    ? "text-zinc-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onMouseEnter={() => setCursorType("hover")}
                onMouseLeave={resetCursor}
              >
                About
              </Link>
              <Link
                href="/projects"
                className={`text-sm transition-colors duration-200 font-medium ${
                  theme === "dark"
                    ? "text-zinc-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onMouseEnter={() => setCursorType("hover")}
                onMouseLeave={resetCursor}
              >
                Projects
              </Link>
              <Link
                href="/blogs"
                className={`text-sm transition-colors duration-200 font-medium ${
                  theme === "dark"
                    ? "text-zinc-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onMouseEnter={() => setCursorType("hover")}
                onMouseLeave={resetCursor}
              >
                Blogs
              </Link>
            </div>

            {/* Contact Button */}
            <Link
              href="#contact"
              className={`shrink-0 px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:shadow-md ${
                theme === "dark"
                  ? "bg-zinc-100 hover:bg-white text-zinc-900"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
              onMouseEnter={() => setCursorType("active")}
              onMouseLeave={resetCursor}
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
