export interface PokeData {
    name: string
    url: string // add props here

    sprites: Record<string, string>
}

export interface PokeList {
    count: number
    next: string
    previous: boolean
    results: PokeData[]
}

export interface PokeListExtended extends PokeList{
    pokemons: Array<PokeData>
}
