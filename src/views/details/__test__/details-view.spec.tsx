import { mount,shallow } from 'enzyme'
import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter, Route } from 'react-router-dom'
import configureStore, { MockStoreEnhanced } from 'redux-mock-store'
import { TitleContainer } from '../../../components/title'
import { RootState } from '../../../store/configure'
import { FavouritesInitialState } from '../../../store/favourites/reducers'
import { ListInitialState } from '../../../store/list/reducers'
import { DetailsView } from '../details-view'

const componentWrapper = (store: MockStoreEnhanced<any>) => (
  <Provider store={store}>
    <DetailsView />
  </Provider>
)

describe('FilterContainer', () => {
  const mockStore = configureStore<RootState>()
  let store: MockStoreEnhanced<RootState>

  beforeEach(() => {
    store = mockStore({
      list: ListInitialState,
      favourites: FavouritesInitialState,
    })
  })

  test('should render ', () => {
    const wrapper = mount(
      <Provider store={store}>
          <DetailsView/>
        {/* <MemoryRouter initialEntries={['/details/1']} initialIndex={0}>
          <Route path="/details/:id" component={DetailsView} />
        </MemoryRouter> */}
      </Provider>
    )

    expect(wrapper.find(TitleContainer).length).toBe(1)
  })
})
