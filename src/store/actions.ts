import { PokeData } from '../shared/types'
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import {
  ADD,
  FILTER,
  LOAD_MORE,
  PokeActionTypes,
  REMOVE,
  RESET,
  SET_LIST,
  SET_SELECTED,
} from './types'
import { fetchProcess } from './utils'

export function setFilter(filter: string): PokeActionTypes {
  return {
    type: FILTER,
    payload: filter,
  }
}

export function reset(): PokeActionTypes {
  return {
    type: RESET,
  }
}

export function setSelected(id: number): PokeActionTypes {
  return {
    type: SET_SELECTED,
    payload: id,
  }
}

export function add(data: PokeData): PokeActionTypes {
  return {
    type: ADD,
    payload: data,
  }
}

export function remove(data: PokeData): PokeActionTypes {
  return {
    type: REMOVE,
    payload: data,
  }
}

export function loadMore(): PokeActionTypes {
  return {
    type: LOAD_MORE,
  }
}

export function setList(data: PokeData[]): PokeActionTypes {
  return {
    type: SET_LIST,
    payload: data
  }
}

// Trunk
export function fetchData(): ThunkAction<Promise<void>, {}, {}, AnyAction>  {
  return async (dispatch:  ThunkDispatch<{}, {}, AnyAction>) => {
    const list = await fetchProcess()
    dispatch(setList(list))
  }
}
