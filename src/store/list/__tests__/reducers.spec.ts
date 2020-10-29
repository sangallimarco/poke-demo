import { ListReducer } from '../reducers'
import { FILTER, SET_LIST } from '../types'
import ampharos from '../../__tests__/ampharos.json'
import { PokeData } from '../../../shared/types'
import { PAGINATION_LIMIT } from '../../../shared/config'

function returnPokeData(data: any): PokeData {
  return data as PokeData
}

describe('ListReducer', () => {
  const testList = [returnPokeData(ampharos)]

  it('should return the initial state', () => {
    expect(ListReducer(undefined, {})).toEqual({
      filter: '',
      limit: PAGINATION_LIMIT,
      list: [],
      offset: 0,
    })
  })

  it('should handle set filter', () => {
    expect(
      ListReducer(undefined, {
        type: FILTER,
        payload: 'Amp',
      })
    ).toEqual({ filter: 'Amp', limit: PAGINATION_LIMIT, list: [], offset: 0 })
  })

  it('should handle set list', () => {
    expect(
      ListReducer(undefined, {
        type: SET_LIST,
        payload: testList,
      })
    ).toEqual({ filter: '', limit: PAGINATION_LIMIT, list: testList, offset: 0 })
  })
})
