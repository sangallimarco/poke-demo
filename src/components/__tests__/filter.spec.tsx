import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { shallow } from 'enzyme'
import React from 'react'
import { FilterContainer, FilterWrapper } from '../filter'

describe('FilterContainer', () => {

  test('should render filter container and inner elements', () => {
    const wrapper = shallow(<FilterContainer>children</FilterContainer>)
    expect(wrapper.find(FilterWrapper).length).toBe(1)
    expect(wrapper.find(FontAwesomeIcon).length).toBe(1)
    expect(wrapper.contains('children')).toBeTruthy()
  })

})
