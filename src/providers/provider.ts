import type { Attachment } from '../core/types';

/** CSS custom-property aliases mapping Aside's `--aside-*` tokens to a provider's live theme. */
export type ProviderTheme = Record<string, string>;

/**
 * Everything Aside needs to know about one LLM web UI. The core and UI talk only
 * to this interface, so supporting a new site means adding one implementation —
 * not editing shared code.
 */
export interface Provider {
  /** Stable identifier, e.g. 'claude'. */
  readonly id: string;
  /** Hostnames this provider handles, matched against location.hostname. */
  readonly hosts: readonly string[];

  /** Maps Aside's `--aside-*` tokens to this provider's live design variables. */
  readonly theme: ProviderTheme;

  /** The message element containing a selection range, or null if outside one. */
  getContainingMessage(range: Range): HTMLElement | null;

  /** The site's native "reply to selection" control, or null if it has none. */
  findNativeReplyButton(): HTMLElement | null;

  /** Phase 2: inject text and attachments into the site's real composer. */
  injectComposer?(text: string, attachments: Attachment[]): Promise<void>;

  /** Phase 2: submit the composer. */
  submit?(): Promise<void>;

  /** Phase 2: capture the assistant's streamed response for the modal. */
  captureAssistantResponse?(): Promise<AsyncIterable<string>>;
}
