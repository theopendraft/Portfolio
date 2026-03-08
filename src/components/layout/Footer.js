'use client';

import Link from 'next/link';
import { useCursor } from '@/hooks/useCursor';
import { useTheme } from '@/contexts/ThemeContext';

export default function Footer() {
  const { setCursorType, resetCursor } = useCursor();
  const { theme } = useTheme();

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/theopendraft',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/pankaj-yadav-5998b3249/',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ];

  const pageLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/blogs', label: 'Blogs' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Floating Action Buttons (Desktop) */}
      <div className="hidden lg:block fixed right-8 top-1/2 -translate-y-1/2 z-40 space-y-4">
        {/* Resume Button */}
        <a
          href="/resume/Pankaj_Yadav_SDE_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 shadow-lg group ${
            theme === 'dark'
              ? 'bg-zinc-900 border border-zinc-800 text-white hover:bg-[#C4F047] hover:text-black hover:border-[#C4F047]'
              : 'bg-white border border-gray-300 text-gray-900 hover:bg-blue-500 hover:text-white hover:border-blue-500'
          }`}
          onMouseEnter={() => setCursorType('active')}
          onMouseLeave={resetCursor}
          aria-label="Download Resume"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </a>

        {/* GitHub Button */}
        <a
          href="https://github.com/theopendraft"
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 shadow-lg group ${
            theme === 'dark'
              ? 'bg-zinc-900 border border-zinc-800 text-white hover:bg-[#C4F047] hover:text-black hover:border-[#C4F047]'
              : 'bg-white border border-gray-300 text-gray-900 hover:bg-blue-500 hover:text-white hover:border-blue-500'
          }`}
          onMouseEnter={() => setCursorType('active')}
          onMouseLeave={resetCursor}
          aria-label="GitHub Profile"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
        </a>
      </div>

      {/* Main Footer */}
      <footer className={`relative border-t px-6 sm:px-10 py-12 sm:py-16 transition-colors duration-500 ${
        theme === 'dark'
          ? 'bg-black border-zinc-900'
          : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 md:gap-16">

            {/* Left: Personal Info */}
            <div className="space-y-6">
              <div>
                <h3 className={`text-3xl font-bold mb-1 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Pankaj Yadav
                </h3>
                <p className={`text-base ${
                  theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                }`}>
                  Full-Stack Software Engineer
                </p>
              </div>

              <div className={`space-y-1.5 text-sm ${
                theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'
              }`}>
                <p>siddarth8818@gmail.com</p>
                <p>Chennai, Tamil Nadu · Available for work</p>
              </div>

              <p className={`text-sm max-w-md ${
                theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'
              }`}>
                Building meaningful digital experiences with clean code, scalable architecture, and thoughtful design.
              </p>
            </div>

            {/* Right: Social Links */}
            <div className="space-y-6">
              <h4 className={`text-xs font-semibold uppercase tracking-widest ${
                theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'
              }`}>
                Connect
              </h4>

              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2.5 px-5 py-3 border rounded-full transition-all duration-300 ${
                      theme === 'dark'
                        ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-[#C4F047] hover:border-[#C4F047]'
                        : 'bg-gray-100 border-gray-300 text-gray-600 hover:text-blue-500 hover:border-blue-500'
                    }`}
                    onMouseEnter={() => setCursorType('hover')}
                    onMouseLeave={resetCursor}
                  >
                    {social.icon}
                    <span className="text-sm font-medium">{social.name}</span>
                  </a>
                ))}
              </div>

              {/* Mobile Action Buttons */}
              <div className="lg:hidden flex gap-4 pt-2">
                <a
                  href="/resume/Pankaj_Yadav_SDE_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-6 py-3 border rounded-full transition-all duration-300 text-sm font-medium ${
                    theme === 'dark'
                      ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-[#C4F047] hover:border-[#C4F047]'
                      : 'bg-gray-100 border-gray-300 text-gray-600 hover:text-blue-500 hover:border-blue-500'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Resume
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className={`mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-sm mb-0 md:mb-14 ${
            theme === 'dark' ? 'border-zinc-900 text-zinc-700' : 'border-gray-200 text-gray-400'
          }`}>
            <p>
              © {new Date().getFullYear()} Pankaj Yadav. All rights reserved.
            </p>
            <p className={`text-xs ${theme === 'dark' ? 'text-zinc-800' : 'text-gray-300'}`}>
              Built with Next.js · Framer Motion · Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
