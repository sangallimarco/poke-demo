import React from "react";
import styled from "styled-components";
import { ThemeColors } from "../../shared/colors";
import { PokeStat } from "../../shared/types";

export const DetailsStatsCard = styled.div`
  border-radius: 0.5em;
  display: flex;
  flex-flow: column;
  padding: 0.5em;
  background-color: ${ThemeColors.STATS_CARD};
`;

interface DetailsStatsProps {
  stats: PokeStat[];
}


export const DetailsStats: React.FC<DetailsStatsProps> = ({ stats }) => {
  return (
    <DetailsStatsCard>
      {stats.map((stat) => {
        const { base_stat, stat: {name: statName} } = stat;

      return <div>{statName}: {base_stat}</div>;
      })}
    </DetailsStatsCard>
  );
};
