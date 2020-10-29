import { ampharosPokeData } from '../../../shared/__data__'
import { addItemAction, removeItemAction } from '../actions'
import { ADD, REMOVE } from '../types'

describe('Actions', () => {
  const testData = ampharosPokeData

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
