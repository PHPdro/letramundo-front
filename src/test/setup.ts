import '@testing-library/jest-dom'

// Mock HTMLMediaElement methods not implemented in jsdom
window.HTMLMediaElement.prototype.play = jest.fn().mockResolvedValue(undefined)
window.HTMLMediaElement.prototype.load = jest.fn()

afterEach(() => {
  localStorage.clear()
  jest.restoreAllMocks()
})

// Mock window.matchMedia (required by Ant Design)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})
