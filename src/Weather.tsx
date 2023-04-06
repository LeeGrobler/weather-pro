import React, { useState, useEffect } from 'react'
import axios from 'axios'
import WeatherItems from './components/WeatherItems'
import Places from './components/Places'

interface WeatherData {
  name: string
  weather: {
    main: string
    description: string
    icon: string
  }[]
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  wind: {
    speed: number
    deg: number
  }
}

const Weather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [city, setCity] = useState('Rotterdam')
  const [error, setError] = useState(false)

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const response = await axios.get<WeatherData>(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
            import.meta.env.VITE_OPENWEATHER_API_KEY
          }&units=metric`,
        )
        setWeatherData(response.data)
        setLoading(false)
        setError(false)
      } catch (error) {
        console.log('error:', error)
        setError(true)
        setLoading(false)
      }
    }

    getWeatherData()
  }, [city])

  const showWeatherData: boolean = !loading && !error && !!weatherData

  return (
    <div>

      <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
        <div className="bg-white rounded-lg p-6 shadow-md w-3/4">
          <Places onChange={e => setCity(e)} value={city}/>

          {loading && <p>Loading...</p>}

          {error && <p>Unable to fetch weather data for this location.</p>}

          {showWeatherData && (
              <WeatherItems
                wind_speed={weatherData?.wind.speed || 0}
                {...weatherData?.main}
                name={weatherData?.name || ''}
                display_name={weatherData?.weather[0].main || ''}
                description={weatherData?.weather[0].description || ''}
                icon={weatherData?.weather[0].icon}
              />
          )}
        </div>
      </div>
    </div>
  )
}

export default Weather
