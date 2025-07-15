"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useWeatherStore } from "@/lib/weather-store"
import { formatTemperature, getWeatherIcon, getWeatherBackground } from "@/lib/utils"
import type { WeatherData } from "@/lib/types"
import Image from "next/image"

interface CurrentWeatherCardProps {
  weather: WeatherData
}

export function CurrentWeatherCard({ weather }: CurrentWeatherCardProps) {
  const { settings } = useWeatherStore()
  const backgroundGradient = getWeatherBackground(weather.weather[0].main)

  return (
    <Card className="overflow-hidden">
      <CardContent className={`p-6 bg-gradient-to-br ${backgroundGradient} text-white`}>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Image
                src={getWeatherIcon(weather.weather[0].icon) || "/placeholder.svg"}
                alt={weather.weather[0].description}
                width={80}
                height={80}
                className="drop-shadow-lg"
              />
              <div>
                <div className="text-4xl font-bold">
                  {formatTemperature(weather.main.temp, settings.temperatureUnit)}
                </div>
                <div className="text-lg opacity-90">
                  Feels like {formatTemperature(weather.main.feels_like, settings.temperatureUnit)}
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-xl font-medium capitalize">{weather.weather[0].description}</div>
              <div className="text-sm opacity-75">
                H: {formatTemperature(weather.main.temp_max, settings.temperatureUnit)} • L:{" "}
                {formatTemperature(weather.main.temp_min, settings.temperatureUnit)}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
