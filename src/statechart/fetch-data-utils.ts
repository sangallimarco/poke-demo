import { isNil } from "lodash";
import { FetchContext } from "./fetch-types";
import { PokeData, PokeList } from "../shared/types";
import { ROOT_API } from "../shared/config";

export async function fetchProcess(ctx: FetchContext): Promise<Partial<FetchContext>> {
    const { limit, offset, filter } = ctx;

    try {
        const resources = await fetch(`${ROOT_API}?limit=${limit}&offset=${offset}`)
        const resourcesData: PokeList = await resources.json()

        // resolving pokemon data
        const pokemonsData: Promise<PokeData | null>[] = resourcesData.results.map(({ url }) => fetchPokeData(url))
        const resolvedPokemons = await Promise.all<PokeData | null>(pokemonsData)

        // filter null results and names matching the filter value
        const filterRegx = new RegExp(`^${filter}`, 'i');
        const list: PokeData[] = resolvedPokemons.filter((pokemon) => !isNil(pokemon) && filterRegx.test(pokemon.name)) as PokeData[] // SEE HERE!!!

        return { list }
    } catch (e) {
        return Promise.reject()
    }
}

export function mergeData(ctx: FetchContext, data: Partial<FetchContext>): Partial<FetchContext> {
    const { list: originalList = [] } = ctx
    const { list: newList = [] } = data
    const list = [...originalList, ...newList]
    return { list }
}

export function reset(ctx: FetchContext): Partial<FetchContext> {
    return { list: [], offset: 0 }
}

export function setFilter(ctx: FetchContext, filter: string): Partial<FetchContext> {
    return { filter, offset: 0, list: [] }
}

async function fetchPokeData(url: string): Promise<PokeData | null> {
    try {
        const response = await fetch(url)
        return await response.json()
    } catch (e) {
        return null
    }
}

export function setNextPage(ctx: FetchContext): Partial<FetchContext> {
    const { offset: previousOffset, limit } = ctx
    const offset = previousOffset + limit
    return { offset }
}


export function addItem(ctx: FetchContext, data: PokeData): Partial<FetchContext> {
    const { favourites: originalFavourites } = ctx
    const favourites: PokeData[] = [...originalFavourites, data]
    return { favourites }
}

export function removeItem(ctx: FetchContext, id: number): Partial<FetchContext> {
    const { favourites: originalFavourites } = ctx
    const favourites: PokeData[] = originalFavourites.filter((data) => data.id !== id);
    return { favourites }
}

export function setSelectedItem(ctx: FetchContext, data: PokeData): Partial<FetchContext> {
    const selected = data
    return { selected }
}