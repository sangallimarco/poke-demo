import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Card } from "../../components/card";
import { Grid } from "../../components/grid";
import { Title } from "../../components/title";
import { Routes } from "../../shared/routes";
import { PokeData } from "../../shared/types";
import { FetchSharedContext } from "../../statechart/fetch-provider";
import { FetchActions } from "../../statechart/fetch-types";

export const FavouritesView: React.FC = () => {
  const [current, send] = useContext(FetchSharedContext);
  const history = useHistory();

  const {
    context: { favourites = [] },
  } = current;

  const handleSelect = (data: PokeData) => {
    // const {order} = data
    send({ type: FetchActions.SET_SELECTED, data });
    history.push(Routes.DETAILS);
  };

  return (
    <>
      <Title>Favourites Pokemons</Title>
      <Grid>
        {favourites.map((pokemonData) => (
          <Card
            data={pokemonData}
            onSelect={handleSelect}
            key={pokemonData.order}
          />
        ))}
      </Grid>
    </>
  );
};
