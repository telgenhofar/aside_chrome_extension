export interface AttachmentBase {
  label?: string;
}
export interface TextExcerptAttachment extends AttachmentBase {
  type: 'text-excerpt';
  content: string;
}
export interface ImageAttachment extends AttachmentBase {
  type: 'image';
  dataUrl: string;
}
export interface FileAttachment extends AttachmentBase {
  type: 'file';
  label: string;
  content?: string;
  ext?: string;
  subtitle?: string;
  file?: File;
}

/** A pending or sent attachment; the `type` field discriminates the union. */
export type Attachment = TextExcerptAttachment | ImageAttachment | FileAttachment;

export type MessageRole = 'user' | 'assistant';
export interface AsideMessage {
  role: MessageRole;
  text: string;
  attachments: Attachment[];
}
