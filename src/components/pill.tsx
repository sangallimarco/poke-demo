import { isNil } from "lodash";
import React from "react";
import styled from "styled-components";
import { PokeTypeSlot } from "../shared/types";

const typesColorMap: Record<string, string> = {
  green: "#a5c962",
  fire: "#ee833e",
  water: "#5791bf",
  flying: "#c86cc6",
  poison: '#b083c4',
  ground: '#a8984f',
  bug: '#7c9d4c',
  normal: '#a4acaf',
  psychic: '#e271b6'
};

export const PillsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5em;
`;

function getPillColor(name: string): string {
  const color = typesColorMap[name];
  return !isNil(color) ? color : typesColorMap.normal;
}

interface PillProps {
  name: string;
}

export const Pill = styled.div<PillProps>`
  background-color: ${({ name }) => getPillColor(name)};
  padding: 0.5em;
  border: none;
  border-radius: 0.2em;
  font-size: 0.8em;
`;

interface TypePillsProps {
  types: PokeTypeSlot[];
}

export const TypePills: React.FC<TypePillsProps> = ({ types }) => {
  return (
    <PillsContainer>
      {types.map(({ slot, type }) => (
        <Pill key={slot} name={type.name}>
          {type.name}
        </Pill>
      ))}
    </PillsContainer>
  );
};
