import "./fonts";
import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Banner } from "./components/Brand";
import { Subtitles } from "./components/Subtitles";
import { resolveSrc, SamePropsProvider, type SameProps } from "./props";
import { Scene01 } from "./scenes/Scene01";
import { Scene02 } from "./scenes/Scene02";
import { Scene03 } from "./scenes/Scene03";
import { Scene04 } from "./scenes/Scene04";
import { Scene05 } from "./scenes/Scene05";
import { Scene06 } from "./scenes/Scene06";
import { Scene07 } from "./scenes/Scene07";
import { Scene08 } from "./scenes/Scene08";
import { Scene09 } from "./scenes/Scene09";
import { C, HEIGHT, WIDTH } from "./theme";
import {
  EASE_IN,
  EASE_IN_OUT,
  EASE_OUT,
  f,
  progress,
  Scene,
  TOTAL_FRAMES,
} from "./time";

// Les scènes se chevauchent pendant les transitions : chaque <Scene> est
// rendue de fromMs à toMs, la suivante (plus haute dans la pile) recouvre
// la précédente selon la transition décrite dans la fiche.
export const SameVideo: React.FC<SameProps> = (props) => {
  const { height } = useVideoConfig();
  // Format 4:5 (1080 x 1350) : on affiche le bloc source, de y = 285 à 1635.
  const offsetY = (height - HEIGHT) / 2;
  return (
    <SamePropsProvider value={props}>
      <AbsoluteFill style={{ backgroundColor: C.forest, overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: offsetY,
            width: WIDTH,
            height: HEIGHT,
          }}
        >
          <Scene
            name="1 · Analyse, Conception & Gestion"
            fromMs={0}
            toMs={2700}
          >
            <Scene01 />
          </Scene>
          <Scene name="2 · Sécurité Alimentaire" fromMs={2700} toMs={7700}>
            <Scene02 />
          </Scene>
          <Scene
            name="3 · Tout le cycle"
            fromMs={7500}
            toMs={10400}
            // Balayage latéral de gauche à droite (7,5 à 7,7 s).
            style={(fr) => ({
              clipPath: `inset(0 ${(1 - progress(fr, 7500, 200, EASE_IN_OUT)) * 100}% 0 0)`,
            })}
          >
            <Scene03 />
          </Scene>
          <Scene
            name="4 · D'abord, analyser"
            fromMs={10000}
            toMs={19030}
            // Panneau clair flouté qui grandit depuis le centre (10,0 à 10,4 s).
            style={(fr) => {
              const p = progress(fr, 10000, 400, EASE_IN_OUT);
              return {
                opacity: Math.min(1, p * 3),
                transform: `scale(${0.16 + 0.84 * p})`,
                borderRadius: (1 - p) * 180,
                filter: p < 1 ? `blur(${(1 - p) * 26}px)` : undefined,
              };
            }}
          >
            <Scene04 />
          </Scene>
          <Scene
            name="5 · Comprendre les marchés"
            fromMs={18800}
            toMs={24000}
            style={(fr) => {
              const blur = progress(fr, 23700, 300, EASE_IN) * 24;
              return {
                opacity: progress(fr, 18800, 230, EASE_IN_OUT),
                filter: blur > 0 ? `blur(${blur}px)` : undefined,
              };
            }}
          >
            <Scene05 />
          </Scene>
          <Scene
            name="6 · Ensuite, concevoir et gérer"
            fromMs={23700}
            toMs={33100}
            style={(fr) => ({ opacity: progress(fr, 23700, 300, EASE_IN_OUT) })}
          >
            <Scene06 />
          </Scene>
          <Scene
            name="7 · Produire autrement"
            fromMs={32970}
            toMs={37230}
            style={(fr) => ({ opacity: progress(fr, 32970, 130, EASE_IN_OUT) })}
          >
            <Scene07 />
          </Scene>
          <Scene name="8 · Une formation pratique" fromMs={37230} toMs={42030}>
            <Scene08 />
          </Scene>
          <Scene
            name="9 · Écran final"
            fromMs={41770}
            toMs={49830}
            style={(fr) => ({ opacity: progress(fr, 41770, 260, EASE_IN_OUT) })}
          >
            <Scene09 />
          </Scene>
          <OrangeCircleWipe />
          <MilkyVeil />
          <Banner />
          {props.showSubtitles ? <Subtitles /> : null}
        </div>
        {props.voiceoverSrc ? (
          <Audio src={resolveSrc(props.voiceoverSrc)} />
        ) : null}
        {props.musicSrc ? (
          <Audio
            src={resolveSrc(props.musicSrc)}
            loop
            volume={(fr) =>
              props.musicVolume *
              interpolate(
                fr,
                [0, 15, TOTAL_FRAMES - 45, TOTAL_FRAMES],
                [0, 1, 1, 0],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                },
              )
            }
          />
        ) : null}
      </AbsoluteFill>
    </SamePropsProvider>
  );
};

// Transition 1 -> 2 : cercle orange qui grandit depuis le centre et couvre
// l'écran, puis s'ouvre en anneau pour révéler la scène 2 (2,4 à 2,8 s).
const OrangeCircleWipe: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < f(2400) || frame >= f(2850)) {
    return null;
  }
  const cover = 1110;
  const r = progress(frame, 2400, 300, EASE_IN) * cover;
  const hole = progress(frame, 2700, 120, EASE_OUT) * cover;
  return (
    <AbsoluteFill
      style={{
        background: C.orange,
        clipPath: `circle(${r}px at 50% 50%)`,
        maskImage:
          hole > 0
            ? `radial-gradient(circle at 50% 50%, transparent ${hole}px, black ${hole + 1}px)`
            : undefined,
      }}
    />
  );
};

// Transition 7 -> 8 : fondu rapide vers un voile blanc laiteux.
const MilkyVeil: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < f(37170) || frame >= f(37500)) {
    return null;
  }
  const o =
    progress(frame, 37170, 60, EASE_IN_OUT) *
    (1 - progress(frame, 37230, 230, EASE_OUT));
  return <AbsoluteFill style={{ background: "#F7FBF6", opacity: o * 0.92 }} />;
};
