import { PAGINATION_LIMIT } from '../../../shared/config'
import { ampharosPokeData } from '../../../shared/__data__'
import { ListReducer } from '../reducers'
import { FILTER, SET_LIST } from '../types'

describe('ListReducer', () => {
  const testList = [ampharosPokeData]

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
    ).toEqual({
      filter: '',
      limit: PAGINATION_LIMIT,
      list: testList,
      offset: 0,
    })
  })
})
