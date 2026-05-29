chrome.storage.sync.get('claude.ai', (result) => {
    if (result['claude.ai'] === false) return;
    observeMessages();
});

function observeMessages() {
    document.addEventListener('mouseup', () => {
        setTimeout(() => {
            const selection = window.getSelection();

            if (!selection) return;
            if (selection.isCollapsed) return;
            if (selection.rangeCount === 0) return;

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

    document.addEventListener('mousedown', () => {
        document.querySelector('.aside-tooltip')?.remove();
    });
}

function showAsideTooltip(rect) {
    const existingTooltip = document.querySelector(
        '[data-selection-tooltip="true"] div'
    );

    if (!existingTooltip) return;
    if (existingTooltip.querySelector('.aside-btn')) return;

    const button = document.createElement('button');

    button.className = 'aside-btn';
    button.textContent = 'Aside';

    existingTooltip.appendChild(button);
}