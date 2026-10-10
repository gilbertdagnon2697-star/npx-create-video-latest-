import { zColor } from "@remotion/zod-types";
import { z } from "zod";

export const iconesDisponibles = [
  "ordinateur",
  "diplome",
  "expert",
  "accompagnement",
  "horloge",
  "fusee",
] as const;

export const formationPromoSchema = z.object({
  badge: z.string(),
  accroche: z.string(),
  nomFormation: z.string(),
  sousTitre: z.string(),
  titreAvantages: z.string(),
  avantages: z.array(
    z.object({
      icone: z.enum(iconesDisponibles),
      titre: z.string(),
      texte: z.string(),
    }),
  ),
  stats: z.array(
    z.object({
      valeur: z.number(),
      prefixe: z.string(),
      suffixe: z.string(),
      label: z.string(),
    }),
  ),
  appelAction: z.string(),
  bouton: z.string(),
  urgence: z.string(),
  siteWeb: z.string(),
  couleurPrincipale: zColor(),
  couleurSecondaire: zColor(),
  couleurAccent: zColor(),
});

export type FormationPromoProps = z.infer<typeof formationPromoSchema>;

export const formationPromoDefaults: FormationPromoProps = {
  badge: "Inscriptions ouvertes",
  accroche: "Prêt à donner un nouvel élan à votre carrière ?",
  nomFormation: "Formation Marketing Digital",
  sousTitre: "Maîtrisez les compétences les plus recherchées en 12 semaines",
  titreAvantages: "Pourquoi choisir notre formation ?",
  avantages: [
    {
      icone: "ordinateur",
      titre: "100 % en ligne",
      texte: "Apprenez à votre rythme, où que vous soyez",
    },
    {
      icone: "expert",
      titre: "Formateurs experts",
      texte: "Des professionnels en activité",
    },
    {
      icone: "diplome",
      titre: "Certificat reconnu",
      texte: "Valorisez vos compétences",
    },
    {
      icone: "accompagnement",
      titre: "Suivi personnalisé",
      texte: "Un coach dédié tout au long du parcours",
    },
  ],
  stats: [
    { valeur: 5000, prefixe: "+", suffixe: "", label: "apprenants formés" },
    { valeur: 98, prefixe: "", suffixe: " %", label: "de satisfaction" },
    { valeur: 87, prefixe: "", suffixe: " %", label: "trouvent un emploi" },
  ],
  appelAction: "Inscrivez-vous dès maintenant !",
  bouton: "Je m'inscris",
  urgence: "Places limitées — prochaine session bientôt",
  siteWeb: "www.votre-formation.fr",
  couleurPrincipale: "#6366F1",
  couleurSecondaire: "#06B6D4",
  couleurAccent: "#F59E0B",
};
