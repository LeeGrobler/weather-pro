import React, { useState, useEffect } from 'react'
import axios from 'axios'

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
  const [showForecast, setShowForecast] = useState(false)

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
      <div className="flex items-center">
        <img
          src={`http://openweathermap.org/img/w/${weather[0].icon}.png`}
          alt={weather[0].description}
          className="mr-2 w-16 h-16"
        />
        <div>
          <p className="text-xl">{weather[0].main}</p>
          <p>{weather[0].description}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        <div>
          <p className="font-bold">Temperature</p>
          <p>{main.temp}&deg;C</p>
        </div>
        <div>
          <p className="font-bold">Feels like</p>
          <p>{main.feels_like}&deg;C</p>
        </div>
        <div>
          <p className="font-bold">Wind</p>
          <p>{wind.speed} km/h</p>
        </div>
        <div>
          <p className="font-bold">Humidity</p>
          <p>{main.humidity}%</p>
        </div>
      </div>

      <button
        onClick={() => setShowForecast(!showForecast)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        {showForecast ? 'Hide Forecast' : 'Show Forecast'}
      </button>

      {showForecast && (
        <div className="flex flex-wrap">
          {forecastList?.map(item => (
            <div key={item.dt_txt} className="w-1/2 md:w-1/4 lg:w-1/7 p-4">
              <div className="bg-white rounded-lg shadow-lg p-4">
                <h3 className="text-lg font-bold">{item.dt_txt}</h3>
                <div className="flex justify-between items-center mt-4">
                  <div>
                    <p className="font-bold">{item.main.temp_max}°C</p>
                    <p className="text-gray-500">{item.main.temp_min}°C</p>
                  </div>
                  <img
                    src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                    alt="Weather Icon"
                    className="w-16 h-16"
                  />
                </div>
                <p className="mt-4 text-gray-500">{item.weather[0].description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Weather
