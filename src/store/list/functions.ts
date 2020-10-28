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

export async function fetchProcess(): Promise<PokeData[]> {
  // ctx: ListState
  // const { limit, offset } = ctx
  const limit = 10
  const offset = 0

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

export async function fetchDetailsProcess(
  ctx: ListState
): Promise<Partial<ListState>> {
  const { selected: originalSelected } = ctx

  if (isNil(originalSelected)) {
    return Promise.reject()
  }

  const { id } = originalSelected

  try {
    const gender = await fetchAdditionalData<PokeGender>(id, 'gender', {
      name: 'Undefined',
      id: 0,
    })

    const selected = { ...originalSelected, gender }
    return { selected }
  } catch (e) {
    return Promise.reject()
  }
}

export function mergeData(
  ctx: ListState,
  newList: PokeData[]
): Partial<ListState> {
  const { list: originalList = [], filter = '' } = ctx

  const list = [...originalList, ...newList]
  const filteredList: PokeData[] = filterData(list, filter)

  return { list, filteredList }
}

export function reset(ctx: ListState): Partial<ListState> {
  return { list: [], filteredList: [], offset: 0 }
}

export function setFilter(ctx: ListState, filter: string): Partial<ListState> {
  const { list } = ctx
  const filteredList = filterData(list, filter)
  return { filteredList, filter, offset: 0 }
}

export function setNextPage(ctx: ListState): Partial<ListState> {
  const { offset: previousOffset, limit } = ctx
  const offset = previousOffset + limit
  return { offset }
}

export function setSelectedItem(
  ctx: ListState,
  matchId: number
): Partial<ListState> {
  const { list } = ctx
  const selected = list.find(({ id }) => id === matchId)
  return { selected }
}

export function isInFavourites(
  favourites: PokeData[],
  matchingId: number
): boolean {
  return favourites.some(({ id }) => id === matchingId)
}
