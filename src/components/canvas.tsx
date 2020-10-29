import styled from 'styled-components'
import { device } from '../shared/types'

export const Canvas = styled.div`
  background: #fff url(/container_bg.png);
  padding: 0;
  min-height: 100vh;

  @media ${device.tablet} {
    padding: 1em 3em;
  }

  @media ${device.laptop} {
    padding: 1em 3em;
  }

  @media ${device.laptopL} {
    padding: 1em 4em;
  }

  @media ${device.desktop} {
    padding: 1em 20em;
  }

  @media ${device.desktopL} {
    padding: 1em 20em;
  }
`
