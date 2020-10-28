import { faBook, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { ThemeColors } from "../shared/colors";
import { Routes } from "../shared/routes";

const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1em;
`;

const NavElem = styled(NavLink)`
  background-color: ${ThemeColors.NAV};
  display: block;
  text-decoration: none;
  color: ${ThemeColors.TEXT};
  font-size: 1.3em;
  padding: 1em;

  &.active {
    color: ${ThemeColors.INVERTED_TEXT};
    background-color: ${ThemeColors.ACTIVE_NAV};
  }
`;

export const Navbar: React.FC = (): JSX.Element => {

  return (
    <NavContainer>
      <NavElem to={Routes.HOME} exact>
        <FontAwesomeIcon icon={faList} /> Home
      </NavElem>
      <NavElem to={Routes.FAVOURITES}>
        <FontAwesomeIcon icon={faBook} /> Favourites
      </NavElem>
    </NavContainer>
  );
};
