chrome.storage.sync.get('claude.ai', (result) => {
    if (result['claude.ai'] === false) return;
    observeMessages();
});

function observeMessages() {
    document.addEventListener('mouseup', () => {
        setTimeout(() => {
            const selection = window.getSelection();

            if (!selection || selection.isCollapsed || selection.rangeCount === 0) return;

            let range;

            try {
                range = selection.getRangeAt(0);
            } catch (err) {
                console.debug('Selection disappeared before getRangeAt()', err);
                return;
            }

            if (!range) return;

            const rect = range.getBoundingClientRect();

            if (!rect || (rect.width === 0 && rect.height === 0)) return;

            showAsideTooltip(rect);
        }, 50);
    });

    // Dismiss when the selection collapses, not on every mousedown
    document.addEventListener('selectionchange', () => {
        const sel = window.getSelection();
        if (!sel || sel.isCollapsed) removeTooltip();
    });

    // Reposition on scroll
    document.addEventListener('scroll', () => {
        const tooltip = document.querySelector('.aside-tooltip');
        if (!tooltip) return;

        const sel = window.getSelection();
        if (!sel || sel.isCollapsed || sel.rangeCount === 0) {
            removeTooltip();
            return;
        }

        try {
            positionTooltip(tooltip, sel.getRangeAt(0).getBoundingClientRect());
        } catch (e) {}
    }, { capture: true, passive: true });
}

function positionTooltip(tooltip, rect) {
    if (!rect || (rect.width === 0 && rect.height === 0)) return;

    const th = tooltip.offsetHeight;
    const tw = tooltip.offsetWidth;
    let left = rect.left + rect.width / 2 - tw / 2;
    let top = rect.top - th - 8;

    if (top < 8) top = rect.bottom + 8;
    left = Math.max(8, Math.min(left, window.innerWidth - tw - 8));

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
}

function removeTooltip() {
    document.querySelector('.aside-tooltip')?.remove();
}

// Pre-fetch both icons at load time so they are ready before any interaction
const icons = { reply: null, aside: null };
fetch(chrome.runtime.getURL('icons/reply.svg')).then(r => r.text()).then(svg => { icons.reply = svg; });
fetch(chrome.runtime.getURL('icons/aside.svg')).then(r => r.text()).then(svg => { icons.aside = svg; });

function showAsideTooltip(rect) {
    removeTooltip();

    const claudeReplyBtn = document.querySelector('[data-selection-tooltip="true"] button');

    const tooltip = document.createElement('div');
    tooltip.className = 'aside-tooltip';

    tooltip.addEventListener('mousedown', (e) => e.preventDefault());

    const replyBtn = document.createElement('button');
    replyBtn.className = 'aside-reply-btn';
    replyBtn.innerHTML = `Reply ${icons.reply ?? ''}`;
    replyBtn.addEventListener('click', () => {
        removeTooltip();
        if (claudeReplyBtn) {
            claudeReplyBtn.click();
        } else {
            document.querySelector('[contenteditable="true"]')?.focus();
        }
    });

    const divider = document.createElement('div');
    divider.className = 'aside-divider';

    const asideBtn = document.createElement('button');
    asideBtn.className = 'aside-btn';
    asideBtn.innerHTML = `Aside ${icons.aside ?? ''}`;
    asideBtn.addEventListener('click', () => {
        removeTooltip();
        // TODO: open aside modal
    });

    tooltip.appendChild(replyBtn);
    tooltip.appendChild(divider);
    tooltip.appendChild(asideBtn);
    document.body.appendChild(tooltip);

    positionTooltip(tooltip, rect);
}
