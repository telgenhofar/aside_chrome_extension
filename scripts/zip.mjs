import { createWriteStream } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { ZipArchive } from 'archiver';

// Zip the built dist/ into aside-v<version>.zip for Chrome Web Store upload.
// Run after `npm run build` (the `package` script chains both).
const pkg = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
const outName = `aside-v${pkg.version}.zip`;

const output = createWriteStream(outName);
const archive = new ZipArchive({ zlib: { level: 9 } });

output.on('close', () => console.log(`Wrote ${outName} (${archive.pointer()} bytes)`));
archive.on('warning', (err) => {
  throw err;
});
archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);
archive.directory('dist/', false);
await archive.finalize();
