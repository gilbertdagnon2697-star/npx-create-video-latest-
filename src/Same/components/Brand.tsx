import { Img } from "remotion";
import { FONT_FAMILY } from "../fonts";
import { resolveSrc, useSameProps } from "../props";
import { C } from "../theme";
import { f, progress, useAbsFrame } from "../time";
import { At } from "./Text";

// Logo carré orange à lettre S (visuel de remplacement si logoSrc est vide).
export const Logo: React.FC<{ readonly size: number }> = ({ size }) => {
  const { logoSrc } = useSameProps();
  if (logoSrc) {
    return (
      <Img
        src={resolveSrc(logoSrc)}
        style={{
          width: size,
          height: size,
          objectFit: "contain",
          display: "block",
        }}
      />
    );
  }
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.24,
        background: `linear-gradient(150deg, #FFA53C, ${C.orange} 45%, #E9761C)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: `0 ${size * 0.08}px ${size * 0.25}px rgba(247,146,33,0.35)`,
      }}
    >
      <span
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: size * 0.72,
          fontWeight: 800,
          fontStyle: "italic",
          color: "#FFFFFF",
          lineHeight: 1,
          transform: `translate(${size * -0.02}px, ${size * -0.03}px)`,
        }}
      >
        S
      </span>
    </div>
  );
};

const BANNER_IN_MS = 500;
const BANNER_OUT_MS = 41800;

// Bandeau persistant « Siemana Institut · SAME 2026 » (0,5 s à 41,8 s).
export const Banner: React.FC = () => {
  const frame = useAbsFrame();
  const { institutName, programmeTag } = useSameProps();
  if (frame >= f(BANNER_OUT_MS)) {
    return null;
  }
  const inP = progress(frame, BANNER_IN_MS, 450);
  const outP = progress(frame, BANNER_OUT_MS - 250, 250);
  return (
    <At
      x={540}
      y={362}
      style={{
        opacity: inP * (1 - outP),
        transform: `translate(-50%, -50%) translateY(${(1 - inP) * -30 - outP * 20}px)`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "12px 30px 12px 12px",
          borderRadius: 999,
          background: "rgba(10,36,22,0.92)",
          boxShadow:
            "0 14px 34px rgba(0,0,0,0.25), inset 0 0 0 1.5px rgba(255,255,255,0.1)",
          fontSize: 30,
          fontWeight: 650,
          color: C.white,
          letterSpacing: "-0.01em",
        }}
      >
        <Logo size={48} />
        <span>{institutName}</span>
        <span style={{ opacity: 0.5 }}>·</span>
        <span style={{ color: C.orange, fontWeight: 800 }}>{programmeTag}</span>
      </div>
    </At>
  );
};
