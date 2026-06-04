// Browser APIs newer than TypeScript's DOM lib. As a global .d.ts (no imports or
// exports), the interface below merges with the built-in DisplayMediaStreamOptions.

declare class CaptureController {
  setFocusBehavior(behavior: 'focus-captured-surface' | 'no-focus-change'): void;
}

interface DisplayMediaStreamOptions {
  controller?: CaptureController;
}

// Vite's `?inline` query returns a CSS file's contents as a string.
declare module '*.css?inline' {
  const css: string;
  export default css;
}
