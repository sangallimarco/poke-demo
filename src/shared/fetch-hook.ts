import { useMachine } from '@xstate/react'
import { useRef } from 'react'
import { Machine, State } from 'xstate'
import { fetchProcess } from './fetch-data-utils'
import { getFetchStateChart } from './fetch-state-chart'
import { FetchActions, FetchContext, FetchInitialContext, FetchMachineEvents, FetchService, FetchStateSchema } from './fetch-types'


export interface UseFetchApi {
  state: State<FetchContext, FetchMachineEvents, FetchStateSchema>
  setFilter: (terms: string) => void
  reset: () => void
}

export function UseFetch(
  ): UseFetchApi {
    const ref = useRef<any>() // execute only once, please assign type !!!!!
    if (!ref.current) {
      // Do something that you only want to do once...
      const machine = Machine<FetchContext, FetchMachineEvents>(
        getFetchStateChart(),
        {
          services: {
            [FetchService.FETCHING_SERVICE]: (ctx) => fetchProcess(ctx),
          },
        },
        {
          ...FetchInitialContext
        }
      )
      ref.current = machine
    }
  
    const [state, send] = useMachine<FetchContext, FetchMachineEvents>(
      ref.current
    )
  
    const setFilter = (terms: string) => {
      send({ type: FetchActions.FILTER, terms })
    }
  
    const reset = () => {
      send({ type: FetchActions.RESET })
    }
  
    return { state, setFilter, reset }
  }
  