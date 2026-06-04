import { defineManifest } from '@crxjs/vite-plugin';

// The manifest, authored as typed source. CRXJS reads this, bundles every file
// it references, and emits a real dist/manifest.json with the correct hashed paths.
export default defineManifest({
  manifest_version: 3,
  name: 'Aside',
  description: 'Aside action for language model web interfaces',
  version: '1.0.0',
  permissions: ['storage', 'tabs'],
  action: {
    default_popup: 'popup/popup.html',
    default_icon: 'icons/aside.png',
  },
  content_scripts: [
    {
      matches: ['https://claude.ai/*'],
      js: ['src/content/index.ts'],
      css: ['src/content/suppress.css'],
    },
  ],
});
