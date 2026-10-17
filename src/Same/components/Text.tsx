import { FONT_FAMILY } from "../fonts";
import { C } from "../theme";
import { deblur, fade, float, pop, progress, useAbsFrame } from "../time";
import { Icon, type IconName } from "./Icon";

// Place son contenu centré sur (x, y), dans le repère 1080 x 1920.
export const At: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly style?: React.CSSProperties;
  readonly children: React.ReactNode;
}> = ({ x, y, style, children }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      transform: "translate(-50%, -50%)",
      fontFamily: FONT_FAMILY,
      whiteSpace: "nowrap",
      ...style,
    }}
  >
    {children}
  </div>
);

// Soulignement « tracé à la main », écrit progressivement.
export const Underline: React.FC<{
  readonly startMs: number;
  readonly color: string;
}> = ({ startMs, color }) => {
  const frame = useAbsFrame();
  const p = progress(frame, startMs, 450);
  if (p <= 0) {
    return null;
  }
  return (
    <svg
      viewBox="0 0 100 10"
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        left: "-3%",
        width: "106%",
        bottom: "-0.2em",
        height: "0.3em",
        overflow: "visible",
      }}
    >
      <path
        d="M2 6.5C18 3.5 36 8 55 5s33 1.5 43-1.5"
        fill="none"
        stroke={color}
        strokeWidth={7}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - p}
      />
    </svg>
  );
};

export type Word = {
  readonly text: string;
  readonly at: number;
  readonly color?: string;
  readonly underlineAt?: number;
  // Ponctuation collée au mot, hors soulignement (ex. « , » ou « : »).
  readonly suffix?: string;
  readonly suffixColor?: string;
};

// Ligne de titre dont les mots apparaissent un à un par défloutage.
export const WordLine: React.FC<{
  readonly x?: number;
  readonly y: number;
  readonly size: number;
  readonly color: string;
  readonly words: readonly Word[];
  readonly weight?: number;
  readonly dx?: number;
}> = ({ x = 540, y, size, color, words, weight = 800, dx = -26 }) => {
  const frame = useAbsFrame();
  return (
    <At
      x={x}
      y={y}
      style={{
        display: "flex",
        gap: "0.26em",
        fontSize: size,
        fontWeight: weight,
        letterSpacing: "-0.025em",
        lineHeight: 1.1,
        color,
      }}
    >
      {words.map((w, i) => (
        <span
          key={`${w.text}-${i}`}
          style={{
            position: "relative",
            display: "inline-block",
            color: w.color ?? color,
            ...deblur(frame, w.at, { dx }),
          }}
        >
          <span style={{ position: "relative", display: "inline-block" }}>
            {w.text}
            {w.underlineAt !== undefined ? (
              <Underline startMs={w.underlineAt} color={w.color ?? color} />
            ) : null}
          </span>
          {w.suffix ? (
            <span style={{ color: w.suffixColor ?? w.color ?? color }}>
              {w.suffix}
            </span>
          ) : null}
        </span>
      ))}
    </At>
  );
};

// Étiquette pleine, légèrement inclinée, qui apparaît avec un rebond.
export const Sticker: React.FC<{
  readonly x?: number;
  readonly y: number;
  readonly size: number;
  readonly bg: string;
  readonly color: string;
  readonly rotate: number;
  readonly startMs: number;
  readonly children: React.ReactNode;
}> = ({ x = 540, y, size, bg, color, rotate, startMs, children }) => {
  const frame = useAbsFrame();
  const s = pop(frame, startMs);
  return (
    <At
      x={x}
      y={y}
      style={{
        opacity: progress(frame, startMs, 130),
        transform: `translate(-50%, -50%) rotate(${rotate}deg) scale(${s})`,
      }}
    >
      <div
        style={{
          padding: "0.12em 0.44em 0.17em",
          borderRadius: "0.24em",
          background: bg,
          color,
          fontSize: size,
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 1.12,
          boxShadow:
            "0 22px 44px rgba(0,0,0,0.32), inset 0 0 0 2px rgba(255,255,255,0.06)",
        }}
      >
        {children}
      </div>
    </At>
  );
};

type CapsuleVariant = "plain" | "dot" | "check";

// Capsule de sigle : blanche (option pastille sombre) ou sombre à coche.
export const Capsule: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly size: number;
  readonly text: string;
  readonly startMs: number;
  readonly entry: "float" | "pop";
  readonly variant?: CapsuleVariant;
  readonly icon?: IconName;
  readonly blur?: number;
  readonly anchor?: "center" | "left" | "right";
  readonly seed?: number;
}> = ({
  x,
  y,
  size,
  text,
  startMs,
  entry,
  variant = "plain",
  icon = "chart",
  blur = 0,
  anchor = "center",
  seed = 0,
}) => {
  const frame = useAbsFrame();
  const dark = variant === "check";
  const scale = entry === "pop" ? pop(frame, startMs) : 1;
  const opacity =
    entry === "pop" ? progress(frame, startMs, 130) : fade(frame, startMs, 400);
  const fx = entry === "float" ? float(frame, 8, 5.5 + seed, seed) : 0;
  const fy =
    entry === "float" ? float(frame, 12, 4.2 + seed * 0.7, seed * 1.7) : 0;
  return (
    <At
      x={x}
      y={y}
      style={{
        opacity,
        transform: `translate(${anchor === "left" ? 0 : anchor === "right" ? -100 : -50}%, -50%) translate(${fx}px, ${fy}px) scale(${scale})`,
        filter: blur ? `blur(${blur}px)` : undefined,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: size * 0.42,
          padding:
            variant === "plain"
              ? `${size * 0.42}px ${size * 0.85}px`
              : `${size * 0.3}px ${size * 0.8}px ${size * 0.3}px ${size * 0.3}px`,
          borderRadius: 999,
          background: dark ? "#0E2516" : "#FFFFFF",
          color: dark ? C.white : variant === "dot" ? C.ink : C.capsuleText,
          fontSize: size,
          fontWeight: 700,
          letterSpacing: "-0.01em",
          boxShadow: dark
            ? "0 16px 36px rgba(10,46,27,0.35)"
            : "0 14px 34px rgba(19,43,27,0.16)",
        }}
      >
        {variant === "dot" ? (
          <div
            style={{
              width: size * 1.55,
              height: size * 1.55,
              borderRadius: "50%",
              background: C.forest,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon
              name={icon}
              size={size * 0.9}
              color={C.orange}
              strokeWidth={2.2}
            />
          </div>
        ) : null}
        {variant === "check" ? (
          <div
            style={{
              width: size * 1.45,
              height: size * 1.45,
              borderRadius: "50%",
              background: C.orange,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon
              name="check"
              size={size * 0.95}
              color={C.forest}
              strokeWidth={3}
            />
          </div>
        ) : null}
        {text}
      </div>
    </At>
  );
};
