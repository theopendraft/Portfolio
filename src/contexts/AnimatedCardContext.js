"use client";

import { createContext, useContext } from "react";
import { useAnimatedCard } from "@/hooks/useAnimatedCard";

/**
 * AnimatedCardContext - Provides shared card state to all sections
 *
 * This context allows sections to register themselves and communicate
 * with the global animated card system without directly controlling it.
 */
const AnimatedCardContext = createContext(null);

export function AnimatedCardProvider({ children }) {
  const cardState = useAnimatedCard();

  return (
    <AnimatedCardContext.Provider value={cardState}>
      {children}
    </AnimatedCardContext.Provider>
  );
}

export function useAnimatedCardContext() {
  const context = useContext(AnimatedCardContext);
  if (!context) {
    throw new Error(
      "useAnimatedCardContext must be used within AnimatedCardProvider",
    );
  }
  return context;
}
