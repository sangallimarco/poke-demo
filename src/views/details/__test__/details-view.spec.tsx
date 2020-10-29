import { mount } from 'enzyme'
import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter, Route } from 'react-router-dom'
import configureStore, { MockStoreEnhanced } from 'redux-mock-store'
import { ampharosPokeData } from '../../../shared/__data__'
import { RootState } from '../../../store/configure'
import { FavouritesInitialState } from '../../../store/favourites/reducers'
import { ListInitialState } from '../../../store/list/reducers'
import { DetailsView } from '../details-view'
import 'jest-styled-components'
import { TitleContainer } from '../../../components/title'
import { MovePills, Pill, TypePills } from '../../../components/pills'

describe('DetailsView', () => {
  const mockStore = configureStore<RootState>()
  let store: MockStoreEnhanced<RootState>

  beforeEach(() => {
    store = mockStore({
      list: { ...ListInitialState, list: [ampharosPokeData] },
      favourites: FavouritesInitialState,
    })
  })

  test('should render ', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/details/181']} initialIndex={0}>
          <Route path="/details/:id" component={DetailsView} />
        </MemoryRouter>
      </Provider>
    )
    expect(wrapper.find(TitleContainer).length).toBe(1)
    expect(wrapper.find(TypePills).length).toBe(1)
    expect(wrapper.find(TypePills).length).toBe(1)
    expect(wrapper.find(MovePills).length).toBe(1)
    expect(wrapper.find(Pill).length).toBe(80)
  })
})
