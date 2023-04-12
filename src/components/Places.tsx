import React, { useState } from 'react'
import { debounce } from 'lodash'

interface InputProps {
  placeholder?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string
}


const Places: React.FC<InputProps> = ({ placeholder = 'Search city name', onChange :search, value = ''}) => {
   

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={search}
      className="bg-gray-100 rounded-full px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 mb-20"
    />
  )
}

export default Places