import { render, screen } from '@testing-library/react'
import { EmptyTable } from '../index'

describe('EmptyTable', () => {
  it('renders welcome message', () => {
    render(<EmptyTable />)

    expect(screen.getByText('Bem vindo(a)!')).toBeInTheDocument()
    expect(screen.getByText('Comece cadastrando seu primeiro aluno.')).toBeInTheDocument()
  })

  it('renders "Adicionar aluno" button linking to /novoaluno', () => {
    render(<EmptyTable />)

    const link = screen.getByRole('link', { name: /adicionar aluno/i })
    expect(link).toHaveAttribute('href', '/novoaluno')
  })

  it('renders decorative images', () => {
    render(<EmptyTable />)

    expect(screen.getByAltText('Aviãozinho')).toBeInTheDocument()
    expect(screen.getByAltText('Garotinha')).toBeInTheDocument()
  })
})
