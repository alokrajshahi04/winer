"use client";

import { useState, useCallback, useRef } from "react";
import type { VoiceSessionState } from "@/lib/types";

async function getConversationToken(): Promise<string> {
  const response = await fetch("/api/token");
  if (!response.ok) throw new Error("Failed to get conversation token");
  const data = await response.json();
  return data.token;
}

export function useVoiceSession() {
  const [state, setState] = useState<VoiceSessionState>("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [transcript, setTranscript] = useState<string[]>([]);
  const conversationRef = useRef<ReturnType<typeof import("@elevenlabs/react").useConversation> | null>(null);

  const start = useCallback(async () => {
    try {
      setState("connecting");
      await navigator.mediaDevices.getUserMedia({ audio: true });
      const token = await getConversationToken();
      setState("connected");
      return token;
    } catch (error) {
      setState("error");
      console.error("Failed to start voice session:", error);
      throw error;
    }
  }, []);

  const stop = useCallback(() => {
    setState("idle");
    setTranscript([]);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const addTranscript = useCallback((text: string) => {
    setTranscript((prev) => [...prev, text]);
  }, []);

  return {
    state,
    setState,
    isMuted,
    transcript,
    start,
    stop,
    toggleMute,
    addTranscript,
    conversationRef,
  };
}
