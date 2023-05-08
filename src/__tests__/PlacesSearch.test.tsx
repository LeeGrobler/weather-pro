import { render, screen, fireEvent } from '@testing-library/react'
import PlacesSearch from '../features/location/PlacesSearch'

const mockOnPlaceSelected = vi.fn()

describe('PlacesSearch', () => {
  beforeEach(() => {
    render(<PlacesSearch onPlaceSelected={mockOnPlaceSelected} placeholder="City" />)
  })

  it('renders the input field with the correct placeholder', () => {
    const input = screen.getByPlaceholderText('City')
    expect(input).toBeInTheDocument()
  })

  it('updates the input value and calls onPlaceSelected when a place is selected', () => {
    const input = screen.getByPlaceholderText('City')
    fireEvent.change(input, { target: { value: 'Amsterdam' } })
    expect(input).toHaveValue('Amsterdam')
  })

  it('clears the input value when the clear button is clicked', () => {
    const input = screen.getByPlaceholderText('City')
    fireEvent.change(input, { target: { value: 'Amsterdam' } })
    expect(input).toHaveValue('Amsterdam')

    const clearButton = screen.getByText('X')
    fireEvent.click(clearButton)
    expect(input).toHaveValue('')
  })
})
