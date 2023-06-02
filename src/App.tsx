import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from './app/hooks'
import { fetchCoordinates, fetchCity } from './features/location/locationSlice'
import { fetchWeather, fetchForecast } from './features/weather/weatherSlice'

import Spinner from './features/shared/Spinner'
import Location from './features/location/Location'
import Weather from './features/weather/Weather'
import Alert from './features/shared/Alert'

import bg from './assets/images/bg.jpg'

const App = () => {
  const dispatch = useAppDispatch()
  const coords = useAppSelector(state => state.location.coordinates)
  const city = useAppSelector(state => state.location.city)

  useEffect(() => {
    dispatch(fetchCoordinates())
  }, [dispatch])

  useEffect(() => {
    if (coords) {
      dispatch(fetchCity(coords))
    }
  }, [dispatch, coords])

  useEffect(() => {
    if (city) {
      dispatch(fetchWeather(city))
      dispatch(fetchForecast(city))
    }
  }, [dispatch, city])

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Spinner />
      <main className="p-4 flex flex-col gap-8 md:max-w-md mx-auto backdrop-blur-md rounded-3xl w-full">
        <Location />
        <Weather city={city} />
      </main>
      <Alert />

      <footer className="text-center text-gray-100 text-md mt-4 absolute bottom-2 left-2">
        By{' '}
        <a
          href="https://lee-grobler.com"
          className="text-gray-50 hover:text-gray-100"
          target="_blank"
        >
          Lee Grobler
        </a>
        <span className="text-gray-100 mx-1">•</span>
        <a
          href="https://github.com/LeeGrobler/weather-pro"
          className="text-gray-50 hover:text-gray-100"
          target="_blank"
        >
          GitHub
        </a>
        <span className="text-gray-100 mx-1">•</span>
        {/* current year */}
        {new Date().getFullYear()}
      </footer>
    </div>
  )
}

export default App
