"use client";

import { Icon } from "@iconify/react";
import { glassStyle } from "./GlassBubble";

interface SocialsModalProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const LINKS = [
  {
    href: "https://github.com/mdmcglone",
    label: "GitHub",
    icon: "mdi:github",
  },
  {
    href: "https://www.linkedin.com/in/em-mcglone/",
    label: "LinkedIn",
    icon: "mdi:linkedin",
  },
  {
    href: "mailto:emdmcglone@gmail.com",
    label: "Email",
    icon: "mdi:email-outline",
  },
] as const;

export function SocialsModal({ isOpen, onToggle, onClose }: SocialsModalProps) {
  return (
    <>
      <button
        onClick={onToggle}
        className="p-2 lg:p-3 rounded-full opacity-80 hover:opacity-100 transition-opacity min-w-[2.5rem] min-h-[2.5rem] lg:min-w-[3rem] lg:min-h-[3rem]"
        style={{ 
          ...glassStyle, 
          fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        }}
        aria-label="Open socials"
      >
        <Icon icon="mdi:account-box-outline" className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
      </button>

      <div
        className={`fixed inset-0 z-50 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        onClick={onClose}
        style={{ fontFamily: "Inter, system-ui, -apple-system, sans-serif" }}
      >
        <div className="absolute top-14 right-3 w-[min(92vw,20rem)]" onClick={(event) => event.stopPropagation()}>
          <div
            className={`rounded-3xl p-3 sm:p-4 transition-opacity duration-450 ease-out ${isOpen ? "opacity-100" : "opacity-0"}`}
            style={{
              ...glassStyle,
              border: "1px solid rgba(255,255,255,0.24)",
              background: "rgba(255,255,255,0.08)",
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-white text-sm sm:text-base font-semibold">Socials</span>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-1 text-white/90 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close socials modal"
              >
                <Icon icon="mdi:close" className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              {LINKS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={item.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm text-white/95 hover:bg-white/10 transition-colors"
                >
                  <Icon icon={item.icon} className="w-5 h-5 shrink-0" />
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

