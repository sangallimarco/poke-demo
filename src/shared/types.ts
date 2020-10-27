export interface PokeData {
    name: string
    url: string // add props here

    sprites: Record<string, string>
    types: PokeTypeSlot[]
}

export interface PokeTypeSlot {
    slot: number
    type: PokeType
}

export interface PokeType {
    name: string
     url: string
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

export const typesColorMap: Record<string, string> = {
    green: "#a5c962",
    fire: "#ee833e",
    water: "#5791bf",
    flying: "linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%)",
    poison: '#b083c4',
    ground: 'linear-gradient(180deg, #f7de3f 50%, #ab9842 50%)',
    bug: '#7c9d4c',
    normal: '#a4acaf',
    psychic: '#e271b6',
    dragon: 'linear-gradient(180deg, #53a4cf 50%, #f16e57 50%)',
    ghost: '#7b62a3',
    fairy: '#fdb9e9',
    steel: '#9eb7b8',
    fighting: '#d56723',
    ice: '#51c4e7'
  };