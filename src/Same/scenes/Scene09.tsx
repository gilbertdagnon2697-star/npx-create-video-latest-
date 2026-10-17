import { interpolate, spring } from "remotion";
import { FinalBackground } from "../components/Backgrounds";
import { Logo } from "../components/Brand";
import { Icon } from "../components/Icon";
import { At, WordLine } from "../components/Text";
import { useSameProps } from "../props";
import { C, fs, SMALL_TEXT_MIN } from "../theme";
import {
  deblur,
  EASE_IN_OUT,
  f,
  fade,
  float,
  FPS,
  pop,
  progress,
  useAbsFrame,
} from "../time";

const CLICK_MS = 46500;

const slideIn = (frame: number, startMs: number) =>
  spring({
    frame: frame - f(startMs),
    fps: FPS,
    config: { damping: 15, stiffness: 140, mass: 0.7 },
  });

// Scène 9 (41,85 à 49,83 s) : écran final et appel à l'action.
export const Scene09: React.FC = () => {
  const frame = useAbsFrame();
  const p = useSameProps();
  const left = slideIn(frame, 42000);
  const right = slideIn(frame, 42500);
  const price = progress(frame, 44000, 450);
  const button = progress(frame, 45000, 450);
  const press = interpolate(
    frame,
    [f(CLICK_MS - 60), f(CLICK_MS + 40), f(CLICK_MS + 220)],
    [1, 0.95, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const shine = progress(frame, 47000, 700, EASE_IN_OUT);
  const glow = 0.5 + 0.15 * Math.sin((frame / FPS) * 3);
  const small: React.CSSProperties = {
    fontSize: SMALL_TEXT_MIN,
    fontWeight: 500,
    color: C.mist,
    textAlign: "center",
    lineHeight: 1.15,
  };
  return (
    <>
      <FinalBackground />

      <At
        x={540}
        y={380}
        style={{
          transform: `translate(-50%, -50%) scale(${pop(frame, 42000)})`,
        }}
      >
        <Logo size={112} />
      </At>

      <WordLine
        y={494}
        size={fs(0.048)}
        color={C.white}
        weight={850}
        dx={0}
        words={[
          { text: p.titlePrefix, at: 42500 },
          { text: p.titleHighlight, at: 42650, color: C.orange },
          { text: p.titleSuffix, at: 42800 },
        ]}
      />
      <At
        x={540}
        y={562}
        style={{ ...small, fontSize: 31, opacity: fade(frame, 43000) }}
      >
        Sécurité Alimentaire, Moyens d'Existence et Résilience
      </At>

      {/* Carte de date (glisse depuis la gauche avec rotation). */}
      <At
        x={190 - (1 - left) * 420}
        y={745}
        style={{
          transform: `translate(-50%, -50%) rotate(${-5 - (1 - left) * 24}deg)`,
        }}
      >
        <div
          style={{
            width: 250,
            borderRadius: 26,
            overflow: "hidden",
            background: "#FFFFFF",
            boxShadow: "0 26px 50px rgba(0,0,0,0.4)",
            textAlign: "center",
            color: C.ink,
          }}
        >
          <div
            style={{
              background: C.orange,
              color: "#FFFFFF",
              fontSize: 26,
              fontWeight: 800,
              letterSpacing: "0.14em",
              padding: "10px 0 9px",
            }}
          >
            {p.startLabel}
          </div>
          <div style={{ padding: "14px 0 18px", lineHeight: 1.1 }}>
            <div
              style={{
                fontSize: 50,
                fontWeight: 900,
                letterSpacing: "-0.03em",
              }}
            >
              {p.startDate}
            </div>
            <div style={{ fontSize: 30, fontWeight: 700, opacity: 0.7 }}>
              {p.startYear}
            </div>
            <div
              style={{
                fontSize: 30,
                fontWeight: 800,
                color: C.orangeDeep,
                marginTop: 8,
              }}
            >
              {p.startHours}
            </div>
          </div>
        </div>
      </At>

      {/* Carte des modalités (glisse depuis la droite avec rotation). */}
      <At
        x={890 + (1 - right) * 420}
        y={745}
        style={{
          transform: `translate(-50%, -50%) rotate(${5 + (1 - right) * 24}deg)`,
        }}
      >
        <div
          style={{
            width: 240,
            padding: "26px 0 28px",
            borderRadius: 26,
            background: `linear-gradient(160deg, #34D16E, ${C.green})`,
            boxShadow: "0 26px 50px rgba(0,0,0,0.4)",
            textAlign: "center",
            color: C.forest,
            lineHeight: 1.15,
          }}
        >
          <div
            style={{ fontSize: 34, fontWeight: 900, letterSpacing: "-0.02em" }}
          >
            {p.modeDays}
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, marginTop: 10 }}>
            {p.modeLine1}
          </div>
          <div style={{ fontSize: 30, fontWeight: 700 }}>{p.modeLine2}</div>
        </div>
      </At>

      {/* Prix. */}
      <At
        x={562}
        y={684}
        style={{
          opacity: price,
          transform: `translate(-50%, -50%) scale(${0.8 + 0.2 * price})`,
          fontSize: fs(0.07),
          fontWeight: 900,
          letterSpacing: "-0.04em",
          color: C.white,
          lineHeight: 1,
        }}
      >
        {p.price}
      </At>
      <At
        x={562}
        y={770}
        style={{
          opacity: price,
          fontSize: 38,
          fontWeight: 800,
          color: C.orange,
          letterSpacing: "0.04em",
        }}
      >
        {p.currency}
      </At>
      <At
        x={562}
        y={826}
        style={{
          ...small,
          opacity: fade(frame, 44000),
          whiteSpace: "pre-line",
        }}
      >
        {p.priceNote}
      </At>

      {/* Bouton d'appel à l'action, reflet lumineux vers 47 s. */}
      <At
        x={540}
        y={960}
        style={{
          ...deblur(frame, 45000, { blur: 18 }),
          transform: `translate(-50%, -50%) scale(${(0.82 + 0.18 * button) * press})`,
        }}
      >
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            padding: "22px 54px 20px",
            borderRadius: 40,
            background: `linear-gradient(180deg, ${C.orange}, #EF7B22)`,
            boxShadow: `0 0 70px rgba(247,146,33,${glow}), 0 18px 40px rgba(0,0,0,0.35), inset 0 2px 0 rgba(255,255,255,0.35)`,
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 14,
              fontSize: fs(0.026),
              fontWeight: 850,
              letterSpacing: "-0.02em",
              color: C.ink,
            }}
          >
            {p.ctaLabel}
            <Icon name="arrow" size={44} color={C.ink} strokeWidth={2.8} />
          </div>
          <div
            style={{
              fontSize: 30,
              fontWeight: 650,
              color: "#3A2A10",
              marginTop: 4,
            }}
          >
            {p.website}
          </div>
          <div
            style={{
              position: "absolute",
              top: -20,
              bottom: -20,
              width: 120,
              left: `${-30 + shine * 150}%`,
              transform: "skewX(-20deg)",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.65), transparent)",
              opacity: shine > 0 && shine < 1 ? 1 : 0,
            }}
          />
        </div>
      </At>

      <At
        x={540}
        y={1095}
        style={{
          opacity: fade(frame, 45500),
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontSize: 46,
          fontWeight: 800,
          color: C.white,
          letterSpacing: "-0.01em",
        }}
      >
        <Icon name="phone" size={44} color={C.orange} strokeWidth={2.4} />
        {p.phone}
      </At>
      <At
        x={540}
        y={1162}
        style={{ ...small, fontSize: 36, opacity: fade(frame, 46000) }}
      >
        {p.closingLine}
      </At>

      <Pointer />
    </>
  );
};

// Pointeur de souris : arrive du bas à droite, clic simulé vers 46,5 s.
const Pointer: React.FC = () => {
  const frame = useAbsFrame();
  const arrive = progress(frame, 46000, 400);
  if (arrive <= 0) {
    return null;
  }
  const click = interpolate(
    frame,
    [f(CLICK_MS - 60), f(CLICK_MS + 40), f(CLICK_MS + 200)],
    [1, 0.82, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const ripple = progress(frame, CLICK_MS, 500);
  const size = 66;
  const tipX =
    605 + (1 - arrive) * 240 + float(frame, 3, 3) * (arrive >= 1 ? 1 : 0);
  const tipY = 1014 + (1 - arrive) * 300;
  return (
    <>
      {ripple > 0 && ripple < 1 ? (
        <div
          style={{
            position: "absolute",
            left: 605 - 70 * ripple,
            top: 1014 - 70 * ripple,
            width: 140 * ripple,
            height: 140 * ripple,
            borderRadius: "50%",
            border: `4px solid rgba(255,255,255,${0.8 * (1 - ripple)})`,
          }}
        />
      ) : null}
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        style={{
          position: "absolute",
          left: tipX - (3 / 24) * size,
          top: tipY - (2 / 24) * size,
          opacity: arrive,
          transform: `scale(${click})`,
          transformOrigin: "12% 8%",
          filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.45))",
        }}
      >
        <path
          d="M3 2v19.5l5.4-5.2 3.4 7.4 3.4-1.5-3.4-7.3H19L3 2Z"
          fill="#FFFFFF"
          stroke="#111111"
          strokeWidth={1.4}
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};
