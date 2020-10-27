import React from "react";
import styled from "styled-components";
import { ThemeColors } from "../shared/colors";
import { PokeData } from "../shared/types";
import { TypePills } from "./pill";

const CardContainer = styled.div`
    min-width: 10em;
    min-height: 10em;
    padding: 0.5em;
    border-radius: 0.5em;
    background-color: ${ThemeColors.CARD};
    display: grid;
    grid-auto-flow: vertical;
    gap: 1em;
    cursor: pointer;
    transition: 150ms transform linear;
    
    &:hover {
        transform: scale(1.05);
    }
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
    onSelect: (order: number) => void
}

export const PokemonCard: React.FC<PokemonCardProps> = ({data, onSelect}) => {
    const {sprites, name,types, order} =  data;

    const handleClick = () => {
        onSelect(order)
    }

    return (<CardContainer onClick={handleClick}>
        <CardImg src={sprites.front_default}/>
        <CardTitle>{name}</CardTitle>
        <TypePills types={types}/>
    </CardContainer>)
}