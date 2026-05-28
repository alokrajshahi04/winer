"use client";

import { useState } from "react";
import { VoiceInterface } from "@/components/features/VoiceInterface";
import { ModeSelector } from "@/components/features/ModeSelector";
import { ContextImporter } from "@/components/features/ContextImporter";
import type { CofounderMode, VoiceSessionState } from "@/lib/types";

export default function DashboardPage() {
  const [mode, setMode] = useState<CofounderMode | undefined>();
  const [voiceState, setVoiceState] = useState<VoiceSessionState>("idle");
  const [showContext, setShowContext] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">
          {voiceState === "idle" ? "Ready when you are" : voiceState === "connected" || voiceState === "listening" ? "I'm listening..." : voiceState === "speaking" ? "Winer is talking" : voiceState === "connecting" ? "Connecting..." : "Let's talk"}
        </h1>
        <p className="text-sm text-gray-400">
          {voiceState === "idle" ? "Click the orb to start a conversation with your AI co-founder" : "Your co-founder session is active"}
        </p>
      </div>
      <ModeSelector activeMode={mode} onModeChange={setMode} className="mb-10" />
      <VoiceInterface onStateChange={setVoiceState} className="mb-12" />
      <div className="w-full max-w-lg">
        <button onClick={() => setShowContext(!showContext)} className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-200 transition-colors mb-4">
          <span>{showContext ? "\u25be" : "\u25b8"}</span>
          <span>Add context about yourself</span>
        </button>
        {showContext && <ContextImporter />}
      </div>
      {voiceState === "idle" && (
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl w-full">
          <TipCard emoji="\ud83d\udca1" text='Try: "I\'m stuck on my pricing model"' />
          <TipCard emoji="\ud83c\udfaf" text='Try: "Review my go-to-market strategy"' />
          <TipCard emoji="\ud83d\udd25" text='Try: "I need motivation today"' />
        </div>
      )}
    </div>
  );
}

function TipCard({ emoji, text }: { emoji: string; text: string }) {
  return (
    <div className="p-3 rounded-xl bg-surface-raised border border-white/5 text-center">
      <span className="text-lg">{emoji}</span>
      <p className="text-xs text-gray-500 mt-1">{text}</p>
    </div>
  );
}
