import { PokeData } from '../../../shared/types'
import { addItem, removeItem } from '../functions'
import { FavouriteState } from '../types'
import ampharos from './../__tests__/ampharos.json'
import jumpluff from '../../__tests__/jumpluff.json'

function returnPokeData(data: any): PokeData {
  return data as PokeData
}

describe('helpers', () => {
  const ampharosPokeData: PokeData = returnPokeData(ampharos)
  const jumpluffPokeData: PokeData = returnPokeData(jumpluff)

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
