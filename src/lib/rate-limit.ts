import { NextResponse } from 'next/server';

/**
 * Per-IP rate limit for the two form endpoints.
 *
 * In-memory, so it is per-instance only — good enough to stop a naive script,
 * NOT a defence against a distributed flood. Phase 4 should swap the Map for
 * Vercel KV or Upstash if abuse actually shows up in the logs.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

const hits = new Map<string, number[]>();

function clientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for');
  return fwd?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown';
}

export async function rateLimit(req: Request, bucket: string): Promise<NextResponse | null> {
  const key = `${bucket}:${clientIp(req)}`;
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_PER_WINDOW) {
    return NextResponse.json(
      { ok: false, error: 'Too many submissions. Try again in a few minutes.' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil(WINDOW_MS / 1000)) } },
    );
  }

  recent.push(now);
  hits.set(key, recent);
  return null;
}
