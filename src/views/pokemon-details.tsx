import React, { useContext } from "react"
import { FetchContext } from "../statechart/fetch-provider"

export const PokemonDetails: React.FC = () => {
    const [current, send] = useContext(FetchContext)
    const {context: {selected}} = current

    debugger
    
    return (<div>{selected?.name}</div>)
}