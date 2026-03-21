import axios from 'axios'
import { request } from '@/api/config'

jest.mock('axios')
const mockedAxios = axios as jest.MockedFunction<typeof axios>

describe('request', () => {
  it('attaches Bearer token from localStorage', async () => {
    localStorage.setItem('auth', 'my-jwt-token')
    mockedAxios.mockResolvedValueOnce({ data: { ok: true } })

    await request({ endpoint: 'test' })

    expect(mockedAxios).toHaveBeenCalledWith(
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer my-jwt-token',
        }),
      })
    )
  })

  it('sends Bearer null when no token in localStorage', async () => {
    mockedAxios.mockResolvedValueOnce({ data: { ok: true } })

    await request({ endpoint: 'test' })

    expect(mockedAxios).toHaveBeenCalledWith(
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer null',
        }),
      })
    )
  })

  it('returns response.data on success', async () => {
    mockedAxios.mockResolvedValueOnce({ data: { users: [] } })

    const result = await request({ endpoint: 'users' })

    expect(result).toEqual({ users: [] })
  })

  it('uses GET method by default', async () => {
    mockedAxios.mockResolvedValueOnce({ data: {} })

    await request({ endpoint: 'test' })

    expect(mockedAxios).toHaveBeenCalledWith(
      expect.objectContaining({ method: 'get' })
    )
  })

  it('uses specified method', async () => {
    mockedAxios.mockResolvedValueOnce({ data: {} })

    await request({ endpoint: 'test', method: 'POST', data: { foo: 1 } })

    expect(mockedAxios).toHaveBeenCalledWith(
      expect.objectContaining({ method: 'POST', data: { foo: 1 } })
    )
  })

  it('sets 7 second timeout by default', async () => {
    mockedAxios.mockResolvedValueOnce({ data: {} })

    await request({ endpoint: 'test' })

    expect(mockedAxios).toHaveBeenCalledWith(
      expect.objectContaining({ timeout: 7000 })
    )
  })

  it('throws timeout message on ECONNABORTED', async () => {
    mockedAxios.mockRejectedValueOnce({ code: 'ECONNABORTED' })

    await expect(request({ endpoint: 'test' })).rejects.toBe(
      'O servidor não respondeu a tempo, tente novamente mais tarde!'
    )
  })

  it('removes token on 401', async () => {
    localStorage.setItem('auth', 'expired-token')
    mockedAxios.mockRejectedValueOnce({
      response: { status: 401 },
    })

    // Suppress jsdom "Not implemented: navigation" console.error
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

    await expect(request({ endpoint: 'test' })).rejects.toEqual(
      expect.objectContaining({ response: { status: 401 } })
    )
    expect(localStorage.getItem('auth')).toBeNull()

    consoleErrorSpy.mockRestore()
  })

  it('throws permission error on 403', async () => {
    mockedAxios.mockRejectedValueOnce({
      response: { status: 403 },
    })

    await expect(request({ endpoint: 'test' })).rejects.toBe(
      'Você não tem permissão para acessar esse recurso'
    )
  })

  it('throws not found error on 404 with empty data', async () => {
    mockedAxios.mockRejectedValueOnce({
      response: { status: 404, data: [] },
    })

    await expect(request({ endpoint: 'test' })).rejects.toBe(
      'Recurso não encontrado'
    )
  })

  it('builds correct baseURL from endpoint', async () => {
    mockedAxios.mockResolvedValueOnce({ data: {} })

    await request({ endpoint: 'login' })

    expect(mockedAxios).toHaveBeenCalledWith(
      expect.objectContaining({
        baseURL: 'https://letramundo-back-main-r7azsi.laravel.cloud/api/login',
      })
    )
  })
})
