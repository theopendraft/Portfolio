"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top on page load/refresh
    window.scrollTo(0, 0);
  }, [pathname]);

  // Also handle browser back/forward navigation
  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  return null;
}
