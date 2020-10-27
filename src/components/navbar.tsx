import React from 'react'
import { useHistory } from 'react-router-dom'
import { Routes } from '../shared/routes'

export type RouteAction = () => void

export interface NavBarMenuItem {
  title: string
  action: RouteAction
  icon: React.ReactNode | null
}


interface NavbarProps {
  title: string
}

export const Navbar: React.FC<NavbarProps> = ({
  title,
}: NavbarProps): JSX.Element => {
  const history = useHistory()

  const goToPage = (page: Routes) => () => history.push(page)


  const navigationMenu: NavBarMenuItem[] = [
    { title: 'List', action: goToPage(Routes.HOME), icon: null },
  ]

  return (
    <div></div>
  )
}
