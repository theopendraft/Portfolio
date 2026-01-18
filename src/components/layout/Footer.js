'use client';

import Link from 'next/link';
import { useCursor } from '@/hooks/useCursor';
import { useTheme } from '@/contexts/ThemeContext';

/**
 * Footer - Global footer with info, social links, and floating action buttons
 * 
 * Features:
 * - Personal info and contact details
 * - Social media links
 * - Two floating action buttons (Resume & GitHub)
 * - Cursor integration
 * - Clean, minimal design
 */
export default function Footer() {
  const { setCursorType, resetCursor } = useCursor();
  const { theme } = useTheme();

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com', icon: 'GH' },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'IN' },
    { name: 'Twitter', url: 'https://twitter.com', icon: 'X' }
  ];

  return (
    <>
      {/* Floating Action Buttons (Desktop) */}
      <div className="hidden lg:block fixed right-8 top-1/2 -translate-y-1/2 z-40 space-y-4">
        {/* Resume Button */}
        <a
          href="/resume.pdf"
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </a>

        {/* GitHub Button */}
        <a
          href="https://github.com"
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
      <footer className={`relative border-t px-4 sm:px-8 py-12 sm:py-16 transition-colors duration-500 ${
        theme === 'dark' 
          ? 'bg-black border-zinc-900' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 md:gap-16">
            
            {/* Left: Personal Info */}
            <div className="space-y-6">
              <div>
                <h3 className={`text-3xl font-bold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Duncan Robert
                </h3>
                <p className={`text-lg ${
                  theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                }`}>
                  Full-Stack Developer & Designer
                </p>
              </div>

              <div className={`space-y-2 ${
                theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'
              }`}>
                <p>hello@duncanrobert.com</p>
                <p>San Francisco, CA / Remote</p>
              </div>

              <p className={`text-sm max-w-md ${
                theme === 'dark' ? 'text-zinc-600' : 'text-gray-500'
              }`}>
                Building meaningful digital experiences with clean code and thoughtful design.
              </p>
            </div>

            {/* Right: Social Links */}
            <div className="space-y-6">
              <h4 className={`text-sm font-semibold uppercase tracking-wider ${
                theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'
              }`}>
                Connect
              </h4>
              
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 px-5 py-3 border rounded-full transition-all duration-300 ${
                      theme === 'dark'
                        ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-[#C4F047] hover:border-[#C4F047]'
                        : 'bg-gray-100 border-gray-300 text-gray-600 hover:text-blue-500 hover:border-blue-500'
                    }`}
                    onMouseEnter={() => setCursorType('hover')}
                    onMouseLeave={resetCursor}
                  >
                    <span className="text-xs font-bold">{social.icon}</span>
                    <span className="text-sm">{social.name}</span>
                  </a>
                ))}
              </div>

              {/* Mobile Action Buttons */}
              <div className="lg:hidden flex gap-4 pt-4">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-6 py-3 border rounded-full transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-[#C4F047] hover:border-[#C4F047]'
                      : 'bg-gray-100 border-gray-300 text-gray-600 hover:text-blue-500 hover:border-blue-500'
                  }`}
                  onMouseEnter={() => setCursorType('active')}
                  onMouseLeave={resetCursor}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm">Resume</span>
                </a>

                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-6 py-3 border rounded-full transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-[#C4F047] hover:border-[#C4F047]'
                      : 'bg-gray-100 border-gray-300 text-gray-600 hover:text-blue-500 hover:border-blue-500'
                  }`}
                  onMouseEnter={() => setCursorType('active')}
                  onMouseLeave={resetCursor}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">GitHub</span>
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-600">
            <p>
              © {new Date().getFullYear()} Duncan Robert. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-zinc-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-zinc-400 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
