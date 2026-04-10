import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";

// Known program IDs from the benefits engine
const VALID_PROGRAMS = new Set([
  "snap",
  "medicaid",
  "chip",
  "eitc",
  "ssi",
  "section8",
  "wic",
  "liheap",
  "pell-grant",
  "ca-calfresh",
  "ca-calworks",
  "tx-snap",
  "fl-access",
  "ny-snap",
  "ny-essential-plan",
  "pa-snap",
]);

const VALID_TOPICS = new Set([
  "eligibility",
  "application",
  "benefits",
  "documents",
  "timeline",
  "renewal",
  "appeal",
]);

// Shared rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 60_000;
function checkRateLimit(userId: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(userId);
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(userId, { count: 1, resetTime: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

export async function POST(request: Request) {
  // Auth check
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 },
    );
  }

  if (!checkRateLimit(user.id)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment." },
      { status: 429 },
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "AI features are not configured" },
      { status: 503 },
    );
  }

  let body: { programName: string; topic: string; readingLevel?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!body.programName || !body.topic) {
    return NextResponse.json(
      { error: "programName and topic are required" },
      { status: 400 },
    );
  }

  // Validate against known values to prevent prompt injection
  if (!VALID_PROGRAMS.has(body.programName)) {
    return NextResponse.json({ error: "Unknown program" }, { status: 400 });
  }
  const topic = VALID_TOPICS.has(body.topic) ? body.topic : "eligibility";
  const readingLevel =
    body.readingLevel === "8th grade" ? "8th grade" : "6th grade";

  try {
    const client = new Anthropic({ apiKey });

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 512,
      messages: [
        {
          role: "user",
          content: `Explain this about the ${body.programName} program in plain language at a ${readingLevel} reading level. Keep it under 100 words. Be warm and encouraging.\n\nTopic: ${topic}`,
        },
      ],
    });

    const text =
      response.content[0]?.type === "text" ? response.content[0].text : "";

    return NextResponse.json({ explanation: text });
  } catch (err) {
    console.error("[explain] Anthropic error:", err);
    return NextResponse.json(
      { error: "Failed to generate explanation" },
      { status: 500 },
    );
  }
}
