import styled from "styled-components";
import { ThemeColors } from "../shared/colors";

export const Button = styled.button`
    width: 10em;
    background-color: ${ThemeColors.BUTTON};
    padding: 0.5em;
    border: none;
    border-radius: 0.2em;
    font-size: 1em;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        background-color: ${ThemeColors.BUTTON_HOVER};
    }
`