import React, { useState, useEffect, useCallback } from 'react'
import CurrentWeather from './CurrentWeather'
import Forecast from './Forecast'
import Places from './Places'
import { getCityWeatherData, getCityForecastData } from '../api/weather'
import { getCurrentLocation } from '../api/location'

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
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState(false)
  const [city, setCity] = useState<string>()
  const [debouncedValue, setDebouncedValue] = useState(city)

  const onCityChange = (e: React.ChangeEvent<HTMLInputElement>) => setCity(e?.target?.value  || '')

  const getWeatherData = useCallback(async () => {
    if(!city) return
    try {
      const data = await getCityWeatherData(city)

      setWeatherData(data)
      setLoading(false)
      setError(false)
    } catch (err) {
      console.log('err:', err)
      setError(true)
      setLoading(false)
    }
  }, [city])

  const getForecastData = useCallback(async () => {
    if(!city) return

    try {
      const data = await getCityForecastData(city)
      setForecastData(data)
    } catch (err) {
      console.log('err:', err)
    }
  }, [city])

  const getUserLocation = async () => {
    if(city) return
    try {
      const data = await getCurrentLocation()
      setCity(data)
    } catch (err) {
      console.log('err:', err)
    }
  }
  useEffect(() => {
    getUserLocation()
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

  const forecastList = forecastData?.list || []

  return (
    <div>
      <Places onChange={onCityChange} value={city}  placeholder={loading? 'Searching current location...':''}/>
      <h1 className="text-3xl font-bold mb-2">{loading ? 'Loading...' : weatherData?.name}</h1>
      <h6 className="text-3xl font-bold mb-2">{error && 'Unable to fetch weather data!'}</h6>
     {!loading && city && <>
     <CurrentWeather
        weather={{
          temperature: weatherData?.main?.temp || 0,
          description_main: weatherData?.weather[0]?.main || '',
          description_detailed: weatherData?.weather[0]?.description || '',
          icon: weatherData?.weather[0].icon || '',
          feels_like: weatherData?.main?.feels_like || 0,
          wind_speed: weatherData?.wind?.speed || 0,
          humidity: weatherData?.main?.humidity || 0,
        }}
      />

      <Forecast forecast={forecastList} />
      </> }
    </div>
  )
}

export default Weather
