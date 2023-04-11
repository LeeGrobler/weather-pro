import { render, screen } from '@testing-library/react'
import Weather from './Weather'

describe('Weather', () => {
  it('renders correctly', () => {
    render(<Weather />)

    const titleElement = screen.getByText(/loading/i)
    expect(titleElement).toBeInTheDocument()
  })

  it('renders weather data', async () => {
    render(<Weather />)

    await screen.findByText(/rotterdam/i, {}, { timeout: 5000 })
    const weatherElement = screen.getByText(/rotterdam/i)
    expect(weatherElement).toBeInTheDocument()
  })

  it('renders error message when api call fails', async () => {
    ;(global as any).fetch = jest.fn()
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => {},
    })

    render(<Weather />)

    await screen.findByText(/unable to fetch weather data/i, {}, { timeout: 5000 })
    const errorMessageElement = screen.getByText(/unable to fetch weather data/i)
    expect(errorMessageElement).toBeInTheDocument()

    jest.clearAllMocks()
  })
})
