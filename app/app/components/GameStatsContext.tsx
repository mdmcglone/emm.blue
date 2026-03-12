"use client";

import { createContext, useContext, ReactNode, useState } from "react";

interface GameStatsContextType {
  statsContent: ReactNode | null;
  setStatsContent: (content: ReactNode | null) => void;
}

const GameStatsContext = createContext<GameStatsContextType | null>(null);

export function GameStatsProvider({ children }: { children: ReactNode }) {
  const [statsContent, setStatsContent] = useState<ReactNode | null>(null);

  return (
    <GameStatsContext.Provider value={{ statsContent, setStatsContent }}>
      {children}
    </GameStatsContext.Provider>
  );
}

export function useGameStats() {
  const context = useContext(GameStatsContext);
  if (!context) {
    return { statsContent: null, setStatsContent: () => {} };
  }
  return context;
}
