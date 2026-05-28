export const elevenlabsConfig = {
  apiKey: process.env.ELEVENLABS_API_KEY || "",
  speechEngineId: process.env.SPEECH_ENGINE_ID || process.env.NEXT_PUBLIC_SPEECH_ENGINE_ID || "",
} as const;
