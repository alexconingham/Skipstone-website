/**
 * Normalize brightness across all portrait PNGs.
 *
 * Strategy:
 *   - Only BRIGHTEN dark images — never darken bright ones.
 *   - Target luma = 75th-percentile of the set (so the bottom 75% get lifted,
 *     the top 25% are left untouched), clamped between FLOOR and CEIL.
 *   - Cap the per-image multiplier at MAX_MULT so intentionally-dark sprites
 *     (e.g. deep shadow enemies) aren't blown out.
 *   - Skip any image with mean luma below SKIP_BELOW_LUMA — these are almost
 *     entirely black/transparent and would be destroyed by brightening.
 *   - Alpha channel is preserved exactly.
 */

const sharp = require('sharp');
const fs    = require('fs');
const path  = require('path');

const PORTRAITS_ROOT  = path.join(__dirname, '..', 'assets', 'images', 'portraits');
const TARGET_FLOOR    = 60;   // min target (don't pick a target that's too low)
const TARGET_CEIL     = 100;  // max target (don't over-brighten everything)
const MAX_MULT        = 2.2;  // cap per-image brightness multiplier
const SKIP_BELOW_LUMA = 8;    // skip near-black images — likely intentional

// ── helpers ────────────────────────────────────────────────────────────────

function getAllPortraits(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...getAllPortraits(full));
    else if (/\.(png|jpg|jpeg)$/i.test(entry.name)) results.push(full);
  }
  return results;
}

async function getMeanLuma(filepath) {
  const { data, info } = await sharp(filepath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  let sum = 0, count = 0;

  for (let i = 0; i < width * height; i++) {
    const base  = i * 4;
    const alpha = data[base + 3];
    if (alpha < 200) continue; // only count fully-opaque pixels
    const r = data[base], g = data[base + 1], b = data[base + 2];
    sum += 0.2126 * r + 0.7152 * g + 0.0722 * b;
    count++;
  }

  return count === 0 ? 0 : sum / count;
}

function percentile(arr, p) {
  const s = [...arr].sort((a, b) => a - b);
  const idx = (p / 100) * (s.length - 1);
  const lo = Math.floor(idx), hi = Math.ceil(idx);
  return s[lo] + (s[hi] - s[lo]) * (idx - lo);
}

async function applyBrighten(filepath, multiplier) {
  const { data, info } = await sharp(filepath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;

  for (let i = 0; i < width * height; i++) {
    const base = i * 4;
    if (data[base + 3] < 10) continue; // fully transparent — leave
    data[base]     = Math.min(255, Math.round(data[base]     * multiplier));
    data[base + 1] = Math.min(255, Math.round(data[base + 1] * multiplier));
    data[base + 2] = Math.min(255, Math.round(data[base + 2] * multiplier));
    // alpha unchanged
  }

  await sharp(data, { raw: { width, height, channels: 4 } })
    .png()
    .toFile(filepath + '.tmp');

  fs.renameSync(filepath + '.tmp', filepath);
}

// ── main ───────────────────────────────────────────────────────────────────

(async () => {
  if (!fs.existsSync(PORTRAITS_ROOT)) {
    console.error('portraits folder not found:', PORTRAITS_ROOT);
    process.exit(1);
  }

  const files = getAllPortraits(PORTRAITS_ROOT);
  console.log(`Found ${files.length} portrait(s). Analysing…\n`);

  // Pass 1: measure every image
  const lumaMap = new Map();
  for (const f of files) {
    const luma = await getMeanLuma(f);
    lumaMap.set(f, luma);
    const rel = path.relative(PORTRAITS_ROOT, f);
    console.log(`  ${rel.padEnd(50)} luma = ${luma.toFixed(1)}`);
  }

  // Derive target from 75th percentile, clamped
  const eligible = [...lumaMap.values()].filter(l => l >= SKIP_BELOW_LUMA);
  const p75      = percentile(eligible, 75);
  const target   = Math.max(TARGET_FLOOR, Math.min(TARGET_CEIL, p75));

  console.log(`\n75th-percentile luma: ${p75.toFixed(1)}  →  target: ${target.toFixed(1)}\n`);

  // Pass 2: brighten only — never darken
  let adjusted = 0, skipped = 0;

  for (const [f, luma] of lumaMap) {
    const rel = path.relative(PORTRAITS_ROOT, f);

    if (luma < SKIP_BELOW_LUMA) {
      console.log(`  SKIP   ${rel}  (near-black, luma ${luma.toFixed(1)} — intentional)`);
      skipped++;
      continue;
    }

    if (luma >= target) {
      console.log(`  ok     ${rel}  (luma ${luma.toFixed(1)} ≥ ${target.toFixed(0)})`);
      skipped++;
      continue;
    }

    const rawMult   = target / luma;
    const multiplier = Math.min(rawMult, MAX_MULT);

    console.log(`  LIFT   ${rel.padEnd(50)} ×${multiplier.toFixed(3)}  (${luma.toFixed(1)} → ~${Math.min(255, luma * multiplier).toFixed(0)})`);
    await applyBrighten(f, multiplier);
    adjusted++;
  }

  console.log(`\nDone. Brightened: ${adjusted}  Unchanged: ${skipped}`);
})();
