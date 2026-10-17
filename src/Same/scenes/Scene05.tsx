import { DarkBackground } from "../components/Backgrounds";
import { PhotoCard } from "../components/PhotoCard";
import { At, Capsule, WordLine } from "../components/Text";
import { useSameProps } from "../props";
import { C, fs } from "../theme";
import { float, progress, useAbsFrame } from "../time";

// Scène 5 (18,85 à 23,85 s) : carte photo du marché, trois capsules.
export const Scene05: React.FC = () => {
  const frame = useAbsFrame();
  const { photoMarche } = useSameProps();
  const p = progress(frame, 18900, 400);
  return (
    <>
      <DarkBackground />
      <At
        x={540}
        y={985}
        style={{
          opacity: p,
          transform: `translate(-50%, -50%) perspective(1800px) rotateY(${-8 + float(frame, 1.5, 6)}deg) rotateX(4deg) scale(${0.88 + 0.12 * p})`,
        }}
      >
        <PhotoCard
          src={photoMarche}
          description="Vendeuse de céréales au marché"
          tint={["#C9862F", "#6E3F17"]}
          width={626}
          height={690}
        />
      </At>
      <WordLine
        y={568}
        size={fs(0.034)}
        color={C.white}
        words={[
          { text: "Comprendre", at: 19500 },
          { text: "les", at: 19750 },
          {
            text: "marchés",
            at: 20000,
            color: C.orange,
            underlineAt: 20300,
            suffix: ".",
          },
        ]}
      />
      <Capsule
        x={270}
        y={798}
        size={34}
        text="EMMA"
        icon="chart"
        variant="dot"
        startMs={21000}
        entry="pop"
      />
      <Capsule
        x={853}
        y={987}
        size={34}
        text="PCMA"
        icon="coins"
        variant="dot"
        startMs={21500}
        entry="pop"
      />
      <Capsule
        x={367}
        y={1244}
        size={34}
        text="Panier minimum"
        icon="basket"
        variant="dot"
        startMs={22500}
        entry="pop"
      />
    </>
  );
};
