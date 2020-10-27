import { useMachine } from "@xstate/react";
import React, { ChangeEvent } from "react";
import { fetchMachine } from "../shared/fetch-state-chart";
import { FetchActions, FetchStates } from "../shared/fetch-types";
import { Button } from "./button";
import { CardsGrid } from "./card-grid";
import { FilterContainer } from "./filter";
import { Input } from "./Input";
// import { Input } from "./input";
import { PokemonCard } from "./pokemon-card";

export const PokemonList: React.FC = () => {
  const [current, send] = useMachine(fetchMachine);

  const {
    context: { list = [], limit },
  } = current;

  const handleSelect = (url: string) => {
    console.log(url);
  };

  const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
      console.log(event.currentTarget.value)
    send({ type: FetchActions.FILTER, terms: event.currentTarget.value });
  };

  const handleLoadMore = () => {
    send({ type: FetchActions.LOAD_MORE });
  };

  return (
    <>
      <FilterContainer>
        <span>Search</span>
        <Input type="search" onChange={handleFilter} disabled={current.matches(FetchStates.FETCHING)}/>
      </FilterContainer>
      <CardsGrid>
        {list.map((pokemonData) => (
          <PokemonCard
            data={pokemonData}
            onSelect={handleSelect}
            key={pokemonData.order}
          />
        ))}
      </CardsGrid>
      <Button onClick={handleLoadMore} disabled={current.matches(FetchStates.FETCHING)}>
        Load Next {limit}
      </Button>
    </>
  );
};
