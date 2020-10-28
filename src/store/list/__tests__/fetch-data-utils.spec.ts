import { PokeData } from '../../../shared/types'
import {
  filterData,
  isInFavourites,
  mergeData,
  reset,
  setFilter,
  setNextPage,
  setSelectedItem,
} from '../functions'
import { ListState } from '../types'
import ampharos from './../__tests__/ampharos.json'
import jumpluff from '../../__tests__/jumpluff.json'

function returnPokeData(data: any): PokeData {
  return data as PokeData
}

describe('helpers', () => {
  const ampharosPokeData: PokeData = returnPokeData(ampharos)
  const jumpluffPokeData: PokeData = returnPokeData(jumpluff)

  const testData: (PokeData | null)[] = [
    ampharosPokeData,
    jumpluffPokeData,
    null,
  ]
  const testContext: ListState = {
    list: [ampharosPokeData],
    filteredList: [],
    limit: 100,
    offset: 0,
    selected: null,
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
      const { filteredList = [], filter, offset } = setFilter(
        testContext,
        'ampharos'
      )

      expect(offset).toEqual(0)
      expect(filter).toEqual('ampharos')
      expect(filteredList.length).toEqual(1)
    })
  })

  describe('reset()', () => {
    test('should reset list, filteredList and offset', () => {
      const { offset, list, filteredList } = reset(testContext)
      expect(offset).toEqual(0)
      expect(list?.length).toEqual(0)
      expect(filteredList?.length).toEqual(0)
    })
  })

  describe('setNextPage()', () => {
    test('should set the offset', () => {
      const { offset } = setNextPage(testContext)
      expect(offset).toEqual(100)
    })
  })

  describe('setSelectedItem()', () => {
    test('should set data to select', () => {
      const { selected } = setSelectedItem(testContext, ampharosPokeData.id)
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
