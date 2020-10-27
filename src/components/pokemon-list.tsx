import React from "react";
import { PokeFetch } from "../shared/data";
import { CardsGrid } from "./card-grid";
import { PokemonCard } from "./pokemon-card";

export const PokemonList: React.FC = () => {
  const { list, setLimit, setOffset } = PokeFetch();

  const handleLimit = (limit: number) => {
    setLimit(limit);
  };

  const handleOffset = (offset: number) => {
    setOffset(offset);
  };

  const handleSelect = (url: string) => {
    console.log(url);
  };

  return (
    <CardsGrid>
      {list &&
        list.pokemons.map((pokemonData) => (
          <PokemonCard
            data={pokemonData}
            onSelect={handleSelect}
            key={pokemonData.name}
          />
        ))}
    </CardsGrid>
  );
};
