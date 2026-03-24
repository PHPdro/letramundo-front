import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CustomTable } from '../index'
import { deleteStudent } from '@/api/student'

const mockSetEditStudent = jest.fn()

jest.mock('@/contexts/GamePlayEasyContext', () => ({
  useGamePlayEasy: () => ({ setEditStudent: mockSetEditStudent }),
}))

jest.mock('@/api/student', () => ({
  deleteStudent: jest.fn(),
}))

const mockedDeleteStudent = deleteStudent as jest.MockedFunction<typeof deleteStudent>

const students = [
  { id: 1, name: 'Maria Silva', level: 3, year: 2, class: 'a', theme: 'Cowboy' },
  { id: 2, name: 'João Santos', level: 5, year: 1, class: 'b', theme: 'Praia' },
]

function renderWithProviders(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  )
}

describe('CustomTable', () => {
  it('renders student names', () => {
    renderWithProviders(<CustomTable data={students} />)

    expect(screen.getAllByText('Maria Silva').length).toBeGreaterThan(0)
    expect(screen.getAllByText('João Santos').length).toBeGreaterThan(0)
  })

  it('renders student levels', () => {
    renderWithProviders(<CustomTable data={students} />)

    expect(screen.getAllByText('3').length).toBeGreaterThan(0)
    expect(screen.getAllByText('5').length).toBeGreaterThan(0)
  })

  it('renders student class info', () => {
    renderWithProviders(<CustomTable data={students} />)

    expect(screen.getAllByText(/2º A/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/1º B/i).length).toBeGreaterThan(0)
  })

  it('renders table headers', () => {
    renderWithProviders(<CustomTable data={students} />)

    expect(screen.getByText('ALUNO')).toBeInTheDocument()
    expect(screen.getByText('NÍVEL')).toBeInTheDocument()
    expect(screen.getByText('TURMA')).toBeInTheDocument()
    expect(screen.getByText('AÇÕES')).toBeInTheDocument()
  })

  it('renders play links with correct theme paths', () => {
    renderWithProviders(<CustomTable data={students} />)

    const playLinks = screen.getAllByRole('link', { name: /começar jogo/i })
    expect(playLinks.some(link => link.getAttribute('href') === 'niveis/cowboy')).toBe(true)
    expect(playLinks.some(link => link.getAttribute('href') === 'niveis/praia')).toBe(true)
  })

  it('renders edit links pointing to /editar', () => {
    renderWithProviders(<CustomTable data={students} />)

    const editLinks = screen.getAllByRole('link', { name: /editar/i })
    editLinks.forEach(link => {
      expect(link).toHaveAttribute('href', '/editar')
    })
  })

  it('clears localStorage "aluno" on mount', () => {
    localStorage.setItem('aluno', JSON.stringify({ name: 'old' }))

    renderWithProviders(<CustomTable data={students} />)

    expect(localStorage.getItem('aluno')).toBeNull()
  })

  it('stores student in localStorage when mobile play link is clicked', () => {
    renderWithProviders(<CustomTable data={students} />)

    const playLinks = screen.getAllByRole('link', { name: /começar jogo/i })
    fireEvent.click(playLinks[0])

    const stored = JSON.parse(localStorage.getItem('aluno')!)
    expect(stored.name).toBe('Maria Silva')
  })

  it('stores student in localStorage when desktop play link is clicked', () => {
    renderWithProviders(<CustomTable data={students} />)

    // Desktop play links are the second set (indices 2+)
    const playLinks = screen.getAllByRole('link', { name: /começar jogo/i })
    const desktopPlayLink = playLinks[playLinks.length - 1]
    fireEvent.click(desktopPlayLink)

    const stored = JSON.parse(localStorage.getItem('aluno')!)
    expect(stored.name).toBe('João Santos')
  })

  it('stores student in localStorage and calls setEditStudent on mobile edit click', () => {
    renderWithProviders(<CustomTable data={students} />)

    const editLinks = screen.getAllByRole('link', { name: /editar/i })
    fireEvent.click(editLinks[0])

    const stored = JSON.parse(localStorage.getItem('aluno')!)
    expect(stored.name).toBe('Maria Silva')
    expect(mockSetEditStudent).toHaveBeenCalledWith(students[0])
  })

  it('stores student in localStorage and calls setEditStudent on desktop edit click', () => {
    renderWithProviders(<CustomTable data={students} />)

    const editLinks = screen.getAllByRole('link', { name: /editar/i })
    const desktopEditLink = editLinks[editLinks.length - 1]
    fireEvent.click(desktopEditLink)

    const stored = JSON.parse(localStorage.getItem('aluno')!)
    expect(stored.name).toBe('João Santos')
    expect(mockSetEditStudent).toHaveBeenCalledWith(students[1])
  })

  it('renders delete buttons with confirmation popover', () => {
    renderWithProviders(<CustomTable data={students} />)

    const deleteIcons = document.querySelectorAll('[aria-label="delete"]')
    expect(deleteIcons.length).toBeGreaterThan(0)
  })

  it('calls deleteStudent when delete is confirmed', async () => {
    mockedDeleteStudent.mockResolvedValueOnce(undefined)
    renderWithProviders(<CustomTable data={students} />)

    // Click a delete icon to open Popconfirm
    const deleteIcons = document.querySelectorAll('[aria-label="delete"]')
    fireEvent.click(deleteIcons[0])

    // Confirm the deletion
    const confirmButton = await screen.findByRole('button', { name: /sim/i })
    fireEvent.click(confirmButton)

    await waitFor(() => {
      expect(mockedDeleteStudent).toHaveBeenCalledWith(1)
    })
  })

  it('shows success message after successful deletion', async () => {
    mockedDeleteStudent.mockResolvedValueOnce(undefined)
    renderWithProviders(<CustomTable data={students} />)

    const deleteIcons = document.querySelectorAll('[aria-label="delete"]')
    fireEvent.click(deleteIcons[0])

    const confirmButton = await screen.findByRole('button', { name: /sim/i })
    fireEvent.click(confirmButton)

    await waitFor(() => {
      expect(screen.getByText('Aluno excluído com sucesso')).toBeInTheDocument()
    })
  })

  it('shows error message when deletion fails', async () => {
    mockedDeleteStudent.mockRejectedValueOnce(new Error('Network error'))
    renderWithProviders(<CustomTable data={students} />)

    const deleteIcons = document.querySelectorAll('[aria-label="delete"]')
    fireEvent.click(deleteIcons[0])

    const confirmButton = await screen.findByRole('button', { name: /sim/i })
    fireEvent.click(confirmButton)

    await waitFor(() => {
      expect(screen.getByText('Erro ao excluir aluno: Network error')).toBeInTheDocument()
    })
  })

  it('calls deleteStudent from desktop view when confirmed', async () => {
    mockedDeleteStudent.mockResolvedValueOnce(undefined)
    renderWithProviders(<CustomTable data={students} />)

    // Desktop delete icons are the last set
    const deleteIcons = document.querySelectorAll('[aria-label="delete"]')
    const desktopDeleteIcon = deleteIcons[deleteIcons.length - 1]
    fireEvent.click(desktopDeleteIcon)

    const confirmButton = await screen.findByRole('button', { name: /sim/i })
    fireEvent.click(confirmButton)

    await waitFor(() => {
      expect(mockedDeleteStudent).toHaveBeenCalledWith(2)
    })
  })

  it('handles empty data gracefully', () => {
    renderWithProviders(<CustomTable data={[]} />)

    expect(screen.getByText('ALUNO')).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /começar jogo/i })).not.toBeInTheDocument()
  })

  it('handles undefined data gracefully', () => {
    renderWithProviders(<CustomTable data={undefined} />)

    expect(screen.getByText('ALUNO')).toBeInTheDocument()
  })
})
