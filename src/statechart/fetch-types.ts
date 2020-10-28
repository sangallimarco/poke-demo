import { State } from "xstate"
import { PokeData } from "../shared/types"

export enum FetchStates {
    ACTIVE = 'ACTIVE',
    FETCHING = 'FETCHING',
    DISABLED = 'DISABLED',
}

export enum FetchActions {
    LOAD_MORE = 'LOAD_MORE',
    RESET = 'RESET',
    FILTER = 'FILTER',
    ADD = 'ADD',
    REMOVE = 'REMOVE',
    SET_SELECTED = 'SET_SELECTED'
}

export type FetchMachineEvents =
    | { type: FetchActions.LOAD_MORE }
    | { type: FetchActions.RESET }
    | { type: FetchActions.FILTER; terms: string }
    | { type: FetchActions.ADD;  data: PokeData }
    | { type: FetchActions.REMOVE; order: number }
    | { type: FetchActions.SET_SELECTED; data: PokeData }

export interface FetchContext {
    list: PokeData[]
    offset: number
    limit: number
    filter: string
    favourites: PokeData[],
    selected: PokeData | null
}

export const FetchInitialContext: FetchContext = {
    list: [],
    offset: 0,
    limit: 20,
    filter: '',
    favourites: [],
    selected: null
}

export enum FetchService {
    FETCHING_SERVICE = 'FETCHING_SERVICE',
}

export interface FetchStateSchema {
    states: {
        [FetchStates.ACTIVE]: {}
        [FetchStates.FETCHING]: {}
    }
}

export type FetchCurrent = State<FetchContext, FetchMachineEvents, FetchStateSchema>
export type FetchSend = (event: FetchMachineEvents) => void