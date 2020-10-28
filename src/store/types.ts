import { PokeData } from '../shared/types'

export interface Message {
  user: string
  message: string
  timestamp: number
}

export interface ChatState {
  messages: Message[]
}

export const LOAD_MORE = 'LOAD_MORE'
export const RESET = 'RESET'
export const FILTER = 'FILTER'
export const ADD = 'ADD'
export const REMOVE = 'REMOVE'
export const SET_SELECTED = 'SET_SELECTED'
export const SET_LIST = 'SET_LIST'

//

interface LoadMoreAction {
  type: typeof LOAD_MORE
}

interface ResetMessageAction {
  type: typeof RESET
}

interface FilterAction {
  type: typeof FILTER
  payload: string
}

interface AddAction {
  type: typeof ADD
  payload: PokeData
}

interface RemoveAction {
  type: typeof REMOVE
  payload: PokeData
}

interface SetSelectedAction {
  type: typeof SET_SELECTED
  payload: number
}

interface SetList {
  type: typeof SET_LIST
  payload: PokeData[]
}

export type PokeActionTypes =
  | LoadMoreAction
  | FilterAction
  | ResetMessageAction
  | AddAction
  | RemoveAction
  | SetSelectedAction
  | SetList

export interface PokeState {
  list: PokeData[]
  filteredList: PokeData[]
  offset: number
  limit: number
  filter: string
  favourites: PokeData[]
  selected: PokeData | null
}
