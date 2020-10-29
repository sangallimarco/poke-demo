import { faBook, faList } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { ThemeColors } from '../shared/colors'
import { Routes } from '../shared/routes'
import { device } from '../shared/types'

export const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
`

export const NavElem = styled(NavLink)`
  background-color: ${ThemeColors.NAV};
  display: block;
  text-decoration: none;
  color: ${ThemeColors.TEXT};
  font-size: 1em;
  padding: 0.8em 1em;
  border-radius: 0.5em;
  opacity: 0.9;
  margin: 0.5em;

  @media ${device.tablet} {
    font-size: 1.3em;
  }

  &:hover {
    opacity: 1;
  }

  &.active {
    color: ${ThemeColors.INVERTED_TEXT};
    background-color: ${ThemeColors.ACTIVE_NAV};
  }
`

export const NavBarInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${device.tablet} {
    flex-direction: row;
    gap: 0.5em;
  }
`

export const NavBarIcon = styled(FontAwesomeIcon)`
  margin: 0.2em;
`

export const Navbar: React.FC = (): JSX.Element => {
  return (
    <NavContainer>
      <NavElem to={Routes.HOME} exact>
        <NavBarInner>
          <NavBarIcon icon={faList} /> Home
        </NavBarInner>
      </NavElem>
      <NavElem to={Routes.FAVOURITES}>
        <NavBarInner>
          <NavBarIcon icon={faBook} /> Favourites
        </NavBarInner>
      </NavElem>
    </NavContainer>
  )
}
