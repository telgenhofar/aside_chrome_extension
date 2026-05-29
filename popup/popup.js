const toggle = document.querySelector('input[type="checkbox"]');
const status = document.querySelector('.status');

const SUPPORTED = ['claude.ai', 'chatgpt.com'];

chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    const hostname = new URL(tab.url).hostname;
  
    if (!SUPPORTED.includes(hostname)) {
        status.textContent = 'Not supported on this site';
        toggle.disabled = true;
        return;
    }

    function updateStatus() {
        status.textContent = toggle.checked
            ? `Active on ${hostname}`
            : `Disabled on ${hostname}`
    }
  
    chrome.storage.sync.get(hostname, (result) => {
        toggle.checked = result[hostname] ?? true;
        updateStatus();
    });

    toggle.addEventListener('change', () => {
        chrome.storage.sync.set({ [hostname]: toggle.checked });
        updateStatus();
    });
});