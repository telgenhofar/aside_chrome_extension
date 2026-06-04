import { render, type ComponentChild } from 'preact';

/**
 * Render a Preact tree into a Shadow DOM host attached to <body>. The shadow root
 * isolates Aside's styles from the host page and the host page's styles from Aside.
 * Returns a teardown function that unmounts and removes the host.
 */
export function mountInShadow(
  tree: ComponentChild,
  css = '',
  tokens: Record<string, string> = {},
): () => void {
  const host = document.createElement('div');
  host.className = 'aside-host';
  for (const [name, value] of Object.entries(tokens)) host.style.setProperty(name, value);

  // Shadow DOM retargets our events to the host, so the page's document-level
  // keyboard listeners (e.g. Claude's "type anywhere to focus the composer") would
  // otherwise steal keystrokes from Aside's inputs. Stop key events as they bubble
  // out of the host — the target inside the shadow has already handled them, so this
  // only prevents them from escaping to the page.
  for (const type of ['keydown', 'keyup', 'keypress'] as const) {
    host.addEventListener(type, (e) => e.stopPropagation());
  }

  const shadow = host.attachShadow({ mode: 'open' });

  const style = document.createElement('style');
  style.textContent = css;
  shadow.appendChild(style);

  const root = document.createElement('div');
  shadow.appendChild(root);
  document.body.appendChild(host);

  render(tree, root);

  return () => {
    render(null, root);
    host.remove();
  };
}
