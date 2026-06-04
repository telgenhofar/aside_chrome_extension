import { getActiveProvider } from '../providers/registry';
import { mountApp } from '../ui/App';
import { createAside, tooltip } from '../ui/store';

// The provider for whatever site this content script runs on. The manifest only
// injects us on supported hosts, so this is non-null in practice.
const provider = getActiveProvider();

chrome.storage.sync.get(location.hostname, (result) => {
  if (!provider || result[location.hostname] === false) return;
  mountApp(provider.theme);
  observeMessages();
});

function observeMessages() {
  document.addEventListener('mouseup', () => {
    setTimeout(() => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed || selection.rangeCount === 0) return;

      let range: Range;
      try {
        range = selection.getRangeAt(0);
      } catch (err) {
        console.debug('Selection disappeared before getRangeAt()', err);
        return;
      }
      if (!range) return;

      const rect = range.getBoundingClientRect();
      if (!rect || (rect.width === 0 && rect.height === 0)) return;

      showTooltip(rect, range.cloneRange(), selection.toString().trim());
    }, 50);
  });

  document.addEventListener('selectionchange', () => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed) tooltip.value = null;
  });

  document.addEventListener('scroll', () => (tooltip.value = null), {
    capture: true,
    passive: true,
  });
}

/** Show the selection tooltip with its actions captured for the current selection. */
function showTooltip(rect: DOMRect, range: Range, selectedText: string) {
  const nativeReplyBtn = provider?.findNativeReplyButton() ?? null;
  tooltip.value = {
    rect,
    onReply: () => {
      tooltip.value = null;
      if (nativeReplyBtn) nativeReplyBtn.click();
      else document.querySelector<HTMLElement>('[contenteditable="true"]')?.focus();
    },
    onAside: () => {
      tooltip.value = null;
      if (!selectedText) return;
      createAside(
        selectedText,
        range,
        provider?.getContainingMessage(range) ?? null,
        nativeReplyBtn,
      );
    },
  };
}
