import { PokeData } from "../../shared/types"
import { filterData, mergeData } from "../fetch-data-utils"
import { FetchContext } from "../fetch-types"

import ampharos from './ampharos.json'
import jumpluff from './jumpluff.json'

function returnPokeData(data: any): PokeData {
    return data as PokeData
}

describe('helpers', () => {
    const ampharosPokeData: PokeData = returnPokeData(ampharos)
    const jumpluffPokeData: PokeData = returnPokeData(jumpluff)

    const testData: (PokeData | null)[] = [ampharosPokeData, jumpluffPokeData, null]
    const testContext: FetchContext = {
        list: [ampharosPokeData],
        filteredList: [],
        limit: 100,
        offset: 0,
        favourites: [],
        selected: null,
        filter: ''
    }


    describe('filterData()', () => {
        test('should filter null and matching data only a valid Id', () => {
            const filteredData = filterData(testData, 'amph')
            expect(filteredData.length).toEqual(1)
            expect(filteredData[0].name).toEqual('ampharos')
        })

        test('should filter by id', () => {
            expect(filterData(testData, '189').length).toEqual(1)
            expect(filterData(testData, '1').length).toEqual(0)
        })
    })

    describe('mergeData()', () => {
        test('should merge data', () => {
            const newData: Partial<FetchContext> = {
                list: [jumpluffPokeData]
            }

            const merged = mergeData(testContext, newData)
            const {list = []} = merged

            expect(list.length).toEqual(2)
            expect(list[0].name).toEqual('ampharos')
            expect(list[1].name).toEqual('jumpluff')
        })
    })


})