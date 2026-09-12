/**
 * Cuts the white matte off product photography.
 *
 * The supplied product shots are JPEGs matted on white. JPEG has no alpha, so
 * on the console's dark ground each one rendered as a white rectangle. The
 * previous workaround was to give every image its own white plate; this
 * removes the need for that by giving the images real transparency.
 *
 * Why a flood fill and not "make every white pixel transparent": the products
 * are themselves white — the AirTouch bezel, the Beam housing, the laptop.
 * Keying out white globally would punch holes through the middle of them. A
 * fill that starts at the border and spreads only through connected
 * near-white pixels removes the surrounding matte and leaves interior white
 * untouched.
 *
 * Output is WebP with alpha, which is far smaller than PNG for photographic
 * content and is what the performance budget in CLAUDE.md needs.
 *
 * Runs in headless Chrome over CDP for the same reason scripts/a11y.mjs does:
 * it needs a real canvas and image decoder, and this keeps the repo free of a
 * native image dependency.
 *
 *   node scripts/matte-cut.mjs public/projects/foo.jpg [more...]
 *   node scripts/matte-cut.mjs --tolerance 18 public/projects/foo.jpg
 */
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import WebSocket from 'ws';

const args = process.argv.slice(2);
let tolerance = 24;
const files = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--tolerance') tolerance = Number(args[++i]);
  else files.push(args[i]);
}

if (files.length === 0) {
  console.error('Usage: node scripts/matte-cut.mjs [--tolerance N] <image...>');
  process.exit(2);
}

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
  if (!found) throw new Error(`Could not find Chrome. Set CHROME_PATH.`);
  return found;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function launchChrome() {
  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'matte-chrome-'));
  const child = spawn(
    findChrome(),
    [
      '--headless=new',
      '--remote-debugging-port=0',
      `--user-data-dir=${userDataDir}`,
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-gpu',
      '--allow-file-access-from-files',
      'about:blank',
    ],
    { stdio: 'ignore' },
  );

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

  static async connect(url) {
    const cdp = new CDP();
    cdp.#ws = new WebSocket(url, { maxPayload: 512 * 1024 * 1024 });
    await new Promise((res, rej) => {
      cdp.#ws.once('open', res);
      cdp.#ws.once('error', rej);
    });
    cdp.#ws.on('message', (raw) => {
      const msg = JSON.parse(raw.toString());
      if (msg.id && cdp.#pending.has(msg.id)) {
        const { resolve, reject } = cdp.#pending.get(msg.id);
        cdp.#pending.delete(msg.id);
        if (msg.error) reject(new Error(msg.error.message));
        else resolve(msg.result);
      }
    });
    return cdp;
  }

  send(method, params = {}, sessionId) {
    const id = ++this.#id;
    return new Promise((resolve, reject) => {
      this.#pending.set(id, { resolve, reject });
      this.#ws.send(JSON.stringify({ id, method, params, sessionId }));
    });
  }

  close() {
    this.#ws.close();
  }
}

/**
 * Runs in the page. Border-seeded flood fill over near-white pixels, then a
 * one-pixel alpha feather so the cut edge is not jagged against a dark ground.
 */
const CUT = `(dataUrl, tolerance) => new Promise((resolve, reject) => {
  const img = new Image();
  img.onerror = () => reject(new Error('decode failed'));
  img.onload = () => {
    const { width: w, height: h } = img;
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const ctx = c.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(img, 0, 0);
    const id = ctx.getImageData(0, 0, w, h);
    const d = id.data;

    const isMatte = (i) => d[i] >= 255 - tolerance && d[i+1] >= 255 - tolerance && d[i+2] >= 255 - tolerance;

    const seen = new Uint8Array(w * h);
    const stack = [];
    for (let x = 0; x < w; x++) { stack.push(x, x + (h - 1) * w); }
    for (let y = 0; y < h; y++) { stack.push(y * w, w - 1 + y * w); }

    while (stack.length) {
      const p = stack.pop();
      if (seen[p]) continue;
      seen[p] = 1;
      if (!isMatte(p * 4)) continue;
      d[p * 4 + 3] = 0;
      const x = p % w, y = (p / w) | 0;
      if (x > 0) stack.push(p - 1);
      if (x < w - 1) stack.push(p + 1);
      if (y > 0) stack.push(p - w);
      if (y < h - 1) stack.push(p + w);
    }

    // Feather: any surviving pixel touching a cut pixel gets partial alpha,
    // which kills the white fringe JPEG compression leaves behind.
    const alpha = new Uint8ClampedArray(w * h);
    for (let p = 0; p < w * h; p++) alpha[p] = d[p * 4 + 3];
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const p = y * w + x;
        if (alpha[p] === 0) continue;
        let cut = 0;
        if (x > 0 && alpha[p - 1] === 0) cut++;
        if (x < w - 1 && alpha[p + 1] === 0) cut++;
        if (y > 0 && alpha[p - w] === 0) cut++;
        if (y < h - 1 && alpha[p + w] === 0) cut++;
        if (cut) d[p * 4 + 3] = 255 - cut * 50;
      }
    }

    ctx.putImageData(id, 0, 0);
    let cleared = 0;
    for (let p = 0; p < w * h; p++) if (d[p * 4 + 3] === 0) cleared++;
    resolve({ url: c.toDataURL('image/webp', 0.88), w, h, cleared: cleared / (w * h) });
  };
  img.src = dataUrl;
})`;

const { child, userDataDir, port } = await launchChrome();
let cdp;

try {
  const { webSocketDebuggerUrl } = await (
    await fetch(`http://127.0.0.1:${port}/json/version`)
  ).json();
  cdp = await CDP.connect(webSocketDebuggerUrl);

  const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
  await cdp.send('Runtime.enable', {}, sessionId);

  const { result: fn } = await cdp.send(
    'Runtime.evaluate',
    { expression: CUT },
    sessionId,
  );

  for (const file of files) {
    if (!fs.existsSync(file)) {
      console.error(`skip  ${file} — not found`);
      continue;
    }
    const ext = path.extname(file).toLowerCase();
    const mime = ext === '.png' ? 'image/png' : 'image/jpeg';
    const dataUrl = `data:${mime};base64,${fs.readFileSync(file).toString('base64')}`;

    const { result, exceptionDetails } = await cdp.send(
      'Runtime.callFunctionOn',
      {
        objectId: fn.objectId,
        functionDeclaration: 'function (u, t) { return this(u, t); }',
        arguments: [{ value: dataUrl }, { value: tolerance }],
        awaitPromise: true,
        returnByValue: true,
      },
      sessionId,
    );

    if (exceptionDetails) {
      console.error(`fail  ${file} — ${exceptionDetails.exception?.description ?? 'unknown'}`);
      continue;
    }

    const { url, w, h, cleared } = result.value;
    const out = file.replace(/\.(jpe?g|png)$/i, '.webp');
    const bytes = Buffer.from(url.split(',')[1], 'base64');
    fs.writeFileSync(out, bytes);

    const before = fs.statSync(file).size;
    console.log(
      `ok    ${path.basename(out).padEnd(28)} ${w}x${h}  ` +
        `${(cleared * 100).toFixed(1)}% cut  ` +
        `${(before / 1024).toFixed(0)}K -> ${(bytes.length / 1024).toFixed(0)}K`,
    );
  }
} finally {
  cdp?.close();
  child.kill();
  await Promise.race([new Promise((r) => child.once('exit', r)), sleep(5000)]);
  for (let i = 0; i < 5; i++) {
    try {
      fs.rmSync(userDataDir, { recursive: true, force: true });
      break;
    } catch {
      await sleep(200);
    }
  }
}
