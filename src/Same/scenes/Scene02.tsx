import { LightBackground } from "../components/Backgrounds";
import { Capsule, WordLine } from "../components/Text";
import { C, fs } from "../theme";

// Scène 2 (2,7 à 7,65 s) : titre mot par mot, six capsules de sigles.
export const Scene02: React.FC = () => {
  const size = fs(0.042);
  return (
    <>
      <LightBackground />
      <Capsule
        x={151}
        y={488}
        size={34}
        text="IPC"
        startMs={3000}
        entry="float"
        seed={0}
      />
      <Capsule
        x={724}
        y={460}
        size={32}
        text="HEA"
        startMs={3000}
        entry="float"
        seed={1}
      />
      <Capsule
        x={842}
        y={730}
        size={26}
        text="CVA"
        startMs={3000}
        entry="float"
        blur={3}
        seed={2}
      />
      {/* « MEAL » touchait le bord : bord gauche décalé à x = 90 (marge 60 px). */}
      <Capsule
        x={90}
        y={758}
        size={34}
        text="MEAL"
        startMs={3500}
        entry="float"
        anchor="left"
        seed={3}
      />
      <Capsule
        x={227}
        y={1264}
        size={32}
        text="EMMA"
        startMs={3000}
        entry="float"
        seed={4}
      />
      <Capsule
        x={734}
        y={1320}
        size={26}
        text="LEGS"
        startMs={3000}
        entry="float"
        blur={3}
        seed={5}
      />
      <WordLine
        y={879}
        size={size}
        color={C.ink}
        words={[
          { text: "Sécurité", at: 3000 },
          {
            text: "Alimentaire",
            at: 3500,
            color: C.orangeDeep,
            underlineAt: 4000,
            suffix: ",",
            suffixColor: C.ink,
          },
        ]}
      />
      <WordLine
        y={960}
        size={size}
        color={C.ink}
        words={[
          { text: "Moyens", at: 4500 },
          { text: "d'Existence", at: 5000 },
        ]}
      />
      <WordLine
        y={1041}
        size={size}
        color={C.ink}
        words={[
          { text: "&", at: 5500 },
          { text: "Résilience.", at: 6000 },
        ]}
      />
    </>
  );
};
