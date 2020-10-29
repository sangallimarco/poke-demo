import { PokeData } from '../../shared/types'
import { AnyAction } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { FILTER, PokeActionTypes, RESET, SET_LIST } from './types'
import { fetchProcess } from './functions'

export function setFilterAction(filter: string): PokeActionTypes {
  return {
    type: FILTER,
    payload: filter,
  }
}

export function resetAction(): PokeActionTypes {
  return {
    type: RESET,
  }
}

export function setListAction(data: PokeData[]): PokeActionTypes {
  return {
    type: SET_LIST,
    payload: data,
  }
}

// Trunk
export function fetchData(): ThunkAction<Promise<void>, {}, {}, AnyAction> {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const list = await fetchProcess()
    dispatch(setListAction(list))
  }
}
