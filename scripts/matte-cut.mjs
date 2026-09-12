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
 * Runs in the page. Three passes:
 *
 * 1. Border-seeded flood over near-white pixels — the definite matte.
 * 2. A soft band grown from that region through the grey transition. This is
 *    where the drop shadows live: a shadow is a grey gradient on white, too
 *    dark for pass 1 to accept, so a binary cut leaves a dirty cloud under the
 *    product. In the band the pixel is treated as ink composited over white
 *    and its true alpha recovered: a = 1 - min(r,g,b)/255, colour
 *    unpremultiplied. A light shadow becomes nearly-black at very low alpha,
 *    which disappears on a dark ground and still reads correctly on a light
 *    one. Anything opaque enough to be the product itself is left alone.
 * 3. A 3x3 blur of the alpha channel along the boundary only, so the edge is
 *    antialiased rather than stair-stepped.
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
    const N = w * h;

    const minCh = (p) => Math.min(d[p*4], d[p*4+1], d[p*4+2]);
    const maxCh = (p) => Math.max(d[p*4], d[p*4+1], d[p*4+2]);

    const HARD = 255 - tolerance;   // definite matte
    const SOFT = 200;               // shadow floor
    const CHROMA = 26;              // shadows are grey; coloured pixels are content
    const MAX_SHADOW_ALPHA = 0.5;   // above this it is product, not shadow
    const MAX_SHADOW_DEPTH = 10;    // a shadow hugs the subject; a long walk is not one

    // ---- pass 1: flood the definite matte -------------------------------
    const bg = new Uint8Array(N);
    const seen = new Uint8Array(N);
    const stack = [];
    for (let x = 0; x < w; x++) stack.push(x, x + (h - 1) * w);
    for (let y = 0; y < h; y++) stack.push(y * w, w - 1 + y * w);

    while (stack.length) {
      const p = stack.pop();
      if (seen[p]) continue;
      seen[p] = 1;
      if (minCh(p) < HARD) continue;
      bg[p] = 1;
      const x = p % w, y = (p / w) | 0;
      if (x > 0) stack.push(p - 1);
      if (x < w - 1) stack.push(p + 1);
      if (y > 0) stack.push(p - w);
      if (y < h - 1) stack.push(p + w);
    }

    /*
     * ---- pass 2: grow through the shadow -------------------------------
     *
     * Only pixels in [SOFT, HARD) qualify: strictly DARKER than the matte pass
     * 1 already took, and lighter than a product edge. That bound is what stops
     * the fill tunnelling into the product — these products are white, so an
     * "anything bright" test walks straight through the Beam's housing and
     * unpremultiplies it to black.
     *
     * A depth cap is the second guard: a shadow is a narrow band around the
     * subject, so anything reachable only by a long walk is not shadow.
     */
    const depth = new Int32Array(N).fill(-1);
    const band = [];
    for (let p = 0; p < N; p++) if (bg[p]) { band.push(p); depth[p] = 0; }
    let head = 0;
    while (head < band.length) {
      const p = band[head++];
      if (depth[p] >= MAX_SHADOW_DEPTH) continue;
      const x = p % w, y = (p / w) | 0;
      const nbrs = [];
      if (x > 0) nbrs.push(p - 1);
      if (x < w - 1) nbrs.push(p + 1);
      if (y > 0) nbrs.push(p - w);
      if (y < h - 1) nbrs.push(p + w);
      for (const q of nbrs) {
        if (bg[q] || depth[q] !== -1) continue;
        const lo = minCh(q);
        if (lo < SOFT || lo >= HARD) continue;      // not the transition band
        if (maxCh(q) - lo > CHROMA) continue;       // coloured: content
        if (1 - lo / 255 > MAX_SHADOW_ALPHA) continue;
        bg[q] = 2;                                  // 2 = shadow, not pure matte
        depth[q] = depth[p] + 1;
        band.push(q);
      }
    }

    // ---- write alpha -----------------------------------------------------
    const alpha = new Float32Array(N);
    for (let p = 0; p < N; p++) {
      if (bg[p] === 1) { alpha[p] = 0; continue; }
      if (bg[p] === 2) {
        // Ink over white: recover alpha, then unpremultiply so the residue is
        // the shadow's own colour rather than a milky grey.
        const a = Math.min(1, Math.max(0, 1 - minCh(p) / 255));
        alpha[p] = a;
        if (a > 0.004) {
          for (let ch = 0; ch < 3; ch++) {
            const v = d[p*4+ch] / 255;
            d[p*4+ch] = Math.max(0, Math.min(255, ((v - (1 - a)) / a) * 255));
          }
        }
        continue;
      }
      alpha[p] = 1;
    }

    // ---- pass 3: antialias the boundary ---------------------------------
    const sm = Float32Array.from(alpha);
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const p = y * w + x;
        let lo = 1, hi = 0;
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
          const v = alpha[p + dy * w + dx];
          if (v < lo) lo = v;
          if (v > hi) hi = v;
        }
        if (hi - lo < 0.08) continue;               // interior: leave crisp
        let sum = 0;
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) sum += alpha[p + dy * w + dx];
        sm[p] = sum / 9;
      }
    }

    for (let p = 0; p < N; p++) d[p * 4 + 3] = Math.round(sm[p] * 255);

    ctx.putImageData(id, 0, 0);
    let cleared = 0, softened = 0;
    for (let p = 0; p < N; p++) {
      if (d[p * 4 + 3] < 8) cleared++;
      else if (d[p * 4 + 3] < 248) softened++;
    }
    resolve({
      url: c.toDataURL('image/webp', 0.9),
      w, h,
      cleared: cleared / N,
      softened: softened / N,
    });
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

    const { url, w, h, cleared, softened } = result.value;
    const out = file.replace(/\.(jpe?g|png)$/i, '.webp');
    const bytes = Buffer.from(url.split(',')[1], 'base64');
    fs.writeFileSync(out, bytes);

    const before = fs.statSync(file).size;
    console.log(
      `ok    ${path.basename(out).padEnd(28)} ${w}x${h}  ` +
        `${(cleared * 100).toFixed(1)}% cut  ` +
        `${(softened * 100).toFixed(1)}% soft  ` +
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
