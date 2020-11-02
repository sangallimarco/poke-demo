// import storage from 'redux-persist/lib/storage'
import localforage from 'localforage'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistReducer, persistStore } from 'redux-persist'
import thunkMiddleware from 'redux-thunk'
import { FavouritesReducer } from './favourites/reducers'
import { ListReducer } from './list/reducers'

const storage = localforage

export const rootReducer = combineReducers({
  list: ListReducer,
  favourites: FavouritesReducer,
})

export type RootState = ReturnType<typeof rootReducer>

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export function configureStore() {
  // TODO persist
  const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
  const persistor = persistStore(store)
  return { store, persistor }
}
