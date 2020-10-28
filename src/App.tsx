import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { createStore } from 'redux'
import { Canvas } from './components/canvas'
import { Container } from './components/container'
import { Navbar } from './components/navbar'
import { rootReducer } from './store'
import { DetailsView } from './views/details/details-view'
import { FavouritesView } from './views/favourites/favourites-view'
import { ListView } from './views/list/list-view'
import { Provider } from 'react-redux'

const store = createStore(rootReducer)

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Canvas>
        <BrowserRouter>
          <Container>
            <Navbar />
            <Switch>
              <Route path="/" component={ListView} exact />
              {/* <Route path="/favourites" component={FavouritesView} exact />
              <Route path="/details" component={DetailsView} /> */}
            </Switch>
          </Container>
        </BrowserRouter>
      </Canvas>
    </Provider>
  )
}
