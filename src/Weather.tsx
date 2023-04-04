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

const Weather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const response = await axios.get<WeatherData>(
          `https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}&units=metric`,
        )
        setWeatherData(response.data)
        setLoading(false)
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    }

    getWeatherData()
  }, [])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Unable to fetch weather data</p>
  }

  const { name, weather, main, wind } = weatherData!

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
    </div>
  )
}

export default Weather
