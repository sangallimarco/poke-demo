import { isEmpty, isNil } from "lodash"
import { FetchContext } from "./fetch-types"
import { PokeData, PokeList, PokeListExtended } from "./types"

const ROOT_API = 'https://pokeapi.co/api/v2/pokemon'

export async function fetchProcess(ctx: FetchContext): Promise<Partial<FetchContext>> {
    const {limit, offset, filter} = ctx;

    try {
        const resources  =  await fetch(`${ROOT_API}?limit=${limit}&offset=${offset}`)
        const resourcesData: PokeList = await resources.json()

        // resolving pokemon data
        const pokemonsData: Promise<PokeData | null>[] = resourcesData.results.map(({url}) => fetchPokeData(url))
        const resolvedPokemons  = await Promise.all<PokeData | null>(pokemonsData)

        // filter null results and names matching the filter value
        const filterRegx = !isEmpty(filter) ? new RegExp(`^${filter}`) : new RegExp(`^${filter}`);
        const list: PokeData[] = resolvedPokemons.filter((pokemon) => !isNil(pokemon) && filterRegx.test(pokemon.name) ) as PokeData[] // SEE HERE!!!

        return {list}
    } catch (e) {
        return Promise.reject()
    }
}

export function mergeData(ctx: FetchContext, data: Partial<FetchContext>) : FetchContext {
    const {list: originalList = []} = ctx
    const {list: newList = []} = data
    const list = [...originalList, ...newList]
    return {...ctx, list}
}

export function reset(ctx: FetchContext): FetchContext {
    return {...ctx, list: [], offset: 0}
}

export function setFilter(ctx: FetchContext, filter: string): FetchContext {
    return {...ctx, filter, offset: 0, list: []}
}

async function fetchPokeData(url: string):  Promise<PokeData | null> {
    try {
        const response =  await fetch(url)
        return response.json()
    } catch (e) {
        return null
    }
}

export function setNextPage(ctx: FetchContext) : FetchContext {
    const {offset: previousOffset, limit} = ctx
    const offset = previousOffset + limit
    return {...ctx, offset}
}
