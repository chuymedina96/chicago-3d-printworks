// Minimal stroke icon set (24px grid, currentColor) used across the site.
const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export const IconFactory = (p) => (
  <svg {...base} {...p}><path d="M3 21V10l6 4V10l6 4V5h6v16H3z" /><path d="M7 17h2M12 17h2M17 17h1" /></svg>
);
export const IconBeaker = (p) => (
  <svg {...base} {...p}><path d="M9 3h6M10 3v6L5 18a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-9V3" /><path d="M7.5 14h9" /></svg>
);
export const IconScan = (p) => (
  <svg {...base} {...p}><path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3" /><path d="M8 12h8M12 8v8" /></svg>
);
export const IconHand = (p) => (
  <svg {...base} {...p}><path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V12M11 11V4.5a1.5 1.5 0 0 1 3 0V12M14 11.5V6a1.5 1.5 0 0 1 3 0v8a7 7 0 0 1-7 7h-.5a6 6 0 0 1-5-2.7L3 15.5a1.5 1.5 0 0 1 2.4-1.8L8 16" /></svg>
);
export const IconCube = (p) => (
  <svg {...base} {...p}><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" /><path d="M12 12l8-4.5M12 12L4 7.5M12 12v9" /></svg>
);
export const IconRuler = (p) => (
  <svg {...base} {...p}><path d="M3 17L17 3l4 4L7 21l-4-4z" /><path d="M7 13l2 2M10 10l2 2M13 7l2 2" /></svg>
);
export const IconLayers = (p) => (
  <svg {...base} {...p}><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 13l9 5 9-5" /><path d="M3 17.5l9 5 9-5" opacity=".5" /></svg>
);
export const IconBolt = (p) => (
  <svg {...base} {...p}><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" /></svg>
);
export const IconCode = (p) => (
  <svg {...base} {...p}><path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" /></svg>
);
export const IconPin = (p) => (
  <svg {...base} {...p}><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
);
export const IconUpload = (p) => (
  <svg {...base} {...p}><path d="M12 16V4M7 9l5-5 5 5" /><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" /></svg>
);
export const IconChat = (p) => (
  <svg {...base} {...p}><path d="M4 5h16v11H9l-5 4V5z" /><path d="M8 10h8M8 13h5" /></svg>
);
export const IconPrinter = (p) => (
  <svg {...base} {...p}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 8h18M8 8v4h8V8M9 17h6" /></svg>
);
export const IconTruck = (p) => (
  <svg {...base} {...p}><path d="M3 6h11v10H3zM14 9h4l3 3v4h-7" /><circle cx="7" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></svg>
);
export const IconMail = (p) => (
  <svg {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
);
export const IconArrow = (p) => (
  <svg {...base} {...p} width={18} height={18}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
