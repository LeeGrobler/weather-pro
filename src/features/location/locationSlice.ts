import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { setLoading, showAlert, hideAlert } from '../shared/commonSlice'
import Coordinates from '../../models/Coordinates'
import LocationState from '../../models/LocationState'
import FetchCityResponse from '../../models/FetchCityResponse'

const initialState: LocationState = {
  coordinates: undefined,
  city: undefined,
}

export const fetchCoordinates = createAsyncThunk(
  'location/fetchCoordinates',
  async (_, { dispatch }) => {
    return new Promise<Coordinates>((resolve, reject) => {
      dispatch(setLoading(true))
      navigator.geolocation.getCurrentPosition(
        position => {
          dispatch(setLoading(false))
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        },
        err => {
          // TODO: extract show and hide alert to a helper function
          dispatch(setLoading(false))
          dispatch(showAlert({ message: err.message }))
          setTimeout(() => dispatch(hideAlert()), 10000)
          reject(err)
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      )
    })
  },
)

export const fetchCity = createAsyncThunk(
  'location/fetchCity',
  async (coordinates: Coordinates, { dispatch }) => {
    dispatch(setLoading(true))

    const lat = coordinates.latitude
    const lng = coordinates.longitude
    const key: string = import.meta.env.VITE_GOOGLEMAPS_API_KEY

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`,
    )

    dispatch(setLoading(false))

    const data: FetchCityResponse = await response.json()

    if (!data.results?.length) {
      dispatch(showAlert({ message: data.error_message || 'Unable to retrieve location data' }))
      setTimeout(() => dispatch(hideAlert()), 10000)
      throw new Error()
    }

    const city = data.results[0].address_components.find(v => v.types.includes('locality'))

    if (!city) {
      dispatch(showAlert({ message: 'Unable to retrieve city name' }))
      setTimeout(() => dispatch(hideAlert()), 10000)
      throw new Error()
    }

    return city.long_name
  },
)

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    updateCity: (state, action) => {
      state.city = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCoordinates.fulfilled, (state, action) => {
        state.coordinates = action.payload
      })
      .addCase(fetchCity.fulfilled, (state, action) => {
        state.city = action.payload
      })
  },
})

export const { updateCity } = locationSlice.actions

export default locationSlice.reducer
