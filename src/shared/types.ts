export interface PokeData {
  name: string
  url: string // add props here
  order: number
  id: number
  base_experience: number
  sprites: Record<string, string>
  types: PokeTypeSlot[]
  stats: PokeStat[]
  weight: number
  moves: PokeMove[]
  abilities: PokeAbility[]
  description?: string
  gender?: PokeGender
}

export interface PokeGender {
  id: number
  name: string
}

export interface PokeStat {
  base_stat: number
  effort: 0
  stat: PokeResource
}

export interface PokeMove {
  move: PokeResource
  version_group_details?: {} // assign a type here if needed
}

export interface PokeAbility {
  ability: PokeResource
  is_hidden: boolean
  slot: number
}

export interface PokeTypeSlot {
  slot: number
  type: PokeResource
}

export interface PokeResource {
  name: string
  url: string
}

export interface PokeList {
  count: number
  next: string
  previous: boolean
  results: PokeData[]
}

export interface PokeListExtended extends PokeList {
  pokemons: Array<PokeData>
}

const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
}

export const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`,
}
