import { PokeData } from '../../../shared/types'
import { ampharosPokeData, jumpluffPokeData } from '../../../shared/__data__'
import { addItem, removeItem } from '../functions'
import { FavouriteState } from '../types'

function returnPokeData(data: any): PokeData {
  return data as PokeData
}

describe('helpers', () => {

  const testContext: FavouriteState = {
    favourites: [],
  }

  describe('addItem()', () => {
    test('should add a new item to favourites', () => {
      const { favourites } = addItem(testContext, ampharosPokeData)
      expect(favourites?.length).toEqual(1)
    })
  })

  describe('removeItem()', () => {
    test('should remove an item from favourites', () => {
      const modifiedContext = {
        ...testContext,
        favourites: [ampharosPokeData, jumpluffPokeData],
      }
      const { favourites } = removeItem(modifiedContext, ampharosPokeData)
      expect(favourites?.length).toEqual(1)
    })
  })
})
