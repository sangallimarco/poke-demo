import React from 'react'
import styled from 'styled-components'
import { Bar } from '../../components/bar'
import { SubTitle } from '../../components/sub-title'
import { ThemeColors } from '../../shared/colors'
import { formatLabel } from '../../shared/helpers'
import { PokeStat } from '../../shared/types'

export const DetailsStatsCard = styled.div`
  border-radius: 0.5em;
  display: grid;
  grid-template-columns: min-content auto;
  grid-auto-rows: min-content;
  padding: 1em;
  background-color: ${ThemeColors.STATS_CARD};
  white-space: nowrap;
  align-items: center;
  gap: 0.5em;
`

export const StatContainer = styled.div`
  display: contents;
`

interface DetailsStatsProps {
  stats: PokeStat[]
}

export const DetailsStats: React.FC<DetailsStatsProps> = ({ stats }) => {
  return (
    <DetailsStatsCard>
      {stats.map((stat) => {
        const {
          base_stat,
          stat: { name },
        } = stat

        const formattedLabel = formatLabel(name)

        return (
          <StatContainer key={name}>
            <SubTitle>{formattedLabel}</SubTitle>
            <Bar value={base_stat} maxValue={250} />
          </StatContainer>
        )
      })}
    </DetailsStatsCard>
  )
}
