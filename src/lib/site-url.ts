/**
 * The canonical site origin, resolved once for metadata, sitemap and robots.
 *
 * Why this is not just `process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK`:
 * `??` falls back only on null and undefined, and an env var that is *defined
 * but empty* is a plain empty string. Importing this project into Vercel
 * detected the six keys in `.env.example` and created them with empty values,
 * so `NEXT_PUBLIC_SITE_URL` arrived as `''`, `??` kept it, and
 * `new URL('')` threw at build:
 *
 *   [Error: Failed to collect configuration for /_not-found]
 *     [cause]: TypeError: Invalid URL
 *     code: 'ERR_INVALID_URL', input: ''
 *
 * A blank value means "not configured", so it must fall back. The parse guard
 * covers the same class of mistake — a value like `airdroitech.com` with no
 * protocol would throw in exactly the same place.
 */

const FALLBACK = 'https://airdroitech.com';

function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return FALLBACK;

  try {
    // Throws on a missing protocol or any other malformed value.
    return new URL(raw).origin;
  } catch {
    return FALLBACK;
  }
}

/** Absolute origin, no trailing slash. Safe to pass to `new URL()`. */
export const SITE_URL = resolveSiteUrl();
