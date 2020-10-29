import { isEmpty } from 'lodash'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { Canvas } from './components/canvas'
import { Container } from './components/container'
import { Navbar } from './components/navbar'
import { Spinner } from './components/spinner'
import { configureStore } from './store/configure'
import { fetchData } from './store/list/actions'
import { DetailsView } from './views/details/details-view'
import { FavouritesView } from './views/favourites/favourites-view'
import { ListView } from './views/list/list-view'

const { store, persistor } = configureStore()

export const App: React.FC = () => {
  // load data if cache does not contain any
  const loadData = () => {
    const {
      list: { list },
    } = store.getState()
    if (isEmpty(list)) {
      store.dispatch(fetchData() as any)
    }
  }

  return (
    <Provider store={store}>
      <Canvas>
        <PersistGate
          loading={<Spinner />}
          persistor={persistor}
          onBeforeLift={loadData}
        >
          <BrowserRouter>
            <Container>
              <Navbar />
              <Switch>
                <Route path="/" component={ListView} exact />
                <Route path="/favourites" component={FavouritesView} exact />
                <Route path="/details/:id" component={DetailsView} />
              </Switch>
            </Container>
          </BrowserRouter>
        </PersistGate>
      </Canvas>
    </Provider>
  )
}
