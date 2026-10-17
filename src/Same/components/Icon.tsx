// Pictogrammes au trait (viewBox 24 x 24), dessinés pour la recréation.
const PATHS = {
  book: [
    "M2.5 5.5C5 4 8.5 4 12 6c3.5-2 7-2 9.5-.5V19c-2.5-1.5-6-1.5-9.5.5-3.5-2-7-2-9.5-.5Z",
    "M12 6v13.5",
  ],
  chart: ["M3 21h18", "M6 17v-5", "M10.5 17V8", "M15 17v-7", "M19.5 17V4"],
  search: ["M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z", "M16.2 16.2 21 21"],
  layers: ["M12 3 2 8l10 5 10-5-10-5Z", "m2 12.5 10 5 10-5", "m2 17 10 5 10-5"],
  wallet: [
    "M19 7V5.5A2.5 2.5 0 0 0 16.5 3h-11A2.5 2.5 0 0 0 3 5.5v13A2.5 2.5 0 0 0 5.5 21h13a2.5 2.5 0 0 0 2.5-2.5V16",
    "M3 7h15.5A2.5 2.5 0 0 1 21 9.5V10",
    "M21 10h-4.5a2 2 0 0 0 0 4H21Z",
  ],
  sprout: [
    "M12 21v-9",
    "M12 12C12 8 9.5 5 4 5c0 4 2.5 7 8 7Z",
    "M12 14.5c0-4.5 2.5-7.5 8-7.5 0 4.5-2.5 7.5-8 7.5Z",
  ],
  shield: [
    "M12 3 20 6v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3Z",
    "m8.8 12 2.2 2.2 4.2-4.4",
  ],
  target: [
    "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z",
    "M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z",
    "M12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z",
  ],
  phone: [
    "M21.5 16.6v3a2 2 0 0 1-2.2 2 19.5 19.5 0 0 1-8.5-3 19.2 19.2 0 0 1-6-6 19.5 19.5 0 0 1-3-8.5A2 2 0 0 1 3.8 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L7.8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.5 1.8Z",
  ],
  check: ["m5 12.5 4.5 4.5L19 7.5"],
  arrow: ["M4 12h15", "m13 6 6 6-6 6"],
  coins: [
    "M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z",
    "M17.6 9.7a5.5 5.5 0 1 1-7.9 7.9",
    "M9 7v4",
  ],
  basket: [
    "M3 10h18l-2 10H5L3 10Z",
    "m7.5 10 3-6",
    "m16.5 10-3-6",
    "M9 14v2.5",
    "M15 14v2.5",
  ],
  camera: [
    "M4 7h3l1.5-2.5h7L17 7h3a1.5 1.5 0 0 1 1.5 1.5v10A1.5 1.5 0 0 1 20 20H4a1.5 1.5 0 0 1-1.5-1.5v-10A1.5 1.5 0 0 1 4 7Z",
    "M12 9.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z",
  ],
} as const;

export type IconName = keyof typeof PATHS;

export const Icon: React.FC<{
  readonly name: IconName;
  readonly size: number;
  readonly color: string;
  readonly strokeWidth?: number;
  readonly style?: React.CSSProperties;
}> = ({ name, size, color, strokeWidth = 2, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: "block", flexShrink: 0, ...style }}
  >
    {PATHS[name].map((d) => (
      <path key={d} d={d} />
    ))}
  </svg>
);
