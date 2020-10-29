import { PokeData } from '../types'
import ampharos from './ampharos.json'
import jumpluff from './jumpluff.json'

export function pokeDataFromJson(data: any): PokeData {
  return data as PokeData
}

export const ampharosPokeData = pokeDataFromJson(ampharos)
export const jumpluffPokeData = pokeDataFromJson(jumpluff)
