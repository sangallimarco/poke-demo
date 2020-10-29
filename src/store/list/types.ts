import { PokeData } from '../../shared/types'

export const RESET = 'RESET'
interface ResetMessageAction {
  type: typeof RESET
}

export const FILTER = 'FILTER'
interface FilterAction {
  type: typeof FILTER
  payload: string
}

export const SET_LIST = 'SET_LIST'
interface SetList {
  type: typeof SET_LIST
  payload: PokeData[]
}

export type PokeActionTypes =
  | FilterAction
  | ResetMessageAction
  | SetList

export interface ListState {
  list: PokeData[]
  offset: number
  limit: number
  filter: string
}
