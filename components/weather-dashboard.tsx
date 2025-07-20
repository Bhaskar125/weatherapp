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
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
        <WeatherSkeleton />
      </div>
    )
  }

  // Show error state
  if (weatherError || forecastError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
        <div className="container mx-auto px-4 py-8">
          <WeatherError error={weatherError || forecastError} onRetry={handleRefresh} />
        </div>
      </div>
    )
  }

  // Show location request if no location
  if (!currentLocation && !geoLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-white drop-shadow-lg">Welcome to WeatherPro</h1>
              <p className="text-lg text-white/90 drop-shadow-md">
                Get accurate weather forecasts for your location
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleLocationRequest} size="lg" className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm">
                <MapPin className="h-5 w-5 mr-2" />
                Use Current Location
              </Button>
            </div>
            {geoError && (
              <p className="text-sm text-red-200 bg-red-500/20 px-4 py-2 rounded-full backdrop-blur-sm">
                {geoError}
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Show main weather dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
      <div className="container mx-auto px-4 py-6 space-y-6">
        <WeatherHeader />

        <h1 className="text-3xl font-bold text-white drop-shadow-lg">
          {currentLocation?.name}
          {currentLocation?.country && `, ${currentLocation.country}`}
        </h1>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {weatherData && <CurrentWeatherCard weather={weatherData} />}
            {weatherData && <WeatherMetrics weather={weatherData} />}
          </div>

          <div className="space-y-6">
            {forecastData && <HourlyForecast forecast={forecastData} />}
            {forecastData && <DailyForecast forecast={forecastData} />}
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleRefresh}
            variant="outline"
            size="sm"
            disabled={weatherLoading || forecastLoading}
            className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${weatherLoading || forecastLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>
    </div>
  )
}
