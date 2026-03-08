"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "@/contexts/ThemeContext";
import { useAnimatedCardContext } from "@/contexts/AnimatedCardContext";
import ShapeBlur from "@/components/shared/ShapeBlur";

/**
 * SharedAnimatedCard - fixed floating card that flips between sections.
 *
 * Only visible on the home page ("/"). Uses usePathname() so it correctly
 * hides on client-side navigation to /about, /projects, etc.
 *
 * Flip logic:
 *  HERO  (scroll 0 → heroEnd)    : rotateY 0 → 180°  - front face visible
 *  SKILLS (heroEnd → skillsEnd)  : rotateY 180 → 360° - back face visible
 *  ABOUT  (> skillsEnd)          : settled at 360°
 *
 * Front face (backface-visibility:hidden):
 *   Shows Pankaj_Yadav.jpg (hero), swaps to Pankaj_Yadav_3.jpg (about) at 270° edge-on.
 * Back face (rotateY 180deg + backface-visibility:hidden):
 *   Always shows Pankaj_Yadav_2.jpg (skills).
 */
export default function SharedAnimatedCard() {
  const { theme } = useTheme();
  const { sectionsRef, isMobile } = useAnimatedCardContext();
  const pathname = usePathname();

  const [isClient, setIsClient] = useState(false);
  const [sectionPositions, setSectionPositions] = useState({
    heroEnd: 900,
    skillsEnd: 1800,
  });
  // 0 = hero image, 2 = about image - swapped while front face is edge-on
  const [faceAIndex, setFaceAIndex] = useState(0);

  const pixelRatio =
    typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

  const { scrollY } = useScroll();

  useEffect(() => { setIsClient(true); }, []);

  // ── Section position tracker ───────────────────────────────────────────
  useEffect(() => {
    if (!isClient) return;

    const update = () => {
      const s = sectionsRef.current;
      const hero = s["HERO"];
      const skills = s["SKILLS"];
      if (hero && skills) {
        setSectionPositions({
          heroEnd: hero.offsetTop + hero.offsetHeight,
          skillsEnd: skills.offsetTop + skills.offsetHeight,
        });
      }
    };

    update();
    const t = setTimeout(update, 600);
    window.addEventListener("resize", update);
    return () => { clearTimeout(t); window.removeEventListener("resize", update); };
  }, [isClient, sectionsRef]);

  // ── Scroll-driven transforms ───────────────────────────────────────────
  const { heroEnd, skillsEnd } = sectionPositions;

  // X: 0 (hero center) → 260px right (skills/about right column)
  const xRaw = useTransform(
    scrollY,
    [heroEnd * 0.5, heroEnd, skillsEnd],
    [0, 260, 260],
  );
  const x = useSpring(xRaw, { stiffness: 80, damping: 22, mass: 0.8 });

  const yRaw = useTransform(scrollY, [0, heroEnd], [0, -30]);
  const y = useSpring(yRaw, { stiffness: 80, damping: 22, mass: 0.8 });

  // Full 0° → 360° flip across both sections
  const rotateYRaw = useTransform(
    scrollY,
    [heroEnd * 0.2, heroEnd, heroEnd * 1.05, skillsEnd],
    [0, 180, 180, 360],
  );
  const rotateY = useSpring(rotateYRaw, { stiffness: 60, damping: 18, mass: 0.6 });

  // Fade out just after skills section ends
  const opacityRaw = useTransform(scrollY, [skillsEnd, skillsEnd + 280], [1, 0]);
  const opacity = useSpring(opacityRaw, { stiffness: 120, damping: 28 });

  // ── Swap front-face image at 270° (card is edge-on, invisible) ─────────
  useEffect(() => {
    const switchPoint = heroEnd + (skillsEnd - heroEnd) * 0.5;
    return scrollY.on("change", (v) => setFaceAIndex(v >= switchPoint ? 2 : 0));
  }, [scrollY, heroEnd, skillsEnd]);

  // ── Card contents ──────────────────────────────────────────────────────
  const faces = [
    { src: "/image/Pankaj_Yadav.jpg",   sub: "Full-Stack Engineer",  label: "Pankaj Yadav"    }, // 0
    { src: "/image/Pankaj_Yadav_2.jpg", sub: "What I Build With",    label: "Skills & Craft"  }, // 1 (back)
    { src: "/image/Pankaj_Yadav_3.jpg", sub: "My Story & Journey",   label: "About Me"        }, // 2
  ];

  // ── Guard ──────────────────────────────────────────────────────────────
  // Only render on home page, desktop, after hydration
  if (!isClient || isMobile || pathname !== "/") return null;

  return (
    <motion.div
      className="fixed top-1/2 left-1/2 pointer-events-none z-50"
      style={{
        x,
        y,
        opacity,
        translateX: "-50%",
        translateY: "-50%",
        perspective: 1400,
      }}
    >
      {/* Flip container */}
      <motion.div
        className="relative w-72 h-[440px]"
        style={{ rotateY, transformStyle: "preserve-3d" }}
      >
        {/* FRONT FACE - hero → about */}
        <CardFace face={faces[faceAIndex]} theme={theme} front />

        {/* BACK FACE - always skills, pre-rotated 180° */}
        <CardFace face={faces[1]} theme={theme} />

        {/* Shape blur glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "-7.7rem",
            right: "-8.1rem",
            width: "18rem",
            height: "18rem",
            backfaceVisibility: "hidden",
          }}
        >
          <ShapeBlur
            variation={0}
            pixelRatioProp={pixelRatio}
            shapeSize={0.5}
            roundness={0.5}
            borderSize={0.05}
            circleSize={0.25}
            circleEdge={1}
            theme={theme}
          />
        </div>

        {/* Floating wave badge */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute -bottom-6 -right-6 w-20 h-20 rounded-full flex items-center justify-center shadow-xl ${
            theme === "dark" ? "bg-[#C4F047]" : "bg-blue-500"
          }`}
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "translateZ(50px)",
          }}
          aria-hidden="true"
        >
          <span className="text-4xl">👋</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ── Card face component ────────────────────────────────────────────────────
function CardFace({ face, theme, front = false }) {
  const isDark = theme === "dark";

  return (
    <div
      className={`absolute inset-0 rounded-2xl overflow-hidden border shadow-2xl ${
        isDark
          ? "bg-zinc-900 border-zinc-700/50"
          : "bg-gray-100 border-gray-200"
      }`}
      style={{
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        // Back face is pre-rotated 180° so it starts hidden
        transform: front ? undefined : "rotateY(180deg)",
      }}
    >
      {/* Portrait image */}
      <div className="relative w-full h-full">
        <Image
          src={face.src}
          alt={face.label}
          fill
          className="object-cover object-top"
          sizes="288px"
          priority={front}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Text label */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-5">
          <p
            className="text-[10px] uppercase tracking-[0.25em] font-medium text-white/60 mb-1"
          >
            {face.sub}
          </p>
          <h3
            className="text-lg font-bold text-white leading-tight"
            style={{ fontFamily: "'Haffer', sans-serif" }}
          >
            {face.label}
          </h3>
          <div
            className={`mt-2 w-6 h-1 rounded-full ${
              isDark ? "bg-[#C4F047]" : "bg-blue-400"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
