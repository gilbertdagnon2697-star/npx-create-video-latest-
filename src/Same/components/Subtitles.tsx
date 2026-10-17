import { FONT_FAMILY } from "../fonts";
import { useSameProps } from "../props";
import { buildCues } from "../subtitles";
import { C } from "../theme";
import { f, progress, useAbsFrame } from "../time";

// Sous-titres placés entre y = 1350 et y = 1480, hors des textes animés.
export const Subtitles: React.FC = () => {
  const frame = useAbsFrame();
  const { website } = useSameProps();
  const cue = buildCues(website).find(
    (c) => frame >= f(c.fromMs) && frame < f(c.toMs),
  );
  if (!cue) {
    return null;
  }
  const p = progress(frame, cue.fromMs, 160);
  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        right: 60,
        top: 1415,
        display: "flex",
        justifyContent: "center",
        transform: `translateY(-50%) scale(${0.94 + 0.06 * p})`,
        opacity: p,
      }}
    >
      <div
        style={{
          maxWidth: 960,
          padding: "14px 30px 16px",
          borderRadius: 24,
          background: "rgba(8,30,18,0.82)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
          fontFamily: FONT_FAMILY,
          fontSize: 44,
          fontWeight: 700,
          lineHeight: 1.2,
          letterSpacing: "-0.01em",
          color: C.white,
          textAlign: "center",
        }}
      >
        {cue.text}
      </div>
    </div>
  );
};
