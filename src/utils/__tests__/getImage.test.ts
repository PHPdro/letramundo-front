import { getImage } from '@/utils/getImage'

describe('getImage', () => {
  it('returns themed path for items in LARGE_SET', () => {
    expect(getImage('cowboy', 'AI')).toBe('/cowboy/AI.webp')
  })

  it('returns flat path for items NOT in LARGE_SET', () => {
    expect(getImage('cowboy', 'Z')).toBe('/Z.webp')
  })

  it('is case sensitive — lowercase is not in the set', () => {
    expect(getImage('cowboy', 'ai')).toBe('/ai.webp')
  })

  it('works with multi-word strings in the set', () => {
    expect(getImage('praia', 'EU LEVO A UVA')).toBe('/praia/EU LEVO A UVA.webp')
  })

  it('works with all theme names', () => {
    const themes = ['alimentos', 'animais', 'cowboy', 'praia']
    for (const theme of themes) {
      expect(getImage(theme, 'AI')).toBe(`/${theme}/AI.webp`)
      expect(getImage(theme, 'Z')).toBe('/Z.webp')
    }
  })
})
