import styled from 'styled-components'
import { device } from '../shared/types'

export const Title = styled.h1`
  display: flex;
  justify-content: center;
  text-transform: capitalize;
  font-family: 'Varela Round', sans-serif;
`

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1em;

  @media ${device.tablet} {
    flex-direction: row;
  }
`
