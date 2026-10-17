import { createContext, useContext } from "react";
import { staticFile } from "remotion";
import { z } from "zod";

// Tous les [ÉLÉMENTS TIERS] de la fiche sont des props : on les remplace
// depuis le panneau de droite de Remotion Studio, ou en ligne de commande
// avec --props, sans toucher au code. Les valeurs par défaut sont celles
// lues dans la vidéo source et doivent être validées avant publication.
//
// Les champs *Src acceptent un chemin relatif au dossier public/
// (ex. « photos/marche.jpg ») ou une URL https. Vide = visuel de remplacement.
export const sameSchema = z.object({
  showSubtitles: z.boolean(),
  institutName: z.string(),
  programmeTag: z.string(),
  logoSrc: z.string(),
  titlePrefix: z.string(),
  titleHighlight: z.string(),
  titleSuffix: z.string(),
  startLabel: z.string(),
  startDate: z.string(),
  startYear: z.string(),
  startHours: z.string(),
  modeDays: z.string(),
  modeLine1: z.string(),
  modeLine2: z.string(),
  price: z.string(),
  currency: z.string(),
  priceNote: z.string(),
  ctaLabel: z.string(),
  website: z.string(),
  phone: z.string(),
  closingLine: z.string(),
  photoMarche: z.string(),
  photoAgriculteurs: z.string(),
  photoEventailMarche: z.string(),
  photoEventailEquipe: z.string(),
  photoEventailSalle: z.string(),
  voiceoverSrc: z.string(),
  musicSrc: z.string(),
  musicVolume: z.number().min(0).max(1),
});

export type SameProps = z.infer<typeof sameSchema>;

export const defaultSameProps: SameProps = {
  showSubtitles: true,
  institutName: "Siemana Institut",
  programmeTag: "SAME 2026",
  logoSrc: "",
  titlePrefix: "Formation",
  titleHighlight: "SAME",
  titleSuffix: "2026",
  startLabel: "DÉBUT",
  startDate: "31 OCT.",
  startYear: "2026",
  startHours: "9h – 14h",
  modeDays: "SAM. & DIM.",
  modeLine1: "Présentiel",
  modeLine2: "+ Visio",
  price: "75 000",
  currency: "FCFA",
  priceNote: "dont 15 000 FCFA\nà l'inscription",
  ctaLabel: "Je m'inscris maintenant",
  website: "siemana.org",
  phone: "+226 76 08 94 01",
  closingLine: "On vous attend le 31 octobre.",
  photoMarche: "",
  photoAgriculteurs: "",
  photoEventailMarche: "",
  photoEventailEquipe: "",
  photoEventailSalle: "",
  voiceoverSrc: "",
  musicSrc: "",
  musicVolume: 0.25,
};

export const resolveSrc = (src: string) =>
  /^(https?:|data:|blob:)/.test(src) ? src : staticFile(src);

const SamePropsContext = createContext<SameProps>(defaultSameProps);

export const SamePropsProvider = SamePropsContext.Provider;

export const useSameProps = () => useContext(SamePropsContext);
