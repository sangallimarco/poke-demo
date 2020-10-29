import { isEmpty, isNil } from 'lodash'
import { FETCH_LIMIT, ROOT_API } from '../../shared/config'
import { PokeData, PokeList } from '../../shared/types'
import { ListState } from './types'

async function fetchPokeData(url: string): Promise<PokeData | null> {
  try {
    const response = await fetch(url)
    return await response.json()
  } catch (e) {
    return null
  }
}

export async function fetchProcess(
  limit: number = FETCH_LIMIT,
  offset: number = 0
): Promise<PokeData[]> {
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
  filter: string,
  limit: number = 0
): PokeData[] {
  const filterRegx = new RegExp(`^${filter}`, 'i')
  const filtered = data.filter(
    (pokemon) =>
      !isNil(pokemon) &&
      (filterRegx.test(pokemon.name) ||
        filter === pokemon.id.toString() ||
        isEmpty(filter))
  ) as PokeData[]

  return limit > 0 ? filtered.slice(0, limit) : filtered
}

export function mergeData(
  ctx: ListState,
  newList: PokeData[]
): Partial<ListState> {
  const { list: originalList = [] } = ctx
  const list = [...originalList, ...newList]
  return { list }
}

export function reset(): Partial<ListState> {
  return { list: [], offset: 0 }
}

export function setFilter(filter: string): Partial<ListState> {
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
