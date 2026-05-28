# 🍷 Winer — Your AI Co-founder

> Never build alone again.

Winer is a **voice-first AI co-founder** that knows your projects, supervises your work, challenges your ideas, celebrates your wins, and feels like a real human partner on the other side.

Built for [ElevenHacks #10: Speech Engine](https://hacks.elevenlabs.io/hackathons/9).

## ✨ What Makes Winer Different

| Feature | Winer | ChatGPT / Copilot |
|---|---|---|
| **Voice-first** | Natural conversation, always available | Text-based, you type |
| **Context-aware** | Knows your projects, your background, your goals | Stateless, you re-explain |
| **Proactive** | Notices patterns, flags risks, suggests improvements | Reactive, waits for prompts |
| **Emotionally intelligent** | Celebrates wins, empathizes with struggles | Neutral/robotic |
| **Cost-smart** | Routes cheap models for chat, frontier for decisions | One expensive model for everything |
| **Open source** | BYO LLM, BYO keys, no vendor lock-in | Locked ecosystem |

## 🏗️ Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   You speak     │ ───▶ │  ElevenLabs     │ ───▶ │  Your Server    │
│   (Browser)     │     │  Speech Engine   │     │  (Winer)        │
└─────────────────┘     └─────────────────┘     └───────┬─────────┘
       ▲              STT / TTS                     │
       │                                      ┌─────▼─────────────┐
       │                                      │  Smart Router     │
       │                                      └─────┬───┬─────────┘
       │                                            │     │
  ┌────┴────────────┐  ┌─────────────┐  ┌───▼─────▼───────┐
  │  Voice plays    │  │ User Context │  │ Cheap   Smart   │
  │  back to you    │  │ (Appwrite)   │  │ LLM     LLM     │
  └─────────────────┘  └─────────────┘  │ (8B)    (70B)   │
                                        └─────────────────┘
                                         Nebius Studio
```

**ElevenLabs Speech Engine** handles STT + TTS. **Your server** handles everything else:
- Smart routing: cheap Llama 3.1 8B for casual chat, 70B for complex decisions
- User context: knows your projects, skills, goals
- Agent system: spawns specialized agents for specific tasks

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- [ElevenLabs API Key](https://elevenlabs.io)
- [Nebius Studio API Key](https://studio.nebius.com) (or any OpenAI-compatible provider)
- [Appwrite](https://appwrite.io) project (optional for MVP)
- [ngrok](https://ngrok.com) for local Speech Engine development

### Setup

```bash
# Clone
git clone https://github.com/alokrajshahi04/winer.git
cd winer

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your API keys

# Setup Appwrite collections (optional)
npm run setup:appwrite

# Create Speech Engine (one-time)
npx tsx scripts/create-speech-engine.ts

# Start ngrok (terminal 1)
ngrok http 3001

# Start Speech Engine server (terminal 2)
npm run speech-engine

# Start Next.js app (terminal 3)
npm run dev

# Or run both servers together:
npm run dev:all
```

### Speech Engine Setup

1. Get your ElevenLabs API key from the [dashboard](https://elevenlabs.io/app/settings/api-keys)
2. Start ngrok: `ngrok http 3001`
3. Create a Speech Engine: `NGROK_URL=wss://your-url.ngrok.io npx tsx scripts/create-speech-engine.ts`
4. Copy the Speech Engine ID to your `.env` file
5. Start the server: `npm run speech-engine`

## 🧠 Smart Model Routing

Winer automatically routes to the right model based on query complexity:

| Query Type | Model | Cost |
|---|---|---|
| Casual chat, updates, emotions | Llama 3.1 8B (fast) | ~$0.0001/msg |
| Strategy, architecture, business | Llama 3.1 70B (smart) | ~$0.001/msg |
| Complex multi-step reasoning | Frontier (future) | ~$0.01/msg |

## 📁 Project Structure

```
/app                    # Next.js App Router
  /(auth)               # Login / Register
  /(dashboard)          # Main dashboard with voice interface
  /api                  # Token endpoint, context API
/components
  /ui                   # Button, inputs, etc.
  /features             # VoiceOrb, VoiceInterface, ModeSelector
/lib
  /ai                   # LLM config, prompts, agent router
  /appwrite             # Appwrite client/server config
  /elevenlabs           # ElevenLabs config
  /hooks                # useVoiceSession, useStore
  /types                # TypeScript types
/server
  speech-engine.mts     # Standalone Speech Engine WebSocket server
/scripts
  setup-appwrite.ts     # Create Appwrite collections
  create-speech-engine.ts # Create ElevenLabs Speech Engine
  modal-demo.py         # Modal.com demo features
```

## 🎯 Co-founder Modes

- 💡 **Brainstorm** — Generate and explore ideas together
- ♟️ **Strategy** — Big picture planning and market analysis
- 🔍 **Review** — Critical feedback and gap analysis
- 🔧 **Debug** — Systematic troubleshooting
- 🔥 **Motivate** — Get energized when you're stuck
- 📚 **Research** — Explore and learn new topics

## 🔑 BYO Everything

Winer is designed to be fully open and customizable:

- **BYO LLM**: Nebius, OpenAI, Anthropic, Groq, or any OpenAI-compatible API
- **BYO Voice**: ElevenLabs Speech Engine with your own API key
- **BYO Context**: Paste from ChatGPT/Gemini, connect Notion, or type manually
- **BYO Backend**: Appwrite, Supabase, or any database

## 🛣️ Roadmap

- [x] Voice conversation via ElevenLabs Speech Engine
- [x] Smart LLM routing (cheap vs. frontier)
- [x] Co-founder personality with emotions
- [x] Context import (paste from any AI)
- [x] Project management
- [ ] Notion MCP integration
- [ ] Agent spawning for specialized tasks
- [ ] Self-evolving tools (AI writes its own integrations)
- [ ] Modal.com GPU features (voice cloning, image gen)
- [ ] Persistent conversation memory
- [ ] Proactive notifications and check-ins

## 🏆 Built For

[ElevenHacks #10: Speech Engine](https://hacks.elevenlabs.io/hackathons/9) — A weekly hackathon by ElevenLabs.

## 📜 License

MIT — use it, fork it, build on it.

---

Built with ❤️ by [Alok Raj Shahi](https://github.com/alokrajshahi04)
