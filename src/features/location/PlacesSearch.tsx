import { useRef, useEffect, useState } from 'react'

type Props = {
  onPlaceSelected: (place: google.maps.places.PlaceResult) => void
  placeholder: string
  value?: string
}

const PlacesSearch = ({ onPlaceSelected, placeholder, value }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [googleLoaded, setGoogleLoaded] = useState(false)

  if (inputRef.current) {
    inputRef.current.value = value || ''
  }

  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  useEffect(() => {
    const key: string = import.meta.env.VITE_GOOGLEMAPS_API_KEY
    const script = document.createElement('script')

    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`
    script.async = true
    script.defer = true
    script.onload = () => {
      setGoogleLoaded(true)
    }

    if (!googleLoaded) {
      document.body.appendChild(script)
    }

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [googleLoaded])

  useEffect(() => {
    if (!inputRef.current || !googleLoaded) return

    const autoComplete = new google.maps.places.Autocomplete(inputRef.current)
    autoComplete.addListener('place_changed', () => {
      const place = autoComplete.getPlace()
      if (!place.geometry) return

      onPlaceSelected(place)
    })

    return () => {
      autoComplete.unbindAll()
    }
  }, [onPlaceSelected, googleLoaded])

  return (
    <div className="relative w-full">
      <input
        className="w-full p-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
        type="text"
        placeholder={placeholder}
        ref={inputRef}
      />

      <button
        className="absolute top-0 right-0 mt-3 mr-4 text-gray-500 cursor-pointer focus:outline-none"
        onClick={handleClear}
      >
        X
      </button>
    </div>
  )
}

export default PlacesSearch
