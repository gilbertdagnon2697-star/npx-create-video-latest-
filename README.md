# Remotion video

<p align="center">
  <a href="https://github.com/remotion-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-dark.apng">
      <img alt="Animated Remotion Logo" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>

Welcome to your Remotion project!

## Vidéo publicitaire de formation

Le dossier `src/FormationPromo/` contient une publicité animée de 30 secondes pour une formation, en deux formats :

| Composition              | Format         | Usage                          |
| ------------------------ | -------------- | ------------------------------ |
| `FormationPromo`         | 1920×1080 16:9 | YouTube, site web, LinkedIn    |
| `FormationPromoVertical` | 1080×1920 9:16 | Reels, TikTok, Shorts, Stories |

Déroulé : accroche → nom de la formation → 4 avantages → chiffres clés animés → appel à l'action.

**Personnaliser** : tous les textes, chiffres, icônes et couleurs sont dans `src/FormationPromo/schema.ts` (`formationPromoDefaults`). Vous pouvez aussi les modifier en direct dans le Studio (`npm run dev`, panneau « Props »).

**Rendre la vidéo** :

```console
npx remotion render FormationPromo out/formation-promo-16x9.mp4
npx remotion render FormationPromoVertical out/formation-promo-9x16.mp4
```

La police Poppins est embarquée dans `public/fonts/` : le rendu fonctionne sans accès à Internet.

## Commands

**Install Dependencies**

```console
npm i --loglevel=error
```

**Start Preview**

```console
npm run dev
```

**Render video**

```console
npx remotion render
```

**Upgrade Remotion**

```console
npx remotion upgrade
```

## Docs

Get started with Remotion by reading the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals).

## Help

We provide help on our [Discord server](https://discord.gg/6VzzNDwUwV).

## Issues

Found an issue with Remotion? [File an issue here](https://github.com/remotion-dev/remotion/issues/new).

## License

Note that for some entities a company license is needed. [Read the terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
