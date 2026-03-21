import { getImage } from '@/utils/getImage'

describe('getImage', () => {
  it('returns themed path for items in LARGE_SET', () => {
    expect(getImage('cowboy', 'AI')).toBe('/cowboy/AI.png')
  })

  it('returns flat path for items NOT in LARGE_SET', () => {
    expect(getImage('cowboy', 'Z')).toBe('/Z.png')
  })

  it('is case sensitive — lowercase is not in the set', () => {
    expect(getImage('cowboy', 'ai')).toBe('/ai.png')
  })

  it('works with multi-word strings in the set', () => {
    expect(getImage('praia', 'EU LEVO A UVA')).toBe('/praia/EU LEVO A UVA.png')
  })

  it('works with all theme names', () => {
    const themes = ['alimentos', 'animais', 'cowboy', 'praia']
    for (const theme of themes) {
      expect(getImage(theme, 'AI')).toBe(`/${theme}/AI.png`)
      expect(getImage(theme, 'Z')).toBe('/Z.png')
    }
  })
})
