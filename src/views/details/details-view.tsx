import { isNil } from "lodash";
import React, { useContext } from "react";
import { Button } from "../../components/button";
import { TypePills } from "../../components/pill";
import { Title } from "../../components/title";
import { generateImageUrl, generatePokemonNumber } from "../../shared/helpers";
import { PokeData } from "../../shared/types";
import { isInFavourites } from "../../statecharts/fetch-data-utils";
import { FetchSharedContext } from "../../statecharts/fetch-provider";
import { FetchActions } from "../../statecharts/fetch-types";
import { DetailsImg } from "./details-img";
import { DetailsCol, DetailsLayout } from "./details-layout";
import { DetailsSectionTitle } from "./details-section-title";
import { DetailsStats } from "./details-stats";

export const DetailsView: React.FC = () => {
  const [current, send] = useContext(FetchSharedContext);
  const {
    context: { selected, favourites },
  } = current;

  // no selected pockemon
  if (isNil(selected)) {
    return <h1>Please select a Pokemon first</h1>;
  }

  const handleAdd = () => {
    send({ type: FetchActions.ADD, data: selected });
  };

  const handleRemove = () => {
    send({ type: FetchActions.REMOVE, data: selected });
  };

  const renderToggleButton = (favourites: PokeData[], id: number) =>
    !isInFavourites(favourites, id) ? (
      <Button color="primary" onClick={handleAdd}>
        Add
      </Button>
    ) : (
      <Button onClick={handleRemove}>Remove</Button>
    );

  const { stats = [], id, types, name, gender } = selected
  const hiResImage = generateImageUrl(id, true)
  const formattedId = generatePokemonNumber(id)

  return (
    <>
      <Title>{name} #{formattedId}</Title>
      <DetailsLayout>
        <DetailsCol>
          <DetailsImg src={hiResImage} />
          <DetailsSectionTitle>Stats</DetailsSectionTitle>
          <DetailsStats stats={stats} />
        </DetailsCol>
        <DetailsCol>
          <DetailsSectionTitle>Description</DetailsSectionTitle>
          <div>here {gender?.name}</div>
  
          {renderToggleButton(favourites, id)}
          {favourites.length}
          <DetailsSectionTitle>Type</DetailsSectionTitle>
          <TypePills types={types} />
        </DetailsCol>
      </DetailsLayout>
    </>
  );
};
