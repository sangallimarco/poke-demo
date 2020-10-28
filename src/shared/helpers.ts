import { padStart } from "lodash";
import { ROOT_ASSETS } from "./config";

export function generatePokemonNumber(order: number): string {
    return padStart(order.toString(), 3, '0');
}

export function generateImageUrl(order: number): string {
    return `${ROOT_ASSETS}/${generatePokemonNumber(order)}.png`
}