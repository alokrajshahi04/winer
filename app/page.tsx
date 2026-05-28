import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[80%] rounded-full bg-brand-600/10 blur-[120px]" />
        <div className="absolute bottom-[-30%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-600/10 blur-[100px]" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-2xl">\ud83c\udf77</span>
          <span className="text-xl font-bold text-white">Winer</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/alokrajshahi04/winer"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
          >
            GitHub
          </a>
          <Link
            href="/login"
            className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition-colors shadow-lg shadow-brand-600/25"
          >
            Get started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-20 pb-32">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
            Built for ElevenHacks #10 \u2014 Speech Engine
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
            Never build
            <br />
            <span className="text-gradient from-brand-400 via-purple-400 to-pink-400">
              alone again.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Winer is your AI co-founder that actually talks. It knows your
            projects, supervises your work, challenges your ideas, celebrates
            your wins, and feels like a real human partner on the other side.
          </p>

          <div className="flex items-center justify-center gap-4 mb-16">
            <Link
              href="/register"
              className="px-8 py-3.5 text-base font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-2xl transition-all duration-200 shadow-xl shadow-brand-600/30 hover:shadow-brand-600/50 hover:scale-105 active:scale-95"
            >
              Meet your co-founder \u2192
            </Link>
            <a
              href="https://github.com/alokrajshahi04/winer"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 text-base font-medium text-gray-300 bg-surface-overlay hover:bg-surface-subtle rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-200"
            >
              View source
            </a>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <FeatureCard
              icon="\ud83c\udf99\ufe0f"
              title="Voice-first"
              description="Talk naturally. No typing, no prompting. Just conversation with your co-founder."
            />
            <FeatureCard
              icon="\ud83e\udde0"
              title="Context-aware"
              description="Knows your projects, your background, your goals. Gets smarter every conversation."
            />
            <FeatureCard
              icon="\ud83d\udcb0"
              title="Cost-smart"
              description="BYO LLM. Routes cheap models for chat, frontier for decisions. Open source."
            />
          </div>
        </div>

        {/* How it works */}
        <section className="mt-32">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            How it works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <HowItWorksCard step="01" title="Add your context" description="Paste from ChatGPT, Gemini, or tell Winer about yourself. No Notion required." />
            <HowItWorksCard step="02" title="Start talking" description="Click the orb and start a voice conversation. ElevenLabs Speech Engine handles the voice." />
            <HowItWorksCard step="03" title="Build together" description="Brainstorm ideas, review strategy, debug problems, or just talk through your day." />
            <HowItWorksCard step="04" title="Watch it evolve" description="Winer learns your patterns, recommends tools, and proactively suggests improvements." />
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-32 text-center">
          <p className="text-sm text-gray-500">
            Built with \u2764\ufe0f for{" "}
            <a href="https://hacks.elevenlabs.io/hackathons/9" target="_blank" rel="noopener noreferrer" className="text-brand-400 hover:text-brand-300 transition-colors">
              ElevenHacks #10
            </a>{" "}by{" "}
            <a href="https://github.com/alokrajshahi04" target="_blank" rel="noopener noreferrer" className="text-brand-400 hover:text-brand-300 transition-colors">
              Alok Raj Shahi
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="glass rounded-2xl p-5 text-left glass-hover transition-all duration-200">
      <span className="text-2xl">{icon}</span>
      <h3 className="text-sm font-semibold text-white mt-3 mb-1">{title}</h3>
      <p className="text-xs text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}

function HowItWorksCard({ step, title, description }: { step: string; title: string; description: string }) {
  return (
    <div className="glass rounded-2xl p-6 glass-hover transition-all duration-200">
      <span className="text-xs font-mono text-brand-400 font-bold">{step}</span>
      <h3 className="text-base font-semibold text-white mt-2 mb-2">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}
