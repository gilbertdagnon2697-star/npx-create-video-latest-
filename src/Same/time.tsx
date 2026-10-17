import { createContext, useContext } from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
} from "remotion";

export const FPS = 30;
export const TOTAL_MS = 49830;

// Toute la fiche est exprimée en millisecondes absolues : on convertit en
// images (30 i/s) au dernier moment.
export const f = (ms: number) => Math.round((ms * FPS) / 1000);

export const TOTAL_FRAMES = Math.ceil((TOTAL_MS * FPS) / 1000);

const OffsetContext = createContext(0);

// Image absolue de la vidéo, même à l'intérieur d'une scène (<Sequence>).
export const useAbsFrame = () => useCurrentFrame() + useContext(OffsetContext);

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

export const EASE_OUT = Easing.bezier(0.22, 1, 0.36, 1);
export const EASE_IN = Easing.bezier(0.55, 0, 0.9, 0.4);
export const EASE_IN_OUT = Easing.bezier(0.65, 0, 0.35, 1);

// Progression 0 -> 1 entre startMs et startMs + durMs.
export const progress = (
  frame: number,
  startMs: number,
  durMs: number,
  easing: (t: number) => number = EASE_OUT,
) => {
  const s = f(startMs);
  const e = Math.max(s + 1, f(startMs + durMs));
  return interpolate(frame, [s, e], [0, 1], { ...clamp, easing });
};

// « Zoom avant avec léger rebond » : ressort amorti (~10 % de dépassement).
export const pop = (frame: number, startMs: number) =>
  spring({
    frame: frame - f(startMs),
    fps: FPS,
    config: { damping: 12, stiffness: 200, mass: 0.5 },
  });

// « Défloutage » : opacité, flou et léger glissement.
export const deblur = (
  frame: number,
  startMs: number,
  { durMs = 400, dx = 0, dy = 0, blur = 16 } = {},
): React.CSSProperties => {
  const p = progress(frame, startMs, durMs);
  return {
    opacity: p,
    filter: p < 1 ? `blur(${(1 - p) * blur}px)` : undefined,
    transform: `translate(${(1 - p) * dx}px, ${(1 - p) * dy}px)`,
  };
};

export const fade = (frame: number, startMs: number, durMs = 400) =>
  progress(frame, startMs, durMs, EASE_IN_OUT);

// Flottement lent (capsules, tuiles d'icônes).
export const float = (frame: number, amp: number, periodS: number, phase = 0) =>
  Math.sin((frame / FPS / periodS) * Math.PI * 2 + phase) * amp;

export const Scene: React.FC<{
  readonly name: string;
  readonly fromMs: number;
  readonly toMs: number;
  readonly style?: (frame: number) => React.CSSProperties;
  readonly children: React.ReactNode;
}> = ({ name, fromMs, toMs, style, children }) => {
  const from = f(fromMs);
  return (
    <Sequence
      name={name}
      from={from}
      durationInFrames={f(toMs) - from}
      premountFor={FPS}
    >
      <OffsetContext.Provider value={from}>
        <SceneFrame style={style}>{children}</SceneFrame>
      </OffsetContext.Provider>
    </Sequence>
  );
};

const SceneFrame: React.FC<{
  readonly style?: (frame: number) => React.CSSProperties;
  readonly children: React.ReactNode;
}> = ({ style, children }) => {
  const frame = useAbsFrame();
  return (
    <AbsoluteFill style={{ overflow: "hidden", ...style?.(frame) }}>
      {children}
    </AbsoluteFill>
  );
};
