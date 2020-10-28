import { isEmpty, isNil } from 'lodash'
import { PokeData, PokeGender, PokeList } from '../shared/types'
import { ROOT_API } from '../shared/config'
import { PokeState } from './types'

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

export async function fetchProcess(
  // ctx: PokeState
): Promise<PokeData[]> {
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
  ctx: PokeState
): Promise<Partial<PokeState>> {
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
  ctx: PokeState,
  newList: PokeData[]
): Partial<PokeState> {
  const { list: originalList = [], filter = '' } = ctx

  const list = [...originalList, ...newList]
  const filteredList: PokeData[] = filterData(list, filter)

  return { list, filteredList }
}

export function reset(ctx: PokeState): Partial<PokeState> {
  return { list: [], filteredList: [], offset: 0 }
}

export function setFilter(ctx: PokeState, filter: string): Partial<PokeState> {
  const { list } = ctx
  const filteredList = filterData(list, filter)
  return { filteredList, filter, offset: 0 }
}

export function setNextPage(ctx: PokeState): Partial<PokeState> {
  const { offset: previousOffset, limit } = ctx
  const offset = previousOffset + limit
  return { offset }
}

export function addItem(ctx: PokeState, data: PokeData): Partial<PokeState> {
  const { favourites: originalFavourites } = ctx
  const favourites: PokeData[] = [...originalFavourites, data]
  return { favourites }
}

export function removeItem(ctx: PokeState, data: PokeData): Partial<PokeState> {
  const { favourites: originalFavourites } = ctx
  const { id: matchingId } = data
  const favourites: PokeData[] = originalFavourites.filter(
    ({ id }) => id !== matchingId
  )
  return { favourites }
}

export function setSelectedItem(
  ctx: PokeState,
  matchId: number
): Partial<PokeState> {
  const {list} = ctx
  const selected = list.find(({id}) => id === matchId )
  return { selected }
}

export function isInFavourites(
  favourites: PokeData[],
  matchingId: number
): boolean {
  return favourites.some(({ id }) => id === matchingId)
}
