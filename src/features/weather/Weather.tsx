import { useAppSelector } from '../../app/hooks'
import Current from './Current'
import Forecast from './Forecast'

type Props = {
  city?: string
}

const Weather = ({ city }: Props) => {
  const weather = useAppSelector(state => state.weather.weather)
  const forecast = useAppSelector(state => state.weather.forecast)

  const iconUrl = `http://openweathermap.org/img/w/${weather?.weather[0].icon}.png`
  const description = weather?.weather[0].description
  const temp = weather?.main.temp.toFixed(0)
  const humidity = weather?.main.humidity.toString()

  return (
    <>
      {city && iconUrl && description && temp && humidity && (
        <Current
          city={city}
          iconUrl={iconUrl}
          description={description}
          temp={temp}
          humidity={humidity}
        />
      )}

      {forecast?.list && <Forecast forecast={forecast.list} />}
    </>
  )
}

export default Weather
