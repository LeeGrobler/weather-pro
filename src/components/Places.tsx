import React, { useState } from 'react'
import { debounce } from 'lodash'

interface InputProps {
  placeholder?: string
  onChange: (searchTerm: string) => void
  value?: string
}

const Places: React.FC<InputProps> = ({ placeholder = 'Search city name', onChange: search , value = ''}) => {
  const [searchTerm, setSearchTerm] = useState(value)

  // use Reacts useRef to store the debounced function across renders
  const debouncedSearch = React.useRef(
    debounce(async criteria => {
      setSearchTerm(await search(criteria))
    }, 500),
  ).current

  React.useEffect(() => {
    return () => {
      debouncedSearch.cancel()
    }
  }, [])

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    debouncedSearch(e.target.value)
  }

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={searchTerm}
      onChange={handleChange}
      className="bg-gray-100 rounded-full px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 mb-20"
    />
  )
}

export default Places
