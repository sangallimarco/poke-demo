import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { fetchData } from './actions'
import { ListReducer } from './reducers'
import { PokeState } from './types'

export const rootReducer = combineReducers({
  list: ListReducer,
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

  store.subscribe(() => {
    saveState({
      list: store.getState().list,
    })
  })

  return store
}
