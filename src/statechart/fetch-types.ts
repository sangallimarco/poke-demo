import { State } from "xstate"
import { PokeData } from "../shared/types"

export enum FetchStates {
    ACTIVE = 'ACTIVE',
    FETCHING = 'FETCHING',
    DISABLED = 'DISABLED',
}

export enum FetchExternalActions {
    UPDATE = 'UPDATE',
    UPDATE_ALL = 'UPDATE_ALL',
}

export enum FetchExternalServices {
    HYDRATE = 'HYDRATE',
    SAVE = 'SAVE',
}

export enum FetchActions {
    LOAD_MORE = 'LOAD_MORE',
    RESET = 'RESET',
    FILTER = 'FILTER',
    ADD = 'ADD',
    REMOVE = 'REMOVE'
}

export type FetchMachineEvents =
    | { type: FetchActions.LOAD_MORE }
    | { type: FetchActions.RESET }
    | { type: FetchActions.FILTER; terms: string }
    | { type: FetchActions.ADD;  data: PokeData }
    | { type: FetchActions.REMOVE; order: number }

export interface FetchContext {
    list: PokeData[]
    offset: number
    limit: number
    filter: string
    favourites: Array<PokeData>
}

export const FetchInitialContext: FetchContext = {
    list: [],
    offset: 0,
    limit: 20,
    filter: '',
    favourites: []
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