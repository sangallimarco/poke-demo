import { shallow } from 'enzyme'
import React from 'react'
import { Provider } from 'react-redux'
import configureStore, { MockStoreEnhanced } from 'redux-mock-store'
import { TitleContainer } from '../../../components/title'
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
      favourites: {...FavouritesInitialState, favourites: [],
    })
  })

  test('should render ', () => {
    const wrapper = shallow(<Provider store={store}>
      <FavouritesView/>
    </Provider>)

    const view = wrapper.find(FavouritesView).shallow()
    expect(wrapper.find(FavouritesView).length).toBe(1)


  })
})
