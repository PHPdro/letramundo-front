import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { updateStudent } from '@/api/student'
import EditStudent from '../page'

const mockPush = jest.fn()
const mockSetStudent = jest.fn()

const mockEditStudent = {
  id: 5,
  name: 'Maria',
  year: 2,
  class: 'a',
  theme_id: 1,
}

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}))

jest.mock('@/components/Navbar', () => ({
  NavBar: () => <nav data-testid="navbar">NavBar</nav>,
}))

jest.mock('@/contexts/GamePlayEasyContext', () => ({
  useGamePlayEasy: () => ({
    editStudent: mockEditStudent,
    setStudent: mockSetStudent,
  }),
}))

jest.mock('@/hooks/useGetThemes', () => ({
  useFetchThemes: () => ({
    themes: [
      { id: 1, name: 'Alimentos' },
      { id: 2, name: 'Animais' },
    ],
  }),
}))

jest.mock('@/api/student', () => ({
  updateStudent: jest.fn(),
}))

const mockedUpdateStudent = updateStudent as jest.MockedFunction<typeof updateStudent>

function renderWithProviders(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  })
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  )
}

describe('EditStudent (editar)', () => {
  it('renders form with title "Editar"', () => {
    renderWithProviders(<EditStudent />)

    expect(screen.getByText('Editar')).toBeInTheDocument()
  })

  it('renders navbar', () => {
    renderWithProviders(<EditStudent />)

    expect(screen.getByTestId('navbar')).toBeInTheDocument()
  })

  it('renders all form fields', () => {
    renderWithProviders(<EditStudent />)

    expect(screen.getByLabelText('Nome')).toBeInTheDocument()
    expect(screen.getByLabelText('Série')).toBeInTheDocument()
    expect(screen.getByLabelText('Turma')).toBeInTheDocument()
    expect(screen.getByLabelText('Tema')).toBeInTheDocument()
  })

  it('renders submit button', () => {
    renderWithProviders(<EditStudent />)

    expect(screen.getByRole('button', { name: /editar aluno/i })).toBeInTheDocument()
  })

  it('populates form fields from localStorage', async () => {
    const student = { id: 5, name: 'Maria', year: 2, class: 'a', theme_id: 1 }
    localStorage.setItem('aluno', JSON.stringify(student))

    renderWithProviders(<EditStudent />)

    await waitFor(() => {
      expect(screen.getByLabelText('Nome')).toHaveValue('Maria')
      expect(screen.getByLabelText('Turma')).toHaveValue('a')
    })
    expect(mockSetStudent).toHaveBeenCalledWith(student)
  })

  it('calls updateStudent with student id on submit', async () => {
    mockedUpdateStudent.mockResolvedValueOnce(undefined)
    localStorage.setItem('aluno', JSON.stringify(mockEditStudent))

    renderWithProviders(<EditStudent />)

    await waitFor(() => {
      expect(screen.getByLabelText('Nome')).toHaveValue('Maria')
    })

    fireEvent.change(screen.getByLabelText('Nome'), { target: { value: 'Maria Editada' } })
    fireEvent.submit(screen.getByRole('button', { name: /editar aluno/i }))

    await waitFor(() => {
      expect(mockedUpdateStudent).toHaveBeenCalledWith(
        expect.objectContaining({ id: 5, name: 'Maria Editada' })
      )
    })
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/inicio')
    })
  })

  it('shows error message on failed update', async () => {
    mockedUpdateStudent.mockRejectedValueOnce(new Error('Fail'))
    localStorage.setItem('aluno', JSON.stringify(mockEditStudent))

    renderWithProviders(<EditStudent />)

    await waitFor(() => {
      expect(screen.getByLabelText('Nome')).toHaveValue('Maria')
    })

    fireEvent.submit(screen.getByRole('button', { name: /editar aluno/i }))

    await waitFor(() => {
      expect(screen.getByText('Erro ao editar aluno(a)')).toBeInTheDocument()
    })
  })

  it('calls setStudent with empty object when no localStorage data', () => {
    renderWithProviders(<EditStudent />)

    // Form initialValues come from editStudent context, but setStudent is called with parsed localStorage
    expect(mockSetStudent).toHaveBeenCalledWith({})
  })
})
