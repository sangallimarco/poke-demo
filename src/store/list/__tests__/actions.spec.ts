import { PokeData } from '../../../shared/types'
import { setFilterAction, resetAction, setListAction } from '../actions'
import { FILTER, RESET, SET_LIST } from '../types'

describe('Actions', () => {
  it('should create an action to filter', () => {
    const text = 'filter'
    const expectedAction = {
      type: FILTER,
      payload: text,
    }
    expect(setFilterAction(text)).toEqual(expectedAction)
  })

  it('should create an action to reset', () => {
    const expectedAction = {
      type: RESET,
    }
    expect(resetAction()).toEqual(expectedAction)
  })

  it('should create an action to set list', () => {
    const testList: PokeData[] = []
    const expectedAction = {
      type: SET_LIST,
      payload: testList,
    }
    expect(setListAction(testList)).toEqual(expectedAction)
  })
})
