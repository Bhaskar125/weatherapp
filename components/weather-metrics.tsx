"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useWeatherStore } from "@/lib/weather-store"
import { formatTime, getWindDirection } from "@/lib/utils"
import type { WeatherData } from "@/lib/types"
import { Droplets, Wind, Eye, Gauge, Sunrise, Sunset, Thermometer, Cloud } from "lucide-react"

interface WeatherMetricsProps {
  weather: WeatherData
}

export function WeatherMetrics({ weather }: WeatherMetricsProps) {
  const { settings } = useWeatherStore()

  const metrics = [
    {
      title: "Humidity",
      value: `${weather.main.humidity}%`,
      icon: Droplets,
      description: "Relative humidity",
    },
    {
      title: "Wind",
      value: `${Math.round(weather.wind.speed * 3.6)} km/h`,
      icon: Wind,
      description: `${getWindDirection(weather.wind.deg)} direction`,
    },
    {
      title: "Visibility",
      value: `${(weather.visibility / 1000).toFixed(1)} km`,
      icon: Eye,
      description: "Horizontal visibility",
    },
    {
      title: "Pressure",
      value: `${weather.main.pressure} hPa`,
      icon: Gauge,
      description: "Atmospheric pressure",
    },
    {
      title: "Sunrise",
      value: formatTime(weather.sys.sunrise, weather.timezone),
      icon: Sunrise,
      description: "Local sunrise time",
    },
    {
      title: "Sunset",
      value: formatTime(weather.sys.sunset, weather.timezone),
      icon: Sunset,
      description: "Local sunset time",
    },
    {
      title: "Cloudiness",
      value: `${weather.clouds.all}%`,
      icon: Cloud,
      description: "Cloud coverage",
    },
    {
      title: "UV Index",
      value: "N/A",
      icon: Thermometer,
      description: "UV radiation level",
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {metrics.map((metric) => {
        const Icon = metric.icon
        return (
          <Card key={metric.title}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Icon className="h-4 w-4 text-muted-foreground" />
                {metric.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
