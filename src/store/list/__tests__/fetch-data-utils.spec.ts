import { PokeData } from '../../../shared/types'
import { ampharosPokeData, jumpluffPokeData } from '../../../shared/__data__'
import {
  filterData,
  getItemById,
  isInFavourites,
  mergeData,
  reset,
  setFilter,
  setNextPage,
} from '../functions'
import { ListState } from '../types'

describe('helpers', () => {
  const testData: (PokeData | null)[] = [
    ampharosPokeData,
    jumpluffPokeData,
    null,
  ]
  const testContext: ListState = {
    list: [ampharosPokeData],
    limit: 100,
    offset: 0,
    filter: '',
  }

  describe('filterData()', () => {
    test('should filter null and matching data only a valid Id', () => {
      const filteredData = filterData(testData, 'amph')
      expect(filteredData.length).toEqual(1)
      expect(filteredData[0].name).toEqual('ampharos')
    })

    test('should filter by id', () => {
      expect(filterData(testData, '189').length).toEqual(1)
      expect(filterData(testData, '1').length).toEqual(0)
    })
  })

  describe('mergeData()', () => {
    test('should merge data', () => {
      const merged = mergeData(testContext, [jumpluffPokeData])
      const { list = [] } = merged

      expect(list.length).toEqual(2)
      expect(list[0].name).toEqual('ampharos')
      expect(list[1].name).toEqual('jumpluff')
    })
  })

  describe('setFilter()', () => {
    test('should set filter and reset offset', () => {
      const { filter } = setFilter('ampharos')
      expect(filter).toEqual('ampharos')
    })
  })

  describe('reset()', () => {
    test('should reset list, filteredList and offset', () => {
      const { offset, list } = reset(testContext)
      expect(offset).toEqual(0)
      expect(list?.length).toEqual(0)
    })
  })

  describe('setNextPage()', () => {
    test('should set the offset', () => {
      const { offset } = setNextPage(testContext)
      expect(offset).toEqual(100)
    })
  })

  describe('getItemById()', () => {
    test('should set data to select', () => {
      const selected = getItemById([ampharosPokeData], ampharosPokeData.id)
      expect(selected).toBeDefined()
    })
  })

  describe('isInFavourites()', () => {
    test('should return true if data is in favourites', () => {
      expect(
        isInFavourites([ampharosPokeData, jumpluffPokeData], 189)
      ).toBeTruthy()
      expect(
        isInFavourites([ampharosPokeData, jumpluffPokeData], 2)
      ).toBeFalsy()
    })
  })
})
