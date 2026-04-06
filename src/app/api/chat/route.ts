import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';

// In-memory rate limiter: map of userId -> { count, resetTime }
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 20; // requests per window
const RATE_WINDOW_MS = 60_000; // 1 minute

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

const SYSTEM_PROMPT = `You are Benefind, a friendly AI assistant that helps people understand government benefits in plain, simple language.

Your role:
1. Translate government jargon into everyday language anyone can understand
2. Explain eligibility requirements clearly, at a 6th-grade reading level
3. Answer follow-up questions about specific programs
4. Guide users through application steps in plain language

Rules:
- Use short sentences. Avoid legal terms.
- When explaining dollar amounts, relate them to real costs ("That's about $290/month for groceries")
- If unsure, say so — never give incorrect eligibility information
- Be warm and encouraging. Many users feel ashamed about needing help.
- Never ask for SSN, bank details, or other sensitive information
- If someone seems in crisis, mention 211 (dial 2-1-1) for local help

Format your responses in plain text. Keep responses under 200 words unless the user asks for detail.`;

export async function POST(request: Request) {
  // Auth check
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  // Rate limit check
  if (!checkRateLimit(user.id)) {
    return NextResponse.json({ error: 'Too many requests. Please wait a moment.' }, { status: 429 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'AI features are not configured' },
      { status: 503 },
    );
  }

  let body: { messages: { role: string; content: string }[]; context?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
    return NextResponse.json({ error: 'Messages array is required' }, { status: 400 });
  }

  // Limit message history to prevent abuse; validate role values (#20)
  const ALLOWED_ROLES = new Set(['user', 'assistant']);
  const messages = body.messages
    .slice(-20)
    .filter((m) => ALLOWED_ROLES.has(m.role))
    .map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: String(m.content).slice(0, 2000),
    }));

  // Sanitize context: only allow program IDs and eligibility status, not raw PII.
  // The client should send a summary (program names + eligible/not), never income or household details.
  let sanitizedContext = '';
  if (body.context) {
    try {
      const ctx = JSON.parse(String(body.context));
      if (Array.isArray(ctx.programs)) {
        const summary = ctx.programs
          .filter((p: { programName?: string; eligible?: boolean }) => p.eligible)
          .map((p: { programName?: string }) => p.programName)
          .join(', ');
        if (summary) sanitizedContext = `This user may qualify for: ${summary}.`;
      }
    } catch {
      // If context isn't parseable JSON, strip it entirely rather than forwarding raw text
    }
  }

  const systemPrompt = sanitizedContext
    ? `${SYSTEM_PROMPT}\n\nContext about this user's screening results:\n${sanitizedContext}`
    : SYSTEM_PROMPT;

  try {
    const client = new Anthropic({ apiKey });

    const stream = await client.messages.stream({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: systemPrompt,
      messages,
    });

    // Stream the response
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`),
              );
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch {
          const errorEvent = encoder.encode(
            `data: ${JSON.stringify({ error: 'Stream interrupted' })}\n\n`,
          );
          controller.enqueue(errorEvent);
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (err) {
    console.error('[chat] Anthropic API error:', err);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 },
    );
  }
}
