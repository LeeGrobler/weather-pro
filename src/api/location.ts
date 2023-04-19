export const fetchLocation = (lat: number | undefined, lon: number | undefined) => {
  return fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${process.env.REACT_APP_GOOGLEMAPS_API_KEY}`,
  )
    .then(response => response.json())
    .then(data => {
      const city = data.results[0]?.address_components.find((component: { types: string[] }) =>
        component.types.includes('locality'),
      )?.long_name
      return city
    })
}

export const getCurrentLocation = async () => {
    return new Promise<string>((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async ({coords}) => {
            const { latitude, longitude }  = coords
            const city =  fetchLocation(latitude, longitude)
            return resolve(city)
          },
          err => {
            console.log('err:', err)
            return reject('Location not found')
          },
        )
      } else {
       return reject('Geolocation is not supported by this browser.')
      }
    })
}
