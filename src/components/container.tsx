import styled from "styled-components";
import { ThemeColors } from "../shared/colors";

export const Container = styled.div`
  grid-template-columns: 1fr;
  display: grid;
  padding: 1em;
  align-items: center;
  gap: 1em;
  grid-auto-rows: min-content;
  justify-items: center;
  background-color: ${ThemeColors.CONTAINER}
`;
