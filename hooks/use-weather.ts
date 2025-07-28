import useSWR from "swr"
import type { WeatherData, ForecastData, UVIndexData, Location } from "@/lib/types"

const fetcher = async (url: string) => {
  const response = await fetch(url)
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Failed to fetch weather data")
  }
  return response.json()
}

export function useCurrentWeather(location: Location | null) {
  const url = location ? `/api/weather/current?lat=${location.lat}&lon=${location.lon}` : null

  return useSWR<WeatherData>(url, fetcher, {
    refreshInterval: 300000, // 5 minutes
    revalidateOnFocus: false,
    errorRetryCount: 3,
    errorRetryInterval: 5000,
  })
}

export function useForecast(location: Location | null) {
  const url = location ? `/api/weather/forecast?lat=${location.lat}&lon=${location.lon}` : null

  return useSWR<ForecastData>(url, fetcher, {
    refreshInterval: 600000, // 10 minutes
    revalidateOnFocus: false,
    errorRetryCount: 3,
    errorRetryInterval: 5000,
  })
}

export function useUVIndex(location: Location | null) {
  const url = location ? `/api/weather/uv-index?lat=${location.lat}&lon=${location.lon}` : null

  return useSWR<UVIndexData>(url, fetcher, {
    refreshInterval: 300000, // 5 minutes
    revalidateOnFocus: false,
    errorRetryCount: 3,
    errorRetryInterval: 5000,
  })
}

export function useWeatherSearch(query: string) {
  const url = query.trim() ? `/api/weather/current?q=${encodeURIComponent(query.trim())}` : null

  return useSWR<WeatherData>(url, fetcher, {
    revalidateOnFocus: false,
    errorRetryCount: 1,
    dedupingInterval: 2000,
  })
}
