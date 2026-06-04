/** Format a byte count as a human-readable size, e.g. "12.3 KB". */
export function formatFileSize(bytes: number, decimals = 1): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(decimals)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(decimals)} MB`;
}
