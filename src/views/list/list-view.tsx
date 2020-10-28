import { debounce } from 'lodash'
import React, { ChangeEvent, useCallback, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from '../../components/button'
import { Card } from '../../components/card'
import { FilterContainer } from '../../components/filter'
import { Grid } from '../../components/grid'
import { Spinner } from '../../components/spinner'
import { TextInput } from '../../components/text-input'
import { Title } from '../../components/title'
import { Routes } from '../../shared/routes'
import { PokeData } from '../../shared/types'
import { useDispatch, useSelector } from 'react-redux'
import { loadMore, setFilter, setSelected } from '../../store/actions'
import { RootState } from '../../store'

export const ListView: React.FC = () => {
  const current = useSelector((state: RootState) => state.list)
  const dispatch = useDispatch()
  const history = useHistory()

  const { filteredList = [], list, filter } = current

  const handleSelect = (data: PokeData) => {
    dispatch(setSelected(data))
    history.push(Routes.DETAILS)
  }

  const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
    doSetFilter(event.currentTarget.value)
  }

  const doSetFilter = useCallback(
    debounce((terms: string) => dispatch(setFilter(filter)), 150),
    []
  )

  const handleLoadMore = () => {
    dispatch(loadMore())
  }

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

      <Button
        color="primary"
        onClick={handleLoadMore}
        disabled={false}
      >
        Load More Pokèmons
      </Button>
    </>
  )
}
