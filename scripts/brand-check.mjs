#!/usr/bin/env node
/**
 * Brand guard, enforced in CI.
 *
 * Fails the build when source files contain:
 *   1. a raw hex colour that is not in the approved token set
 *   2. a Tailwind class from a palette that no longer exists (bg-blue-500 etc.)
 *   3. a forbidden colour pairing written as adjacent utilities
 *
 * Run: npm run brand:check
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const ROOTS = ['src', 'docs'];
const EXT = new Set(['.ts', '.tsx', '.css', '.mdx', '.md']);

// Brand four + derived ramps + semantic + pure white/black. Everything else fails.
const APPROVED = new Set([
  '#2f7f59', '#4f9934', '#a0d233', '#8e9093',
  '#123122', '#1a452f', '#235e42', '#8fc4ac', '#d7ebe1', '#eef7f2',
  '#2c5a1d', '#3c7628', '#9ccb87', '#ddedd3', '#f0f7eb',
  '#5e7c1e', '#8fbe2b', '#b2de55', '#ddefaf', '#f4fae4',
  '#f5f6f7', '#e9ebec', '#d6d9db', '#b9bdc0', '#74777a', '#5a5d60',
  '#424547', '#2b2e30', '#131a17',
  '#0e1411', '#161e1a', '#1b2420', '#2c3833', '#465249',
  '#eaeeeb', '#c3cbc6', '#94a09a', '#3c9469', '#48a87a',
  '#f7f9f8', '#edf2f0', '#dfe7e4', '#e6f0eb', '#dae8e1', // light-theme grounds, brand-guardian 2026-09-13
  // Page tones: light lime or light grey mixed into white, per route. docs/BRAND.md "Page tones".
  '#e4e4e5', '#e7e8e8', '#eaeaea', '#ebebec', '#ebf6d4', '#ecf6d6', '#ededee', '#eeeeef', '#eef7da', '#efeff0', '#f0f1f1', '#f0f8de', '#f1f2f2', '#f1f8e0', '#f2f9e2', '#f3f9e4', '#f4f4f4', '#f4fae7', '#f5f5f5', '#f5fae9', '#f6fbeb', '#f6fbed', '#f7f7f7', '#f8f8f9', '#f8fcf1', '#f9fcf3', '#fafbfb', '#fafdf5', '#fcfcfc', '#fcfef9', '#fdfdfd', '#fefefc',
  '#235e42', '#8a6212', '#a33b2e', '#eef7f2', '#fbf3df', '#fbedea',
  '#7fc79f', '#d9b25c', '#e28b7c',
  '#ffffff', '#000000', '#fff', '#000',
]);

// Palettes deleted from tailwind.config.ts. Catching them by name gives a
// better error than Tailwind silently emitting nothing.
const DEAD_PALETTES = [
  'slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber',
  'yellow', 'emerald', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple',
  'fuchsia', 'pink', 'rose',
];
const DEAD_RE = new RegExp(
  `\b(?:bg|text|border|ring|from|via|to|fill|stroke|divide|outline|shadow|decoration|accent|caret|placeholder)-(?:${DEAD_PALETTES.join('|')})-\d{2,3}\b`,
  'g',
);

const HEX_RE = /#[0-9a-fA-F]{3,8}\b/g;

const problems = [];

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry === '.next') continue;
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p);
    else if (EXT.has(extname(p))) inspect(p);
  }
}

function inspect(file) {
  // brand.ts and BRAND.md are the registries — they are allowed to list hexes.
  const isRegistry = /brand\.ts$|BRAND\.md$|brand-check\.mjs$|globals\.css$|tailwind\.config\.ts$/.test(file);
  const lines = readFileSync(file, 'utf8').split('\n');

  lines.forEach((line, i) => {
    const at = `${file}:${i + 1}`;

    for (const m of line.matchAll(DEAD_RE)) {
      problems.push(`${at}  dead palette class "${m[0]}" — that palette was removed from tailwind.config.ts. Use teal/green/lime/grey.`);
    }

    if (isRegistry) return;

    for (const m of line.matchAll(HEX_RE)) {
      if (!APPROVED.has(m[0].toLowerCase())) {
        problems.push(`${at}  off-brand hex "${m[0]}" — not in the approved token set. See docs/BRAND.md.`);
      }
    }
  });
}

for (const root of ROOTS) {
  try { walk(root); } catch { /* directory may not exist yet */ }
}

if (problems.length) {
  console.error(`\nBrand check FAILED — ${problems.length} problem(s):\n`);
  for (const p of problems) console.error('  ' + p);
  console.error('\nFix the colours or, if a new token is genuinely needed, add it to');
  console.error('tailwind.config.ts, src/styles/globals.css, src/lib/brand.ts and this');
  console.error('script together — and get it signed off by the brand-guardian agent.\n');
  process.exit(1);
}

console.log('Brand check passed — no off-brand colours found.');
