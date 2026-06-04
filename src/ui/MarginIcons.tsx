import { useLayoutEffect, useState } from 'react';
import { ASIDE_SVG } from './svg';
import { clearAsideHighlight, highlightAsideRange } from '../core/highlight';
import { openAside } from './store';
import type { AsideEntry } from './store';

const ICON_GAP = 28; // icon height + gap, used to stack icons on the same message

interface Pos {
  top: number;
  left: number;
  visible: boolean;
}

/**
 * Margin icons for closed asides, positioned beside their source message. Computed
 * together so multiple icons on the same message stack instead of overlapping.
 */
export function MarginIcons({ entries }: { entries: AsideEntry[] }) {
  const [positions, setPositions] = useState<Record<string, Pos>>({});

  useLayoutEffect(() => {
    const recompute = () => {
      const next: Record<string, Pos> = {};
      const placed: { el: HTMLElement; top: number }[] = [];
      for (const a of entries) {
        const msgRect = a.sourceMessageEl?.getBoundingClientRect();
        if (!a.sourceMessageEl || !msgRect || (msgRect.width === 0 && msgRect.height === 0)) {
          next[a.id] = { top: 0, left: 0, visible: false };
          continue;
        }
        const rangeRect = a.range.getBoundingClientRect();
        let top = rangeRect.top + rangeRect.height / 2 - 12;
        for (const p of placed) {
          if (p.el === a.sourceMessageEl && Math.abs(p.top - top) < ICON_GAP)
            top = p.top + ICON_GAP;
        }
        placed.push({ el: a.sourceMessageEl, top });
        next[a.id] = { top, left: msgRect.left - 52, visible: true };
      }
      setPositions(next);
    };

    recompute();
    window.addEventListener('scroll', recompute, { capture: true, passive: true });
    window.addEventListener('resize', recompute);
    return () => {
      window.removeEventListener('scroll', recompute, { capture: true });
      window.removeEventListener('resize', recompute);
    };
  }, [entries]);

  return (
    <>
      {entries.map((a) => {
        const p = positions[a.id];
        if (!p) return null;
        const title =
          a.selectedText.length > 60 ? a.selectedText.slice(0, 57) + '...' : a.selectedText;
        return (
          <button
            key={a.id}
            className="aside-margin-icon"
            title={title}
            style={{ top: p.top, left: p.left, display: p.visible ? '' : 'none' }}
            onClick={() => openAside(a.id)}
            onMouseEnter={() => highlightAsideRange(a.range)}
            onMouseLeave={clearAsideHighlight}
            dangerouslySetInnerHTML={{ __html: ASIDE_SVG }}
          />
        );
      })}
    </>
  );
}
