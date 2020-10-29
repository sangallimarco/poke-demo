import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { shallow } from 'enzyme'
import React from 'react'
import { Spinner } from '../spinner'

describe('Spinner', () => {
  test('should render when visibility is true', () => {
    const wrapper = shallow(<Spinner />)
    expect(wrapper.find(FontAwesomeIcon).length).toBe(1)
  })
})
