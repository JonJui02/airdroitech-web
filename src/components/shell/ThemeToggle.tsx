'use client';

import { useEffect, useState } from 'react';
import { THEME_KEY, THEME_SWITCH_MS, type Theme } from '@/lib/theme';

/** The theme actually showing: an explicit choice if one is set, else the OS. */
function effectiveTheme(): Theme {
  const chosen = document.documentElement.getAttribute('data-theme');
  if (chosen === 'light' || chosen === 'dark') return chosen;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Light/dark switch.
 *
 * Before hydration it cannot know the theme, so it renders a neutral label and
 * the moon icon; the server and first client render therefore match. After
 * mount it reads the real state and follows OS changes until the visitor makes
 * an explicit choice.
 *
 * The cross-fade is opt-in per switch: `.theme-switching` goes on <html> for
 * one switch only (see globals.css), so ordinary hovers are never slowed.
 */
export function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(effectiveTheme());
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onOsChange = () => {
      if (!document.documentElement.hasAttribute('data-theme')) setTheme(effectiveTheme());
    };
    mq.addEventListener('change', onOsChange);
    return () => mq.removeEventListener('change', onOsChange);
  }, []);

  function toggle() {
    const next: Theme = effectiveTheme() === 'dark' ? 'light' : 'dark';
    const root = document.documentElement;
    root.classList.add('theme-switching');
    root.setAttribute('data-theme', next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Storage blocked: the switch still applies for this page view.
    }
    setTheme(next);
    window.setTimeout(() => root.classList.remove('theme-switching'), THEME_SWITCH_MS + 50);
  }

  const label =
    theme === 'dark'
      ? 'Switch to light theme'
      : theme === 'light'
        ? 'Switch to dark theme'
        : 'Switch colour theme';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`inline-flex min-h-tap min-w-tap items-center justify-center transition-colors duration-200 ${className}`}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <line
          key={deg}
          x1="12"
          y1="2.6"
          x2="12"
          y2="5.2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          transform={`rotate(${deg} 12 12)`}
        />
      ))}
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M20.2 14.6A8.4 8.4 0 0 1 9.4 3.8a8.4 8.4 0 1 0 10.8 10.8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}
