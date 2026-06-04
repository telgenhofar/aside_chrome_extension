import { isSupportedHost } from '../src/providers/registry';

const toggle = document.querySelector<HTMLInputElement>('input[type="checkbox"]');
const status = document.querySelector<HTMLParagraphElement>('.status');

chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
  if (!toggle || !status || !tab?.url) return;
  const hostname = new URL(tab.url).hostname;

  if (!isSupportedHost(hostname)) {
    status.textContent = 'Not supported on this site';
    toggle.disabled = true;
    return;
  }

  const updateStatus = () => {
    status.textContent = toggle.checked ? `Active on ${hostname}` : `Disabled on ${hostname}`;
  };

  chrome.storage.sync.get(hostname, (result) => {
    // Enabled by default; only an explicit stored `false` disables (matches the
    // content controller's check in content/index.ts).
    toggle.checked = result[hostname] !== false;
    updateStatus();
  });

  toggle.addEventListener('change', () => {
    chrome.storage.sync.set({ [hostname]: toggle.checked });
    updateStatus();
  });
});
