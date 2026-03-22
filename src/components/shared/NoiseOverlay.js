"use client";

import Noise from "./Noise";

export default function NoiseOverlay() {
  return (
    <div className="pointer-events-none">
      <Noise
        patternSize={250}
        patternScaleX={1}
        patternScaleY={1}
        patternRefreshInterval={2}
        patternAlpha={15}
      />
    </div>
  );
}
