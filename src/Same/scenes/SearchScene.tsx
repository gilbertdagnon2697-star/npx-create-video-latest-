import { LightBackground } from "../components/Backgrounds";
import {
  IconTiles,
  Pagination,
  SearchBar,
  type Tile,
  type Typed,
} from "../components/SearchBar";
import { WordLine, type Word } from "../components/Text";
import { C, fs, SMALL_TEXT_MIN } from "../theme";

// Mise en page commune aux scènes 4 et 6 : titre, barre de recherche à
// saisie animée, pagination à cinq points, quatre tuiles d'icônes.
export const SearchScene: React.FC<{
  readonly line1: readonly Word[];
  readonly line2: readonly Word[];
  readonly barMs: number;
  readonly items: readonly Typed[];
  readonly modulesLabel: string;
  readonly modulesMs: number;
  readonly tiles: readonly Tile[];
  readonly tilesMs: number;
  readonly tileColor: string;
}> = ({
  line1,
  line2,
  barMs,
  items,
  modulesLabel,
  modulesMs,
  tiles,
  tilesMs,
  tileColor,
}) => {
  const size = fs(0.035);
  return (
    <>
      <LightBackground />
      <IconTiles tiles={tiles} appearMs={tilesMs} color={tileColor} />
      <WordLine y={784} size={size} color={C.ink} words={line1} />
      <WordLine y={850} size={size} color={C.ink} words={line2} />
      <SearchBar y={994} appearMs={barMs} items={items} fontSize={fs(0.026)} />
      <Pagination
        y={1097}
        appearMs={modulesMs}
        items={items}
        label={modulesLabel}
        labelY={1149}
        labelSize={SMALL_TEXT_MIN}
      />
    </>
  );
};
