import { useEffect, useState } from 'react'

export const useDebounce = (value, ms = 300) => {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebounceValue(value)
    }, ms)
    return () => {
      clearTimeout(timerId)
    }
  }, [value])
  return debounceValue
}
