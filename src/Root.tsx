import { Composition, Folder } from "remotion";
import { HelloWorld } from "./HelloWorld";
import { Logo } from "./HelloWorld/Logo";
import { Title } from "./HelloWorld/Title";
import { defaultSameProps, sameSchema } from "./Same/props";
import { SameVideo } from "./Same/SameVideo";
import { FPS, TOTAL_FRAMES } from "./Same/time";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Facebook-SAME-2026">
        {/* Format principal : 9:16, 1080 x 1920, 30 i/s, 49,83 s. */}
        <Composition
          id="Same-Facebook-9x16"
          component={SameVideo}
          durationInFrames={TOTAL_FRAMES}
          fps={FPS}
          width={1080}
          height={1920}
          schema={sameSchema}
          defaultProps={defaultSameProps}
        />
        {/* Variante fil d'actualité 4:5, 1080 x 1350 : composition source sans recadrage. */}
        <Composition
          id="Same-Facebook-4x5"
          component={SameVideo}
          durationInFrames={TOTAL_FRAMES}
          fps={FPS}
          width={1080}
          height={1350}
          schema={sameSchema}
          defaultProps={defaultSameProps}
        />
      </Folder>
      <Folder name="Elements">
        <Composition
          id="Logo"
          component={Logo}
          durationInFrames={150}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            logoColor1: "#91EAE4",
            logoColor2: "#86A8E7",
          }}
        />
        <Composition
          id="Title"
          component={Title}
          durationInFrames={115}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            titleText: "Welcome to Remotion",
            titleColor: "#000000",
          }}
        />
      </Folder>
      <Composition
        // You can take the "id" to render a video:
        // bunx remotion render HelloWorld
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
        }}
      />
    </>
  );
};
