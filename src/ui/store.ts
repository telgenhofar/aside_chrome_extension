import { signal } from '@preact/signals';
import { clearAsideHighlight } from '../core/highlight';
import type {
  Attachment,
  AsideMessage,
  FileAttachment,
  ImageAttachment,
  MessageRole,
  TextExcerptAttachment,
} from '../core/types';

/** Actions the selection tooltip performs, captured for the active selection. */
export interface TooltipState {
  rect: DOMRect;
  onReply: () => void;
  onAside: () => void;
}

/** When non-null, the selection tooltip is shown anchored to `rect`. */
export const tooltip = signal<TooltipState | null>(null);

/** One side-conversation: its anchor in the page plus its message state. */
export interface AsideEntry {
  id: string;
  selectedText: string;
  range: Range;
  sourceMessageEl: HTMLElement | null;
  nativeReplyBtn: HTMLElement | null;
  messages: AsideMessage[];
  open: boolean;
}

/** All asides; open ones render as modals, closed ones as margin icons. */
export const asides = signal<AsideEntry[]>([]);

/** The full-screen attachment preview, if one is open. */
export type ViewerState =
  | { kind: 'text'; attachment: TextExcerptAttachment | FileAttachment }
  | { kind: 'image'; attachment: ImageAttachment };
export const viewer = signal<ViewerState | null>(null);

/** Create a new aside (open) from a selection. */
export function createAside(
  selectedText: string,
  range: Range,
  sourceMessageEl: HTMLElement | null,
  nativeReplyBtn: HTMLElement | null,
): void {
  asides.value = [
    ...asides.value,
    {
      id: crypto.randomUUID(),
      selectedText,
      range,
      sourceMessageEl,
      nativeReplyBtn,
      messages: [],
      open: true,
    },
  ];
}

function patch(id: string, fn: (a: AsideEntry) => AsideEntry) {
  asides.value = asides.value.map((a) => (a.id === id ? fn(a) : a));
}

export function openAside(id: string) {
  clearAsideHighlight();
  patch(id, (a) => ({ ...a, open: true }));
}

export function closeAside(id: string) {
  clearAsideHighlight();
  viewer.value = null;
  patch(id, (a) => ({ ...a, open: false }));
}

export function addMessage(id: string, role: MessageRole, text: string, attachments: Attachment[]) {
  patch(id, (a) => ({ ...a, messages: [...a.messages, { role, text, attachments }] }));
}
