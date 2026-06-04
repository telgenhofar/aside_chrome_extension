import { describe, it, expect } from 'vitest';
import { formatFileSize } from './utils';

describe('formatFileSize', () => {
  it('reports raw bytes below 1 KB', () => {
    expect(formatFileSize(0)).toBe('0 B');
    expect(formatFileSize(512)).toBe('512 B');
    expect(formatFileSize(1023)).toBe('1023 B');
  });

  it('switches to KB at 1024 bytes', () => {
    expect(formatFileSize(1024)).toBe('1.0 KB');
    expect(formatFileSize(1536)).toBe('1.5 KB');
  });

  it('switches to MB at 1 MiB', () => {
    expect(formatFileSize(1024 * 1024)).toBe('1.0 MB');
    expect(formatFileSize(5 * 1024 * 1024)).toBe('5.0 MB');
  });

  it('honors the decimals argument', () => {
    expect(formatFileSize(1536, 0)).toBe('2 KB');
    expect(formatFileSize(1536, 2)).toBe('1.50 KB');
  });
});
