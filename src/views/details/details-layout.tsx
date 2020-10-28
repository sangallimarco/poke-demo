import styled from 'styled-components'
import { device } from '../../shared/types'

export const DetailsLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1em;

  @media ${device.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
`

export const DetailsCol = styled.div`
  display: grid;
  grid-auto-rows: min-content;
  gap: 1em;
`
