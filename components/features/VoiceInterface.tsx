"use client";

import { useState, useCallback } from "react";
import { VoiceOrb } from "./VoiceOrb";
import { cn } from "@/lib/utils/cn";
import type { VoiceSessionState } from "@/lib/types";

interface VoiceInterfaceProps {
  onStateChange?: (state: VoiceSessionState) => void;
  className?: string;
}

export function VoiceInterface({ onStateChange, className }: VoiceInterfaceProps) {
  const [state, setState] = useState<VoiceSessionState>("idle");
  const [transcript, setTranscript] = useState<Array<{ role: string; text: string }>>([]);
  const [isSessionActive, setIsSessionActive] = useState(false);

  const updateState = useCallback((newState: VoiceSessionState) => {
    setState(newState);
    onStateChange?.(newState);
  }, [onStateChange]);

  const handleOrbClick = useCallback(async () => {
    if (isSessionActive) {
      setIsSessionActive(false);
      updateState("idle");
      setTranscript([]);
      return;
    }

    try {
      updateState("connecting");
      await navigator.mediaDevices.getUserMedia({ audio: true });

      const response = await fetch("/api/token");
      if (!response.ok) throw new Error("Failed to get token");

      setIsSessionActive(true);
      updateState("connected");

      setTranscript([{ role: "agent", text: "Hey! I'm Winer, your AI co-founder. What are we working on today?" }]);
    } catch (error) {
      console.error("Voice session failed:", error);
      updateState("error");
    }
  }, [isSessionActive, updateState]);

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <VoiceOrb state={state} onClick={handleOrbClick} />

      {transcript.length > 0 && (
        <div className="mt-8 w-full max-w-md space-y-3">
          {transcript.map((entry, i) => (
            <div
              key={i}
              className={cn(
                "px-4 py-3 rounded-2xl text-sm max-w-[85%]",
                entry.role === "agent"
                  ? "bg-surface-overlay text-gray-200 mr-auto"
                  : "bg-brand-600/20 text-brand-200 ml-auto"
              )}
            >
              {entry.text}
            </div>
          ))}
        </div>
      )}

      {isSessionActive && (
        <button
          onClick={() => { setIsSessionActive(false); updateState("idle"); setTranscript([]); }}
          className="mt-4 text-xs text-gray-500 hover:text-gray-300 transition-colors"
        >
          End session
        </button>
      )}
    </div>
  );
}
