// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

const LANG_KEY = 'UBINEX_SELECTED_LANG';

// Codes must match the `code` field on each entry in SUPPORTED_LANGUAGES
// (src/data/translations.js). These are the 20 languages you've actually
// translated so far — not the full 439 in languages.js.
const SUPPORTED_CODES = [
  'Eng', 'Ig', 'Ha', 'Yo', 'Pid', 'Efk', 'Ibi', 'Tiv', 'Knu', 'Fff',
  'Edo', 'Urh', 'Iga', 'Idm', 'Nup', 'Izn', 'Ebi', 'Esn', 'Isk', 'Ikw',
];

const stored = localStorage.getItem(LANG_KEY);
const initialLng = SUPPORTED_CODES.includes(stored) ? stored : 'Eng';
// Note: before this migration, UBINEX_SELECTED_LANG held a full name like
// "English" rather than a code. That old value won't match any code above,
// so it's ignored here and falls back to 'Eng' — no manual cleanup needed.

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: initialLng,
    fallbackLng: 'Eng', // any language missing a key/file falls back to English, never breaks
    supportedLngs: SUPPORTED_CODES,
    load: 'currentOnly',
    ns: ['translation'],
    defaultNS: 'translation',
    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // served from public/locales/<code>/translation.json
    },
    interpolation: { escapeValue: false }, // React already escapes
    react: { useSuspense: false },
  });

i18n.on('languageChanged', (lng) => localStorage.setItem(LANG_KEY, lng));

export default i18n;
