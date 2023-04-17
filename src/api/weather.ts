export const fetchWeather = (city:string| undefined)=>  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&units=metric`).then(
  (res) => res.json()
)
export const fetchForecast = (city:string| undefined)=>  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&units=metric`).then(
  (res) => res.json()
)