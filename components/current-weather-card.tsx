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
    <Card className="overflow-hidden shadow-2xl border-0 backdrop-blur-sm bg-white/10 dark:bg-black/10">
      <CardContent className={`p-8 bg-gradient-to-br ${backgroundGradient} text-white relative`}>
        {/* Glass morphism overlay */}
        <div className="absolute inset-0 bg-white/20 dark:bg-black/20 backdrop-blur-sm"></div>
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Image
                    src={getWeatherIcon(weather.weather[0].icon) || "/placeholder.svg"}
                    alt={weather.weather[0].description}
                    width={100}
                    height={100}
                    className="drop-shadow-2xl filter brightness-110"
                  />
                  {/* Glow effect behind icon */}
                  <div className="absolute inset-0 bg-white/30 rounded-full blur-xl scale-75 -z-10"></div>
                </div>
                <div className="space-y-1">
                  <div className="text-5xl font-bold drop-shadow-lg">
                    {formatTemperature(weather.main.temp, settings.temperatureUnit)}
                  </div>
                  <div className="text-xl opacity-90 drop-shadow-md">
                    Feels like {formatTemperature(weather.main.feels_like, settings.temperatureUnit)}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-2xl font-semibold capitalize drop-shadow-md bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm">
                  {weather.weather[0].description}
                </div>
                <div className="text-lg opacity-90 drop-shadow-md bg-black/10 px-3 py-1 rounded-full backdrop-blur-sm inline-block">
                  H: {formatTemperature(weather.main.temp_max, settings.temperatureUnit)} • L:{" "}
                  {formatTemperature(weather.main.temp_min, settings.temperatureUnit)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-24 h-24 bg-white/10 rounded-full blur-xl opacity-50"></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/20 rounded-full blur-lg opacity-60"></div>
      </CardContent>
    </Card>
  )
}
