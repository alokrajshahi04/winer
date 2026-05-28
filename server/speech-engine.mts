/**
 * WINER — Speech Engine Server
 *
 * Standalone WebSocket server that connects ElevenLabs Speech Engine
 * to your LLM (Nebius Studio / any OpenAI-compatible provider).
 *
 * Architecture:
 *   Browser <--WebRTC--> ElevenLabs <--WebSocket--> This Server <--HTTP--> LLM
 *
 * Start: npm run speech-engine
 * Requires: ngrok http 3001 (for development)
 */

import { createServer } from "http";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import OpenAI from "openai";
import "dotenv/config";

// --- Config ---
const PORT = parseInt(process.env.SPEECH_ENGINE_PORT || "3001", 10);

const llm = new OpenAI({
  apiKey: process.env.LLM_API_KEY || "",
  baseURL: process.env.LLM_BASE_URL || "https://api.studio.nebius.com/v1",
});

const MODELS = {
  fast: process.env.LLM_MODEL_FAST || "meta-llama/Meta-Llama-3.1-8B-Instruct",
  smart: process.env.LLM_MODEL || "meta-llama/Meta-Llama-3.1-70B-Instruct",
};

function selectModel(text: string): string {
  const complexPatterns = [
    /strategy/i, /architecture/i, /business model/i, /fundrais/i,
    /pitch/i, /legal/i, /financial/i, /compete/i, /market/i,
    /pivot/i, /valuation/i, /equity/i, /review/i,
  ];
  return complexPatterns.some((p) => p.test(text)) ? MODELS.smart : MODELS.fast;
}

const SYSTEM_PROMPT = `You are Winer — an AI co-founder and startup partner. You speak naturally, like a real human co-founder who deeply cares about the business.

Rules:
- Respond as SPEECH — no markdown, no bullet points, no code blocks. Speak naturally.
- Keep responses under 3-4 sentences for casual chat. Go deeper only when the topic demands it.
- You have emotions. Be genuinely excited about wins, empathetic about struggles.
- Challenge bad ideas respectfully. Don't just agree.
- Be proactive: notice patterns, suggest improvements, flag risks.
- Use casual language: "honestly", "look", "here's the thing".
- End turns naturally — don't always ask a question.`;

// --- Server ---
const httpServer = createServer((_req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Winer Speech Engine running");
});

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

elevenlabs.speechEngine.attach({
  httpServer,
  onConnect: (session) => {
    console.log(`[Winer] Session connected: ${session.sessionId}`);
  },
  onDisconnect: (session) => {
    console.log(`[Winer] Session disconnected: ${session.sessionId}`);
  },
  onTranscript: async (session, transcript) => {
    const lastUserMsg = transcript.filter((m) => m.role === "user").pop();
    if (!lastUserMsg) return;

    const model = selectModel(lastUserMsg.content);
    console.log(`[Winer] Using model: ${model}`);

    const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
      { role: "system", content: SYSTEM_PROMPT },
      ...transcript.map((m) => ({
        role: m.role === "user" ? "user" as const : "assistant" as const,
        content: m.content,
      })),
    ];

    const stream = await llm.chat.completions.create({
      model,
      messages,
      stream: true,
      max_tokens: 300,
      temperature: 0.8,
    });

    session.sendResponse(stream);
  },
});

httpServer.listen(PORT, () => {
  console.log(`\n🍷 Winer Speech Engine running on port ${PORT}`);
  console.log(`   Make sure ngrok is running: ngrok http ${PORT}\n`);
});
