import { useCallback } from 'react'

import PlacesSearch from './PlacesSearch'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { showAlert, hideAlert } from '../shared/commonSlice'
import { updateCity } from './locationSlice'

const Location = () => {
  const dispatch = useAppDispatch()

  const city = useAppSelector(state => state.location.city)

  const handlePlaceSelected = useCallback(
    (place: google.maps.places.PlaceResult) => {
      const city = place.address_components?.find(v => v.types.includes('locality'))

      if (!city) {
        dispatch(showAlert({ message: 'Unable to retrieve city name' }))
        setTimeout(() => dispatch(hideAlert()), 10000)
        return
      }

      dispatch(updateCity(city.long_name))
    },
    [dispatch],
  )

  return <PlacesSearch onPlaceSelected={handlePlaceSelected} placeholder="City" value={city} />
}

export default Location
