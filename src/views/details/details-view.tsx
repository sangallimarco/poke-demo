import { isNil } from 'lodash'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Img } from '../../components/image'
import { MovePills, TypePills } from '../../components/pills'
import { Title, TitleContainer } from '../../components/title'
import { ToggleButton } from '../../components/toggle-button'
import { generateImageUrl, generatePokemonNumber } from '../../shared/helpers'
import { RootState } from '../../store/configure'
import { addItemAction, removeItemAction } from '../../store/favourites/actions'
import { getItemById, isInFavourites } from '../../store/list/functions'
import { DetailsCol, DetailsLayout } from './details-layout'
import { DetailsSectionTitle } from './details-section-title'
import { DetailsStats } from './details-stats'

interface DetailsViewRouteProps {
  id: string
}

export const DetailsView: React.FC = () => {
  const { id } = useParams<DetailsViewRouteProps>()
  const idNumber = parseInt(id, 10)
  const selected = useSelector((state: RootState) =>
    getItemById(state.list.list, idNumber)
  )
  const foundInFavourites = useSelector((state: RootState) =>
    isInFavourites(state.favourites.favourites, idNumber)
  )
  const dispatch = useDispatch()

  // no selected pockemon
  if (isNil(selected)) {
    return <Title>Please select a Pokemon first</Title>
  }

  const handleAdd = () => {
    dispatch(addItemAction(selected))
  }

  const handleRemove = () => {
    dispatch(removeItemAction(selected))
  }

  const { stats = [], types, name, moves } = selected
  const hiResImage = generateImageUrl(idNumber, true)
  const formattedId = generatePokemonNumber(idNumber)

  return (
    <>
      <TitleContainer>
        <Title>
          {name} #{formattedId}{' '}
        </Title>
        <ToggleButton
          status={foundInFavourites}
          onAdd={handleAdd}
          onRemove={handleRemove}
          addLabel="Add to Favourites"
          removeLabel="Remove from Favourites"
        />
      </TitleContainer>
      <DetailsLayout>
        <DetailsCol>
          <Img src={hiResImage} alt={name} />
          <DetailsSectionTitle>Stats</DetailsSectionTitle>
          <DetailsStats stats={stats} />
        </DetailsCol>
        <DetailsCol>
          <DetailsSectionTitle>Type</DetailsSectionTitle>
          <TypePills types={types} />

          <DetailsSectionTitle>Moves</DetailsSectionTitle>
          <MovePills moves={moves} />
        </DetailsCol>
      </DetailsLayout>
    </>
  )
}
