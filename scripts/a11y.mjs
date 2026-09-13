/**
 * Accessibility gate — axe-core driven over the Chrome DevTools Protocol.
 *
 * Replaces @axe-core/cli, which pulled in Selenium and an unpinned
 * `chromedriver: "latest"`. That dependency broke `npm install` outright on
 * Node 20 (chromedriver >=148 requires Node 22), and pinning it back to a
 * Node-20-safe 147 produced a driver that refused to drive Chrome 153.
 *
 * Driving Chrome directly over CDP removes the version-matching problem
 * entirely: whatever Chrome is installed is the Chrome we test in. No driver,
 * no browser download, no per-machine pinning.
 *
 * Usage (routes WITHOUT a leading slash — see toUrl):
 *   npm run a11y                              # http://localhost:3000/
 *   npm run a11y -- . what-we-do projects     # "." is the homepage
 *   npm run a11y -- https://staging.example.com/
 *   npm run a11y -- --theme both . projects   # audit light AND dark
 *   CHROME_PATH=/path/to/chrome npm run a11y
 *
 * --theme light|dark|both emulates prefers-color-scheme for each page. The
 * site follows the OS whenever no explicit choice is stored, and every audit
 * runs in a fresh profile with empty storage, so the emulated scheme is the
 * theme that renders. Without the flag, Chrome's own default applies — which
 * cannot prove contrast in both themes.
 *
 * Exits 1 if any violation is found, so it can gate a build.
 */
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import WebSocket from 'ws';

const require = createRequire(import.meta.url);
const AXE_SOURCE = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');

const BASE = process.env.A11Y_BASE ?? 'http://localhost:3000';
const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

/**
 * Routes may be given with or without the leading slash. Prefer without under
 * Git Bash: MSYS rewrites a leading-slash argument into a Windows path before
 * Node ever sees it, so `/what-we-do/` arrives as `C:/Program Files/Git/what-we-do/`.
 * Every route is normalised to a trailing slash to match `trailingSlash: true`.
 */
function toUrl(target) {
  if (/^https?:\/\//i.test(target)) return target;
  // "." is the spelling for the homepage: a bare "/" cannot survive Git Bash.
  if (target === '.' || target === '') return `${BASE}/`;

  if (/^[A-Za-z]:[\\/]/.test(target)) {
    const recovered = target.replace(/\\/g, '/').split('/').filter(Boolean).pop() ?? '';
    throw new Error(
      `"${target}" is a filesystem path, not a route.\n` +
        `Git Bash rewrites arguments that start with "/". Drop the leading slash:\n` +
        `  npm run a11y -- ${recovered}`,
    );
  }

  const route = target.replace(/^\/+/, '').replace(/\/+$/, '');
  return route ? `${BASE}/${route}/` : `${BASE}/`;
}

// ---- arguments -------------------------------------------------------------
const rawArgs = process.argv.slice(2);
const args = [];
let themeFlag = null;
for (let i = 0; i < rawArgs.length; i++) {
  if (rawArgs[i] === '--theme') themeFlag = rawArgs[++i] ?? '';
  else args.push(rawArgs[i]);
}

if (themeFlag !== null && !['light', 'dark', 'both'].includes(themeFlag)) {
  console.error(`\n--theme must be light, dark or both (got "${themeFlag}").\n`);
  process.exit(2);
}

/** null = no emulation: Chrome's default colour scheme. */
const SCHEMES = themeFlag === 'both' ? ['light', 'dark'] : themeFlag ? [themeFlag] : [null];

let targets;
try {
  targets = (args.length ? args : ['/']).map(toUrl);
} catch (err) {
  console.error(`\n${err.message}\n`);
  process.exit(2);
}

// ---- chrome ----------------------------------------------------------------
function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const byPlatform = {
    win32: [
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      path.join(os.homedir(), 'AppData\\Local\\Google\\Chrome\\Application\\chrome.exe'),
    ],
    darwin: [
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Chromium.app/Contents/MacOS/Chromium',
    ],
    linux: ['/usr/bin/google-chrome', '/usr/bin/chromium-browser', '/usr/bin/chromium'],
  };
  const found = (byPlatform[process.platform] ?? []).find((c) => fs.existsSync(c));
  if (!found) {
    throw new Error(
      `Could not find Chrome on ${process.platform}. Set CHROME_PATH to the executable.`,
    );
  }
  return found;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function launchChrome() {
  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'a11y-chrome-'));
  const child = spawn(
    findChrome(),
    [
      '--headless=new',
      '--remote-debugging-port=0',
      `--user-data-dir=${userDataDir}`,
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-gpu',
      '--disable-extensions',
      '--disable-background-networking',
      '--hide-scrollbars',
      'about:blank',
    ],
    { stdio: 'ignore' },
  );

  // Chrome writes the port it actually bound to into DevToolsActivePort.
  const portFile = path.join(userDataDir, 'DevToolsActivePort');
  for (let i = 0; i < 100; i++) {
    if (fs.existsSync(portFile)) {
      const port = fs.readFileSync(portFile, 'utf8').split('\n')[0].trim();
      if (port) return { child, userDataDir, port };
    }
    await sleep(100);
  }
  child.kill();
  throw new Error('Chrome did not report a DevTools port within 10s.');
}

class CDP {
  #ws;
  #id = 0;
  #pending = new Map();
  #listeners = new Set();

  static async connect(url) {
    const cdp = new CDP();
    cdp.#ws = new WebSocket(url, { maxPayload: 256 * 1024 * 1024 });
    await new Promise((resolve, reject) => {
      cdp.#ws.once('open', resolve);
      cdp.#ws.once('error', reject);
    });
    cdp.#ws.on('message', (raw) => cdp.#dispatch(JSON.parse(raw.toString())));
    return cdp;
  }

  #dispatch(msg) {
    if (msg.id && this.#pending.has(msg.id)) {
      const { resolve, reject } = this.#pending.get(msg.id);
      this.#pending.delete(msg.id);
      if (msg.error) reject(new Error(msg.error.message));
      else resolve(msg.result);
    } else if (msg.method) {
      for (const listener of this.#listeners) listener(msg);
    }
  }

  send(method, params = {}, sessionId) {
    const id = ++this.#id;
    return new Promise((resolve, reject) => {
      this.#pending.set(id, { resolve, reject });
      this.#ws.send(JSON.stringify({ id, method, params, sessionId }));
    });
  }

  once(method, sessionId, timeoutMs = 30000) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.#listeners.delete(listener);
        reject(new Error(`Timed out waiting for ${method}`));
      }, timeoutMs);
      const listener = (msg) => {
        if (msg.method === method && (!sessionId || msg.sessionId === sessionId)) {
          clearTimeout(timer);
          this.#listeners.delete(listener);
          resolve(msg.params);
        }
      };
      this.#listeners.add(listener);
    });
  }

  close() {
    this.#ws.close();
  }
}

const AXE_RUN = `axe.run(document, { runOnly: { type: 'tag', values: ${JSON.stringify(WCAG_TAGS)} } })
  .then(r => JSON.stringify({
    violations: r.violations.map(v => ({
      id: v.id,
      impact: v.impact,
      help: v.help,
      helpUrl: v.helpUrl,
      nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })),
    })),
    passes: r.passes.length,
  }))`;

/**
 * @param {string | null} colorScheme  'light' | 'dark' to emulate, null for default.
 */
async function auditPage(cdp, url, colorScheme) {
  const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });

  try {
    await cdp.send('Page.enable', {}, sessionId);
    await cdp.send('Runtime.enable', {}, sessionId);

    // Set before navigation so the pre-paint theme script and first render
    // both see the emulated preference.
    if (colorScheme) {
      await cdp.send(
        'Emulation.setEmulatedMedia',
        { features: [{ name: 'prefers-color-scheme', value: colorScheme }] },
        sessionId,
      );
    }

    const loaded = cdp.once('Page.loadEventFired', sessionId);
    await cdp.send('Page.navigate', { url }, sessionId);
    await loaded;
    // Let hydration and any post-hydration reveal settle before scanning.
    await sleep(600);

    await cdp.send('Runtime.evaluate', { expression: AXE_SOURCE }, sessionId);

    const { result, exceptionDetails } = await cdp.send(
      'Runtime.evaluate',
      { expression: AXE_RUN, awaitPromise: true, returnByValue: true },
      sessionId,
    );

    if (exceptionDetails) {
      throw new Error(exceptionDetails.exception?.description ?? 'axe.run threw in the page');
    }
    return JSON.parse(result.value);
  } finally {
    await cdp.send('Target.closeTarget', { targetId });
  }
}

const IMPACT_ORDER = { critical: 0, serious: 1, moderate: 2, minor: 3 };

function report(label, { violations, passes }) {
  const total = violations.reduce((n, v) => n + v.nodes.length, 0);
  const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;

  if (!violations.length) {
    console.log(`PASS  ${label}  — ${passes} checks passed, 0 violations`);
    return 0;
  }

  console.log(
    `FAIL  ${label}  — ${plural(total, 'violation')} across ${plural(violations.length, 'rule')} (${passes} checks passed)`,
  );

  const sorted = [...violations].sort(
    (a, b) => (IMPACT_ORDER[a.impact] ?? 9) - (IMPACT_ORDER[b.impact] ?? 9),
  );

  for (const v of sorted) {
    console.log(`\n  [${(v.impact ?? 'unknown').toUpperCase()}] ${v.id} — ${v.help}`);
    console.log(`  ${v.helpUrl.split('?')[0]}`);
    for (const n of v.nodes.slice(0, 5)) {
      console.log(`    · ${n.target.join(' ')}`);
      const detail = (n.summary ?? '').split('\n').filter(Boolean).slice(1, 3);
      for (const d of detail) console.log(`      ${d.trim()}`);
    }
    if (v.nodes.length > 5) console.log(`    · …and ${v.nodes.length - 5} more`);
  }
  return total;
}

// ---- main ------------------------------------------------------------------
const { child, userDataDir, port } = await launchChrome();
let failures = 0;
let cdp;

try {
  const res = await fetch(`http://127.0.0.1:${port}/json/version`);
  const { webSocketDebuggerUrl } = await res.json();
  cdp = await CDP.connect(webSocketDebuggerUrl);

  const axeVersion = require('axe-core/package.json').version;
  const schemeNote = SCHEMES[0] === null ? '' : ` · ${SCHEMES.join(' + ')}`;
  console.log(
    `axe-core ${axeVersion} · WCAG 2.1 AA · ${targets.length} page${targets.length === 1 ? '' : 's'}${schemeNote}\n`,
  );

  for (const url of targets) {
    for (const scheme of SCHEMES) {
      const label = scheme ? `${url} [${scheme}]` : url;
      failures += report(label, await auditPage(cdp, url, scheme));
    }
  }
} catch (err) {
  console.error(`\nAudit failed: ${err.message}`);
  if (/invalid URL|ERR_CONNECTION_REFUSED|Timed out/i.test(err.message)) {
    console.error(`Is the dev server running at ${BASE}?  npm run dev\n`);
  }
  failures = -1;
} finally {
  cdp?.close();
  child.kill();
  // Windows keeps the profile's files locked until the process has fully
  // exited, so wait for it, then treat cleanup as best-effort — a stray temp
  // profile must never fail the audit.
  await Promise.race([
    new Promise((r) => child.once('exit', r)),
    sleep(5000),
  ]);
  for (let i = 0; i < 5; i++) {
    try {
      fs.rmSync(userDataDir, { recursive: true, force: true });
      break;
    } catch {
      await sleep(200);
    }
  }
}

if (failures > 0) console.log(`\n${failures} violation(s).`);
else if (failures === 0) console.log('\nNo violations.');
process.exit(failures === 0 ? 0 : 1);
