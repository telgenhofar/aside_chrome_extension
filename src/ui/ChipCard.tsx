import { viewer } from './store';
import type { Attachment } from '../core/types';

/** Read-only attachment card. Click opens the matching preview (viewer/lightbox). */
export function ChipCard({ attachment }: { attachment: Attachment }) {
  const open = (e: MouseEvent) => {
    e.stopPropagation();
    viewer.value =
      attachment.type === 'image' ? { kind: 'image', attachment } : { kind: 'text', attachment };
  };

  if (attachment.type === 'text-excerpt') {
    return (
      <div className="aside-chip-card" style={{ cursor: 'pointer' }} onClick={open}>
        <div className="aside-chip-text-top">
          <div className="aside-chip-text-row">
            <p className="aside-chip-text">{attachment.content}</p>
          </div>
        </div>
        <div className="aside-chip-text-bottom">
          <div className="aside-chip-badge-wrap">
            <div className="aside-chip-badge">
              <p className="aside-chip-badge-text">{attachment.label ?? 'excerpt'}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (attachment.type === 'image') {
    return (
      <div
        className="aside-chip-card aside-chip-card-image"
        style={{ cursor: 'pointer' }}
        onClick={open}
      >
        <div className="aside-chip-img-inner">
          <img
            src={attachment.dataUrl}
            alt={attachment.label ?? 'Image'}
            className="aside-chip-img"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className="aside-chip-card aside-chip-card-file"
      style={{ cursor: 'pointer' }}
      onClick={open}
    >
      <div className="aside-chip-file-top">
        <h3 className="aside-chip-filename">{attachment.label}</h3>
        <p className="aside-chip-subtitle">{attachment.subtitle ?? ''}</p>
      </div>
      <div className="aside-chip-file-bottom">
        <div className="aside-chip-ext-badge">{attachment.ext ?? ''}</div>
      </div>
    </div>
  );
}
