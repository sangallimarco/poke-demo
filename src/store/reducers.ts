import { Stats } from 'fs'
import { PAGINATION_LIMIT } from '../shared/config'
import { PokeState, PokeActionTypes, FILTER, ADD, REMOVE, SET_LIST, SET_SELECTED } from './types'
import { addItem, filterData, mergeData, removeItem, setSelectedItem } from './utils'

const initialState: PokeState = {
  list: [],
  filteredList: [],
  offset: 0,
  limit: PAGINATION_LIMIT,
  filter: '',
  favourites: [],
  selected: null,
}

export function ListReducer(
  state = initialState,
  action: PokeActionTypes
): PokeState {
  switch (action.type) {
    case FILTER:
      const filter = action.payload
      const filteredList = filterData(state.list, action.payload)
      return {
        ...state,
        filteredList,
        filter,
      }
    case ADD:
      return {
        ...state,
        ...addItem(state, action.payload),
      }

    case REMOVE:
      return {
        ...state,
        ...removeItem(state, action.payload),
      }

    case SET_SELECTED:
      return {
        ...state,
        ...setSelectedItem(state, action.payload)
      }

    case SET_LIST:
      return {
        ...state,
        ...mergeData(state, action.payload),
      }
    default:
      return state
  }
}
