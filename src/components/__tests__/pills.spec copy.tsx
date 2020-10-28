import { shallow } from 'enzyme'
import React from 'react'
import { PokeTypeSlot } from '../../shared/types'
import { Pill, PillsContainer, TypePills } from '../pills'

describe('TypePills', () => {
  const types: PokeTypeSlot[] = [
    {
      slot: 1,
      type: {
        name: 'electric',
        url: 'https://pokeapi.co/api/v2/type/13/',
      },
    },
    {
      slot: 2,
      type: {
        name: 'normal',
        url: 'https://pokeapi.co/api/v2/type/1/',
      },
    },
  ]

  test('should render pills', () => {
    const wrapper = shallow(<TypePills types={types} />)
    expect(wrapper.find(PillsContainer).length).toBe(1)
    expect(wrapper.find(Pill).length).toBe(2)
  })
})
