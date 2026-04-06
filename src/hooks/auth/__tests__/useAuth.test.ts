import { renderHook, waitFor } from '@testing-library/react'
import { useAuth } from '@/hooks/auth/useAuth'

const mockPush = jest.fn()
let mockRequestResult: Promise<any> = Promise.resolve({})

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}))

jest.mock('@/api/config', () => ({
  request: () => mockRequestResult,
}))

describe('useAuth', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
    mockRequestResult = Promise.reject(new Error('default'))
    // suppress unhandled rejection for default
    mockRequestResult.catch(() => {})
  })

  it('returns true when token exists and verify-token succeeds', async () => {
    localStorage.setItem('auth', 'fake-token')
    mockRequestResult = Promise.resolve({})
    const { result } = renderHook(() => useAuth())

    await waitFor(() => {
      expect(result.current.isAuthenticated).toBe(true)
    })
    expect(mockPush).not.toHaveBeenCalled()
  })

  it('returns false and redirects when token exists but verify-token fails', async () => {
    localStorage.setItem('auth', 'fake-token')
    mockRequestResult = Promise.reject(new Error('invalid'))
    const { result } = renderHook(() => useAuth())

    await waitFor(() => {
      expect(result.current.isAuthenticated).toBe(false)
    })
    expect(mockPush).toHaveBeenCalledWith('/login')
  })

  it('returns false and redirects to /login when no token', async () => {
    const { result } = renderHook(() => useAuth())

    await waitFor(() => {
      expect(result.current.isAuthenticated).toBe(false)
    })
    expect(mockPush).toHaveBeenCalledWith('/login')
  })

  it('treats empty string token as unauthenticated', async () => {
    localStorage.setItem('auth', '')
    const { result } = renderHook(() => useAuth())

    await waitFor(() => {
      expect(result.current.isAuthenticated).toBe(false)
    })
    expect(mockPush).toHaveBeenCalledWith('/login')
  })
})
