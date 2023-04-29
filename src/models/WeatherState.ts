import Forecast from './Forecast'
import Weather from './Weather'

export default interface WeatherState {
  weather?: Weather
  forecast?: Forecast
}
