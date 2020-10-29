import { PokeData } from '../../../shared/types'
import ampharos from '../../__tests__/ampharos.json'
import { addItemAction, removeItemAction } from '../actions'
import { ADD, REMOVE } from '../types'

function returnPokeData(data: any): PokeData {
  return data as PokeData
}

describe('Actions', () => {
  const testData = returnPokeData(ampharos)

  it('should create an action to add', () => {
    const expectedAction = {
      type: ADD,
      payload: testData,
    }
    expect(addItemAction(testData)).toEqual(expectedAction)
  })

  it('should create an action to remove', () => {
    const expectedAction = {
      type: REMOVE,
      payload: testData,
    }
    expect(removeItemAction(testData)).toEqual(expectedAction)
  })
})
