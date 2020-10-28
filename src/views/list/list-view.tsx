import { debounce } from 'lodash'
import React, { ChangeEvent, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Card } from '../../components/card'
import { FilterContainer } from '../../components/filter'
import { Grid } from '../../components/grid'
import { Spinner } from '../../components/spinner'
import { TextInput } from '../../components/text-input'
import { Title } from '../../components/title'
import { Routes } from '../../shared/routes'
import { PokeData } from '../../shared/types'
import { RootState } from '../../store/configure'
import { setFilter } from '../../store/list/actions'

export const ListView: React.FC = () => {
  const current = useSelector((state: RootState) => state.list)
  const dispatch = useDispatch()
  const history = useHistory()

  const { filteredList = [], list, filter } = current

  const handleSelect = (data: PokeData) => {
    const { id } = data
    history.push(`${Routes.DETAILS}/${id}`)
  }

  const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
    doSetFilter(event.currentTarget.value)
  }

  const doSetFilter = useCallback(
    debounce((terms: string) => dispatch(setFilter(terms)), 150),
    []
  )

  return (
    <>
      <Spinner visibility={false} />
      <Title>
        Pokèmons {filteredList.length} / {list.length}
      </Title>
      <FilterContainer>
        <TextInput
          defaultValue={filter}
          placeholder="Please type initials of the Pokémon name or its number"
          type="search"
          onChange={handleFilter}
        />
      </FilterContainer>
      <Grid>
        {filteredList.map((pokemonData) => (
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
