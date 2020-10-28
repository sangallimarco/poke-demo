import { isNil } from 'lodash'
import React from 'react'
import styled from 'styled-components'
import { ThemeColors, typesColorMap } from '../shared/colors'
import { PokeTypeSlot } from '../shared/types'

export const PillsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5em;
`

function getPillColor(name: string): string {
  const color = typesColorMap[name]
  return !isNil(color) ? color : typesColorMap.normal
}

interface PillProps {
  name: string
}

export const Pill = styled.div<PillProps>`
  background: ${({ name }) => getPillColor(name)};
  padding: 0.5em 1em;
  border: none;
  border-radius: 0.2em;
  font-size: 0.9em;
  color: ${ThemeColors.INVERTED_TEXT};
  font-weight: 600;
`

interface TypePillsProps {
  types: PokeTypeSlot[]
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
  )
}
