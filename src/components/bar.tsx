import React from "react";
import styled from "styled-components";
import { ThemeColors } from "../shared/colors";

interface BarProps {
  value: number;
  maxValue: number;
}

export const BarContainer = styled.div`
  border-radius: 0.5em;
  background-color: ${ThemeColors.BAR_CONTAINER};
  width: 100%;
  height: 1.5em;
  overflow: hidden;
`;

export const BarInner = styled.div<BarProps>`
  position: relative;
  background: ${ThemeColors.BAR};
  width: ${({ value, maxValue }) => `${(value / maxValue) * 100}%`};
  height: 100%;
`;

export const BarInnerText = styled.div`
  position: absolute;
  left: 1em;
  color: ${ThemeColors.INVERTED_TEXT};
`;

export const Bar: React.FC<BarProps> = ({ value, maxValue = 100 }) => {
  return (
    <BarContainer>
      <BarInner value={value} maxValue={maxValue}></BarInner>
    </BarContainer>
  );
};
