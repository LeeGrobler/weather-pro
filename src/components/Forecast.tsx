import React from 'react'

type ForecastProps = {
  forecast: {
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

const Forecast = ({ forecast }: ForecastProps) => {
  const [showForecast, setShowForecast] = React.useState(false)

  return (
    <>
      <button
        onClick={() => setShowForecast(!showForecast)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        {showForecast ? 'Hide Forecast' : 'Show Forecast'}
      </button>

      {showForecast && (
        <div className="flex flex-wrap">
          {forecast?.map(item => (
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
    </>
  )
}

export default Forecast
