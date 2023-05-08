import { render, screen } from '@testing-library/react'
import Current from '../features/weather/Current'

const props = {
  city: 'Amsterdam',
  iconUrl: 'http://openweathermap.org/img/w/01d.png',
  description: 'clear sky',
  temp: '25',
  humidity: '48',
}

describe('Current', () => {
  it('renders the component with the provided data', () => {
    render(<Current {...props} />)

    expect(screen.getByText(props.city)).toBeInTheDocument()
    expect(screen.getByAltText(props.description)).toHaveAttribute('src', props.iconUrl)
    expect(screen.getByText(`Temperature: ${props.temp}°C`)).toBeInTheDocument()
    expect(screen.getByText(`Humidity: ${props.humidity}%`)).toBeInTheDocument()
  })
})
