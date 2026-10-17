import { C } from "../theme";
import { deblur, f, fade, float, FPS, progress, useAbsFrame } from "../time";
import { Icon, type IconName } from "./Icon";
import { At } from "./Text";

export type Typed = {
  readonly text: string;
  readonly fromMs: number;
  readonly toMs: number;
};

// Texte visible à l'instant donné : écriture progressive puis effacement
// lettre par lettre (sauf pour le dernier intitulé, tenu jusqu'à la coupe).
const typedState = (frame: number, items: readonly Typed[]) => {
  let active = -1;
  items.forEach((it, i) => {
    if (frame >= f(it.fromMs)) {
      active = i;
    }
  });
  if (active === -1) {
    return { text: "", active: -1, typing: false };
  }
  const it = items[active];
  const isLast = active === items.length - 1;
  const span = it.toMs - it.fromMs;
  const typeMs = Math.min(it.text.length * 32, span * 0.45);
  const eraseMs = isLast ? 0 : Math.min(300, span * 0.3);
  const chars = it.text.length;
  const typed = Math.floor(
    progress(frame, it.fromMs, typeMs, (t) => t) * chars,
  );
  const erased = isLast
    ? 0
    : Math.floor(progress(frame, it.toMs - eraseMs, eraseMs, (t) => t) * chars);
  const n = Math.max(0, Math.min(typed, chars - erased));
  const typing =
    frame < f(it.fromMs + typeMs) || (!isLast && frame >= f(it.toMs - eraseMs));
  return { text: it.text.slice(0, n), active, typing };
};

export const SearchBar: React.FC<{
  readonly y: number;
  readonly appearMs: number;
  readonly items: readonly Typed[];
  readonly fontSize: number;
}> = ({ y, appearMs, items, fontSize }) => {
  const frame = useAbsFrame();
  const p = progress(frame, appearMs, 400);
  const { text, typing } = typedState(frame, items);
  const blink = typing || Math.floor((frame / FPS) * 2) % 2 === 0;
  return (
    <At
      x={540}
      y={y}
      style={{
        opacity: p,
        filter: p < 1 ? `blur(${(1 - p) * 16}px)` : undefined,
        transform: `translate(-50%, -50%) scale(${0.86 + 0.14 * p})`,
      }}
    >
      <div
        style={{
          width: 778,
          height: 116,
          borderRadius: 58,
          background: "#FFFFFF",
          boxShadow:
            "0 24px 60px rgba(19,43,27,0.14), 0 2px 0 rgba(255,255,255,0.9) inset",
          display: "flex",
          alignItems: "center",
          padding: "0 18px",
          gap: 26,
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: `linear-gradient(160deg, ${C.orange}, #EF7B22)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 20px rgba(247,146,33,0.4)",
          }}
        >
          <Icon name="search" size={40} color="#FFFFFF" strokeWidth={2.6} />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize,
            fontWeight: 600,
            letterSpacing: "-0.015em",
            color: C.ink,
          }}
        >
          {text}
          <div
            style={{
              width: 4,
              height: fontSize * 1.1,
              marginLeft: 4,
              borderRadius: 2,
              background: C.orange,
              opacity: blink ? 1 : 0,
            }}
          />
        </div>
      </div>
    </At>
  );
};

// Cinq points de pagination ; le point actif (orange) avance à chaque intitulé.
export const Pagination: React.FC<{
  readonly y: number;
  readonly appearMs: number;
  readonly items: readonly Typed[];
  readonly label: string;
  readonly labelY: number;
  readonly labelSize: number;
}> = ({ y, appearMs, items, label, labelY, labelSize }) => {
  const frame = useAbsFrame();
  const { active } = typedState(frame, items);
  const o = fade(frame, appearMs, 400);
  return (
    <>
      <At x={540} y={y} style={{ opacity: o, display: "flex", gap: 14 }}>
        {items.map((it, i) => {
          const on = progress(frame, it.fromMs, 250) * (i === active ? 1 : 0);
          return (
            <div
              key={it.text}
              style={{
                width: 16 + on * 26,
                height: 16,
                borderRadius: 8,
                background: i === active ? C.orange : "rgba(19,43,27,0.18)",
              }}
            />
          );
        })}
      </At>
      <At
        x={540}
        y={labelY}
        style={{
          opacity: o,
          fontSize: labelSize,
          fontWeight: 600,
          color: C.muted,
          letterSpacing: "0.01em",
        }}
      >
        {label}
      </At>
    </>
  );
};

export type Tile = {
  readonly icon: IconName;
  readonly x: number;
  readonly y: number;
  readonly rotate: number;
};

// Tuiles blanches arrondies à pictogramme orange, qui flottent aux coins.
export const IconTiles: React.FC<{
  readonly tiles: readonly Tile[];
  readonly appearMs: number;
  readonly color: string;
}> = ({ tiles, appearMs, color }) => {
  const frame = useAbsFrame();
  return (
    <>
      {tiles.map((t, i) => (
        <At
          key={t.icon}
          x={t.x}
          y={t.y}
          style={{
            translate: `${float(frame, 6, 5 + i, i)}px ${float(frame, 14, 4 + i * 0.6, i * 2)}px`,
            rotate: `${t.rotate + float(frame, 2, 6 + i, i)}deg`,
          }}
        >
          <div
            style={{
              ...deblur(frame, appearMs + i * 90, { dy: 30, blur: 10 }),
              width: 136,
              height: 136,
              borderRadius: 36,
              background: "#FFFFFF",
              boxShadow: "0 22px 50px rgba(19,43,27,0.14)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name={t.icon} size={66} color={color} strokeWidth={2} />
          </div>
        </At>
      ))}
    </>
  );
};
