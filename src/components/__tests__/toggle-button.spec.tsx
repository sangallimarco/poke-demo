import { shallow } from 'enzyme'
import React from 'react'
import { Button } from '../button'
import { ToggleButton } from '../toggle-button'

describe('Toggle', () => {
  const addLabel = 'Add to Favourites'
  const removeLabel = 'Remove from Favourites'
  let addCallback: () => void
  let removeCallback: () => void

  beforeEach(() => {
    addCallback = jest.fn()
    removeCallback = jest.fn()
  })

  test('should render add button and trigger add callback', () => {
    const wrapper = shallow(
      <ToggleButton
        status={false}
        onAdd={addCallback}
        onRemove={removeCallback}
        addLabel={addLabel}
        removeLabel={removeLabel}
      />
    )

    const button = wrapper.find(Button)
    expect(button.length).toBe(1)
    expect(button.contains(addLabel)).toBeTruthy()
    button.simulate('click')
    expect(addCallback).toBeCalled()
    expect(removeCallback).not.toBeCalled()
  })

  test('should render remove button  and trigger remove callback', () => {
    const wrapper = shallow(
      <ToggleButton
        status={true}
        onAdd={addCallback}
        onRemove={removeCallback}
        addLabel={addLabel}
        removeLabel={removeLabel}
      />
    )

    const button = wrapper.find(Button)
    expect(button.length).toBe(1)
    expect(button.contains(removeLabel)).toBeTruthy()
    button.simulate('click')
    expect(addCallback).not.toBeCalled()
    expect(removeCallback).toBeCalled()
  })
})
