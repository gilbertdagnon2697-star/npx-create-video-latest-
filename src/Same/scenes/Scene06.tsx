import { C } from "../theme";
import { SearchScene } from "./SearchScene";

// Scène 6 (23,85 à 33,1 s) : « Ensuite, concevoir et gérer : », modules 6 à 11.
export const Scene06: React.FC = () => (
  <SearchScene
    line1={[{ text: "Ensuite,", at: 24000 }]}
    line2={[
      { text: "concevoir", at: 25000, color: C.orangeDeep, underlineAt: 25300 },
      {
        text: "et gérer",
        at: 25500,
        color: C.orangeDeep,
        underlineAt: 25800,
        suffix: " :",
        suffixColor: C.ink,
      },
    ]}
    barMs={24500}
    items={[
      { text: "Cash & Voucher (CVA)", fromMs: 26300, toMs: 26900 },
      { text: "Agriculture résiliente", fromMs: 27300, toMs: 28600 },
      { text: "Humanitaire", fromMs: 28900, toMs: 29900 },
      { text: "Suivi-évaluation", fromMs: 30000, toMs: 31200 },
      { text: "Gestion de projet", fromMs: 31400, toMs: 33100 },
    ]}
    modulesLabel="Modules 6 à 11"
    modulesMs={24500}
    tiles={[
      { icon: "wallet", x: 190, y: 570, rotate: -6 },
      { icon: "sprout", x: 885, y: 610, rotate: 5 },
      { icon: "shield", x: 200, y: 1270, rotate: 4 },
      { icon: "target", x: 880, y: 1245, rotate: -5 },
    ]}
    tilesMs={24500}
    tileColor="#E27A20"
  />
);
