import { isEmpty, isNil } from 'lodash'
import { PokeData, PokeGender, PokeList } from '../../shared/types'
import { ROOT_API } from '../../shared/config'
import { ListState } from './types'

// additional API endpoint can return 404 iven though the pokemon id is correct, please pass a default value
async function fetchAdditionalData<T>(
  id: number,
  endpoint: string,
  defaultValue: T
): Promise<T> {
  try {
    const response = await fetch(`${ROOT_API}/${endpoint}/${id}`)
    const data: T = await response.json()
    return data
  } catch (e) {
    return defaultValue
  }
}

async function fetchPokeData(url: string): Promise<PokeData | null> {
  try {
    const response = await fetch(url)
    return await response.json()
  } catch (e) {
    return null
  }
}

export async function fetchProcess(limit: number = 500, offset: number = 0): Promise<PokeData[]> {
  try {
    const resources = await fetch(
      `${ROOT_API}/pokemon?limit=${limit}&offset=${offset}`
    )
    const resourcesData: PokeList = await resources.json()

    // resolving pokemon data
    const pokemonsData: Promise<PokeData | null>[] = resourcesData.results.map(
      ({ url }) => fetchPokeData(url)
    )
    const resolvedPokemons = await Promise.all<PokeData | null>(pokemonsData)

    // remove non resolved items
    return filterData(resolvedPokemons, '')
  } catch (e) {
    return Promise.reject()
  }
}

// filter
export function filterData(
  data: (PokeData | null)[],
  filter: string
): PokeData[] {
  const filterRegx = new RegExp(`^${filter}`, 'i')
  return data.filter(
    (pokemon) =>
      !isNil(pokemon) &&
      (filterRegx.test(pokemon.name) ||
        filter === pokemon.id.toString() ||
        isEmpty(filter))
  ) as PokeData[]
}

export function mergeData(
  ctx: ListState,
  newList: PokeData[]
): Partial<ListState> {
  const { list: originalList = [], filter = '' } = ctx

  const list = [...originalList, ...newList]
  const filteredList: PokeData[] = filterData(list, filter)

  return { list }
}

export function reset(ctx: ListState): Partial<ListState> {
  return { list: [], offset: 0 }
}

export function setFilter(ctx: ListState, filter: string): Partial<ListState> {
  const { list } = ctx
  return { filter, offset: 0 }
}

export function setNextPage(ctx: ListState): Partial<ListState> {
  const { offset: previousOffset, limit } = ctx
  const offset = previousOffset + limit
  return { offset }
}

export function getItemById(
  list: PokeData[],
  matchId: number
): PokeData | undefined {
  return list.find(({ id }) => id === matchId)
}

export function isInFavourites(
  favourites: PokeData[],
  matchingId: number
): boolean {
  return favourites.some(({ id }) => id === matchingId)
}
