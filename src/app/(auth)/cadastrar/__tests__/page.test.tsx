import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createUser } from '@/api/user'
import SignUp from '../page'

const mockPush = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}))

jest.mock('@/api/user', () => ({
  createUser: jest.fn(),
}))

const mockedCreateUser = createUser as jest.MockedFunction<typeof createUser>

function renderWithProviders(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  })
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  )
}

function fillForm(overrides: Record<string, string> = {}) {
  const values = {
    Nome: 'Test User',
    Email: 'test@test.com',
    Senha: 'password123',
    'Confirmar senha': 'password123',
    ...overrides,
  }
  Object.entries(values).forEach(([label, value]) => {
    fireEvent.change(screen.getByLabelText(label), { target: { value } })
  })
}

describe('SignUp (cadastrar)', () => {
  it('renders registration form with all fields', () => {
    renderWithProviders(<SignUp />)

    expect(screen.getByText('Cadastrar', { selector: 'h2' })).toBeInTheDocument()
    expect(screen.getByLabelText('Nome')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Senha')).toBeInTheDocument()
    expect(screen.getByLabelText('Confirmar senha')).toBeInTheDocument()
  })

  it('renders link to login page', () => {
    renderWithProviders(<SignUp />)

    const link = screen.getByRole('link', { name: /entre aqui/i })
    expect(link).toHaveAttribute('href', '/login')
  })

  it('renders marketing content', () => {
    renderWithProviders(<SignUp />)

    expect(screen.getByText('Aprender é para todos!')).toBeInTheDocument()
    expect(screen.getByText('Educação personalizada')).toBeInTheDocument()
  })

  it('stores token and navigates on successful registration', async () => {
    mockedCreateUser.mockResolvedValueOnce({ data: { token: 'reg-token' } })

    renderWithProviders(<SignUp />)
    fillForm()
    fireEvent.submit(screen.getByRole('button', { name: /cadastrar/i }))

    await waitFor(() => {
      expect(mockedCreateUser).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Test User',
          email: 'test@test.com',
          password: 'password123',
          password_confirmation: 'password123',
        })
      )
    })
    await waitFor(() => {
      expect(localStorage.getItem('auth')).toBe('reg-token')
      expect(mockPush).toHaveBeenCalledWith('/inicio')
    })
  })

  it('shows error when passwords do not match', async () => {
    renderWithProviders(<SignUp />)
    fillForm({ 'Confirmar senha': 'different1' })
    fireEvent.submit(screen.getByRole('button', { name: /cadastrar/i }))

    await waitFor(() => {
      expect(screen.getByText('As senhas não coincidem!')).toBeInTheDocument()
    })
  })

  it('shows error message on failed registration', async () => {
    mockedCreateUser.mockRejectedValueOnce(new Error('Server error'))

    renderWithProviders(<SignUp />)
    fillForm()
    fireEvent.submit(screen.getByRole('button', { name: /cadastrar/i }))

    await waitFor(() => {
      expect(screen.getByText('Erro ao cadastrar usuário')).toBeInTheDocument()
    })
  })
})
