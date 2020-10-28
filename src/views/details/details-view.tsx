import { isNil } from 'lodash'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Button } from '../../components/button'
import { TypePills } from '../../components/pills'
import { Spinner } from '../../components/spinner'
import { SubTitle } from '../../components/sub-title'
import { Title, TitleContainer } from '../../components/title'
import { generateImageUrl, generatePokemonNumber } from '../../shared/helpers'
import { PokeData } from '../../shared/types'
import { setSelected } from '../../store/list/actions'
import { add, remove } from '../../store/favourites/actions'
import { RootState } from '../../store/configure'
import { isInFavourites } from '../../store/list/functions'
import { DetailsImg } from './details-img'
import { DetailsLabelValue } from './details-label-value'
import { DetailsCol, DetailsLayout } from './details-layout'
import { DetailsSectionTitle } from './details-section-title'
import { DetailsStats } from './details-stats'

export const DetailsView: React.FC = () => {
  const current = useSelector((state: RootState) => state)
  const dispatch = useDispatch()
  const { id: urlId } = useParams<{ id: string }>()

  useEffect(() => {
    dispatch(setSelected(parseInt(urlId, 10)))
  }, [])

  const {
    list: { selected },
    favourites: { favourites },
  } = current
  // no selected pockemon
  if (isNil(selected)) {
    return <Title>Please select a Pokemon first</Title>
  }

  const handleAdd = () => {
    dispatch(add(selected))
  }

  const handleRemove = () => {
    dispatch(remove(selected))
  }

  const renderToggleButton = (favourites: PokeData[], id: number) =>
    !isInFavourites(favourites, id) ? (
      <Button color="primary" onClick={handleAdd}>
        Add to Favourites
      </Button>
    ) : (
      <Button onClick={handleRemove}>Remove from Favourites</Button>
    )

  const { stats = [], id, types, name, gender } = selected
  const hiResImage = generateImageUrl(id, true)
  const formattedId = generatePokemonNumber(id)

  return (
    <>
      <Spinner visibility={false} />
      <TitleContainer>
        <Title>
          {name} #{formattedId}{' '}
        </Title>
        {renderToggleButton(favourites, id)}
      </TitleContainer>
      <DetailsLayout>
        <DetailsCol>
          <DetailsImg src={hiResImage} />
          <DetailsSectionTitle>Stats</DetailsSectionTitle>
          <DetailsStats stats={stats} />
        </DetailsCol>
        <DetailsCol>
          <DetailsSectionTitle>Description</DetailsSectionTitle>
          <DetailsLabelValue>
            <SubTitle>Gender</SubTitle>
            {gender?.name}
          </DetailsLabelValue>

          <DetailsSectionTitle>Type</DetailsSectionTitle>
          <TypePills types={types} />
        </DetailsCol>
      </DetailsLayout>
    </>
  )
}
