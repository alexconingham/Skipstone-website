const fs   = require('fs');
const path = require('path');

const IMAGE_EXTS = ['.PNG', '.png', '.jpg', '.JPG', '.jpeg', '.JPEG'];
const AUDIO_EXTS = ['.mp3', '.ogg', '.wav'];

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// Always force-overwrite — OneDrive timestamps are unreliable
function forceCopy(src, dest, label) {
  try {
    fs.copyFileSync(src, dest);
    console.log(`✓ ${label}`);
    copied++;
  } catch (err) {
    console.error(`✗ ${label}: ${err.message}`);
  }
}

function copyDir(srcDir, destDir, allowedExts) {
  if (!fs.existsSync(srcDir)) {
    console.warn(`Warning: ${srcDir} not found`);
    return;
  }
  ensureDir(destDir);
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.endsWith('.import')) continue;
    const srcPath = path.join(srcDir, entry.name);
    if (entry.isFile() && allowedExts.includes(path.extname(entry.name))) {
      forceCopy(srcPath, path.join(destDir, entry.name), entry.name);
    }
  }
}

let copied = 0;
const root   = path.join(__dirname, '..');
const assets = path.join(root, 'assets');
const pub    = path.join(root, 'public');

// ── Backgrounds ────────────────────────────────────────────────────────────
const bgDest = path.join(pub, 'backgrounds');
ensureDir(bgDest);
copyDir(path.join(assets, 'images', 'backgrounds', 'main'),      bgDest, IMAGE_EXTS);
copyDir(path.join(assets, 'images', 'backgrounds', 'alternate'), bgDest, IMAGE_EXTS);
copyDir(path.join(assets, 'images', 'backgrounds', 'screens'),   bgDest, IMAGE_EXTS);
// root-level backgrounds (e.g. alt_timewarpUPSCALED.PNG)
const bgRoot = path.join(assets, 'images', 'backgrounds');
for (const f of fs.readdirSync(bgRoot)) {
  const fp = path.join(bgRoot, f);
  if (fs.statSync(fp).isFile() && IMAGE_EXTS.includes(path.extname(f)) && !f.endsWith('.import')) {
    forceCopy(fp, path.join(bgDest, f), f);
  }
}

// ── Portraits ──────────────────────────────────────────────────────────────
const portraitsDest = path.join(pub, 'portraits');
ensureDir(portraitsDest);
copyDir(path.join(assets, 'images', 'portraits', 'enemies'),        portraitsDest, IMAGE_EXTS);
copyDir(path.join(assets, 'images', 'portraits', 'the_quiet_type'), path.join(portraitsDest, 'the_quiet_type'), IMAGE_EXTS);

// ── Dice ───────────────────────────────────────────────────────────────────
copyDir(path.join(assets, 'images', 'dice'),     path.join(pub, 'dice'),     IMAGE_EXTS);

// ── Mementos ───────────────────────────────────────────────────────────────
copyDir(path.join(assets, 'images', 'mementos'), path.join(pub, 'mementos'), IMAGE_EXTS);

// ── Watches ────────────────────────────────────────────────────────────────
copyDir(path.join(assets, 'images', 'watches'),  path.join(pub, 'watches'),  IMAGE_EXTS);

// ── Audio ──────────────────────────────────────────────────────────────────
const audioSrc  = path.join(assets, 'audio', 'music');
const audioDest = path.join(pub, 'audio');
copyDir(audioSrc, audioDest, AUDIO_EXTS);

// ── JSON data (assets/data → data/) ────────────────────────────────────────
const dataAssets = path.join(assets, 'data');
const dataDir    = path.join(root, 'data');
ensureDir(dataDir);
if (fs.existsSync(dataAssets)) {
  for (const f of fs.readdirSync(dataAssets)) {
    if (f.endsWith('.json')) {
      forceCopy(path.join(dataAssets, f), path.join(dataDir, f), `data/${f}`);
    }
  }
}

console.log(`\n── Summary ─────────────────────`);
console.log(`  Copied: ${copied} files`);
