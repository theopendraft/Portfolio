"use client";

import { useTheme } from "@/contexts/ThemeContext";
import Noise from "./Noise";

export default function NoiseOverlay() {
  const { theme } = useTheme();

  if (theme !== "dark") return null;

  return (
    <div className="pointer-events-none">
      <Noise
        patternSize={130}
        patternScaleX={0.8}
        patternScaleY={0.6}
        patternRefreshInterval={2}
        patternAlpha={10}
      />
    </div>
  );
}
