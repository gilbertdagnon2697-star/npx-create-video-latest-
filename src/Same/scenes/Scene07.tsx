import { DarkBackground } from "../components/Backgrounds";
import { PhotoCard } from "../components/PhotoCard";
import { At, Capsule, WordLine } from "../components/Text";
import { useSameProps } from "../props";
import { C, fs } from "../theme";
import { float, progress, useAbsFrame } from "../time";

// Scène 7 (33,1 à 37,23 s) : carte photo des agriculteurs, deux capsules.
export const Scene07: React.FC = () => {
  const frame = useAbsFrame();
  const { photoAgriculteurs } = useSameProps();
  const p = progress(frame, 33100, 400);
  return (
    <>
      <DarkBackground />
      <At
        x={540}
        y={995}
        style={{
          opacity: p,
          filter: p < 1 ? `blur(${(1 - p) * 22}px)` : undefined,
          transform: `translate(-50%, -50%) translateY(${(1 - p) * 140}px) perspective(1800px) rotateY(${7 + float(frame, 1.5, 6)}deg) rotateX(4deg)`,
        }}
      >
        <PhotoCard
          src={photoAgriculteurs}
          description="Deux agriculteurs dans un champ de légumes"
          tint={["#86B84E", "#2B5520"]}
          width={626}
          height={690}
        />
      </At>
      <WordLine
        y={582}
        size={fs(0.034)}
        color={C.white}
        words={[
          { text: "Produire", at: 33500 },
          {
            text: "autrement",
            at: 34000,
            color: C.orange,
            underlineAt: 34300,
            suffix: ".",
          },
        ]}
      />
      <Capsule
        x={270}
        y={784}
        size={34}
        text="LEGS"
        icon="shield"
        variant="dot"
        startMs={35500}
        entry="pop"
      />
      <Capsule
        x={842}
        y={1000}
        size={34}
        text="SEADS"
        icon="sprout"
        variant="dot"
        startMs={36000}
        entry="pop"
      />
    </>
  );
};
