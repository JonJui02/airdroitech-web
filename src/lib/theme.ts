/**
 * Colour theme.
 *
 * Three states, matching globals.css: no attribute follows the OS
 * (`prefers-color-scheme`); `data-theme="light"` or `"dark"` on <html> is an
 * explicit choice made with ThemeToggle and remembered in localStorage.
 */

export type Theme = 'light' | 'dark';

export const THEME_KEY = 'adt-theme';

/** Length of the colour cross-fade. Matched by the rule in globals.css. */
export const THEME_SWITCH_MS = 250;

/**
 * Runs in <head> before first paint. Restores a stored choice so a visitor who
 * picked light does not see a flash of dark on every page load (or the
 * reverse). Wrapped in try/catch: storage throws in some private modes and
 * locked-down browsers, and then the page simply follows the OS.
 *
 * It also adds `tt-ready` to <html> unless the visitor prefers reduced motion.
 * The typing headlines (TypeText, globals.css) only animate under that class,
 * so reduced-motion visitors always get plain static text.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('${THEME_KEY}');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}try{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('tt-ready');}}catch(e){}})();`;
