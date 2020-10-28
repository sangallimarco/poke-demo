import styled from "styled-components";
import { ThemeColors } from "../shared/colors";

interface ButtonProps {
    color?: 'primary' | 'default'
}

export const Button = styled.button<ButtonProps>`
    width: 10em;
    background-color: ${({color}) => color === 'primary' ? ThemeColors.PRIMARY_BUTTON : ThemeColors.BUTTON};
    padding: 0.5em;
    border: none;
    border-radius: 0.2em;
    font-size: 1.1em;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        background-color: ${ThemeColors.BUTTON_HOVER};
    }
`