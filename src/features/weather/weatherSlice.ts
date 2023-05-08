import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { setLoading } from '../shared/commonSlice'
import Weather from '../../models/Weather'
import Forecast from '../../models/Forecast'
import WeatherState from '../../models/WeatherState'
import { alert } from '../../app/utils'

const initialState: WeatherState = {
  weather: undefined,
  forecast: undefined,
}

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city: string, { dispatch }) => {
    dispatch(setLoading(true))

    const key: string = import.meta.env.VITE_OPENWEATHER_API_KEY
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`,
    )

    dispatch(setLoading(false))

    const data: Weather = await response.json()

    if (data.cod !== 200) {
      alert(dispatch, data.message || 'Unable to retrieve weather data')
      throw new Error()
    }

    return data
  },
)

export const fetchForecast = createAsyncThunk(
  'weather/fetchForecast',
  async (city: string, { dispatch }) => {
    dispatch(setLoading(true))

    const key: string = import.meta.env.VITE_OPENWEATHER_API_KEY
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&units=metric`,
    )

    dispatch(setLoading(false))

    const data: Forecast = await response.json()

    if (data.cod !== '200') {
      alert(dispatch, data.message || 'Unable to retrieve forecast data')
      throw new Error()
    }

    return data
  },
)

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWeather.fulfilled, (state, { payload }: { payload: Weather }) => {
        state.weather = payload
      })
      .addCase(fetchForecast.fulfilled, (state, { payload }: { payload: Forecast }) => {
        state.forecast = payload
      })
  },
})

export default weatherSlice.reducer
