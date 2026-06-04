import { useLayoutEffect, useRef, useState } from 'react';
import { ASIDE_SVG, REPLY_SVG } from './svg';
import type { TooltipState } from './store';

/** Floating "Reply / Aside" control shown above the current text selection. */
export function Tooltip({ rect, onReply, onAside }: TooltipState) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ left: 0, top: 0 });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tw = el.offsetWidth;
    const th = el.offsetHeight;
    let left = rect.left + rect.width / 2 - tw / 2;
    let top = rect.top - th - 8;
    if (top < 8) top = rect.bottom + 8;
    left = Math.max(8, Math.min(left, window.innerWidth - tw - 8));
    setPos({ left, top });
  }, [rect]);

  return (
    <div
      ref={ref}
      className="aside-tooltip"
      style={{ left: pos.left, top: pos.top }}
      onMouseDown={(e) => e.preventDefault()}
    >
      <button
        className="aside-reply-btn"
        onClick={onReply}
        dangerouslySetInnerHTML={{ __html: `Reply ${REPLY_SVG}` }}
      />
      <div className="aside-divider" />
      <button
        className="aside-btn"
        onClick={onAside}
        dangerouslySetInnerHTML={{ __html: `Aside ${ASIDE_SVG}` }}
      />
    </div>
  );
}
