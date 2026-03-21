import { render, screen } from '@testing-library/react'
import Home from '../page'

const mockUseFetchStudents = jest.fn()

jest.mock('@/hooks/useFetchStudents', () => ({
  useFetchStudents: () => mockUseFetchStudents(),
}))

jest.mock('@/components/Navbar', () => ({
  NavBar: () => <nav data-testid="navbar">NavBar</nav>,
}))

jest.mock('@/components/EmptyTable', () => ({
  EmptyTable: () => <div data-testid="empty-table">EmptyTable</div>,
}))

jest.mock('@/components/CustomTable', () => ({
  CustomTable: ({ data }: { data: any[] }) => (
    <table data-testid="custom-table">
      <tbody>
        {data.map((s: any, i: number) => (
          <tr key={i}><td>{s.name}</td></tr>
        ))}
      </tbody>
    </table>
  ),
}))

describe('Home (inicio/page)', () => {
  it('shows spinner while fetching', () => {
    mockUseFetchStudents.mockReturnValue({ students: [], isFetching: true })

    render(<Home />)

    expect(screen.getByTestId('navbar')).toBeInTheDocument()
    expect(screen.queryByTestId('empty-table')).not.toBeInTheDocument()
    expect(screen.queryByTestId('custom-table')).not.toBeInTheDocument()
    expect(document.querySelector('.ant-spin')).toBeInTheDocument()
  })

  it('shows EmptyTable when no students', () => {
    mockUseFetchStudents.mockReturnValue({ students: [], isFetching: false })

    render(<Home />)

    expect(screen.getByTestId('navbar')).toBeInTheDocument()
    expect(screen.getByTestId('empty-table')).toBeInTheDocument()
    expect(screen.queryByTestId('custom-table')).not.toBeInTheDocument()
  })

  it('shows CustomTable with students and "Adicionar aluno" button', () => {
    const students = [
      { name: 'Maria', level: 1, year: 2, class: 'a', theme: 'cowboy' },
      { name: 'João', level: 3, year: 1, class: 'b', theme: 'praia' },
    ]
    mockUseFetchStudents.mockReturnValue({ students, isFetching: false })

    render(<Home />)

    expect(screen.getByTestId('navbar')).toBeInTheDocument()
    expect(screen.getByTestId('custom-table')).toBeInTheDocument()
    expect(screen.queryByTestId('empty-table')).not.toBeInTheDocument()
    expect(screen.getByText('Maria')).toBeInTheDocument()
    expect(screen.getByText('João')).toBeInTheDocument()
  })

  it('has link to /novoaluno when students exist', () => {
    const students = [{ name: 'Ana', level: 1, year: 1, class: 'a', theme: 'animais' }]
    mockUseFetchStudents.mockReturnValue({ students, isFetching: false })

    render(<Home />)

    const link = screen.getByRole('link', { name: /adicionar aluno/i })
    expect(link).toHaveAttribute('href', '/novoaluno')
  })
})
