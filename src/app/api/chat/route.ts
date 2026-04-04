import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';

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

  // Limit message history to prevent abuse
  const messages = body.messages.slice(-20).map((m) => ({
    role: m.role as 'user' | 'assistant',
    content: String(m.content).slice(0, 2000),
  }));

  const systemPrompt = body.context
    ? `${SYSTEM_PROMPT}\n\nContext about this user's screening results:\n${String(body.context).slice(0, 3000)}`
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
        } catch (err) {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ error: 'Stream interrupted' })}\n\n`,
            ),
          );
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
