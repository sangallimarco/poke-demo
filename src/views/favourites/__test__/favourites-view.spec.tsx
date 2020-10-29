import { mount } from 'enzyme'
import 'jest-styled-components'
import React from 'react'
import { Provider } from 'react-redux'
import configureStore, { MockStoreEnhanced } from 'redux-mock-store'
import { Card } from '../../../components/card'
import { ampharosPokeData } from '../../../shared/__data__'
import { RootState } from '../../../store/configure'
import { FavouritesInitialState } from '../../../store/favourites/reducers'
import { ListInitialState } from '../../../store/list/reducers'
import { FavouritesView } from '../favourites-view'

fdescribe('FilterContainer', () => {
  const mockStore = configureStore<RootState>()
  let store: MockStoreEnhanced<RootState>

  beforeEach(() => {
    store = mockStore({
      list: ListInitialState,
      favourites: { ...FavouritesInitialState, favourites: [ampharosPokeData] },
    })
  })

  test('should render cards', () => {
    const wrapper = mount(
      <Provider store={store}>
        <FavouritesView />
      </Provider>
    )
    expect(wrapper.find(FavouritesView).length).toBe(1)
    expect(wrapper.find(Card).length).toBe(1)
  })
})
