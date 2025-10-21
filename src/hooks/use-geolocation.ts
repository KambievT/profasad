import { useCallback, useEffect, useState } from "react"

type Options = {
  language?: string
  storageKey?: string
  highAccuracy?: boolean
  timeoutMs?: number
  maximumAgeMs?: number
  endpoint?: string
  enabled?: boolean
  formatter?: (address: any) => string
}

export function useGeolocationLabel(options: Options = {}) {
  const {
    language = "ru",
    storageKey = "user_location_label",
    highAccuracy = true,
    timeoutMs = 10000,
    maximumAgeMs = 300000,
    endpoint = "https://nominatim.openstreetmap.org/reverse",
    enabled = true,
    formatter,
  } = options

  const [label, setLabel] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const buildLabel = useCallback(
    (address: any) => {
      if (formatter) return formatter(address)
      const a = address || {}
      const city = a.city || a.town || a.village || a.municipality || a.state
      const country = a.country
      return city ? (country ? `${city}, ${country}` : city) : country || "Ваше местоположение"
    },
    [formatter]
  )

  const detect = useCallback(() => {
    setError(false)
    setLoading(true)
    if (!("geolocation" in navigator)) {
      setError(true)
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords
          const url = `${endpoint}?lat=${latitude}&lon=${longitude}&format=json&accept-language=${encodeURIComponent(
            language
          )}`
          const res = await fetch(url, { headers: { Accept: "application/json" } })
          const data = await res.json()
          const text = buildLabel(data?.address)
          setLabel(text)
          try {
            localStorage.setItem(storageKey, text)
          } catch {}
          setLoading(false)
        } catch {
          setError(true)
          setLoading(false)
        }
      },
      () => {
        setError(true)
        setLoading(false)
      },
      { enableHighAccuracy: highAccuracy, timeout: timeoutMs, maximumAge: maximumAgeMs }
    )
  }, [buildLabel, endpoint, language, highAccuracy, timeoutMs, maximumAgeMs, storageKey])

  useEffect(() => {
    if (!enabled) return
    try {
      const cached = localStorage.getItem(storageKey)
      if (cached) {
        setLabel(cached)
        return
      }
    } catch {}
    detect()
  }, [detect, enabled, storageKey])

  return { label, loading, error, detect }
}
