import { ReactNode, CSSProperties } from "react";

export const glassStyle: CSSProperties = {
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: "1px solid rgba(255, 255, 255, 0.15)",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
};

interface GlassBubbleProps {
  children: ReactNode;
  className?: string;
}

export function GlassBubble({ children, className = "" }: GlassBubbleProps) {
  return (
    <div className={`rounded-full ${className}`} style={glassStyle}>
      {children}
    </div>
  );
}
