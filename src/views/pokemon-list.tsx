import { debounce } from "lodash";
import React, { ChangeEvent, useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../components/button";
import { CardsGrid } from "../components/card-grid";
import { FilterContainer } from "../components/filter";
import { PokemonCard } from "../components/pokemon-card";
import { TextInput } from "../components/text-input";
import { Routes } from "../shared/routes";
import { PokeData } from "../shared/types";
import { FetchContext } from "../statechart/fetch-provider";
import { FetchActions, FetchStates } from "../statechart/fetch-types";

export const PokemonList: React.FC = () => {
  const [current, send] = useContext(FetchContext);
  const history = useHistory();

  const {
    context: { list = [], limit, filter },
  } = current;

  const handleSelect = (data: PokeData) => {
    // const {order} = data
    send({ type: FetchActions.SET_SELECTED, data });
    history.push(Routes.DETAILS);
  };

  const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.currentTarget.value);
  };

  const setFilter = useCallback(
    debounce(
      (terms: string) => send({ type: FetchActions.FILTER, terms }),
      500
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
          defaultValue={filter}
          placeholder="Search"
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
