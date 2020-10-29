import { debounce } from 'lodash'
import React, { ChangeEvent, ReactElement, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Card } from '../../components/card'
import { FilterContainer } from '../../components/filter'
import { Grid } from '../../components/grid'
import { SubTitle } from '../../components/sub-title'
import { TextInput } from '../../components/text-input'
import { Title } from '../../components/title'
import { PAGINATION_LIMIT } from '../../shared/config'
import { Routes } from '../../shared/routes'
import { PokeData } from '../../shared/types'
import { RootState } from '../../store/configure'
import { setFilter } from '../../store/list/actions'
import { filterData } from '../../store/list/functions'

export const ListView: React.FC = () => {
  const filteredList = useSelector((state: RootState) =>
    filterData(state.list.list, state.list.filter, PAGINATION_LIMIT)
  )
  const filter = useSelector((state: RootState) => state.list.filter)
  const list = useSelector((state: RootState) => state.list.list)
  const dispatch = useDispatch()
  const history = useHistory()

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

  const warningMessage =
    filteredList.length === PAGINATION_LIMIT ? (
      <SubTitle>Result set too large, please use search box</SubTitle>
    ) : null

  return (
    <>
      <Title>
        Pokèmons {filteredList.length} / {list.length}
      </Title>
      {warningMessage}
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
