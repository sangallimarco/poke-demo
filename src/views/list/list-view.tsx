import { debounce } from "lodash";
import React, { ChangeEvent, useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../../components/button";
import { Grid } from "../../components/grid";
import { FilterContainer } from "../../components/filter";
import { Card } from "../../components/card";
import { TextInput } from "../../components/text-input";
import { Routes } from "../../shared/routes";
import { PokeData } from "../../shared/types";
import { FetchSharedContext } from "../../statechart/fetch-provider";
import { FetchActions, FetchStates } from "../../statechart/fetch-types";

export const ListView: React.FC = () => {
  const [current, send] = useContext(FetchSharedContext);
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
        <TextInput
          defaultValue={filter}
          placeholder="Search"
          type="search"
          onChange={handleFilter}
        />
      </FilterContainer>
      <Grid>
        {list.map((pokemonData) => (
          <Card
            data={pokemonData}
            onSelect={handleSelect}
            key={pokemonData.order}
          />
        ))}
      </Grid>
      <Button
        onClick={handleLoadMore}
        disabled={current.matches(FetchStates.FETCHING)}
      >
        Load Next {limit}
      </Button>
    </>
  );
};
