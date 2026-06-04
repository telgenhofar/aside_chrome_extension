import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

// ESLint flat config. Order matters: later entries override earlier ones, so the
// Prettier config goes last to switch off any stylistic rules that would fight it.
export default tseslint.config(
  // Never lint generated output.
  { ignores: ['dist/**'] },

  // Baseline correctness rules for JS and TS.
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Source runs in the browser as a content script, with the chrome.* API present.
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        chrome: 'readonly',
      },
    },
  },

  // Build/config files and packaging scripts run in Node, not the browser.
  {
    files: ['*.config.{js,ts}', 'vite.config.ts', 'manifest.config.ts', 'scripts/**/*.{js,mjs}'],
    languageOptions: {
      globals: { ...globals.node },
    },
  },

  // Turn off all formatting-related lint rules; Prettier owns formatting.
  prettier,
);
