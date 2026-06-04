/** Highlight an aside's source selection on hover (CSS Custom Highlight API). */
export function highlightAsideRange(range: Range) {
  if (!CSS.highlights) return;
  CSS.highlights.set('aside-hover', new Highlight(range));
}

/** Remove the hover highlight. */
export function clearAsideHighlight() {
  CSS.highlights?.delete('aside-hover');
}
