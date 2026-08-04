// scripts/migrate-i18n.mjs
//
// One-time migration: reads your REAL src/data/translations.js and writes
// one JSON file per language to public/locales/<code>/translation.json,
// which is what i18next-http-backend expects (see src/i18n.js loadPath).
//
// Run from the project root:
//   node scripts/migrate-i18n.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { translations, SUPPORTED_LANGUAGES } from '../src/data/translations.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outRoot = path.join(__dirname, '..', 'public', 'locales');

let written = 0;
const skipped = [];

for (const lang of SUPPORTED_LANGUAGES) {
  const entry = translations[lang.name];
  if (!entry) {
    skipped.push(lang.name);
    continue;
  }

  const dir = path.join(outRoot, lang.code);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, 'translation.json'),
    JSON.stringify(entry, null, 2) + '\n',
    'utf-8'
  );
  written++;
  console.log(`Wrote ${lang.name} (${lang.code}) -> public/locales/${lang.code}/translation.json`);
}

console.log(`\nDone. ${written} locale file(s) written to public/locales/.`);
if (skipped.length) {
  console.log(`No matching entry in translations.js for: ${skipped.join(', ')}`);
}
