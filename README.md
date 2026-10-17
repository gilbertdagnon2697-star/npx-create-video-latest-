# Formation SAME 2026 — vidéo Facebook (Remotion)

Recréation en motion design de `WhatsApp_Video_2026-10-17_at_22.07.59.mp4`
d'après la fiche **FB-03** (spécification scène par scène, mode fidèle).

| Composition          | Format          | Usage                                       |
| -------------------- | --------------- | ------------------------------------------- |
| `Same-Facebook-9x16` | 1080 x 1920     | Reels / Stories (format principal)          |
| `Same-Facebook-4x5`  | 1080 x 1350     | Fil d'actualité, composition source entière |

30 images/s, 49,83 s (1495 images), 9 scènes, sous-titres incrustés.

## Commandes

```console
npm i --loglevel=error   # installer les dépendances
npm run dev              # prévisualiser dans Remotion Studio
npm run render:9x16      # exporter out/FB-SAME-2026-9x16.mp4
npm run render:4x5       # exporter out/FB-SAME-2026-4x5.mp4
npm run lint             # ESLint + TypeScript
```

## Organisation du code

```
src/Same/
  SameVideo.tsx      enchaînement des 9 scènes, transitions, bandeau, audio
  props.tsx          éléments tiers modifiables (schéma zod + valeurs par défaut)
  theme.ts           palette extraite, repère 1080 x 1920, tailles de police
  time.tsx           conversion ms -> images, courbes (rebond, défloutage…)
  subtitles.ts       blocs de sous-titres (3 à 6 mots) calés sur la voix off
  fonts.ts           police Inter embarquée (aucun accès réseau au rendu)
  components/        fonds, étiquettes, capsules, barre de recherche, cartes photo…
  scenes/            Scene01.tsx … Scene09.tsx
```

Les minutages de la fiche sont repris tels quels, en millisecondes absolues
(`apparition_ms`, `debut_ms` des transitions).

## Éléments tiers à remplacer avant publication

Tous les éléments marqués `[ÉLÉMENT TIERS]` dans la fiche sont des **props** :
on les modifie dans le panneau de droite de Remotion Studio, ou au rendu :

```console
npx remotion render Same-Facebook-9x16 out/video.mp4 --props=mes-props.json
```

| Prop                                       | Contenu                                    |
| ------------------------------------------ | ------------------------------------------ |
| `institutName`, `programmeTag`             | bandeau « Siemana Institut · SAME 2026 »   |
| `logoSrc`                                  | logo PNG transparent                       |
| `titlePrefix` / `titleHighlight` / `titleSuffix` | « Formation SAME 2026 »              |
| `startLabel`, `startDate`, `startYear`, `startHours` | carte de date                    |
| `modeDays`, `modeLine1`, `modeLine2`       | carte « SAM. & DIM. »                      |
| `price`, `currency`, `priceNote`           | prix et acompte                            |
| `ctaLabel`, `website`, `phone`, `closingLine` | appel à l'action et coordonnées         |
| `photoMarche`, `photoAgriculteurs`         | photos des scènes 5 et 7                   |
| `photoEventailMarche`, `photoEventailEquipe`, `photoEventailSalle` | 3 photos de la scène 8 |
| `voiceoverSrc`, `musicSrc`, `musicVolume`  | voix off et musique                        |
| `showSubtitles`                            | afficher ou masquer les sous-titres        |

Les champs `*Src` prennent un chemin relatif au dossier `public/`
(par exemple `photos/marche.jpg`, `audio/voix-off.mp3`) ou une URL https.
Tant qu'une photo ou le logo n'est pas fourni, un visuel de remplacement
signalé « PHOTO À FOURNIR » est affiché. Sans fichier audio, la vidéo est muette.

À fournir : logo PNG transparent, 5 photos libres de droits, musique libre de
droits, enregistrement de la voix off, coordonnées, prix et dates validés.

## Adaptations au format 9:16

- La composition source (proche 4:5) occupe le bloc 1080 x 1350 entre
  y = 285 et y = 1635 ; fonds, particules, rayons et arc lumineux sont
  prolongés sur toute la hauteur.
- Capsule « MEAL » (scène 2) décalée à x = 90 pour respecter la marge de 60 px.
- Petits textes portés à 34 px minimum.
- Sous-titres incrustés entre y = 1350 et y = 1480.
- Capsules « Projet fil rouge » / « Kit d'outils » (scène 8) et cartes de
  l'écran final légèrement resserrées pour ne pas se chevaucher.

## Licence Remotion

Pour certaines entités, une licence entreprise Remotion est nécessaire :
[conditions](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
