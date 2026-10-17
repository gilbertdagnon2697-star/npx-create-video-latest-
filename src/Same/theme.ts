// Palette extraite de la vidéo source (fiche FB-03).
export const C = {
  forest: "#0A2E1B", // fond sombre (scènes 1, 3, 5, 7, 9)
  sage: "#E8F3E7", // fond clair (scènes 2, 4, 6, 8)
  orange: "#F79221", // étiquettes, bouton, logo, « SAME 2026 »
  orangeDeep: "#D5681B", // mots-clés soulignés sur fond clair
  ink: "#132B1B", // titres sur fond clair
  white: "#FBFFFC", // textes sur fond sombre, étiquettes, capsules
  green: "#24C35F", // carte « SAM. & DIM. »
  labelDark: "#111D16", // étiquette vert très sombre
  capsuleText: "#2A3533",
  muted: "#4A5A50",
  mist: "#C9D6CC",
  iconOrange: "#EF8D20",
} as const;

// Composition 9:16. La composition source (proche 4:5) occupe le bloc
// 1080 x 1350 situé entre y = 285 et y = 1635 ; les positions de la fiche
// sont déjà exprimées dans ce repère 1080 x 1920.
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const BLOCK_TOP = 285;
export const BLOCK_HEIGHT = 1350;

// taille_rel de la fiche (part de la hauteur source) -> taille de police en px.
export const fs = (tailleRel: number, min = 0) =>
  Math.max(min, Math.round(tailleRel * BLOCK_HEIGHT * 1.2));

// Taille minimale des petits textes pour la lecture sur téléphone.
export const SMALL_TEXT_MIN = 34;
