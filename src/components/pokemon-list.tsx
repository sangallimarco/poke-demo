import { isArray, isNil } from "lodash";
import React, { ReactNode, ReactNodeArray, ChangeEvent } from "react";
import { UseFetch } from "../shared/fetch-hook";
import { PokeData } from "../shared/types";
import { CardsGrid } from "./card-grid";
import { FilterContainer } from "./filter";
import { Input } from "./Input";
// import { Input } from "./input";
import { PokemonCard } from "./pokemon-card";

export const PokemonList: React.FC = () => {
  const { state, reset, setFilter } = UseFetch();
  const {
    context: { list = [] },
  } = state;

  const handleSelect = (url: string) => {
    console.log(url);
  };

  const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.value);
    setFilter(event.currentTarget.value);
  };

  return (
    <CardsGrid>
      <FilterContainer>
        <span></span>
        <Input type="search" onChange={handleFilter} />
      </FilterContainer>
      {list.map((pokemonData) => (
        <PokemonCard
          data={pokemonData}
          onSelect={handleSelect}
          key={pokemonData.order}
        />
      ))}
    </CardsGrid>
  );
};
