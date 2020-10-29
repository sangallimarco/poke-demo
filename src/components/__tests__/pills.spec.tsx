import { shallow } from 'enzyme'
import React from 'react'
import { PokeMove, PokeTypeSlot } from '../../shared/types'
import { MovePills, Pill, PillsContainer, TypePills } from '../pills'

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

  test('should render typepills', () => {
    const wrapper = shallow(<TypePills types={types} />)
    expect(wrapper.find(PillsContainer).length).toBe(1)
    expect(wrapper.find(Pill).length).toBe(2)
  })
})

describe('TypePills', () => {
  const moves: PokeMove[] = [
    {
      move: {
        name: 'move',
        url: 'https://pokeapi.co/api/v2/type/13/',
      },
    },
    {
      move: {
        name: 'move',
        url: 'https://pokeapi.co/api/v2/type/13/',
      },
    },
  ]

  test('should render move pills', () => {
    const wrapper = shallow(<MovePills moves={moves} />)
    expect(wrapper.find(PillsContainer).length).toBe(1)
    expect(wrapper.find(Pill).length).toBe(2)
  })
})
