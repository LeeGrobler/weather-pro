export const getCurrentLocation = async () => {
    return new Promise<string>((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async res => {
            const { latitude: lat, longitude: lon } = res.coords

            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${process.env.REACT_APP_GOOGLEMAPS_API_KEY}`,
            )

            if (!response?.ok) {
              throw new Error('Network response was not ok')
            }

            const data = await response.json()

            const city = data.results[0]?.address_components.find(
              (component: { types: string[] }) => component.types.includes('locality'),
            )?.long_name

            return resolve(city)
          },
          err => {
            console.log('err:', err)
            return resolve('amsterdam')
          },
        )
      } else {
        console.log('Geolocation is not supported by this browser.')
        resolve('amsterdam')
      }
    })
  }