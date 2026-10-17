import { DarkBackground } from "../components/Backgrounds";
import { Sticker } from "../components/Text";
import { C, fs } from "../theme";

// Scène 3 (7,65 à 10,25 s) : deux étiquettes empilées.
export const Scene03: React.FC = () => {
  const size = fs(0.04);
  return (
    <>
      <DarkBackground />
      <Sticker
        y={825}
        size={size}
        bg={C.labelDark}
        color={C.white}
        rotate={-2}
        startMs={8000}
      >
        Tout le cycle,
      </Sticker>
      <Sticker
        y={946}
        size={size}
        bg={C.orange}
        color={C.ink}
        rotate={1}
        startMs={9000}
      >
        en 11 modules.
      </Sticker>
    </>
  );
};
