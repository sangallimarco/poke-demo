import { PokeData } from '../../shared/types'
import { ADD, FavouriteActionTypes, REMOVE } from './types'

export function add(data: PokeData): FavouriteActionTypes {
  return {
    type: ADD,
    payload: data,
  }
}

export function remove(data: PokeData): FavouriteActionTypes {
  return {
    type: REMOVE,
    payload: data,
  }
}
