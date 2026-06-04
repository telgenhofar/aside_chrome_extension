import { useEffect, useRef } from 'react';
import { CLOSE_SVG } from './svg';
import { closeAside } from './store';
import { ChipCard } from './ChipCard';
import { InputArea } from './InputArea';
import type { AsideEntry } from './store';

/** The aside dialog: header, scrolling message list, and composer. */
export function Modal({ aside }: { aside: AsideEntry }) {
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = messagesRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [aside.messages]);

  return (
    <div
      className="aside-modal-backdrop"
      onClick={(e) => e.target === e.currentTarget && closeAside(aside.id)}
    >
      <div className="aside-modal">
        <div className="aside-modal-header">
          <span className="aside-modal-title">Aside</span>
          <button
            className="aside-modal-close"
            onClick={() => closeAside(aside.id)}
            dangerouslySetInnerHTML={{ __html: CLOSE_SVG }}
          />
        </div>

        <div className="aside-modal-messages" ref={messagesRef}>
          {aside.messages.map((m, i) => (
            <div key={i} className={`aside-message-group aside-message-group-${m.role}`}>
              {m.role === 'user' && m.attachments.length > 0 && (
                <div className="aside-msg-attachments">
                  {m.attachments.map((att, j) => (
                    <ChipCard key={j} attachment={att} />
                  ))}
                </div>
              )}
              {m.text && (
                <div className={`aside-message aside-message-${m.role}`}>
                  <p className="aside-message-text">{m.text}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <InputArea asideId={aside.id} selectedText={aside.selectedText} />
      </div>
    </div>
  );
}
