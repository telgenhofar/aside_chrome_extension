import { defineConfig } from 'vite';
import { crx } from '@crxjs/vite-plugin';
import manifest from './manifest.config';

// Vite is the bundler; the crx() plugin teaches it how to read a Chrome
// extension manifest, bundle the referenced scripts, and lay out dist/ so
// Chrome can load it unpacked.
export default defineConfig({
  plugins: [crx({ manifest })],
  // Write standard React; ship Preact (~4KB) by aliasing it at bundle time.
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime',
      'react-dom/test-utils': 'preact/test-utils',
    },
  },
  // public/ is copied verbatim into dist/ (e.g. the toolbar icon at icons/aside.png).
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
