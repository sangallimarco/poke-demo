import { isEmpty, isNil } from 'lodash'
import { FetchContext } from './fetch-types'
import { PokeData, PokeGender, PokeList } from '../shared/types'
import { ROOT_API } from '../shared/config'

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
  ctx: FetchContext
): Promise<Partial<FetchContext>> {
  const { limit, offset, filter } = ctx

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
    const list: PokeData[] = filterData(resolvedPokemons, filter)

    return { list }
  } catch (e) {
    return Promise.reject()
  }
}

export function filterData(data: (PokeData | null)[], filter: string): PokeData[] {
  const filterRegx = new RegExp(`^${filter}`, 'i')
  return data.filter(
    (pokemon) => !isNil(pokemon) && (filterRegx.test(pokemon.name) || filter === pokemon.id.toString() || isEmpty(filter))
  ) as PokeData[] 
}

export async function fetchDetailsProcess(
  ctx: FetchContext
): Promise<Partial<FetchContext>> {
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
  ctx: FetchContext,
  data: Partial<FetchContext>
): Partial<FetchContext> {
  const { list: originalList = [] } = ctx
  const { list: newList = [] } = data
  const list = [...originalList, ...newList]
  return { list }
}

export function reset(ctx: FetchContext): Partial<FetchContext> {
  return { list: [], offset: 0 }
}

export function setFilter(
  ctx: FetchContext,
  filter: string
): Partial<FetchContext> {
  return { filter, offset: 0, list: [] }
}

export function setNextPage(ctx: FetchContext): Partial<FetchContext> {
  const { offset: previousOffset, limit } = ctx
  const offset = previousOffset + limit
  return { offset }
}

export function addItem(
  ctx: FetchContext,
  data: PokeData
): Partial<FetchContext> {
  const { favourites: originalFavourites } = ctx
  const favourites: PokeData[] = [...originalFavourites, data]
  return { favourites }
}

export function removeItem(
  ctx: FetchContext,
  data: PokeData
): Partial<FetchContext> {
  const { favourites: originalFavourites } = ctx
  const { id: matchingId } = data
  const favourites: PokeData[] = originalFavourites.filter(
    ({ id }) => id !== matchingId
  )
  return { favourites }
}

export function setSelectedItem(
  ctx: FetchContext,
  data: PokeData
): Partial<FetchContext> {
  const selected = data
  return { selected }
}

export function isInFavourites(
  favourites: PokeData[],
  matchingId: number
): boolean {
  return favourites.some(({ id }) => id === matchingId)
}
