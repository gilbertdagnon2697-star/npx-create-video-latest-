import type React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Icone } from "./Icone";
import type { FormationPromoProps } from "./schema";

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

// Unité relative : 1 = 1px sur le petit côté d'une vidéo 1080p.
const useUnite = () => {
  const { width, height } = useVideoConfig();
  return {
    u: Math.min(width, height) / 1080,
    vertical: height > width,
  };
};

const texteDegrade = (c1: string, c2: string): React.CSSProperties => ({
  backgroundImage: `linear-gradient(90deg, ${c1}, ${c2})`,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
});

export const Scene: React.FC<{
  readonly duree: number;
  readonly fondu?: boolean;
  readonly children: React.ReactNode;
}> = ({ duree, fondu = true, children }) => {
  const frame = useCurrentFrame();
  const { u } = useUnite();
  const entree = interpolate(frame, [0, 12], [0, 1], clamp);
  const sortie = fondu
    ? interpolate(frame, [duree - 12, duree], [1, 0], clamp)
    : 1;
  const zoom = fondu
    ? interpolate(frame, [duree - 12, duree], [1, 1.06], clamp)
    : 1;

  return (
    <AbsoluteFill
      style={{
        opacity: entree * sortie,
        transform: `scale(${zoom})`,
        justifyContent: "center",
        alignItems: "center",
        padding: 90 * u,
        color: "white",
        textAlign: "center",
        textWrap: "balance",
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

const Pastille: React.FC<{
  readonly texte: string;
  readonly couleur: string;
  readonly delai?: number;
}> = ({ texte, couleur, delai = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { u } = useUnite();
  const s = spring({ frame: frame - delai, fps, config: { damping: 14 } });

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 14 * u,
        padding: `${14 * u}px ${32 * u}px`,
        borderRadius: 999,
        border: `${2 * u}px solid ${couleur}`,
        background: `${couleur}22`,
        color: couleur,
        fontSize: 30 * u,
        fontWeight: 600,
        letterSpacing: 3 * u,
        textTransform: "uppercase",
        transform: `scale(${s})`,
      }}
    >
      <span
        style={{
          width: 14 * u,
          height: 14 * u,
          borderRadius: "50%",
          background: couleur,
          opacity: interpolate(Math.sin(frame / 5), [-1, 1], [0.3, 1]),
        }}
      />
      {texte}
    </div>
  );
};

// Scène 1 : accroche, mot par mot.
export const SceneAccroche: React.FC<FormationPromoProps> = ({
  badge,
  accroche,
  couleurAccent,
  couleurSecondaire,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { u, vertical } = useUnite();
  const mots = accroche.split(" ");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 60 * u,
      }}
    >
      <Pastille texte={badge} couleur={couleurAccent} />
      <h1
        style={{
          margin: 0,
          fontSize: (vertical ? 110 : 120) * u,
          fontWeight: 800,
          lineHeight: 1.1,
          maxWidth: vertical ? 900 * u : 1600 * u,
        }}
      >
        {mots.map((mot, i) => {
          const s = spring({
            frame: frame - 8 - i * 4,
            fps,
            config: { damping: 12 },
          });
          const dernier = i === mots.length - 1;
          return (
            <span
              key={`${mot}-${i}`}
              style={{
                display: "inline-block",
                margin: `0 ${14 * u}px`,
                opacity: s,
                transform: `translateY(${(1 - s) * 80 * u}px) rotate(${(1 - s) * 8}deg)`,
                ...(dernier
                  ? texteDegrade(couleurAccent, couleurSecondaire)
                  : {}),
              }}
            >
              {mot}
            </span>
          );
        })}
      </h1>
    </div>
  );
};

// Scène 2 : nom de la formation.
export const SceneTitre: React.FC<FormationPromoProps> = ({
  nomFormation,
  sousTitre,
  couleurPrincipale,
  couleurSecondaire,
  couleurAccent,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { u, vertical } = useUnite();
  const titre = spring({
    frame,
    fps,
    config: { damping: 200 },
    durationInFrames: 25,
  });
  const barre = spring({ frame: frame - 18, fps, config: { damping: 200 } });
  const sous = spring({ frame: frame - 30, fps, config: { damping: 200 } });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 40 * u,
      }}
    >
      <Pastille
        texte="Formation certifiante"
        couleur={couleurSecondaire}
        delai={0}
      />
      <h1
        style={{
          margin: 0,
          fontSize: (vertical ? 120 : 140) * u,
          fontWeight: 800,
          lineHeight: 1.05,
          maxWidth: vertical ? 900 * u : 1700 * u,
          clipPath: `inset(0 ${(1 - titre) * 100}% 0 0)`,
          ...texteDegrade("#FFFFFF", couleurSecondaire),
        }}
      >
        {nomFormation}
      </h1>
      <div
        style={{
          height: 10 * u,
          width: 420 * u * barre,
          borderRadius: 999,
          background: `linear-gradient(90deg, ${couleurPrincipale}, ${couleurAccent})`,
        }}
      />
      <p
        style={{
          margin: 0,
          fontSize: 48 * u,
          fontWeight: 400,
          color: "rgba(255,255,255,0.85)",
          maxWidth: vertical ? 850 * u : 1300 * u,
          opacity: sous,
          transform: `translateY(${(1 - sous) * 40 * u}px)`,
        }}
      >
        {sousTitre}
      </p>
    </div>
  );
};

// Scène 3 : avantages sous forme de cartes.
export const SceneAvantages: React.FC<FormationPromoProps> = ({
  titreAvantages,
  avantages,
  couleurPrincipale,
  couleurSecondaire,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { u, vertical } = useUnite();
  const titre = spring({ frame, fps, config: { damping: 200 } });
  const largeurCarte = vertical ? 410 * u : 390 * u;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 70 * u,
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: (vertical ? 80 : 76) * u,
          fontWeight: 800,
          maxWidth: vertical ? 900 * u : undefined,
          opacity: titre,
          transform: `translateY(${(1 - titre) * -40 * u}px)`,
        }}
      >
        {titreAvantages}
      </h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 36 * u,
          maxWidth: vertical ? 2 * largeurCarte + 36 * u : undefined,
        }}
      >
        {avantages.map((a, i) => {
          const s = spring({
            frame: frame - 15 - i * 12,
            fps,
            config: { damping: 13 },
          });
          return (
            <div
              key={a.titre}
              style={{
                width: largeurCarte,
                boxSizing: "border-box",
                padding: `${50 * u}px ${30 * u}px`,
                borderRadius: 36 * u,
                background: "rgba(255,255,255,0.07)",
                border: `${2 * u}px solid rgba(255,255,255,0.14)`,
                boxShadow: `0 ${30 * u}px ${60 * u}px rgba(0,0,0,0.35)`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 22 * u,
                opacity: s,
                transform: `translateY(${(1 - s) * 120 * u}px) scale(${0.8 + 0.2 * s})`,
              }}
            >
              <div
                style={{
                  width: 120 * u,
                  height: 120 * u,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: `linear-gradient(135deg, ${couleurPrincipale}, ${couleurSecondaire})`,
                }}
              >
                <Icone nom={a.icone} taille={64 * u} couleur="white" />
              </div>
              <div style={{ fontSize: 40 * u, fontWeight: 800 }}>{a.titre}</div>
              <div
                style={{
                  fontSize: 28 * u,
                  lineHeight: 1.35,
                  color: "rgba(255,255,255,0.75)",
                }}
              >
                {a.texte}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Scène 4 : chiffres clés avec compteurs animés.
export const SceneStats: React.FC<FormationPromoProps> = ({
  stats,
  couleurAccent,
  couleurSecondaire,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { u, vertical } = useUnite();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: vertical ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
        gap: (vertical ? 90 : 120) * u,
      }}
    >
      {stats.map((st, i) => {
        const debut = 8 + i * 10;
        const apparition = spring({
          frame: frame - debut,
          fps,
          config: { damping: 200 },
        });
        const progression = interpolate(frame, [debut, debut + 55], [0, 1], {
          ...clamp,
          easing: (t) => 1 - (1 - t) ** 3,
        });
        const valeur = Math.round(st.valeur * progression).toLocaleString(
          "fr-FR",
        );
        return (
          <div
            key={st.label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10 * u,
              opacity: apparition,
              transform: `scale(${0.6 + 0.4 * apparition})`,
            }}
          >
            <div
              style={{
                fontSize: 150 * u,
                fontWeight: 800,
                lineHeight: 1,
                fontVariantNumeric: "tabular-nums",
                ...texteDegrade(couleurAccent, couleurSecondaire),
              }}
            >
              {st.prefixe}
              {valeur}
              {st.suffixe}
            </div>
            <div style={{ fontSize: 40 * u, color: "rgba(255,255,255,0.85)" }}>
              {st.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Scène 5 : appel à l'action.
export const SceneAppel: React.FC<FormationPromoProps> = ({
  nomFormation,
  appelAction,
  bouton,
  urgence,
  siteWeb,
  couleurPrincipale,
  couleurSecondaire,
  couleurAccent,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { u, vertical } = useUnite();
  const titre = spring({ frame, fps, config: { damping: 12 } });
  const btn = spring({ frame: frame - 20, fps, config: { damping: 10 } });
  const pulsation = frame > 45 ? 1 + Math.sin((frame - 45) / 6) * 0.04 : 1;
  const bas = spring({ frame: frame - 40, fps, config: { damping: 200 } });
  const reflet = interpolate((frame - 50) % 60, [0, 30], [-30, 130], clamp);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 55 * u,
      }}
    >
      <div
        style={{
          fontSize: 34 * u,
          fontWeight: 600,
          letterSpacing: 4 * u,
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.7)",
          opacity: titre,
        }}
      >
        {nomFormation}
      </div>
      <h1
        style={{
          margin: 0,
          fontSize: (vertical ? 96 : 120) * u,
          fontWeight: 800,
          lineHeight: 1.08,
          maxWidth: vertical ? 900 * u : 1600 * u,
          transform: `scale(${titre})`,
        }}
      >
        {appelAction}
      </h1>
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          padding: `${34 * u}px ${90 * u}px`,
          borderRadius: 999,
          fontSize: 54 * u,
          fontWeight: 800,
          background: `linear-gradient(90deg, ${couleurAccent}, #F97316)`,
          color: "#1A1033",
          boxShadow: `0 0 ${80 * u * pulsation}px ${couleurAccent}99`,
          transform: `scale(${btn * pulsation})`,
        }}
      >
        {bouton} →
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${reflet}%`,
            width: "20%",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)",
            transform: "skewX(-20deg)",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 22 * u,
          opacity: bas,
          transform: `translateY(${(1 - bas) * 30 * u}px)`,
        }}
      >
        <div
          style={{
            fontSize: 52 * u,
            fontWeight: 600,
            ...texteDegrade(couleurSecondaire, couleurPrincipale),
            filter: "brightness(1.4)",
          }}
        >
          {siteWeb}
        </div>
        <div style={{ fontSize: 32 * u, color: "rgba(255,255,255,0.75)" }}>
          {urgence}
        </div>
      </div>
    </div>
  );
};
