import React from 'react'
import styled from 'styled-components'
import { ThemeColors } from '../shared/colors'
import { generateImageUrl, generatePokemonNumber } from '../shared/helpers'
import { device, PokeData } from '../shared/types'
import { Img } from './image'
import { TypePills } from './pills'

const CardContainer = styled.div`
  min-width: 10em;
  min-height: 10em;
  padding: 0.5em;
  border-radius: 0.5em;
  background-color: ${ThemeColors.CARD};
  display: grid;
  gap: 0.5em;
  cursor: pointer;
  transition: 150ms transform linear;
  content-visibility: auto;

  width: 100%;

  &:hover {
    transform: scale(1.05);
  }
`

const CardTitle = styled.div`
  font-size: 1.7em;
  text-transform: capitalize;
`

const CardNumber = styled.div`
  font-size: 0.9em;
  color: ${ThemeColors.SECONDARY_TEXT};
`

const CardImg = styled(Img)`
  width: 100vw;
  @media ${device.desktop} {
    width: auto;
  }
`

interface PokemonCardProps {
  data: PokeData
  onSelect: (data: PokeData) => void
}

export const Card: React.FC<PokemonCardProps> = ({ data, onSelect }) => {
  const { name, types, id } = data

  const hiResImage = generateImageUrl(id)
  const position = generatePokemonNumber(id)

  const handleClick = () => {
    onSelect(data)
  }

  return (
    <CardContainer onClick={handleClick}>
      <CardImg src={hiResImage} placeholder="/placeholder-215.png" />
      <CardNumber>#{position}</CardNumber>
      <CardTitle>{name}</CardTitle>
      <TypePills types={types} />
    </CardContainer>
  )
}
