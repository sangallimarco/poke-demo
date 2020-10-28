import { isNil } from "lodash";
import React, { useContext } from "react";
import { generateImageUrl } from "../../shared/helpers";
import { FetchContext } from "../../statechart/fetch-provider";
import { DetailsImg } from "./details-img";
import { DetailsCol, DetailsLayout } from "./details-layout";
import { DetailsStats } from "./details-stats";

export const DetailsView: React.FC = () => {
  const [current, send] = useContext(FetchContext);
  const {
    context: { selected },
  } = current;

  // no selected pockemon
  if (isNil(selected)) {
    return <h1>Please select a Pockemon first</h1>;
  }

  const { stats = [], id } = selected;
  const hiResImage = generateImageUrl(id, true);

  return (
    <DetailsLayout>
      <DetailsCol>
        <DetailsImg src={hiResImage} />
        <DetailsStats stats={stats} />
      </DetailsCol>
      <DetailsCol>{selected?.name}</DetailsCol>
    </DetailsLayout>
  );
};
