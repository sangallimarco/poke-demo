import { capitalize, padStart } from "lodash";
import { ROOT_ASSETS } from "./config";

export function generatePokemonNumber(id: number): string {
    return padStart(id.toString(), 3, '0');
}

export function generateImageUrl(id: number, hiRes: boolean = false): string {
    const imgType = hiRes ? 'full' : 'detail'
    return `${ROOT_ASSETS}/${imgType}/${generatePokemonNumber(id)}.png`
}

export function formatLabel(label: string) {
    return capitalize(label.split('-').join(' '))

}