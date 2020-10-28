import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { shallow } from 'enzyme'
import React from 'react'
import { Spinner } from '../spinner'

describe('Spinner', () => {
  test('should render when visibility is true', () => {
    const wrapper = shallow(<Spinner visibility={true} />)
    expect(wrapper.find(FontAwesomeIcon).length).toBe(1)
  })

  test('should not render when visibility is false', () => {
    const wrapper = shallow(<Spinner visibility={false} />)
    expect(wrapper.find(FontAwesomeIcon).length).toBe(0)
  })
})
