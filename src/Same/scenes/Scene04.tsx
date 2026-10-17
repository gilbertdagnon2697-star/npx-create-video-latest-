import { C } from "../theme";
import { SearchScene } from "./SearchScene";

// Scène 4 (10,25 à 18,85 s) : « D'abord, analyser : », modules 1 à 5.
export const Scene04: React.FC = () => (
  <SearchScene
    line1={[{ text: "D'abord,", at: 10500 }]}
    line2={[
      {
        text: "analyser",
        at: 11000,
        color: C.orangeDeep,
        underlineAt: 11500,
        suffix: " :",
        suffixColor: C.ink,
      },
    ]}
    barMs={10500}
    items={[
      { text: "Les fondements", fromMs: 12000, toMs: 12900 },
      { text: "Moyens d'existence", fromMs: 13000, toMs: 14200 },
      { text: "IPC", fromMs: 14400, toMs: 15200 },
      { text: "Cadre Harmonisé", fromMs: 15300, toMs: 16400 },
      { text: "Collecte KoboToolbox", fromMs: 16800, toMs: 18850 },
    ]}
    modulesLabel="Modules 1 à 5"
    modulesMs={11000}
    tiles={[
      { icon: "book", x: 190, y: 570, rotate: -6 },
      { icon: "chart", x: 885, y: 610, rotate: 5 },
      { icon: "search", x: 200, y: 1270, rotate: 4 },
      { icon: "layers", x: 880, y: 1245, rotate: -5 },
    ]}
    tilesMs={11000}
    tileColor={C.iconOrange}
  />
);
