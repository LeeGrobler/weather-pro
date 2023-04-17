import React from 'react'

type CurrentWeatherProps = {
  weather: {
    description_main: string
    description_detailed: string
    temperature: number
    wind_speed: number
    feels_like: number
    humidity: number
    icon: string
  }, 
  isLoading: boolean
}

const CurrentWeather = ({ weather , isLoading}: CurrentWeatherProps) => {
  const {
    description_main,
    description_detailed,
    temperature,
    wind_speed,
    feels_like,
    humidity,
    icon,
  } = weather
  if (isLoading) return null

  return (
    <>
      <div className="flex items-center">
        <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="weather icon" />
        <div>
          <p className="text-xl">{description_main}</p>
          <p>{description_detailed.charAt(0).toUpperCase() + description_detailed.slice(1)}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        <div>
          <p className="font-bold">Temperature</p>
          <p>{temperature}&deg;C</p>
        </div>
        <div>
          <p className="font-bold">Feels like</p>
          <p>{feels_like}&deg;C</p>
        </div>
        <div>
          <p className="font-bold">Wind</p>
          <p>{wind_speed} km/h</p>
        </div>
        <div>
          <p className="font-bold">Humidity</p>
          <p>{humidity}%</p>
        </div>
      </div>
    </>
  )
}

export default CurrentWeather
