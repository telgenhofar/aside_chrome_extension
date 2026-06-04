import { useEffect } from 'react';
import { viewer } from './store';
import { CLOSE_FILL_SVG } from './svg';
import type { ImageAttachment } from '../core/types';

const close = () => {
  viewer.value = null;
};

/** Centered, dimmed preview of an image attachment. */
export function ImageLightbox({ attachment }: { attachment: ImageAttachment }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey, true);
    return () => document.removeEventListener('keydown', onKey, true);
  }, []);

  const label = attachment.label ?? 'image';

  return (
    <div className="aside-image-lightbox" onClick={close}>
      <div className="aside-img-center">
        <div className="aside-img-dialog" role="dialog" aria-label={`Preview of ${label}`}>
          <div className="aside-img-inner" onClick={(e) => e.stopPropagation()}>
            <button
              className="aside-img-close"
              aria-label="Close image preview"
              onClick={close}
              dangerouslySetInnerHTML={{ __html: CLOSE_FILL_SVG }}
            />
            <div className="aside-img-wrap">
              <img
                className="aside-img-preview"
                src={attachment.dataUrl}
                alt={`Preview of ${label}`}
              />
            </div>
          </div>
          <div className="aside-img-caption">{attachment.label ?? ''}</div>
        </div>
      </div>
    </div>
  );
}
