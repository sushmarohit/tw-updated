/**
 * Bundles public/locales/en/*.json into src/locales/en-bundled.json
 * so the client can load default (en) namespaces synchronously and avoid
 * "namespace was not yet loaded" warnings and hydration mismatches.
 */
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const enDir = path.join(projectRoot, 'public', 'locales', 'en');
const outPath = path.join(projectRoot, 'src', 'locales', 'en-bundled.json');

if (!fs.existsSync(enDir)) {
  console.warn('scripts/bundle-en-locales.cjs: public/locales/en not found, skipping.');
  process.exit(0);
}

const files = fs.readdirSync(enDir).filter((f) => f.endsWith('.json'));
const bundled = {};

for (const file of files) {
  const ns = file.replace(/\.json$/, '');
  const filePath = path.join(enDir, file);
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    bundled[ns] = data;
  } catch (e) {
    console.warn(`scripts/bundle-en-locales.cjs: skip ${file}:`, e.message);
  }
}

const outDir = path.dirname(outPath);
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}
fs.writeFileSync(outPath, JSON.stringify(bundled, null, 0), 'utf-8');
console.log(`scripts/bundle-en-locales.cjs: wrote ${Object.keys(bundled).length} namespaces to src/locales/en-bundled.json`);
