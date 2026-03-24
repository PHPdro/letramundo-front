import { render, screen, fireEvent } from '@testing-library/react'
import ThemeSelection from '../page'

jest.mock('@/components/Avatar', () => require('@/test/jogo-test-utils').mockAvatar)
jest.mock('@/components/BackButton', () => require('@/test/jogo-test-utils').mockBackButton)
jest.mock('next/navigation', () => require('@/test/jogo-test-utils').mockNextNavigationSimple)

const mockChangePhaseState = jest.fn()
jest.mock('@/contexts/GamePlayContext', () => ({
  useGamePlay: () => ({ changePhaseState: mockChangePhaseState }),
}))

const studentCurrentLevel = { name: 'Maria', level: 6, phase: 5 }
const studentHigherLevel = { name: 'Ana', level: 7, phase: 3 }

describe('ThemeSelection (nivel6/[theme]/page)', () => {
  beforeEach(() => {
    localStorage.clear()
    mockChangePhaseState.mockClear()
  })

  it('renders logo, avatar and back button', () => {
    localStorage.setItem('aluno', JSON.stringify(studentCurrentLevel))
    render(<ThemeSelection params={{ theme: 'alimentos' }} />)

    expect(screen.getByAltText('Logo')).toBeInTheDocument()
    expect(screen.getByTestId('avatar')).toBeInTheDocument()
    expect(screen.getByTestId('back-button')).toBeInTheDocument()
  })

  it('displays correct level heading', () => {
    localStorage.setItem('aluno', JSON.stringify(studentCurrentLevel))
    render(<ThemeSelection params={{ theme: 'alimentos' }} />)

    expect(screen.getByText('Nível 6')).toBeInTheDocument()
  })

  it('renders 8 phase buttons', () => {
    localStorage.setItem('aluno', JSON.stringify(studentCurrentLevel))
    render(<ThemeSelection params={{ theme: 'alimentos' }} />)

    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(8)
  })

  it('shows phase numbers for unlocked phases', () => {
    localStorage.setItem('aluno', JSON.stringify(studentCurrentLevel))
    render(<ThemeSelection params={{ theme: 'alimentos' }} />)

    for (let i = 1; i <= 5; i++) {
      expect(screen.getByText(String(i))).toBeInTheDocument()
    }
  })

  it('disables buttons for locked phases', () => {
    localStorage.setItem('aluno', JSON.stringify(studentCurrentLevel))
    render(<ThemeSelection params={{ theme: 'alimentos' }} />)

    const buttons = screen.getAllByRole('button')
    buttons.forEach((btn, index) => {
      if (index < 5) {
        expect(btn).not.toBeDisabled()
      } else {
        expect(btn).toBeDisabled()
      }
    })
  })

  it('unlocks all phases when student is on a higher level', () => {
    localStorage.setItem('aluno', JSON.stringify(studentHigherLevel))
    render(<ThemeSelection params={{ theme: 'alimentos' }} />)

    const buttons = screen.getAllByRole('button')
    buttons.forEach((btn) => {
      expect(btn).not.toBeDisabled()
    })
  })

  it('links each phase to jogo route', () => {
    localStorage.setItem('aluno', JSON.stringify(studentHigherLevel))
    render(<ThemeSelection params={{ theme: 'alimentos' }} />)

    const links = screen.getAllByRole('link').filter(
      (link) => link.getAttribute('href') !== 'niveis/alimentos'
    )
    expect(links).toHaveLength(8)
    links.forEach((link) => {
      expect(link).toHaveAttribute('href', 'alimentos/jogo')
    })
  })

  it('calls changePhaseState on button click', () => {
    localStorage.setItem('aluno', JSON.stringify(studentHigherLevel))
    render(<ThemeSelection params={{ theme: 'alimentos' }} />)

    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[0])
    expect(mockChangePhaseState).toHaveBeenCalledWith(1)
  })

  it('handles empty localStorage gracefully', () => {
    render(<ThemeSelection params={{ theme: 'alimentos' }} />)

    expect(screen.getAllByRole('button')).toHaveLength(8)
  })
})
