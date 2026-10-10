import { loadFont } from "@remotion/fonts";
import type React from "react";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { Fond } from "./Fond";
import {
  Scene,
  SceneAccroche,
  SceneAppel,
  SceneAvantages,
  SceneStats,
  SceneTitre,
} from "./Scenes";
import type { FormationPromoProps } from "./schema";

// Police embarquée dans public/fonts : le rendu ne dépend pas d'Internet.
const fontFamily = "Poppins";
for (const weight of ["400", "600", "800"]) {
  loadFont({
    family: fontFamily,
    url: staticFile(`fonts/Poppins-${weight}.woff2`),
    weight,
  });
}

// Découpage de la vidéo (en images, à 30 i/s).
const scenes = [
  { nom: "Accroche", duree: 120, Composant: SceneAccroche },
  { nom: "Titre", duree: 150, Composant: SceneTitre },
  { nom: "Avantages", duree: 240, Composant: SceneAvantages },
  { nom: "Chiffres clés", duree: 165, Composant: SceneStats },
  { nom: "Appel à l'action", duree: 225, Composant: SceneAppel },
] as const;

export const DUREE_FORMATION_PROMO = scenes.reduce((t, s) => t + s.duree, 0);

export const FormationPromo: React.FC<FormationPromoProps> = (props) => {
  let debut = 0;

  return (
    <AbsoluteFill style={{ fontFamily }}>
      <Fond
        couleurPrincipale={props.couleurPrincipale}
        couleurSecondaire={props.couleurSecondaire}
        couleurAccent={props.couleurAccent}
      />
      {scenes.map(({ nom, duree, Composant }, i) => {
        const from = debut;
        debut += duree;
        return (
          <Sequence key={nom} name={nom} from={from} durationInFrames={duree}>
            <Scene duree={duree} fondu={i < scenes.length - 1}>
              <Composant {...props} />
            </Scene>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
