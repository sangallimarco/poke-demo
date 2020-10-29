import { PAGINATION_LIMIT } from '../../shared/config'
import { mergeData } from './functions'
import { FILTER, ListState, PokeActionTypes, SET_LIST } from './types'

export const ListInitialState: ListState = {
  list: [],
  offset: 0,
  limit: PAGINATION_LIMIT,
  filter: '',
}

export function ListReducer(
  state = ListInitialState,
  action: PokeActionTypes
): ListState {
  switch (action.type) {
    case FILTER:
      const filter = action.payload
      return {
        ...state,
        filter,
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
