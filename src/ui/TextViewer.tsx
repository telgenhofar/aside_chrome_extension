import { useEffect, useState } from 'react';
import { formatFileSize } from '../core/utils';
import { viewer } from './store';
import { ARROW_LEFT_SVG, CLOSE_FILL_SVG } from './svg';
import type { FileAttachment, TextExcerptAttachment } from '../core/types';

const close = () => {
  viewer.value = null;
};

/** Right-side panel previewing a pasted excerpt or a text file's contents. */
export function TextViewer({ attachment }: { attachment: TextExcerptAttachment | FileAttachment }) {
  const [text, setText] = useState(attachment.content ?? '');

  useEffect(() => {
    let cancelled = false;
    if (!attachment.content && attachment.type === 'file' && attachment.file) {
      attachment.file.text().then(
        (t) => !cancelled && setText(t),
        () => !cancelled && setText('Could not read file.'),
      );
    }
    return () => {
      cancelled = true;
    };
  }, [attachment]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey, true);
    return () => document.removeEventListener('keydown', onKey, true);
  }, []);

  const fileSize = attachment.type === 'file' ? attachment.file?.size : undefined;
  const sizeBytes = fileSize ?? new Blob([text]).size;
  const lineCount = text ? text.split('\n').length : 0;
  const meta =
    `<span><span>${formatFileSize(sizeBytes, 2)}<span class="aside-tv-dot">&nbsp;•&nbsp;</span>` +
    `${lineCount} line${lineCount === 1 ? '' : 's'}</span></span>` +
    `<span class="aside-tv-dot-sep">•</span>` +
    `<span>Formatting may be inconsistent from source</span>`;

  return (
    <div className="aside-text-viewer">
      <div className="aside-tv-outer">
        <div className="aside-tv-header">
          <button
            className="aside-tv-btn aside-tv-btn-back"
            aria-label="Close"
            onClick={close}
            dangerouslySetInnerHTML={{ __html: ARROW_LEFT_SVG }}
          />
          <h2 className="aside-tv-title">
            {attachment.label || (attachment.type === 'file' ? 'File' : 'Excerpt')}
          </h2>
          <button
            className="aside-tv-btn aside-tv-btn-close"
            aria-label="Close"
            onClick={close}
            dangerouslySetInnerHTML={{ __html: CLOSE_FILL_SVG }}
          />
        </div>
        <div className="aside-tv-body">
          <span className="aside-tv-meta" dangerouslySetInnerHTML={{ __html: meta }} />
          <div className="aside-tv-content">{text || 'Loading…'}</div>
        </div>
      </div>
    </div>
  );
}
