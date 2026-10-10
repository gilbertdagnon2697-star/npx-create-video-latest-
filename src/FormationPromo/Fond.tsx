import type React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type Props = {
  readonly couleurPrincipale: string;
  readonly couleurSecondaire: string;
  readonly couleurAccent: string;
};

// Fond animé commun à toutes les scènes : dégradé sombre + halos lumineux qui dérivent.
export const Fond: React.FC<Props> = ({
  couleurPrincipale,
  couleurSecondaire,
  couleurAccent,
}) => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const angle = interpolate(frame, [0, durationInFrames], [135, 225]);
  const taille = Math.max(width, height) * 0.55;

  const halos = [
    { couleur: couleurPrincipale, x: 0.2, y: 0.25, phase: 0 },
    { couleur: couleurSecondaire, x: 0.8, y: 0.7, phase: 2 },
    { couleur: couleurAccent, x: 0.65, y: 0.15, phase: 4 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${angle}deg, #070B1F 0%, #0F1535 55%, #070B1F 100%)`,
        overflow: "hidden",
      }}
    >
      {halos.map((h) => {
        const dx = Math.sin(frame / 70 + h.phase) * width * 0.08;
        const dy = Math.cos(frame / 90 + h.phase) * height * 0.08;
        return (
          <div
            key={h.phase}
            style={{
              position: "absolute",
              width: taille,
              height: taille,
              left: width * h.x - taille / 2 + dx,
              top: height * h.y - taille / 2 + dy,
              borderRadius: "50%",
              background: h.couleur,
              opacity: 0.28,
              filter: `blur(${taille * 0.25}px)`,
            }}
          />
        );
      })}
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          backgroundPosition: `0px ${frame * 0.5}px`,
        }}
      />
    </AbsoluteFill>
  );
};
