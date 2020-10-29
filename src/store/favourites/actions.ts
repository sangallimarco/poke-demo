import { PokeData } from '../../shared/types'
import { ADD, FavouriteActionTypes, REMOVE } from './types'

export function addItemAction(data: PokeData): FavouriteActionTypes {
  return {
    type: ADD,
    payload: data,
  }
}

export function removeItemAction(data: PokeData): FavouriteActionTypes {
  return {
    type: REMOVE,
    payload: data,
  }
}
