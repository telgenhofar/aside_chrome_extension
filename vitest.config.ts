import { defineConfig } from 'vitest/config';

// A standalone test config: it deliberately omits the crx() plugin from
// vite.config.ts (which only matters for bundling the extension) so unit tests
// run against plain modules. core/ and the provider registry are pure logic.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
