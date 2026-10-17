import { DarkBackground } from "../components/Backgrounds";
import { At, Sticker } from "../components/Text";
import { C, fs } from "../theme";
import { fade, useAbsFrame } from "../time";

// Scène 1 (0 à 2,7 s) : trois étiquettes empilées, puis une ligne fine.
export const Scene01: React.FC = () => {
  const frame = useAbsFrame();
  const size = fs(0.052);
  return (
    <>
      <DarkBackground />
      <Sticker
        y={764}
        size={size}
        bg={C.labelDark}
        color={C.white}
        rotate={-2}
        startMs={500}
      >
        Analyse,
      </Sticker>
      <Sticker
        y={920}
        size={size}
        bg={C.orange}
        color={C.ink}
        rotate={1}
        startMs={1000}
      >
        Conception
      </Sticker>
      <Sticker
        y={1068}
        size={size}
        bg={C.white}
        color={C.ink}
        rotate={-1}
        startMs={1500}
      >
        & Gestion
      </Sticker>
      <At
        x={540}
        y={1210}
        style={{
          fontSize: 40,
          fontWeight: 500,
          color: C.sage,
          opacity: fade(frame, 2000),
          letterSpacing: "0.01em",
        }}
      >
        des programmes de
      </At>
    </>
  );
};
