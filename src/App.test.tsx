import { shallow } from 'enzyme'
import React from 'react'
import { App } from './App'

describe('App', () => {
  test('should render', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.render).toBeDefined()
  })
})
