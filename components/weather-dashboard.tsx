"use client"

import { useEffect } from "react"
import { useWeatherStore } from "@/lib/weather-store"
import { useCurrentWeather, useForecast } from "@/hooks/use-weather"
import { useGeolocation } from "@/hooks/use-geolocation"
import { WeatherHeader } from "./weather-header"
import { CurrentWeatherCard } from "./current-weather-card"
import { WeatherMetrics } from "./weather-metrics"
import { HourlyForecast } from "./hourly-forecast"
import { DailyForecast } from "./daily-forecast"
import { WeatherError } from "./weather-error"
import { WeatherSkeleton } from "./weather-skeleton"
import { Button } from "@/components/ui/button"
import { MapPin, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function WeatherDashboard() {
  const { currentLocation, setCurrentLocation } = useWeatherStore()
  const { location: geoLocation, loading: geoLoading, error: geoError, getCurrentLocation } = useGeolocation()
  const { toast } = useToast()

  const {
    data: weatherData,
    error: weatherError,
    isLoading: weatherLoading,
    mutate: refreshWeather,
  } = useCurrentWeather(currentLocation)

  const {
    data: forecastData,
    error: forecastError,
    isLoading: forecastLoading,
    mutate: refreshForecast,
  } = useForecast(currentLocation)

  // Auto-detect location on first load
  useEffect(() => {
    if (!currentLocation && !geoLoading && !geoLocation) {
      getCurrentLocation()
    }
  }, [currentLocation, geoLoading, geoLocation])

  // Update current location when geolocation succeeds
  useEffect(() => {
    if (geoLocation && !currentLocation) {
      setCurrentLocation(geoLocation)
    }
  }, [geoLocation, currentLocation, setCurrentLocation])

  const handleRefresh = async () => {
    try {
      await Promise.all([refreshWeather(), refreshForecast()])
      toast({
        title: "Weather Updated",
        description: "Latest weather data has been loaded.",
      })
    } catch (error) {
      toast({
        title: "Refresh Failed",
        description: "Unable to update weather data. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleLocationRequest = () => {
    getCurrentLocation()
  }

  // Show loading state
  if ((weatherLoading || forecastLoading) && !weatherData) {
    return <WeatherSkeleton />
  }

  // Show error state
  if (weatherError || forecastError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <WeatherError error={weatherError || forecastError} onRetry={handleRefresh} />
      </div>
    )
  }

  // Show location request if no location available
  if (!currentLocation && !geoLoading) {
    return (
      <div className="container mx-auto px-4 py-6 space-y-6">
        <WeatherHeader />
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <MapPin className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Welcome to WeatherPro</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            Get accurate weather information by using your current location or search for any city above.
          </p>
          {geoError && <p className="text-sm text-destructive mb-4">{geoError}</p>}
          <Button onClick={handleLocationRequest} disabled={geoLoading}>
            <MapPin className="h-4 w-4 mr-2" />
            {geoLoading ? "Getting Location..." : "Use Current Location"}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <WeatherHeader />

      {weatherData && (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              {weatherData.name}, {weatherData.sys.country}
            </h1>
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={weatherLoading || forecastLoading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${weatherLoading || forecastLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <CurrentWeatherCard weather={weatherData} />
              <WeatherMetrics weather={weatherData} />
            </div>

            <div className="space-y-6">
              {forecastData && (
                <>
                  <HourlyForecast forecast={forecastData} />
                  <DailyForecast forecast={forecastData} />
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
