import type { Provider } from './provider';

/** Adapter for claude.ai; encapsulates all knowledge of Claude's DOM. */
export const claudeProvider: Provider = {
  id: 'claude',
  hosts: ['claude.ai'],

  // Each token aliases to Claude's live variable, with a neutral fallback in case
  // Claude ever renames it — so values track Claude's theme (incl. dark mode) for free.
  theme: {
    '--aside-bg-000': 'var(--bg-000, 0 0% 100%)',
    '--aside-bg-100': 'var(--bg-100, 0 0% 98%)',
    '--aside-bg-300': 'var(--bg-300, 0 0% 94%)',
    '--aside-text-100': 'var(--text-100, 0 0% 13%)',
    '--aside-text-200': 'var(--text-200, 0 0% 25%)',
    '--aside-text-300': 'var(--text-300, 0 0% 40%)',
    '--aside-text-500': 'var(--text-500, 0 0% 55%)',
    '--aside-border-200': 'var(--border-200, 0 0% 85%)',
    '--aside-border-300': 'var(--border-300, 0 0% 90%)',
    '--aside-always-black': 'var(--always-black, 0 0% 0%)',
  },

  getContainingMessage(range) {
    const start = range.commonAncestorContainer;
    const el = start.nodeType === Node.TEXT_NODE ? start.parentElement : (start as Element);
    return el?.closest<HTMLElement>('[data-is-streaming], [data-testid="user-message"]') ?? null;
  },

  findNativeReplyButton() {
    return document.querySelector<HTMLButtonElement>('[data-selection-tooltip="true"] button');
  },
};
