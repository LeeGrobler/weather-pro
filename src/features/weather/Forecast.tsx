import _ from 'lodash'
import { ForecastListItem } from '../../models/Forecast'

type ForecastItemProps = {
  iconUrl: string
  description: string
  temp: string
  humidity: string
  date: string
}

const ForecastItem = ({ iconUrl, description, temp, humidity, date }: ForecastItemProps) => {
  return (
    <div className="flex-none bg-white p-4 rounded-3xl shadow w-36">
      <p className="text-sm font-semibold">{date}</p>
      <img src={iconUrl} alt={description} />
      <p className="text-xs">{_.startCase(description)}</p>
      <p className="text-xs">Temp: {temp}°C</p>
      <p className="text-xs">Humidity: {humidity}%</p>
    </div>
  )
}

type Props = {
  forecast: ForecastListItem[]
}

const Forecast = ({ forecast }: Props) => {
  return (
    <div className="overflow-x-scroll whitespace-nowrap pb-4 w-full flex gap-4">
      {forecast.map((v, i) => {
        const iconUrl = `http://openweathermap.org/img/w/${v.weather[0].icon}.png`
        const description = v.weather[0].description
        const temp = v.main.temp.toFixed(0)
        const humidity = v.main.humidity.toString()
        const date = new Date(v.dt * 1000).toLocaleDateString(undefined, {
          day: 'numeric',
          month: 'numeric',
        })
        const time = new Date(v.dt * 1000).toLocaleTimeString(undefined, {
          hour: 'numeric',
          minute: 'numeric',
        })

        return (
          <ForecastItem
            key={i}
            iconUrl={iconUrl}
            description={description}
            temp={temp}
            humidity={humidity}
            date={`${date} ${time}`}
          />
        )
      })}
    </div>
  )
}

export default Forecast
