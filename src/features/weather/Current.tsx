import _ from 'lodash'

type Props = {
  city: string
  iconUrl: string
  description: string
  temp: string
  humidity: string
}

const Current = ({ city, iconUrl, description, temp, humidity }: Props) => {
  return (
    <div className="p-4 bg-white rounded-3xl shadow">
      <h2 className="text-2xl font-bold">{city}</h2>
      <div className="flex items-center">
        <img src={iconUrl} alt={description} />
        <p className="ml-2">{_.startCase(description)}</p>
      </div>
      <p>Temperature: {temp}°C</p>
      <p>Humidity: {humidity}%</p>
    </div>
  )
}

export default Current
