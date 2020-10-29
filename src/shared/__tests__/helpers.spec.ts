import {
  formatLabel,
  generateImageUrl,
  generatePokemonNumber,
} from '../helpers'

describe('helpers', () => {
  describe('generatePokemonNumber()', () => {
    test('should generate a valid Id', () => {
      expect(generatePokemonNumber(1)).toEqual('001')
      expect(generatePokemonNumber(0)).toEqual('000')
    })
  })

  describe('generateImageUrl()', () => {
    test('should generate a valid url', () => {
      expect(generateImageUrl(0, false)).toEqual(
        'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/000.png'
      )
      expect(generateImageUrl(0, true)).toEqual(
        'https://assets.pokemon.com/assets/cms2/img/pokedex/full/000.png'
      )
    })
  })

  describe('formatLabel()', () => {
    test('should generate a valid url', () => {
      expect(formatLabel('test-property-here')).toEqual('Test property here')
      expect(formatLabel('No need to format this')).toEqual(
        'No need to format this'
      )
    })
  })
})
