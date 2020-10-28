import { PokeData } from "../../shared/types"

export const ADD = 'ADD'
interface AddAction {
  type: typeof ADD
  payload: PokeData
}

export const REMOVE = 'REMOVE'
interface RemoveAction {
  type: typeof REMOVE
  payload: PokeData
}


export type FavouriteActionTypes =
  | AddAction
  | RemoveAction


export interface FavouriteState {
  favourites: PokeData[]
}
