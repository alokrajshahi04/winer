"use client";

import { cn } from "@/lib/utils/cn";
import type { VoiceSessionState } from "@/lib/types";

const STATE_CONFIG: Record<VoiceSessionState, { color: string; label: string; animate: string }> = {
  idle: {
    color: "from-gray-600 to-gray-700",
    label: "Click to start",
    animate: "animate-pulse-slow",
  },
  connecting: {
    color: "from-yellow-500 to-amber-600",
    label: "Connecting...",
    animate: "animate-pulse",
  },
  connected: {
    color: "from-brand-500 to-purple-600",
    label: "Connected",
    animate: "animate-glow",
  },
  speaking: {
    color: "from-purple-500 to-pink-500",
    label: "Winer is talking",
    animate: "animate-glow",
  },
  listening: {
    color: "from-brand-400 to-brand-600",
    label: "Listening...",
    animate: "animate-glow",
  },
  thinking: {
    color: "from-indigo-500 to-blue-600",
    label: "Thinking...",
    animate: "animate-pulse",
  },
  error: {
    color: "from-red-500 to-red-700",
    label: "Error \u2014 click to retry",
    animate: "",
  },
};

interface VoiceOrbProps {
  state: VoiceSessionState;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZE_MAP = {
  sm: "w-20 h-20",
  md: "w-32 h-32",
  lg: "w-44 h-44",
};

export function VoiceOrb({ state, onClick, size = "lg", className }: VoiceOrbProps) {
  const config = STATE_CONFIG[state];
  const isActive = state === "listening" || state === "speaking" || state === "connected";

  return (
    <div className={cn("relative flex flex-col items-center gap-4", className)}>
      {/* Glow background */}
      {isActive && (
        <div className={cn("absolute inset-0 rounded-full bg-gradient-to-r blur-2xl opacity-30", config.color, SIZE_MAP[size])} />
      )}

      {/* Main orb */}
      <button
        onClick={onClick}
        className={cn(
          "relative rounded-full bg-gradient-to-br transition-all duration-500 cursor-pointer",
          "hover:scale-105 active:scale-95",
          "shadow-2xl",
          config.color,
          config.animate,
          SIZE_MAP[size]
        )}
      >
        {/* Inner glow */}
        <div className="absolute inset-2 rounded-full bg-white/10 backdrop-blur-sm" />

        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          {state === "idle" || state === "error" ? (
            <svg className="w-8 h-8 text-white/80" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
            </svg>
          ) : (
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-white/80 rounded-full animate-voice-wave"
                  style={{
                    height: "12px",
                    animationDelay: `${i * 0.15}s`,
                    animationPlayState: state === "speaking" || state === "listening" ? "running" : "paused",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </button>

      {/* Label */}
      <span className="text-xs font-medium text-gray-400">{config.label}</span>
    </div>
  );
}
