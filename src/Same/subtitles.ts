// Sous-titres incrustés : blocs courts (3 à 6 mots) découpés dans la
// transcription de la voix off. Les mots incertains de la transcription
// ([Kobo ?], [EMA, ?], [fil ?]…) sont résolus d'après les textes à l'écran.
type Segment = {
  readonly fromMs: number;
  readonly toMs: number;
  readonly blocks: readonly string[];
};

const segments = (website: string): Segment[] => [
  {
    fromMs: 0,
    toMs: 4280,
    blocks: [
      "Analyse, conception et gestion",
      "des programmes de sécurité alimentaire,",
    ],
  },
  { fromMs: 4660, toMs: 6460, blocks: ["moyens d'existence et résilience."] },
  { fromMs: 7240, toMs: 9400, blocks: ["Tout le cycle, en 11 modules."] },
  {
    fromMs: 10460,
    toMs: 14180,
    blocks: ["D'abord, analyser : les fondements,", "les moyens d'existence,"],
  },
  {
    fromMs: 14480,
    toMs: 18140,
    blocks: ["l'IPC, le Cadre harmonisé,", "la collecte avec KoboToolbox."],
  },
  {
    fromMs: 18960,
    toMs: 23040,
    blocks: [
      "Comprendre les marchés",
      "avec EMMA, PCMA",
      "et le panier minimum.",
    ],
  },
  {
    fromMs: 24000,
    toMs: 28460,
    blocks: [
      "Ensuite, concevoir et gérer :",
      "le cash, l'agriculture résiliente,",
    ],
  },
  {
    fromMs: 28460,
    toMs: 32420,
    blocks: ["l'humanitaire, le suivi-évaluation", "et la gestion de projets."],
  },
  {
    fromMs: 33260,
    toMs: 38420,
    blocks: ["Produire autrement, avec les standards", "LEGS et SEADS."],
  },
  {
    fromMs: 38680,
    toMs: 42520,
    blocks: ["Une formation pratique,", "projet fil rouge et kit d'outils."],
  },
  { fromMs: 43200, toMs: 44560, blocks: ["Début le 31 octobre."] },
  { fromMs: 45100, toMs: 47160, blocks: [`Inscrivez-vous sur ${website}.`] },
];

export type Cue = {
  readonly fromMs: number;
  readonly toMs: number;
  readonly text: string;
};

// Chaque bloc reçoit une part du segment proportionnelle à sa longueur.
export const buildCues = (website: string): Cue[] =>
  segments(website).flatMap((seg) => {
    const total = seg.blocks.reduce((sum, b) => sum + b.length, 0);
    let cursor = seg.fromMs;
    return seg.blocks.map((text) => {
      const fromMs = cursor;
      cursor += ((seg.toMs - seg.fromMs) * text.length) / total;
      return { fromMs, toMs: cursor, text };
    });
  });
