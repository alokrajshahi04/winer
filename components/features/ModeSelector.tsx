"use client";

import { cn } from "@/lib/utils/cn";
import type { CofounderMode } from "@/lib/types";

const MODES: Array<{ key: CofounderMode; label: string; icon: string }> = [
  { key: "brainstorm", label: "Brainstorm", icon: "\ud83d\udca1" },
  { key: "strategy", label: "Strategy", icon: "\u265f\ufe0f" },
  { key: "review", label: "Review", icon: "\ud83d\udd0d" },
  { key: "debug", label: "Debug", icon: "\ud83d\udd27" },
  { key: "motivate", label: "Motivate", icon: "\ud83d\udd25" },
  { key: "research", label: "Research", icon: "\ud83d\udcda" },
];

interface ModeSelectorProps {
  activeMode?: CofounderMode;
  onModeChange: (mode: CofounderMode | undefined) => void;
  className?: string;
}

export function ModeSelector({ activeMode, onModeChange, className }: ModeSelectorProps) {
  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-2", className)}>
      {MODES.map((mode) => (
        <button
          key={mode.key}
          onClick={() => onModeChange(activeMode === mode.key ? undefined : mode.key)}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200",
            activeMode === mode.key
              ? "bg-brand-600/20 text-brand-300 border border-brand-500/30 shadow-sm shadow-brand-500/10"
              : "bg-surface-raised text-gray-400 border border-transparent hover:text-gray-200 hover:bg-surface-overlay"
          )}
        >
          <span>{mode.icon}</span>
          <span>{mode.label}</span>
        </button>
      ))}
    </div>
  );
}
