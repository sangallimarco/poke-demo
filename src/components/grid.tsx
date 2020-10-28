import styled from "styled-components";
import { device } from "../shared/types";

export const Grid =  styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: min-content;
    gap: 0.5em;

    @media ${device.tablet} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media ${device.laptop} {
    grid-template-columns: repeat(5, 1fr);
  }

  @media ${device.laptopL} {
    grid-template-columns: repeat(7, 1fr);
  }

  @media ${device.desktop} {
    grid-template-columns: repeat(8, 1fr);
  }
`