import { Img } from "remotion";
import { FONT_FAMILY } from "../fonts";
import { resolveSrc } from "../props";
import { Icon } from "./Icon";

// Carte photo à coins arrondis et liseré blanc. Sans photo fournie, affiche
// un visuel de remplacement clairement signalé ([ÉLÉMENT TIERS]).
export const PhotoCard: React.FC<{
  readonly src: string;
  readonly description: string;
  readonly tint: readonly [string, string];
  readonly width: number;
  readonly height: number;
  readonly border?: number;
  readonly radius?: number;
}> = ({ src, description, tint, width, height, border = 10, radius = 36 }) => (
  <div
    style={{
      width,
      height,
      padding: border,
      borderRadius: radius,
      background: "#FFFFFF",
      boxShadow: "0 40px 80px rgba(0,0,0,0.35), 0 8px 20px rgba(0,0,0,0.18)",
    }}
  >
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        borderRadius: radius - border * 0.6,
        overflow: "hidden",
        background: `linear-gradient(165deg, ${tint[0]}, ${tint[1]})`,
      }}
    >
      {src ? (
        <Img
          src={resolveSrc(src)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <Placeholder description={description} tint={tint} height={height} />
      )}
    </div>
  </div>
);

const Placeholder: React.FC<{
  readonly description: string;
  readonly tint: readonly [string, string];
  readonly height: number;
}> = ({ description, tint, height }) => {
  const u = height / 700;
  return (
    <>
      <div
        style={{
          position: "absolute",
          right: "14%",
          top: "12%",
          width: 150 * u,
          height: 150 * u,
          borderRadius: "50%",
          background: "rgba(255,236,190,0.55)",
          filter: "blur(2px)",
        }}
      />
      <svg
        viewBox="0 0 100 60"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "100%",
          height: "55%",
        }}
      >
        <path
          d="M0 30C20 18 35 22 55 30s35 4 45-6V60H0Z"
          fill="rgba(255,255,255,0.14)"
        />
        <path
          d="M0 42c18-8 40-10 60-2s30 2 40-4V60H0Z"
          fill={tint[1]}
          opacity={0.6}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 14 * u,
          padding: 30 * u,
          fontFamily: FONT_FAMILY,
          color: "rgba(255,255,255,0.95)",
          textAlign: "center",
        }}
      >
        <Icon
          name="camera"
          size={74 * u}
          color="rgba(255,255,255,0.9)"
          strokeWidth={1.6}
        />
        <div
          style={{ fontSize: 26 * u, fontWeight: 800, letterSpacing: "0.12em" }}
        >
          PHOTO À FOURNIR
        </div>
        <div
          style={{
            fontSize: 24 * u,
            fontWeight: 500,
            lineHeight: 1.3,
            maxWidth: "85%",
            whiteSpace: "normal",
            opacity: 0.85,
          }}
        >
          {description}
        </div>
      </div>
    </>
  );
};
