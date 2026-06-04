import { useEffect, useRef, useState } from 'react';
import { formatFileSize } from '../core/utils';
import { captureScreenshot } from '../core/screenshot';
import { addMessage } from './store';
import { ChipCard } from './ChipCard';
import { AddMenu } from './AddMenu';
import { CLOSE_SVG, PLUS_SVG, SEND_SVG } from './svg';
import type { Attachment } from '../core/types';

const PASTE_TEXT_THRESHOLD = 150;
const TEXT_FILE_RE =
  /\.(txt|md|js|ts|jsx|tsx|py|json|csv|html|css|yaml|yml|xml|sh|rb|go|rs|c|cpp|h|java)$/i;

interface InputAreaProps {
  asideId: string;
  selectedText: string;
}

/** Message composer: text field, attachment chips, the + menu, and send. */
export function InputArea({ asideId, selectedText }: InputAreaProps) {
  const [attachments, setAttachments] = useState<Attachment[]>([
    { type: 'text-excerpt', content: selectedText, label: 'Selected text' },
  ]);
  const [hasText, setHasText] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const inputRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const addBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const canSend = hasText || attachments.length > 0;
  const add = (att: Attachment) => setAttachments((prev) => [...prev, att]);

  const addImageFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () =>
      add({ type: 'image', dataUrl: reader.result as string, label: file.name });
    reader.readAsDataURL(file);
  };

  const onFiles = async () => {
    for (const file of fileRef.current?.files ?? []) {
      if (file.type.startsWith('image/')) {
        addImageFile(file);
      } else {
        const ext = file.name.split('.').pop()?.toUpperCase() ?? '';
        let subtitle = formatFileSize(file.size);
        if (file.type.startsWith('text/') || TEXT_FILE_RE.test(file.name)) {
          try {
            const lines = (await file.text()).split('\n').length;
            subtitle = `${lines} line${lines === 1 ? '' : 's'}`;
          } catch {
            // Non-fatal: keep the file-size subtitle.
          }
        }
        add({ type: 'file', label: file.name, ext, subtitle, file });
      }
    }
    if (fileRef.current) fileRef.current.value = '';
  };

  const onPaste = (e: ClipboardEvent) => {
    const data = e.clipboardData;
    if (!data) return;
    const imageItem = [...data.items].find((i) => i.type.startsWith('image/'));
    if (imageItem) {
      e.preventDefault();
      const file = imageItem.getAsFile();
      if (file) addImageFile(file);
      return;
    }
    const plain = data.getData('text/plain');
    if (plain && plain.length > PASTE_TEXT_THRESHOLD) {
      e.preventDefault();
      add({ type: 'text-excerpt', content: plain, label: 'Pasted text' });
    }
  };

  const screenshot = async () => {
    const dataUrl = await captureScreenshot();
    if (dataUrl) add({ type: 'image', dataUrl, label: 'Screenshot.png' });
  };

  const send = () => {
    const text = (inputRef.current?.textContent ?? '').trim();
    if (!text && attachments.length === 0) return;
    addMessage(asideId, 'user', text, attachments);
    setAttachments([]);
    if (inputRef.current) inputRef.current.textContent = '';
    setHasText(false);
    inputRef.current?.focus();
  };

  return (
    <div className="aside-modal-input-area">
      {attachments.length > 0 && (
        <div className="aside-input-overflow">
          <div className="aside-input-pad">
            <div className="aside-input-col">
              <div className="aside-input-chips">
                {attachments.map((att, i) => (
                  <div className="aside-chip-inner" key={i}>
                    <ChipCard attachment={att} />
                    <button
                      className="aside-chip-remove"
                      aria-label="Remove"
                      onClick={() => setAttachments((prev) => prev.filter((_, idx) => idx !== i))}
                      dangerouslySetInnerHTML={{ __html: CLOSE_SVG }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="aside-input-main">
        <div className="aside-input-field-wrap">
          <div
            ref={inputRef}
            className="aside-modal-input-field"
            contentEditable
            role="textbox"
            aria-multiline="true"
            data-placeholder="Write a message…"
            onInput={() => setHasText((inputRef.current?.textContent ?? '').trim() !== '')}
            onPaste={onPaste}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (canSend) send();
              }
            }}
          />
        </div>

        <div className="aside-input-toolbar">
          <div className="aside-input-toolbar-left">
            <button
              ref={addBtnRef}
              className="aside-input-add"
              aria-label="Add files and more"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen((v) => !v);
              }}
              dangerouslySetInnerHTML={{ __html: PLUS_SVG }}
            />
          </div>
          <div className="aside-input-toolbar-right">
            <button
              className="aside-modal-send"
              disabled={!canSend}
              onClick={() => canSend && send()}
              dangerouslySetInnerHTML={{ __html: SEND_SVG }}
            />
          </div>
        </div>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*,text/*,.pdf,.json,.js,.ts,.py,.md,.txt,.csv"
        multiple
        style={{ display: 'none' }}
        onChange={onFiles}
      />

      {menuOpen && (
        <AddMenu
          anchor={addBtnRef.current}
          onPickFiles={() => {
            setMenuOpen(false);
            fileRef.current?.click();
          }}
          onScreenshot={() => {
            setMenuOpen(false);
            screenshot();
          }}
          onClose={() => setMenuOpen(false)}
        />
      )}
    </div>
  );
}
