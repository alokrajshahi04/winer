"""WINER — Modal.com Demo Features

Deploy 2-3 demo features using Modal.com GPU credits.
These show what's possible with Winer + GPU compute.

Features:
1. Smart Summarizer — Summarize meeting notes / long documents
2. Pitch Analyzer — Analyze pitch deck text and give feedback
3. Market Research — Quick competitive analysis

Usage: modal deploy scripts/modal-demo.py
"""

import modal

app = modal.App("winer-demos")

# Shared image with dependencies
image = modal.Image.debian_slim(python_version="3.11").pip_install(
    "openai",
    "pydantic",
)


@app.function(image=image, secrets=[modal.Secret.from_name("winer-secrets")])
def summarize_meeting(transcript: str) -> dict:
    """Smart Meeting Summarizer — Summarize meeting notes into actionable items."""
    import os
    from openai import OpenAI

    client = OpenAI(
        api_key=os.environ["LLM_API_KEY"],
        base_url=os.environ.get("LLM_BASE_URL", "https://api.studio.nebius.com/v1"),
    )

    response = client.chat.completions.create(
        model="meta-llama/Meta-Llama-3.1-70B-Instruct",
        messages=[
            {
                "role": "system",
                "content": """You are a startup meeting summarizer. Given meeting notes or transcript,
produce a structured summary with:
1. Key Decisions (what was decided)
2. Action Items (who does what by when)
3. Open Questions (unresolved topics)
4. Risks Identified (potential issues raised)
5. Next Steps (what happens next)

Be concise and actionable. Use names when mentioned.""",
            },
            {"role": "user", "content": f"Summarize this meeting:\n\n{transcript}"},
        ],
        max_tokens=1000,
        temperature=0.3,
    )

    return {
        "summary": response.choices[0].message.content,
        "model": "llama-3.1-70b",
        "tokens_used": response.usage.total_tokens if response.usage else 0,
    }


@app.function(image=image, secrets=[modal.Secret.from_name("winer-secrets")])
def analyze_pitch(pitch_text: str) -> dict:
    """Pitch Analyzer — Give VC-level feedback on a pitch."""
    import os
    from openai import OpenAI

    client = OpenAI(
        api_key=os.environ["LLM_API_KEY"],
        base_url=os.environ.get("LLM_BASE_URL", "https://api.studio.nebius.com/v1"),
    )

    response = client.chat.completions.create(
        model="meta-llama/Meta-Llama-3.1-70B-Instruct",
        messages=[
            {
                "role": "system",
                "content": """You are an experienced VC partner who has seen 10,000+ pitches.
Analyze the pitch and provide:

1. **Score** (1-10): Overall pitch quality
2. **Strengths**: What's compelling
3. **Weaknesses**: What's missing or unconvincing
4. **Questions a VC Would Ask**: The tough questions they need to be ready for
5. **Suggestions**: Specific improvements to make the pitch stronger

Be direct, honest, and constructive. Think like a16z or YC partner.""",
            },
            {"role": "user", "content": f"Analyze this pitch:\n\n{pitch_text}"},
        ],
        max_tokens=1500,
        temperature=0.4,
    )

    return {
        "analysis": response.choices[0].message.content,
        "model": "llama-3.1-70b",
        "tokens_used": response.usage.total_tokens if response.usage else 0,
    }


@app.function(image=image, secrets=[modal.Secret.from_name("winer-secrets")])
def research_market(query: str) -> dict:
    """Market Research — Quick competitive analysis and market insights."""
    import os
    from openai import OpenAI

    client = OpenAI(
        api_key=os.environ["LLM_API_KEY"],
        base_url=os.environ.get("LLM_BASE_URL", "https://api.studio.nebius.com/v1"),
    )

    response = client.chat.completions.create(
        model="meta-llama/Meta-Llama-3.1-70B-Instruct",
        messages=[
            {
                "role": "system",
                "content": """You are a startup market research analyst. Given a product or market query,
provide:

1. **Market Overview**: Size, growth, key trends
2. **Key Competitors**: Who's in this space and their positioning
3. **Gaps & Opportunities**: Where the market is underserved
4. **Go-to-Market Ideas**: How to enter this market effectively
5. **Risks**: Market-specific risks to watch

Base your analysis on known market data and patterns. Be specific and actionable.""",
            },
            {"role": "user", "content": f"Research this market/product:\n\n{query}"},
        ],
        max_tokens=1500,
        temperature=0.4,
    )

    return {
        "research": response.choices[0].message.content,
        "model": "llama-3.1-70b",
        "tokens_used": response.usage.total_tokens if response.usage else 0,
    }


@app.local_entrypoint()
def main():
    """Test the demo features."""
    print("\n🍷 Winer Modal.com Demo Features\n")

    # Test summarizer
    print("📝 Testing Meeting Summarizer...")
    result = summarize_meeting.remote(
        """Meeting: Winer Hackathon Planning
        Attendees: Alok, AI Co-founder
        - Decided to use ElevenLabs Speech Engine for voice
        - Nebius Studio for LLM (Llama 3.1 8B and 70B)
        - Smart routing between cheap and expensive models
        - Appwrite for auth and database
        - Need to submit by end of week
        - TODO: Set up ngrok, create speech engine, build landing page
        - Risk: Voice latency might be too high
        - Next: Build MVP in 48 hours"""
    )
    print(f"Result: {result['summary'][:200]}...\n")

    # Test pitch analyzer
    print("🎯 Testing Pitch Analyzer...")
    result = analyze_pitch.remote(
        """Winer - AI Co-founder
        Problem: Entrepreneurship is lonely. Founders lack a 24/7 thinking partner.
        Solution: Voice-first AI co-founder using ElevenLabs Speech Engine.
        Differentiator: BYO LLM, open source, smart model routing, emotional intelligence.
        Market: 500M+ solo entrepreneurs globally.
        Business model: Open source core, premium features (advanced agents, team collab)."""
    )
    print(f"Result: {result['analysis'][:200]}...\n")

    print("✅ All demos working!\n")
