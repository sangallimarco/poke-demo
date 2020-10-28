import { faBook, faList } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { ThemeColors } from '../shared/colors'
import { Routes } from '../shared/routes'
import { device } from '../shared/types'

const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1em;
`

const NavElem = styled(NavLink)`
  background-color: ${ThemeColors.NAV};
  display: block;
  text-decoration: none;
  color: ${ThemeColors.TEXT};
  font-size: 1.3em;
  padding: 0.8em 1em;
  border-radius: 0.5em;
  opacity: 0.9;

  &:hover {
    opacity: 1;
  }

  &.active {
    color: ${ThemeColors.INVERTED_TEXT};
    background-color: ${ThemeColors.ACTIVE_NAV};
  }
`

const NavBarInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${device.tablet} {
    flex-direction: row;
    gap: 0.5em;
  }
`

export const Navbar: React.FC = (): JSX.Element => {
  return (
    <NavContainer>
      <NavElem to={Routes.HOME} exact>
        <NavBarInner>
          <FontAwesomeIcon icon={faList} /> Home
        </NavBarInner>
      </NavElem>
      <NavElem to={Routes.FAVOURITES}>
        <NavBarInner>
          {' '}
          <FontAwesomeIcon icon={faBook} /> Favourites
        </NavBarInner>
      </NavElem>
    </NavContainer>
  )
}
