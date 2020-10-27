import { assign, DoneInvokeEvent, MachineConfig } from 'xstate'
import { mergeData, resetContext, setFilter } from './fetch-data-utils'
import { FetchActions, FetchContext, FetchMachineEvents, FetchService, FetchStates, FetchStateSchema } from './fetch-types'

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
            actions: assign((ctx) => resetContext(ctx)),
          },
          [FetchActions.FILTER]: {
            actions: assign((ctx, event) => setFilter(ctx, event.terms)),
            target: FetchStates.FETCHING
          },
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
