import { PokeData } from '../../shared/types'
import { AnyAction } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { FILTER, PokeActionTypes, RESET, SET_LIST } from './types'
import { fetchProcess } from './functions'

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

export function setList(data: PokeData[]): PokeActionTypes {
  return {
    type: SET_LIST,
    payload: data,
  }
}

// Trunk
export function fetchData(): ThunkAction<Promise<void>, {}, {}, AnyAction> {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const list = await fetchProcess()
    dispatch(setList(list))
  }
}
