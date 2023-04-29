import { configureStore } from '@reduxjs/toolkit'
import commonReducer from '../features/shared/commonSlice'
import locationReducer from '../features/location/locationSlice'
import weatherReducer from '../features/weather/weatherSlice'

const store = configureStore({
  reducer: {
    common: commonReducer,
    location: locationReducer,
    weather: weatherReducer,
  },
})

export default store
