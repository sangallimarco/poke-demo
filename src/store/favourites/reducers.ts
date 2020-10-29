import { addItem, removeItem } from './functions'
import { ADD, FavouriteActionTypes, FavouriteState, REMOVE } from './types'

export const FavouritesInitialState: FavouriteState = {
  favourites: [],
}

export function FavouritesReducer(
  state = FavouritesInitialState,
  action: FavouriteActionTypes
): FavouriteState {
  switch (action.type) {
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
    default:
      return state
  }
}
