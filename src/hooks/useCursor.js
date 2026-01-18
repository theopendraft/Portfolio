"use client";

import { createContext, useContext, useState } from "react";

// Cursor state context
const CursorContext = createContext({
  cursorType: "default",
  previewImage: null,
  setCursorType: () => {},
  setPreviewImage: () => {},
  resetCursor: () => {},
});

/**
 * CursorProvider - Global cursor state manager
 * Wraps the app to provide cursor state to all components
 */
export function CursorProvider({ children }) {
  const [cursorType, setCursorType] = useState("default");
  const [previewImage, setPreviewImage] = useState(null);

  // Reset cursor to default state
  const resetCursor = () => {
    setCursorType("default");
    setPreviewImage(null);
  };

  return (
    <CursorContext.Provider
      value={{
        cursorType,
        previewImage,
        setCursorType,
        setPreviewImage,
        resetCursor,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
}

/**
 * useCursor hook - Access cursor state and controls
 *
 * @returns {Object} { cursorType, previewImage, setCursorType, setPreviewImage, resetCursor }
 *
 * Usage:
 * const { setCursorType, setPreviewImage, resetCursor } = useCursor();
 *
 * <div
 *   onMouseEnter={() => {
 *     setCursorType('hover');
 *     setPreviewImage('/image.jpg');
 *   }}
 *   onMouseLeave={resetCursor}
 * >
 *   Content
 * </div>
 */
export function useCursor() {
  const context = useContext(CursorContext);

  if (!context) {
    throw new Error("useCursor must be used within a CursorProvider");
  }

  return context;
}
