import { render, screen } from '@testing-library/react'

import Forecast from '../features/weather/Forecast'
import { ForecastListItem } from '../models/Forecast'

const forecastData: ForecastListItem[] = [
  {
    dt: 1624356000,
    main: {
      temp: 22.5,
      humidity: 55,
    },
    weather: [
      {
        icon: '01d',
        description: 'clear sky',
      },
    ],
  },
  {
    dt: 1624366800,
    main: {
      temp: 24.3,
      humidity: 60,
    },
    weather: [
      {
        icon: '02d',
        description: 'few clouds',
      },
    ],
  },
]

describe('Forecast', () => {
  it('renders the component with the provided data', () => {
    render(<Forecast forecast={forecastData} />)

    forecastData.forEach(item => {
      const iconUrl = `http://openweathermap.org/img/w/${item.weather[0].icon}.png`
      const description = item.weather[0].description
      const temp = item.main.temp.toFixed(0)
      const humidity = item.main.humidity.toString()
      const date = new Date(item.dt * 1000).toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'numeric',
      })
      const time = new Date(item.dt * 1000).toLocaleTimeString(undefined, {
        hour: 'numeric',
        minute: 'numeric',
      })

      expect(screen.getByAltText(description)).toHaveAttribute('src', iconUrl)
      expect(screen.getByText(`${date} ${time}`)).toBeInTheDocument()
      expect(screen.getByText(`Temp: ${temp}°C`)).toBeInTheDocument()
      expect(screen.getByText(`Humidity: ${humidity}%`)).toBeInTheDocument()
    })
  })
})
