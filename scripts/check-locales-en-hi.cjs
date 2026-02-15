/**
 * Ensures every key in public/locales/en/*.json exists in public/locales/hi/*.json.
 * Reports missing files or keys in hi so translations can be completed.
 */
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const enDir = path.join(projectRoot, 'public', 'locales', 'en');
const hiDir = path.join(projectRoot, 'public', 'locales', 'hi');

function allKeys(obj, prefix = '') {
  let keys = [];
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
      keys = keys.concat(allKeys(v, key));
    } else {
      keys.push(key);
    }
  }
  return keys;
}

function getByPath(obj, pathStr) {
  return pathStr.split('.').reduce((o, p) => o?.[p], obj);
}

const enFiles = fs.readdirSync(enDir).filter((f) => f.endsWith('.json'));
const missing = [];
const missingKeys = [];

for (const file of enFiles) {
  const enPath = path.join(enDir, file);
  const hiPath = path.join(hiDir, file);
  if (!fs.existsSync(hiPath)) {
    missing.push(file);
    continue;
  }
  const enData = JSON.parse(fs.readFileSync(enPath, 'utf-8'));
  const hiData = JSON.parse(fs.readFileSync(hiPath, 'utf-8'));
  const keys = allKeys(enData);
  for (const key of keys) {
    const hiVal = getByPath(hiData, key);
    if (hiVal === undefined) {
      missingKeys.push({ file, key });
    }
  }
}

if (missing.length) {
  console.error('Missing hi files (present in en):', missing);
}
if (missingKeys.length) {
  console.error('Missing keys in hi (present in en):');
  missingKeys.slice(0, 50).forEach(({ file, key }) => console.error(`  ${file} -> ${key}`));
  if (missingKeys.length > 50) console.error(`  ... and ${missingKeys.length - 50} more`);
}

if (missing.length || missingKeys.length) {
  process.exit(1);
}
console.log('OK: All en namespaces and keys exist in hi.');
