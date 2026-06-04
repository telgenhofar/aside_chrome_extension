import { describe, it, expect } from 'vitest';
import { isSupportedHost } from './registry';

describe('isSupportedHost', () => {
  it('matches a provider host exactly', () => {
    expect(isSupportedHost('claude.ai')).toBe(true);
  });

  it('matches subdomains of a provider host', () => {
    expect(isSupportedHost('www.claude.ai')).toBe(true);
  });

  it('rejects unrelated hosts', () => {
    expect(isSupportedHost('example.com')).toBe(false);
    expect(isSupportedHost('chatgpt.com')).toBe(false);
  });

  it('does not match a host that merely ends with the provider name', () => {
    expect(isSupportedHost('notclaude.ai')).toBe(false);
  });
});
