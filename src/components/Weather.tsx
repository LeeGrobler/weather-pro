import React, { useState, useEffect, useCallback } from 'react'
// import axios from 'axios'
import CurrentWeather from './CurrentWeather'
import Forecast from './Forecast'
import Places from './Places'

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
  const [city, setCity] = useState('Amsterdam')
  const [error, setError] = useState(false)
  const onCityChange = (e: React.ChangeEvent<HTMLInputElement>) => setCity(e.target.value)
  const [debouncedValue, setDebouncedValue] = useState(city)

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

            setCity(city)
            return resolve(city)
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

  const getWeatherData = useCallback(async () => {
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
  }, [city])

  const getForecastData = useCallback(async () => {
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
  }, [city])

  useEffect(() => {
    getCurrentLocation()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(city), 500)
    return () => clearTimeout(timer)
  }, [city])

  useEffect(() => {
    const controller = new AbortController()

    if (debouncedValue) {
      getWeatherData()
      getForecastData()
    }

    return () => controller.abort()
  }, [debouncedValue, getWeatherData, getForecastData])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Unable to fetch weather data</p>
  }

  const { name, weather = [], main, wind } = weatherData!
  const forecastList = forecastData?.list || []

  return (
    <div>
      <Places onChange={onCityChange} value={city} />
      <h1 className="text-3xl font-bold mb-2">{name}</h1>
      <CurrentWeather
        weather={{
          temperature: main?.temp,
          description_main: weather[0]?.main,
          description_detailed: weather[0]?.description,
          icon: weather[0].icon,
          feels_like: main?.feels_like,
          wind_speed: wind.speed,
          humidity: main?.humidity,
        }}
      />

      <Forecast forecast={forecastList} />
    </div>
  )
}

export default Weather
