import React, { useState, useEffect } from 'react'
// import axios from 'axios'
import CurrentWeather from './CurrentWeather'
import Forecast from './Forecast'

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

interface ForecastData {
  list: {
    dt_txt: string
    main: {
      temp_min: number
      temp_max: number
    }
    weather: {
      main: string
      description: string
      icon: string
    }[]
  }[]
}

const Weather = () => {
  // const [city, setCity] = useState<string>('amsterdam')
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [forecastData, setForecastData] = useState<ForecastData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const getCurrentLocation = async () => {
    return new Promise<string>((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async res => {
            const { latitude: lat, longitude: lon } = res.coords

            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${process.env.REACT_APP_GOOGLEMAPS_API_KEY}`,
            )

            if (!response?.ok) {
              throw new Error('Network response was not ok')
            }

            const data = await response.json()

            const city = data.results[0]?.address_components.find(
              (component: { types: string[] }) => component.types.includes('locality'),
            )?.long_name

            return resolve(city.toLowerCase())
          },
          err => {
            console.log('err:', err)
            return resolve('amsterdam')
          },
        )
      } else {
        console.log('Geolocation is not supported by this browser.')
        return resolve('amsterdam')
      }
    })
  }

  const getWeatherData = async (city: string) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&units=metric`,
      )

      if (!response?.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()

      setWeatherData(data)
      setLoading(false)
    } catch (err) {
      console.log('err:', err)
      setError(true)
      setLoading(false)
    }
  }

  const getForecastData = async (city: string) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&units=metric`,
      )

      if (!response?.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()

      setForecastData(data)
    } catch (err) {
      console.log('err:', err)
    }
  }

  useEffect(() => {
    const initialise = async () => {
      const city = await getCurrentLocation()
      getWeatherData(city)
      getForecastData(city)
    }

    initialise()
  }, [])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Unable to fetch weather data</p>
  }

  const { name, weather, main, wind } = weatherData!
  const forecastList = forecastData?.list || []

  return (
    <div>
      <h1 className="text-xl mb-4 uppercase text-gray-300">Weather Pro</h1>
      <h1 className="text-3xl font-bold mb-2">{name}</h1>
      <CurrentWeather
        weather={{
          temperature: main.temp,
          description_main: weather[0].main,
          description_detailed: weather[0].description,
          icon: weather[0].icon,
          feels_like: main.feels_like,
          wind_speed: wind.speed,
          humidity: main.humidity,
        }}
      />

      <Forecast forecast={forecastList} />
    </div>
  )
}

export default Weather
