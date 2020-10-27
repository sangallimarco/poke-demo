import React from 'react'
import { PokeFetch } from '../shared/api.service'


export const PokemonList: React.FC = () => {

    const {list, setLimit, setOffset} = PokeFetch()

    const handleLimit = (limit: number) => {
        setLimit(limit)
    }

    const handleOffset = (offset: number) => {
        setOffset(offset)
    }
    
return (<div>{list ? JSON.stringify(list) : 'empty'}</div>)
}