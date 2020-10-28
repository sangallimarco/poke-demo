import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactNode } from "react";
import styled from "styled-components";
import { ThemeColors } from "../shared/colors";

export const FilterWrapper =  styled.div`
    display: grid;
    grid-template-columns: auto 2em;
    gap: 0.5em;
    width: 100%;
    align-items: center;
    border-radius: 1em;
    border: 1px solid ${ThemeColors.BORDER};
    overflow: hidden;
    background-color: ${ThemeColors.INPUT}
`
interface FilterContaineProps {
    children: ReactNode
}

export const FilterContainer: React.FC<FilterContaineProps> = ({children}) => {
    return (
        <FilterWrapper>
            <div>{children}</div>
            <FontAwesomeIcon icon={faSearch} />
        </FilterWrapper>
    )
}