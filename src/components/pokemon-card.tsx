import React from "react";
import styled from "styled-components";
import { ThemeColors } from "../shared/colors";
import { PokeData } from "../shared/types";
import { PillsContainer, TypePills } from "./pill";

const CardContainer = styled.div`
    padding: 0.5em;
    border-radius: 0.5em;
    background-color: ${ThemeColors.CARD};
    display: grid;
    grid-auto-flow: vertical;
    gap: 1em;
`

const CardImg = styled.img`
    width: 100%;
    border-radius: 0.5em;
    background-color: ${ThemeColors.IMG};
`

const CardTitle = styled.div`
    font-size: 1.7em;
    text-transform: capitalize;
`

interface PokemonCardProps {
    data: PokeData
    onSelect: (url: string) => void
}

export const PokemonCard: React.FC<PokemonCardProps> = ({data}) => {
    const {sprites, name,types} =  data;

    return (<CardContainer>
        <CardImg src={sprites.front_default}/>
        <CardTitle>{name}</CardTitle>
        <TypePills types={types}/>
    </CardContainer>)
}