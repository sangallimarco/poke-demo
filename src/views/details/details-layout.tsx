import styled from 'styled-components'

export const DetailsLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1em;
`

export const DetailsCol = styled.div`
  display: grid;
  grid-auto-rows: min-content;
  gap: 1em;
`
