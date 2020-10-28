import { applyMiddleware, combineReducers, createStore } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunkMiddleware from 'redux-thunk'
import { FavouritesReducer } from './favourites/reducers'
import { ListReducer } from './list/reducers'

export const rootReducer = combineReducers({
  list: persistReducer({
    key: 'list',
    storage
  }, ListReducer),
  favourites: persistReducer({
    key: 'favourites',
    storage
  }, FavouritesReducer)
})

export type RootState = ReturnType<typeof rootReducer>

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch {
    // ignore write errors
  }
}

const persistedState = loadState()

export function configureStore() {
  // TODO persist
  const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
  return store
}
