import { PAGINATION_LIMIT } from '../../shared/config'
import {
  FILTER, PokeActionTypes, ListState,
  SET_LIST,
  SET_SELECTED
} from './types'
import {
  filterData,
  mergeData,

  setSelectedItem
} from './functions'

const initialState: ListState = {
  list: [],
  filteredList: [],
  offset: 0,
  limit: PAGINATION_LIMIT,
  filter: '',
  selected: null,
}

export function ListReducer(
  state = initialState,
  action: PokeActionTypes
): ListState {
  switch (action.type) {
    case FILTER:
      const filter = action.payload
      const filteredList = filterData(state.list, action.payload)
      return {
        ...state,
        filteredList,
        filter,
      }
    case SET_SELECTED:
      return {
        ...state,
        ...setSelectedItem(state, action.payload),
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
