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
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 md:col-span-4 text-center items-center">
          <div className="grid grid-cols-12 ">
            <div className="col-span-2">
              {icon && (
                <img
                  src={`http://openweathermap.org/img/w/${icon}.png`}
                  alt={description}
                  className="mr-2 w-16 h-16"
                />
              )}
            </div>
            <div className="col-span-10  text-left items-left">
              <div className="grid grid-cols-2 ">
                <h1 className="text-2xl font-bold mb-4 items-center">{name}</h1>
                <br />
                <p className="text-l">{display_name}</p>
                <br />
                <p className="italic">{description}</p>
              </div>
            </div>
          </div>
        </div>
 
        <div className="col-span-1 gap-4">
          <div>
            <p className="font-bold">Temperature</p>
            <p>{temp}&deg;C</p>
          </div>
        </div>
        <div className="col-span-1">
          <div>
            <p className="font-bold">Feels like</p>
            <p>{feels_like}&deg;C</p>
          </div>
        </div>
        <div className="col-span-1">
          <div>
            <p className="font-bold">Wind</p>
            <p>{wind_speed} km/h</p>
          </div>
        </div>
        <div className="col-span-1">
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
