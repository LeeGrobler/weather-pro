import React, { useState, useEffect, useCallback } from 'react'
import { useQuery, useQueries } from '@tanstack/react-query'
import CurrentWeather from './CurrentWeather'
import Forecast from './Forecast'
import Places from './Places'
import { fetchWeather, fetchForecast } from '../api/weather'
import { getCurrentLocation } from '../api/location'

// interface WeatherData {
//   name: string
//   weather: {
//     main: string
//     description: string
//     icon: string
//   }[]
//   main: {
//     temp: number
//     feels_like: number
//     temp_min: number
//     temp_max: number
//     pressure: number
//     humidity: number
//   }
//   wind: {
//     speed: number
//     deg: number
//   }
// }

// interface ForecastData {
//   list: {
//     dt_txt: string
//     main: {
//       temp_min: number
//       temp_max: number
//     }
//     weather: {
//       main: string
//       description: string
//       icon: string
//     }[]
//   }[]
// }

const Weather = () => {
  const [city, setCity] = useState<string>()
  const [debouncedValue, setDebouncedValue] = useState(city)

  const onCityChange = (e: React.ChangeEvent<HTMLInputElement>) => setCity(e?.target?.value || '')

  const {
    data: currentCity,
    status,
  } = useQuery({
    queryKey: ['currentLocation'],
    queryFn: getCurrentLocation,
    enabled: !city,
  })

  const [weather, forecast] = useQueries({
    queries: [
      {
        queryKey: ['weather', debouncedValue],
        queryFn: () => fetchWeather(city),
        enabled: !!city,
        refetchOnWindowFocus:true
        //  todo: add select function for data transformation
      },
      {
        queryKey: ['forecast', debouncedValue],
        queryFn: () => fetchForecast(city),
        enabled: !!city,
        refetchOnWindowFocus:true

      },
    ],
  })

  useEffect(() => {
    if (status === 'success') {
      setCity(currentCity || '')
    } else if (status !== 'loading') {
      setCity('Amsterdam')
    }
  }, [status])

  // used for debouncing on search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(city), 500)
    return () => clearTimeout(timer)
  }, [city])

  const weatherData = weather?.data
  const forecastList = forecast.data?.list || []

  return (
    <div>
      <Places
        onChange={onCityChange}
        value={city}
        placeholder={weather.isLoading ? 'Searching current location...' : ''}
      />
      <h1 className="text-3xl font-bold mb-2">
        {weather.isLoading ? 'Loading...' : weatherData?.name}
      </h1>

      {weather.isError && (
        <h6 className="text-3xl font-bold mb-2">'Unable to fetch weather data!</h6>
      )}
      {city && (
        <>
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
            isLoading={weather?.isLoading || false}
          />

          <Forecast forecast={forecastList} isLoading={forecast.isLoading} />
        </>
      )}
    </div>
  )
}

export default Weather
