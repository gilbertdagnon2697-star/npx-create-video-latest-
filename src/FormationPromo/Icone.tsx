import type React from "react";
import type { iconesDisponibles } from "./schema";

type Props = {
  readonly nom: (typeof iconesDisponibles)[number];
  readonly taille: number;
  readonly couleur: string;
};

const chemins: Record<Props["nom"], React.ReactNode> = {
  ordinateur: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </>
  ),
  diplome: (
    <>
      <path d="M2 9l10-5 10 5-10 5z" />
      <path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
      <path d="M22 9v6" />
    </>
  ),
  expert: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
      <path d="M17 4l1.2 1.2L21 2.5" />
    </>
  ),
  accompagnement: (
    <>
      <path d="M21 12a8 8 0 0 1-11.6 7.1L4 21l1.9-5.4A8 8 0 1 1 21 12z" />
      <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" />
    </>
  ),
  horloge: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  fusee: (
    <>
      <path d="M5 15c-1.5 1.3-2 5-2 5s3.7-.5 5-2" />
      <path d="M9 18l-3-3c1-4 4.5-10 13-12-2 8.5-8 12-10 15z" />
      <circle cx="15" cy="9" r="1.5" />
    </>
  ),
};

export const Icone: React.FC<Props> = ({ nom, taille, couleur }) => {
  return (
    <svg
      width={taille}
      height={taille}
      viewBox="0 0 24 24"
      fill="none"
      stroke={couleur}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {chemins[nom]}
    </svg>
  );
};
