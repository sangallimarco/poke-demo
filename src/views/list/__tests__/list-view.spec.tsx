import { mount } from 'enzyme'
import 'jest-styled-components'
import React from 'react'
import { Provider } from 'react-redux'
import configureStore, { MockStoreEnhanced } from 'redux-mock-store'
import { Card } from '../../../components/card'
import { FilterContainer } from '../../../components/filter'
import { TextInput } from '../../../components/text-input'
import { ampharosPokeData } from '../../../shared/__data__'
import { RootState } from '../../../store/configure'
import { FavouritesInitialState } from '../../../store/favourites/reducers'
import { ListInitialState } from '../../../store/list/reducers'
import { ListView } from '../list-view'

describe('ListView', () => {
  const mockStore = configureStore<RootState>()
  let store: MockStoreEnhanced<RootState>

  beforeEach(() => {
    store = mockStore({
      list: { ...ListInitialState, list: [ampharosPokeData], filter: 'am' },
      favourites: FavouritesInitialState,
    })
  })

  test('should render ', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ListView />
      </Provider>
    )

    expect(wrapper.find(FilterContainer).length).toBe(1)
    expect(wrapper.find(TextInput).length).toBe(1)
    expect(wrapper.find(Card).length).toBe(1)
  })
})
