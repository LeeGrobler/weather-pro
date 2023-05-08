import { useCallback } from 'react'

import PlacesSearch from './PlacesSearch'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { updateCity } from './locationSlice'
import useAlert from '../../app/hooks/useAlert'

const Location = () => {
  const dispatch = useAppDispatch()
  const { alert } = useAlert()

  const city = useAppSelector(state => state.location.city)

  const handlePlaceSelected = useCallback(
    (place: google.maps.places.PlaceResult) => {
      const city = place.address_components?.find(v => v.types.includes('locality'))
      if (!city) return alert('Unable to retrieve city name')

      dispatch(updateCity(city.long_name))
    },
    [dispatch, alert],
  )

  return <PlacesSearch onPlaceSelected={handlePlaceSelected} placeholder="City" value={city} />
}

export default Location
