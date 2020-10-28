import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { shallow } from 'enzyme'
import React from 'react'
import { Navbar, NavContainer, NavElem } from '../navbar'

describe('NavBar', () => {
  test('should render navBar', () => {
    const wrapper = shallow(<Navbar />)
    expect(wrapper.find(NavContainer).length).toBe(1)
    expect(wrapper.find(NavElem).length).toBe(2)
    expect(wrapper.find(FontAwesomeIcon).length).toBe(2)
  })
})
