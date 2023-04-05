import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [forecastData, setForecastData] = useState<ForecastData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const response = await axios.get<WeatherData>(
          `https://api.openweathermap.org/data/2.5/weather?q=rotterdam&appid=${
            import.meta.env.VITE_OPENWEATHER_API_KEY
          }&units=metric`,
        )
        setWeatherData(response.data)
        setLoading(false)
      } catch (error) {
        console.log('error:', error)
        setError(true)
        setLoading(false)
      }
    }

    const getForecastData = async () => {
      try {
        const response = await axios.get<ForecastData>(
          `https://api.openweathermap.org/data/2.5/forecast?q=rotterdam&appid=${
            import.meta.env.VITE_OPENWEATHER_API_KEY
          }&units=metric`,
        )
        setForecastData(response.data)
      } catch (error) {
        console.log('error:', error)
      }
    }

    getWeatherData()
    getForecastData()
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
