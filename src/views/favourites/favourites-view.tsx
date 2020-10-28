import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Card } from '../../components/card'
import { Grid } from '../../components/grid'
import { Title } from '../../components/title'
import { Routes } from '../../shared/routes'
import { PokeData } from '../../shared/types'
import { setSelected } from '../../store/actions'
import { RootState } from '../../store/configure'

export const FavouritesView: React.FC = () => {
  const current = useSelector((state: RootState) => state.list)
  const dispatch = useDispatch()
  const history = useHistory()

  const { favourites = [] } = current

  const handleSelect = (data: PokeData) => {
    const { id } = data
    history.push(`${Routes.DETAILS}/${id}`)
  }

  return (
    <>
      <Title>My Favourites Pokèmons</Title>
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
