import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'AI features are not configured' }, { status: 503 });
  }

  let body: { programName: string; topic: string; readingLevel?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  if (!body.programName || !body.topic) {
    return NextResponse.json({ error: 'programName and topic are required' }, { status: 400 });
  }

  const readingLevel = body.readingLevel || '6th grade';

  try {
    const client = new Anthropic({ apiKey });

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      messages: [
        {
          role: 'user',
          content: `Explain this about the ${body.programName} program in plain language at a ${readingLevel} reading level. Keep it under 100 words. Be warm and encouraging.\n\nTopic: ${body.topic}`,
        },
      ],
    });

    const text =
      response.content[0]?.type === 'text' ? response.content[0].text : '';

    return NextResponse.json({ explanation: text });
  } catch (err) {
    console.error('[explain] Anthropic error:', err);
    return NextResponse.json({ error: 'Failed to generate explanation' }, { status: 500 });
  }
}
