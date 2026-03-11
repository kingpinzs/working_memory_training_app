#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'www');

// Clean and create www/
if (fs.existsSync(OUT)) fs.rmSync(OUT, { recursive: true });
fs.mkdirSync(OUT);

// Files to copy as-is
const staticFiles = ['manifest.json', 'sw.js', 'icon-192.svg', 'icon-512.svg'];
for (const file of staticFiles) {
  const src = path.join(ROOT, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(OUT, file));
    console.log(`  copied ${file}`);
  } else {
    console.warn(`  WARN: ${file} not found, skipping`);
  }
}

// Copy and patch index.html
let html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

// Fix absolute paths for Capacitor's localhost server
html = html.replace('href="/manifest.json"', 'href="manifest.json"');
html = html.replace("register('/sw.js')", "register('./sw.js')");

// Skip service worker registration inside Capacitor (app is already local)
html = html.replace(
  "if('serviceWorker' in navigator)",
  "if('serviceWorker' in navigator && !window.Capacitor)"
);
// Handle alternate spacing
html = html.replace(
  "if ('serviceWorker' in navigator)",
  "if ('serviceWorker' in navigator && !window.Capacitor)"
);

fs.writeFileSync(path.join(OUT, 'index.html'), html);
console.log('  copied index.html (patched paths + Capacitor guard)');

console.log('\nBuild complete → www/');
