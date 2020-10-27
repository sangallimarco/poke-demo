import { isEmpty, isNil } from "lodash"
import { useEffect, useState } from "react"
import { PokeListExtended, PokeList, PokeData } from "./types"

const ROOT_API = 'https://pokeapi.co/api/v2/pokemon'

async function fetchData(limit: number = 20, offset: number = 0, filter: string = '', previousData: PokeListExtended | null = null): Promise<PokeListExtended | null> {
    try {
        const resource  =  await fetch(`${ROOT_API}?limit=${limit}&offset=${offset}`)
        const data: PokeList = await resource.json()

        // resolving pokemon data
        const list: Promise<PokeData | null>[] = data.results.map(({url}) => fetchPokeData(url))
        const resolvedPokemons  = await Promise.all<PokeData | null>(list)

        // filter null results and names matching the filter value
        const filterRegx = !isEmpty(filter) ? new RegExp(`^${filter}`) : new RegExp(`^${filter}`);
        const pokemons: PokeData[] = resolvedPokemons.filter((pokemon) => !isNil(pokemon) && filterRegx.test(pokemon.name) ) as PokeData[] // SEE HERE!!!


        return {...data, pokemons}
    } catch (e) {
        return null
    }
}

export function mergeData(previousData: PokeListExtended | null, newData: PokeListExtended | null) : PokeListExtended | null {
    if (previousData && newData) {
        return {...previousData, ...newData}
    }
    if(previousData) {
        return previousData;
    }
    if(newData) {
        return newData;
    }
    return null;
}

async function fetchPokeData(url: string):  Promise<PokeData | null> {
    try {
        const response =  await fetch(url)
        return response.json()
    } catch (e) {
        return null
    }
}

interface PokeFetchReturn {
    list: PokeListExtended | null | undefined
    setLimit: (value: number) => void
    setOffset: (value: number) => void
    setFilter: (value: string) => void
}

export function PokeFetch(): PokeFetchReturn  {
    const [list, setList] = useState<PokeListExtended | null>()
    const [limit, setLimit] = useState<number>(20)
    const [offset, setOffset] = useState<number>(0)
    const [filter, setFilter] = useState<string>('')

    useEffect(  () => {
        const loadData = async () => {
            const newData =  await fetchData(limit, offset, filter, list )
            setList(newData)
        }
        loadData()
    },[limit, offset])

    return {list, setLimit, setOffset, setFilter}
}