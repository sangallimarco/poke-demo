import { isNil } from 'lodash'
import React from 'react'
import styled from 'styled-components'
import { ThemeColors, typesColorMap } from '../shared/colors'
import { formatLabel } from '../shared/helpers'
import { PokeMove, PokeTypeSlot } from '../shared/types'

export const PillsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5em;
  flex-wrap: wrap;
`

function getTypePillColor(name: string): string {
  const color = typesColorMap[name]
  return !isNil(color) ? color : typesColorMap.normal
}

interface PillProps {
  color: string
  inverted: boolean
}

export const Pill = styled.div<PillProps>`
  background: ${({ color }) => color};
  padding: 0.5em 1em;
  border: none;
  border-radius: 0.2em;
  font-size: 0.9em;
  color: ${({ inverted }) =>
    inverted ? ThemeColors.INVERTED_TEXT : ThemeColors.TEXT};
  font-weight: 600;
  white-space: nowrap;
`

interface TypePillsProps {
  types: PokeTypeSlot[]
}

export const TypePills: React.FC<TypePillsProps> = ({ types }) => {
  return (
    <PillsContainer>
      {types.map(({ slot, type: { name } }) => {
        const color = getTypePillColor(name)
        return (
          <Pill key={slot} color={color} inverted={true}>
            {name}
          </Pill>
        )
      })}
    </PillsContainer>
  )
}

interface MovePillsProps {
  moves: PokeMove[]
}

export const MovePills: React.FC<MovePillsProps> = ({ moves }) => {
  return (
    <PillsContainer>
      {moves.map(({ move: { name } }) => {
        const formattedLabel = formatLabel(name)
        return (
          <Pill key={name} color={ThemeColors.PILL} inverted={false}>
            {formattedLabel}
          </Pill>
        )
      })}
    </PillsContainer>
  )
}
