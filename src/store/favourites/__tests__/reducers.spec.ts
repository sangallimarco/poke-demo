import { ampharosPokeData } from '../../../shared/__data__'
import { FavouritesReducer } from '../reducers'
import { ADD, REMOVE } from '../types'

describe('FavouritesReducer', () => {
  const item = ampharosPokeData

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
