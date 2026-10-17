import { spring } from "remotion";
import { LightBackground } from "../components/Backgrounds";
import { PhotoCard } from "../components/PhotoCard";
import { At, Capsule, WordLine } from "../components/Text";
import { useSameProps } from "../props";
import { C, fs } from "../theme";
import { f, float, FPS, progress, useAbsFrame } from "../time";

// Scène 8 (37,23 à 41,85 s) : trois cartes en éventail, deux capsules sombres.
export const Scene08: React.FC = () => {
  const frame = useAbsFrame();
  const { photoEventailMarche, photoEventailEquipe, photoEventailSalle } =
    useSameProps();
  const open = spring({
    frame: frame - f(37500),
    fps: FPS,
    config: { damping: 14, stiffness: 120, mass: 0.7 },
  });
  const o = progress(frame, 37500, 250);
  const cards = [
    {
      src: photoEventailMarche,
      d: "Femme au téléphone sur un marché",
      tint: ["#D49A4A", "#7E4A1E"] as const,
      x: 290,
      y: 985,
      r: -8,
    },
    {
      src: photoEventailSalle,
      d: "Salle informatique",
      tint: ["#5FA39A", "#1D4B46"] as const,
      x: 790,
      y: 985,
      r: 8,
    },
    {
      src: photoEventailEquipe,
      d: "Équipe de quatre personnes, graphiques et ordinateur",
      tint: ["#6E8FA8", "#2A4558"] as const,
      x: 540,
      y: 955,
      r: 0,
    },
  ];
  return (
    <>
      <LightBackground />
      {cards.map((c, i) => (
        <At
          key={c.d}
          x={540 + (c.x - 540) * open}
          y={c.y + float(frame, 6, 5 + i, i)}
          style={{
            opacity: o,
            transform: `translate(-50%, -50%) rotate(${c.r * open}deg) scale(${(i === 2 ? 1 : 0.9) * (0.85 + 0.15 * open)})`,
          }}
        >
          <PhotoCard
            src={c.src}
            description={c.d}
            tint={c.tint}
            width={360}
            height={480}
            border={8}
            radius={30}
          />
        </At>
      ))}
      <WordLine
        y={596}
        size={fs(0.034)}
        color={C.ink}
        words={[
          { text: "Une", at: 37500 },
          { text: "formation", at: 37700 },
          {
            text: "pratique",
            at: 38000,
            color: C.orangeDeep,
            underlineAt: 38300,
            suffix: ".",
          },
        ]}
      />
      {/* Positions de la fiche ajustées : les deux capsules se touchaient à cette taille. */}
      <Capsule
        x={526}
        y={1324}
        size={34}
        text="Projet fil rouge"
        variant="check"
        anchor="right"
        startMs={39500}
        entry="pop"
      />
      <Capsule
        x={554}
        y={1324}
        size={34}
        text="Kit d'outils"
        variant="check"
        anchor="left"
        startMs={41000}
        entry="pop"
      />
    </>
  );
};
