export interface ForecastListItem {
  dt: number
  main: {
    temp: number
    humidity: number
    feels_like?: number
    temp_min?: number
    temp_max?: number
    pressure?: number
    sea_level?: number
    grnd_level?: number
    temp_kf?: number
  }
  weather: {
    icon: string
    description: string
    id?: number
    main?: string
  }[]
  clouds?: {
    all: number
  }
  wind?: {
    speed: number
    deg: number
    gust: number
  }
  visibility?: number
  pop?: number
  sys?: {
    pod: string
  }
  dt_txt?: string
}

export default interface Forecast {
  cod: string
  message?: string
  cnt: number
  list: ForecastListItem[]
  city: {
    id: number
    name: string
    coord: {
      lat: number
      lon: number
    }
    country: string
    population: number
    timezone: number
    sunrise: number
    sunset: number
  }
}
