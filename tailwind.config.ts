import type { Config } from 'tailwindcss';

/**
 * AirdroiTech Revamp 2.0 — LOCKED PALETTE.
 *
 * `colors` REPLACES Tailwind's default palette rather than extending it.
 * That is deliberate: `bg-blue-500` or `text-slate-400` will not compile,
 * so an off-brand colour cannot enter the codebase by accident.
 *
 * The four brand values are sampled from the logo artwork and must not change:
 *   #2F7F59 teal   — primary, the only brand green legal for white body text
 *   #4F9934 green  — brand mid-tone, large type / icons / gradients only
 *   #A0D233 lime   — accent, always carries ink text, never white
 *   #8E9093 grey   — wordmark grey, structural (borders / disabled / captions)
 *
 * See docs/BRAND.md for the full usage criteria and contrast table.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#FFFFFF',
      black: '#000000',

      // --- brand: deep teal ramp (primary / interactive) ---
      teal: {
        900: '#123122',
        800: '#1A452F',
        700: '#235E42',
        600: '#2F7F59', // BRAND
        300: '#8FC4AC',
        100: '#D7EBE1',
        50: '#EEF7F2',
      },

      // --- brand: signal green (large type, icons, gradient midpoint) ---
      green: {
        800: '#2C5A1D',
        700: '#3C7628',
        600: '#4F9934', // BRAND
        300: '#9CCB87',
        100: '#DDEDD3',
        50: '#F0F7EB',
      },

      // --- brand: lime accent ---
      lime: {
        700: '#5E7C1E',
        500: '#A0D233', // BRAND
        200: '#DDEFAF',
        50: '#F4FAE4',
      },

      // --- neutrals derived off the wordmark grey, keeping its cool cast ---
      grey: {
        50: '#F5F6F7',
        100: '#E9EBEC',
        200: '#D6D9DB',
        300: '#B9BDC0',
        400: '#8E9093', // BRAND
        500: '#74777A',
        600: '#5A5D60',
        700: '#424547',
        800: '#2B2E30',
        900: '#131A17', // ink — green-tinted near-black
      },

      // --- semantic only. Never used as an accent. ---
      ok: { DEFAULT: '#235E42', bg: '#EEF7F2' },
      warn: { DEFAULT: '#8A6212', bg: '#FBF3DF' },
      bad: { DEFAULT: '#A33B2E', bg: '#FBEDEA' },
    },

    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'Helvetica Neue', 'Arial', 'sans-serif'],
        sans: ['var(--font-body)', 'Segoe UI', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // 1.25 ratio scale, matching docs/BRAND.md
        '2xs': ['0.75rem', { lineHeight: '1.4' }],
        xs: ['0.844rem', { lineHeight: '1.5' }],
        base: ['0.969rem', { lineHeight: '1.62' }],
        md: ['1.094rem', { lineHeight: '1.55' }],
        lg: ['1.313rem', { lineHeight: '1.4' }],
        xl: ['1.625rem', { lineHeight: '1.25' }],
        '2xl': ['2.063rem', { lineHeight: '1.15' }],
        '3xl': ['2.563rem', { lineHeight: '1.05' }],
        '4xl': ['3.25rem', { lineHeight: '1.02' }],
      },
      maxWidth: {
        prose: '68ch',
        container: '1220px',
      },
      backgroundImage: {
        // The logo's own sweep, teal -> green -> lime. Ink text only, max one
        // instance per page, never behind running text.
        'brand-sweep': 'linear-gradient(100deg, #2F7F59 0%, #4F9934 52%, #A0D233 100%)',
      },
      transitionDuration: {
        reveal: '200ms',
      },
      minHeight: {
        tap: '44px',
      },
      minWidth: {
        tap: '44px',
      },
    },
  },
  plugins: [],
};

export default config;
