import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { CAMERA_SVG, FILES_SVG } from './svg';

interface AddMenuProps {
  anchor: HTMLElement | null;
  onPickFiles: () => void;
  onScreenshot: () => void;
  onClose: () => void;
}

/** Claude-style "+" attachment menu, anchored above the toolbar's add button. */
export function AddMenu({ anchor, onPickFiles, onScreenshot, onClose }: AddMenuProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !anchor) return;
    const rect = anchor.getBoundingClientRect();
    let top = rect.top - el.offsetHeight - 8;
    let left = rect.left;
    if (top < 8) top = rect.bottom + 8;
    left = Math.max(8, Math.min(left, window.innerWidth - el.offsetWidth - 8));
    setPos({ top, left });
  }, [anchor]);

  useEffect(() => {
    // composedPath() is needed because, at document level, events from inside the
    // shadow root are retargeted to the host — so e.target alone can't tell us
    // whether the click landed inside the menu.
    const onDown = (e: MouseEvent) => {
      const path = e.composedPath();
      if (ref.current && path.includes(ref.current)) return;
      if (anchor && path.includes(anchor)) return;
      onClose();
    };
    document.addEventListener('mousedown', onDown, true);
    return () => document.removeEventListener('mousedown', onDown, true);
  }, [anchor, onClose]);

  return (
    <div ref={ref} className="aside-add-menu" style={{ top: pos.top, left: pos.left }}>
      <button
        className="aside-add-menu-item"
        onClick={(e) => {
          e.stopPropagation();
          onPickFiles();
        }}
      >
        <span className="aside-add-menu-icon" dangerouslySetInnerHTML={{ __html: FILES_SVG }} />
        <span className="aside-add-menu-label">Add files or photos</span>
        <span className="aside-add-menu-shortcut">Ctrl+U</span>
      </button>
      <button
        className="aside-add-menu-item"
        onClick={(e) => {
          e.stopPropagation();
          onScreenshot();
        }}
      >
        <span className="aside-add-menu-icon" dangerouslySetInnerHTML={{ __html: CAMERA_SVG }} />
        <span className="aside-add-menu-label">Take a screenshot</span>
      </button>
    </div>
  );
}
