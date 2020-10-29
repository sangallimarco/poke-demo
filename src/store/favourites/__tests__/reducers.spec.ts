import ampharos from '../../__tests__/ampharos.json'
import { PokeData } from '../../../shared/types'
import { FavouritesReducer } from '../reducers'
import { ADD, REMOVE } from '../types'

function returnPokeData(data: any): PokeData {
  return data as PokeData
}

describe('FavouritesReducer', () => {
  const item = returnPokeData(ampharos)

  it('should return the initial state', () => {
    expect(FavouritesReducer(undefined, {})).toEqual({ favourites: [] })
  })

  it('should handle add', () => {
    expect(
      FavouritesReducer(undefined, {
        type: ADD,
        payload: item,
      })
    ).toEqual({ favourites: [item] })
  })

  it('should handle remove', () => {
    expect(
      FavouritesReducer(
        { favourites: [item] },
        {
          type: REMOVE,
          payload: item,
        }
      )
    ).toEqual({ favourites: [] })
  })
})
