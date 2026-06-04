// All of Aside's inline SVG icons. They're injected via dangerouslySetInnerHTML and
// colored by the stylesheet (currentColor, or an explicit fill/stroke the CSS overrides).

export const REPLY_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M454.535,277.154c-35.431-35.465-84.645-57.483-138.744-57.465H95.8l116.068-103.851c10.897-9.75,11.827-26.491,2.073-37.388c-9.754-10.905-26.49-11.827-37.391-2.078L8.828,226.43c-0.177,0.156-0.298,0.362-0.47,0.517c-0.789,0.742-1.483,1.569-2.177,2.414c-0.453,0.535-0.939,1.044-1.341,1.621c-0.65,0.914-1.168,1.922-1.697,2.923c-0.302,0.577-0.664,1.111-0.923,1.698c-0.526,1.208-0.888,2.483-1.233,3.776c-0.117,0.449-0.31,0.862-0.406,1.319C0.207,242.465,0,244.292,0,246.171c0,1.88,0.207,3.707,0.582,5.465c0.096,0.475,0.302,0.914,0.423,1.38c0.344,1.267,0.698,2.534,1.215,3.716c0.263,0.603,0.63,1.147,0.939,1.733c0.526,0.991,1.039,1.983,1.681,2.896c0.397,0.569,0.88,1.069,1.323,1.603c0.703,0.845,1.41,1.69,2.212,2.44c0.168,0.155,0.285,0.354,0.453,0.5L176.549,415.97c10.901,9.749,27.638,8.819,37.391-2.078c9.754-10.896,8.824-27.638-2.073-37.388v-0.008L95.8,272.654h219.992c39.642,0.018,75.28,15.991,101.288,41.948c25.956,26.007,41.938,61.654,41.956,101.291c0,14.62,11.853,26.482,26.482,26.482c14.62,0,26.482-11.862,26.482-26.482C512.009,361.79,490,312.584,454.535,277.154z"/></svg>`;

// Stroke is set per element (not on the root) so the icon can render in different
// colors at its two call sites without one overriding the other.
export const ASIDE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><circle cx="160" cy="96" r="48" fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><circle cx="160" cy="416" r="48" fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><line x1="160" y1="368" x2="160" y2="144" fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><circle cx="352" cy="160" r="48" fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path d="M352,208c0,128-192,48-192,160" fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>`;

export const SEND_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M208.49,120.49a12,12,0,0,1-17,0L140,69V216a12,12,0,0,1-24,0V69L64.49,120.49a12,12,0,0,1-17-17l72-72a12,12,0,0,1,17,0l72,72A12,12,0,0,1,208.49,120.49Z"/></svg>`;

// Lucide X (stroke-based). The chip-remove button recolors it via currentColor.
export const CLOSE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

export const PLUS_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M10.5 4a.5.5 0 0 0-1 0v5.5H4a.5.5 0 0 0 0 1h5.5V16a.5.5 0 0 0 1 0v-5.5H16a.5.5 0 0 0 0-1h-5.5V4Z"/></svg>`;

export const FILES_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>`;

export const CAMERA_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>`;

export const ARROW_LEFT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path></svg>`;

export const CLOSE_FILL_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>`;
