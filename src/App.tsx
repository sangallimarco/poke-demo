import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Canvas } from './components/canvas'
import { Container } from './components/container'
import { Navbar } from './components/navbar'
import { fetchData } from './store/list/actions'
import { configureStore } from './store/configure'
import { DetailsView } from './views/details/details-view'
import { FavouritesView } from './views/favourites/favourites-view'
import { ListView } from './views/list/list-view'
import { PersistGate } from 'redux-persist/integration/react'

const { store, persistor } = configureStore()

export const App: React.FC = () => {
  useEffect(() => {
    store.dispatch(fetchData() as any)
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Canvas>
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
        </Canvas>
      </PersistGate>
    </Provider>
  )
}
