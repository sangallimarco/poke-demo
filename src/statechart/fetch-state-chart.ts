import { assign, DoneInvokeEvent, Machine, MachineConfig } from 'xstate'
import { addItem, fetchProcess, mergeData, removeItem, reset, setFilter, setNextPage, setSelectedItem } from './fetch-data-utils'
import { FetchActions, FetchContext, FetchInitialContext, FetchMachineEvents, FetchService, FetchStates, FetchStateSchema } from './fetch-types'

export function getFetchStateChart(): MachineConfig<
    FetchContext,
    FetchStateSchema,
    FetchMachineEvents
> {
    return {
        initial: FetchStates.FETCHING,
        states: {
            [FetchStates.ACTIVE]: {
                on: {
                    [FetchActions.RESET]: {
                        actions: assign((ctx) => reset(ctx)),
                    },
                    [FetchActions.FILTER]: {
                        actions: assign((ctx, event) => setFilter(ctx, event.terms)),
                        target: FetchStates.FETCHING
                    },
                    [FetchActions.LOAD_MORE]: {
                        actions: assign((ctx, event) => setNextPage(ctx)),
                        target: FetchStates.FETCHING
                    },
                    [FetchActions.ADD]: {
                        actions: assign((ctx, event) => addItem(ctx, event.data))
                    },
                    [FetchActions.REMOVE]: {
                        actions: assign((ctx, event) => removeItem(ctx, event.order))
                    },
                    [FetchActions.SET_SELECTED]: {
                        actions: assign((ctx, event) => setSelectedItem(ctx, event.data))
                    }
                },
            },
            [FetchStates.FETCHING]: {
                invoke: {
                    src: FetchService.FETCHING_SERVICE,
                    onDone: {
                        actions: assign((ctx, event: DoneInvokeEvent<any>) => mergeData(ctx, event.data)),
                        target: FetchStates.ACTIVE,
                    },
                    onError: {
                        target: FetchStates.ACTIVE,
                    },
                },
            }
        }
    }
}


export const fetchMachine = Machine<FetchContext, FetchMachineEvents>(
    getFetchStateChart(),
    {
        services: {
            [FetchService.FETCHING_SERVICE]: (ctx) => fetchProcess(ctx)
        },
    },
    {
        ...FetchInitialContext
    }
)