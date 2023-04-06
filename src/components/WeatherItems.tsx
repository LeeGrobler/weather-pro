import React, { useState, useEffect } from 'react'
import axios from 'axios'

interface WeatherProps {
  display_name: string
  name: string
  description: string
  icon?: string
  temp?: number
  feels_like?: number
  temp_min?: number
  temp_max?: number
  pressure?: number
  humidity?: number
  wind_speed?: number
}

const WeatherItems = (props: WeatherProps) => {
  const { temp, feels_like, wind_speed, humidity, display_name, name, description, icon } = props

  return (
    <>
     <div>
      <h1 className="text-2xl font-bold mb-4">{name}</h1>
      <div className="flex items-center">
        {icon && (
          <img
            src={`http://openweathermap.org/img/w/${icon}.png`}
            alt={description}
            className="mr-2 w-16 h-16"
          />
        )}
        <div>
          <p className="text-xl">{display_name}</p>
          <p>{description}</p>
        </div>
      </div>
      </div>

      
      <div className="grid grid-cols-2 gap-4">
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div>
            <p className="font-bold">Temperature</p>
            <p>{temp}&deg;C</p>
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
      </div>
    </>
  )
}

export default WeatherItems
