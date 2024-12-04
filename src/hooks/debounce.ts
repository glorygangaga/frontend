import { useEffect, useState } from "react"

export function useDebounce<T>(value: T, delay = 500) {
  if (value === undefined) return;
  const [debounced, setDebouncet] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncet(value)
    }, delay);
    return () => clearTimeout(handler)
  }, [value, delay])

  return debounced;
}
