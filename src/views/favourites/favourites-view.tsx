import { isEmpty } from 'lodash'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Card } from '../../components/card'
import { Grid } from '../../components/grid'
import { SubTitle } from '../../components/sub-title'
import { Title } from '../../components/title'
import { Routes } from '../../shared/routes'
import { PokeData } from '../../shared/types'
import { RootState } from '../../store/configure'

export const FavouritesView: React.FC = () => {
  const favourites = useSelector((state: RootState) => state.favourites.favourites)
  const history = useHistory()

  const handleSelect = (data: PokeData) => {
    const { id } = data
    history.push(`${Routes.DETAILS}/${id}`)
  }

  const warningMessage =
  isEmpty(favourites)  ? (
    <SubTitle>Set is empty, please add a new Pokèmon from the detail view</SubTitle>
  ) : null

  return (
    <>
      <Title>My Favourites Pokèmons</Title>
      {warningMessage}
      <Grid>
        {favourites.map((pokemonData) => (
          <Card
            data={pokemonData}
            onSelect={handleSelect}
            key={pokemonData.order}
          />
        ))}
      </Grid>
    </>
  )
}
