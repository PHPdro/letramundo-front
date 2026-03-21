import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { request } from '@/api/config'
import Login from '../page'

const mockPush = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}))

jest.mock('@/api/config', () => ({
  request: jest.fn(),
}))

const mockedRequest = request as jest.MockedFunction<typeof request>

describe('Login', () => {
  it('renders login form with email and password fields', () => {
    render(<Login />)

    expect(screen.getByText('Entrar', { selector: 'h2' })).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Senha')).toBeInTheDocument()
  })

  it('renders submit button', () => {
    render(<Login />)

    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument()
  })

  it('renders link to registration page', () => {
    render(<Login />)

    const link = screen.getByRole('link', { name: /cadastre-se/i })
    expect(link).toHaveAttribute('href', '/cadastrar')
  })

  it('renders link to password recovery', () => {
    render(<Login />)

    const link = screen.getByRole('link', { name: /esqueceu sua senha/i })
    expect(link).toHaveAttribute('href', '/recuperarsenha')
  })

  it('renders marketing content', () => {
    render(<Login />)

    expect(screen.getByText('Aprender é para todos!')).toBeInTheDocument()
    expect(screen.getByText('Ferramentas inclusivas')).toBeInTheDocument()
    expect(screen.getByText('100% gratuito')).toBeInTheDocument()
  })

  it('stores token and navigates on successful login', async () => {
    mockedRequest.mockResolvedValueOnce({ data: { token: 'new-token' } })

    render(<Login />)

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@test.com' } })
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: 'password123' } })
    fireEvent.submit(screen.getByRole('button', { name: /entrar/i }))

    await waitFor(() => {
      expect(mockedRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          endpoint: 'login',
          method: 'POST',
        })
      )
    })
    await waitFor(() => {
      expect(localStorage.getItem('auth')).toBe('new-token')
      expect(mockPush).toHaveBeenCalledWith('/inicio')
    })
  })

  it('shows error message on failed login', async () => {
    mockedRequest.mockRejectedValueOnce(new Error('Invalid'))

    render(<Login />)

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@test.com' } })
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: 'wrong' } })
    fireEvent.submit(screen.getByRole('button', { name: /entrar/i }))

    await waitFor(() => {
      expect(screen.getByText('Erro ao fazer login, verifique suas credenciais.')).toBeInTheDocument()
    })
  })
})
