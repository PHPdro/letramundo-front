import { renderHook, waitFor } from '@testing-library/react'
import { useAuth } from '@/hooks/auth/useAuth'

const mockPush = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}))

describe('useAuth', () => {
  it('returns true when token exists in localStorage', async () => {
    localStorage.setItem('auth', 'fake-token')
    const { result } = renderHook(() => useAuth())

    await waitFor(() => {
      expect(result.current).toBe(true)
    })
    expect(mockPush).not.toHaveBeenCalled()
  })

  it('returns false and redirects to /login when no token', async () => {
    const { result } = renderHook(() => useAuth())

    await waitFor(() => {
      expect(result.current).toBe(false)
    })
    expect(mockPush).toHaveBeenCalledWith('/login')
  })

  it('treats empty string token as unauthenticated', async () => {
    localStorage.setItem('auth', '')
    const { result } = renderHook(() => useAuth())

    await waitFor(() => {
      expect(result.current).toBe(false)
    })
    expect(mockPush).toHaveBeenCalledWith('/login')
  })
})
