"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface NavigationContextType {
  fadeOut: boolean;
  triggerFadeOut: () => void;
  resetFadeOut: () => void;
  fadeOutCounterMovement: { x: number; y: number };
  setFadeOutCounterMovement: (movement: { x: number; y: number }) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [fadeOut, setFadeOut] = useState(false);
  const [fadeOutCounterMovement, setFadeOutCounterMovement] = useState({ x: 0, y: 0 });

  const triggerFadeOut = useCallback(() => {
    setFadeOut(true);
  }, []);

  const resetFadeOut = useCallback(() => {
    setFadeOut(false);
  }, []);

  return (
    <NavigationContext.Provider value={{ fadeOut, triggerFadeOut, resetFadeOut, fadeOutCounterMovement, setFadeOutCounterMovement }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
}
