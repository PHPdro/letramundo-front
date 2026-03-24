import { render, screen } from '@testing-library/react'
import Praia from '../page'

jest.mock('@/components/Avatar', () => ({
  Avatar: () => <div data-testid="avatar">Avatar</div>,
}))

jest.mock('@/components/BackButton', () => ({
  BackButton: ({ url, color }: { url: string; color: string }) => (
    <a data-testid="back-button" href={url} data-color={color}>Voltar</a>
  ),
}))

const studentLevel5 = { name: 'Julia', level: 5 }

describe('Praia (niveis/praia/page)', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders logo, avatar and back button with correct color', () => {
    localStorage.setItem('aluno', JSON.stringify(studentLevel5))
    render(<Praia />)

    expect(screen.getByAltText('Logo')).toBeInTheDocument()
    expect(screen.getByTestId('avatar')).toBeInTheDocument()
    expect(screen.getByTestId('back-button')).toHaveAttribute('data-color', 'blue')
  })

  it('displays student name in welcome message', () => {
    localStorage.setItem('aluno', JSON.stringify(studentLevel5))
    render(<Praia />)

    expect(screen.getByText(/Bem vindo, Julia!/)).toBeInTheDocument()
  })

  it('renders 12 level buttons', () => {
    localStorage.setItem('aluno', JSON.stringify(studentLevel5))
    render(<Praia />)

    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(12)
  })

  it('shows level number for unlocked levels', () => {
    localStorage.setItem('aluno', JSON.stringify(studentLevel5))
    render(<Praia />)

    for (let i = 1; i <= 5; i++) {
      expect(screen.getByText(String(i))).toBeInTheDocument()
    }
  })

  it('disables buttons for locked levels', () => {
    localStorage.setItem('aluno', JSON.stringify(studentLevel5))
    render(<Praia />)

    const buttons = screen.getAllByRole('button')
    buttons.forEach((btn, index) => {
      if (index < 5) {
        expect(btn).not.toBeDisabled()
      } else {
        expect(btn).toBeDisabled()
      }
    })
  })

  it('links each level to correct route with praia theme', () => {
    localStorage.setItem('aluno', JSON.stringify({ name: 'Ana', level: 12 }))
    render(<Praia />)

    const links = screen.getAllByRole('link').filter(
      (link) => link.getAttribute('href') !== 'inicio'
    )
    expect(links).toHaveLength(12)
    links.forEach((link, index) => {
      expect(link).toHaveAttribute('href', `/nivel${index + 1}/praia`)
    })
  })

  it('handles empty localStorage gracefully', () => {
    render(<Praia />)

    expect(screen.getAllByRole('button')).toHaveLength(12)
  })
})
