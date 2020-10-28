import { assign, Machine, MachineConfig } from 'xstate'
import {
  addItem,
  fetchDetailsProcess,
  fetchProcess,
  mergeData,
  removeItem,
  reset,
  setFilter,
  setNextPage,
  setSelectedItem
} from './fetch-data-utils'
import {
  FetchActions,
  FetchContext,
  FetchInitialContext,
  FetchMachineEvents,
  FetchService,
  FetchStates,
  FetchStateSchema
} from './fetch-types'

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
          },
          [FetchActions.LOAD_MORE]: {
            actions: assign((ctx) => setNextPage(ctx)),
            target: FetchStates.FETCHING,
          },
          [FetchActions.ADD]: {
            actions: assign((ctx, event) => addItem(ctx, event.data)),
          },
          [FetchActions.REMOVE]: {
            actions: assign((ctx, event) => removeItem(ctx, event.data)),
          },
          [FetchActions.SET_SELECTED]: {
            actions: assign((ctx, event) => setSelectedItem(ctx, event.data)),
            target: FetchStates.FETCHING_DETAILS,
          },
        },
      },
      [FetchStates.FETCHING]: {
        invoke: {
          src: FetchService.FETCHING_SERVICE,
          onDone: {
            actions: assign((ctx, event) => mergeData(ctx, event.data)),
            target: FetchStates.ACTIVE,
          },
          onError: {
            target: FetchStates.ACTIVE,
          },
        },
      },
      [FetchStates.FETCHING_DETAILS]: {
        invoke: {
          src: FetchService.FETCHING_DETAILS_SERVICE,
          onDone: {
            actions: assign((ctx, event) => {
              console.log(event.data) // TODO remove this one
              return event.data
            }),
            target: FetchStates.ACTIVE,
          },
          onError: {
            target: FetchStates.ACTIVE,
          },
        },
      },
    },
  }
}

export const fetchMachine = Machine<FetchContext, FetchMachineEvents>(
  getFetchStateChart(),
  {
    services: {
      [FetchService.FETCHING_SERVICE]: (ctx) => fetchProcess(ctx),
      [FetchService.FETCHING_DETAILS_SERVICE]: (ctx) =>
        fetchDetailsProcess(ctx),
    },
  },
  {
    ...FetchInitialContext,
  }
)
