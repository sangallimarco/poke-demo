import { useMachine } from "@xstate/react";
import { debounce } from "lodash";
import React, { ChangeEvent, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { fetchMachine } from "../shared/fetch-state-chart";
import { FetchActions, FetchStates } from "../shared/fetch-types";
import { Routes } from "../shared/routes";
import { Button } from "./button";
import { CardsGrid } from "./card-grid";
import { FilterContainer } from "./filter";
import { PokemonCard } from "./pokemon-card";
import { TextInput } from "./text-input";

export const PokemonList: React.FC = () => {
  const [current, send] = useMachine(fetchMachine);
  const history = useHistory()

  const {
    context: { list = [], limit },
  } = current;

  const handleSelect = (order: number) => {
    console.log(order);
    history.push(`${Routes.DETAILS}/${order}`)
  };

  const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.currentTarget.value);
  };

  const setFilter = useCallback(
    debounce(
      (terms: string) => send({ type: FetchActions.FILTER, terms }),
      1000
    ),
    []
  );

  const handleLoadMore = () => {
    send({ type: FetchActions.LOAD_MORE });
  };

  return (
    <>
      <FilterContainer>
        <span>Search</span>
        <TextInput
          type="search"
          onChange={handleFilter}
        />
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
      <Button
        onClick={handleLoadMore}
        disabled={current.matches(FetchStates.FETCHING)}
      >
        Load Next {limit}
      </Button>
    </>
  );
};
