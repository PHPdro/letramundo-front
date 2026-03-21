import { VALID_THEMES, THEME_CONFIG } from '@/utils/themeConfig'

describe('themeConfig', () => {
  it('VALID_THEMES contains exactly the expected themes', () => {
    expect(VALID_THEMES).toEqual(['alimentos', 'animais', 'cowboy', 'praia'])
  })

  it('each theme has bgClass, bgNiveisClass, and color properties', () => {
    for (const theme of VALID_THEMES) {
      const config = THEME_CONFIG[theme]
      expect(config).toHaveProperty('bgClass')
      expect(config).toHaveProperty('bgNiveisClass')
      expect(config).toHaveProperty('color')
    }
  })

  it('color values are valid', () => {
    const validColors = ['blue', 'red', 'orange']
    for (const theme of VALID_THEMES) {
      expect(validColors).toContain(THEME_CONFIG[theme].color)
    }
  })

  it('bgClass and bgNiveisClass are non-empty strings', () => {
    for (const theme of VALID_THEMES) {
      const config = THEME_CONFIG[theme]
      expect(typeof config.bgClass).toBe('string')
      expect(config.bgClass.length).toBeGreaterThan(0)
      expect(typeof config.bgNiveisClass).toBe('string')
      expect(config.bgNiveisClass.length).toBeGreaterThan(0)
    }
  })
})
