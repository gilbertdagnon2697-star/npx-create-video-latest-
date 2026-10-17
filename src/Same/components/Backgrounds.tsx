import { AbsoluteFill, random } from "remotion";
import { C } from "../theme";
import { float, FPS, useAbsFrame } from "../time";

const PARTICLES = new Array(46).fill(true).map((_, i) => ({
  x: random(`px-${i}`) * 100,
  y: random(`py-${i}`) * 100,
  size: 2 + random(`ps-${i}`) * 4,
  speed: 6 + random(`pv-${i}`) * 14,
  phase: random(`pp-${i}`) * Math.PI * 2,
  warm: random(`pw-${i}`) > 0.55,
}));

// Fines particules lumineuses qui montent lentement en scintillant.
const Particles: React.FC = () => {
  const frame = useAbsFrame();
  const t = frame / FPS;
  return (
    <AbsoluteFill>
      {PARTICLES.map((p, i) => {
        const y = (((p.y - t * p.speed * 0.25) % 100) + 100) % 100;
        const twinkle = 0.35 + 0.65 * Math.abs(Math.sin(t * 1.3 + p.phase));
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${p.x + Math.sin(t * 0.6 + p.phase) * 0.8}%`,
              top: `${y}%`,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: p.warm ? "#FFD08A" : "#E9FFEF",
              opacity: twinkle * 0.7,
              boxShadow: `0 0 ${p.size * 3}px ${p.warm ? "rgba(247,146,33,0.8)" : "rgba(200,255,220,0.6)"}`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

// Fond vert forêt, halo olive et ambre en bas à gauche, particules.
export const DarkBackground: React.FC = () => {
  const frame = useAbsFrame();
  const drift = float(frame, 3, 9);
  return (
    <AbsoluteFill style={{ backgroundColor: C.forest }}>
      <AbsoluteFill
        style={{
          background: [
            `radial-gradient(ellipse 70% 45% at ${8 + drift}% ${92 - drift}%, rgba(196,160,48,0.55), rgba(120,120,30,0.18) 45%, transparent 70%)`,
            "radial-gradient(circle at 0% 100%, rgba(247,146,33,0.35), transparent 32%)",
            "radial-gradient(ellipse 60% 40% at 90% 12%, rgba(36,195,95,0.12), transparent 70%)",
            "radial-gradient(ellipse 120% 80% at 50% 50%, transparent 55%, rgba(0,0,0,0.35) 100%)",
          ].join(", "),
        }}
      />
      <Particles />
    </AbsoluteFill>
  );
};

const BLOBS = [
  { x: 70, y: 260, w: 360, h: 220, c: "rgba(255,255,255,0.75)", r: -12 },
  { x: 760, y: 520, w: 300, h: 380, c: "rgba(205,234,206,0.7)", r: 10 },
  { x: -60, y: 1150, w: 420, h: 300, c: "rgba(214,238,214,0.65)", r: 8 },
  { x: 640, y: 1450, w: 480, h: 320, c: "rgba(252,214,182,0.6)", r: -8 },
  { x: 300, y: 1680, w: 360, h: 220, c: "rgba(255,255,255,0.7)", r: 4 },
];

// Fond clair : vert menthe en haut à gauche, blanc au centre, pêche en bas
// à droite, rectangles arrondis flous en arrière-plan.
export const LightBackground: React.FC = () => {
  const frame = useAbsFrame();
  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(140deg, #CFE8CF 0%, #E8F3E7 22%, #F8FBF8 50%, #FDF3EA 76%, #FADCC2 100%)",
      }}
    >
      {BLOBS.map((b, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: b.x + float(frame, 14, 7 + i, i),
            top: b.y + float(frame, 18, 9 + i, i * 2),
            width: b.w,
            height: b.h,
            borderRadius: 64,
            background: b.c,
            transform: `rotate(${b.r}deg)`,
            filter: "blur(30px)",
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

// Écran final : fond sombre, rayons partant du bas, arc lumineux orange
// (horizon de planète) vers y = 1475, particules.
export const FinalBackground: React.FC = () => {
  const frame = useAbsFrame();
  const sweep = (frame / FPS) * 2.2;
  return (
    <AbsoluteFill style={{ backgroundColor: C.forest }}>
      <AbsoluteFill
        style={{
          background: `repeating-conic-gradient(from ${-90 + sweep}deg at 50% 78%, rgba(255,196,120,0.11) 0deg 2.5deg, transparent 2.5deg 11deg)`,
          maskImage:
            "linear-gradient(to top, rgba(0,0,0,0.9) 18%, rgba(0,0,0,0.25) 55%, transparent 85%)",
        }}
      />
      <AbsoluteFill
        style={{
          background: [
            "radial-gradient(ellipse 80% 30% at 50% 78%, rgba(247,146,33,0.35), transparent 70%)",
            "radial-gradient(ellipse 120% 60% at 50% 0%, rgba(36,195,95,0.10), transparent 60%)",
          ].join(", "),
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 540 - 1500,
          top: 1475,
          width: 3000,
          height: 3000,
          borderRadius: "50%",
          border: "4px solid rgba(255,186,100,0.95)",
          background:
            "radial-gradient(circle at 50% 0%, #1A3A22 0%, #071D11 18%, #051209 40%)",
          boxShadow:
            "0 0 90px 30px rgba(247,146,33,0.55), 0 0 26px 6px rgba(255,200,130,0.9), inset 0 14px 40px rgba(247,146,33,0.6)",
        }}
      />
      <Particles />
    </AbsoluteFill>
  );
};
