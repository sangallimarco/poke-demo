import { useEffect, useState } from "react"

const ROOT_API = 'https://pokeapi.co/api/v2/pokemon'

interface PokeCard {
    name: string
    url: string
}

interface PokeList {
    count: number
    next: string
    previous: boolean
    results: PokeCard[]
}

interface PokeListExtended extends PokeList{
    pokemons: Array<PokeCard | null>
}

async function fetchData(limit: number = 20, offset: number = 0): Promise<PokeListExtended | null> {
    try {
        const resource  =  await fetch(`${ROOT_API}?limit=${limit}&offset=${offset}`)
        const data: PokeList = await resource.json()
        const list: Promise<PokeCard | null>[] = data.results.map(({url}) => fetchPokeCard(url))
        const pokemons  = await Promise.all<PokeCard | null>(list)
        // TODO filter null
        return {...data, pokemons}
    } catch (e) {
        return null
    }
}

async function fetchPokeCard(url: string):  Promise<PokeCard | null> {
    try {
        const response =  await fetch(url)
        return response.json()
    } catch (e) {
        return null
    }
}

interface PokeFetchReturn {
    list: PokeList | null | undefined
    setLimit: (value: number) => void
    setOffset: (value: number) => void
}

export function PokeFetch(): PokeFetchReturn  {
    const [list, setList] = useState<PokeList | null>()
    const [limit, setLimit] = useState<number>(20)
    const [offset, setOffset] = useState<number>(20)

    useEffect(  () => {
        const loadData = async () => {
            const list =  await fetchData(limit, offset )
            setList(list)
        }
        loadData()
    },[limit, offset])

    return {list, setLimit, setOffset}
}