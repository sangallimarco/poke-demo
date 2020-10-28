import { isNil } from "lodash";
import React, { useContext } from "react";
import { Button } from "../../components/button";
import { TypePills } from "../../components/pill";
import { Title } from "../../components/title";
import { generateImageUrl } from "../../shared/helpers";
import { PokeData } from "../../shared/types";
import { isInFavourites } from "../../statechart/fetch-data-utils";
import { FetchSharedContext } from "../../statechart/fetch-provider";
import { FetchActions, FetchContext } from "../../statechart/fetch-types";
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

  const { stats = [], id, types, name } = selected;
  const hiResImage = generateImageUrl(id, true);

  return (
    <>
      <Title>{name}</Title>
      <DetailsLayout>
        <DetailsCol>
          <DetailsImg src={hiResImage} />
          <DetailsSectionTitle>Stats</DetailsSectionTitle>
          <DetailsStats stats={stats} />
        </DetailsCol>
        <DetailsCol>
          <DetailsSectionTitle>Description</DetailsSectionTitle>
  
          {renderToggleButton(favourites, id)}
          {favourites.length}
          <DetailsSectionTitle>Type</DetailsSectionTitle>
          <TypePills types={types} />
        </DetailsCol>
      </DetailsLayout>
    </>
  );
};
