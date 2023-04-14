export const getCityWeatherData=async  (city:string)=>{
  
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&units=metric`,
    )

    if (!response?.ok) {
      throw new Error('Network response was not ok')
    }

    return response.json()

}

export const getCityForecastData=async  (city:string)=>{
  
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&units=metric`,
      )

    if (!response?.ok) {
      throw new Error('Network response was not ok')
    }

    return response.json()

}