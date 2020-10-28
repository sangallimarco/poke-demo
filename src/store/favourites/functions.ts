import { PokeData } from "../../shared/types"
import { FavouriteState } from "./types"

export function addItem(ctx: FavouriteState, data: PokeData): Partial<FavouriteState> {
    const { favourites: originalFavourites } = ctx
    const favourites: PokeData[] = [...originalFavourites, data]
    return { favourites }
  }
  
  export function removeItem(ctx: FavouriteState, data: PokeData): Partial<FavouriteState> {
    const { favourites: originalFavourites } = ctx
    const { id: matchingId } = data
    const favourites: PokeData[] = originalFavourites.filter(
      ({ id }) => id !== matchingId
    )
    return { favourites }
  }