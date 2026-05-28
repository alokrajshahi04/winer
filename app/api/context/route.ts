import { NextRequest, NextResponse } from "next/server";

const contextStore = new Map<string, Array<{ category: string; content: string; source: string }>>();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, category, content, source } = body;

    if (!userId || !content) {
      return NextResponse.json({ error: "userId and content required" }, { status: 400 });
    }

    const userContexts = contextStore.get(userId) || [];
    userContexts.push({
      category: category || "general",
      content,
      source: source || "manual",
    });
    contextStore.set(userId, userContexts);

    return NextResponse.json({ success: true, contextCount: userContexts.length });
  } catch (error) {
    console.error("Context save failed:", error);
    return NextResponse.json({ error: "Failed to save context" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId") || "default";
  const contexts = contextStore.get(userId) || [];
  return NextResponse.json({ contexts });
}
