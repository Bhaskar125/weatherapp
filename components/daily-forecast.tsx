"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useWeatherStore } from "@/lib/weather-store"
import { formatTemperature, getWeatherIcon, formatDate } from "@/lib/utils"
import type { ForecastData } from "@/lib/types"
import Image from "next/image"

interface DailyForecastProps {
  forecast: ForecastData
}

interface DailyWeatherData {
  date: number
  temps: number[]
  weather: {
    id: number
    main: string
    description: string
    icon: string
  }
  humidity: number
  pop: number
}

interface ProcessedDailyData extends DailyWeatherData {
  tempMin: number
  tempMax: number
}

export function DailyForecast({ forecast }: DailyForecastProps) {
  const { settings } = useWeatherStore()

  // Group forecast data by day and get daily min/max
  const dailyData = forecast.list.reduce(
    (acc, item) => {
      const date = new Date(item.dt * 1000).toDateString()

      if (!acc[date]) {
        acc[date] = {
          date: item.dt,
          temps: [item.main.temp],
          weather: item.weather[0],
          humidity: item.main.humidity,
          pop: item.pop,
        }
      } else {
        acc[date].temps.push(item.main.temp)
        // Use weather from midday (around 12:00)
        const itemHour = new Date(item.dt * 1000).getHours()
        if (itemHour >= 12 && itemHour <= 15) {
          acc[date].weather = item.weather[0]
        }
      }

      return acc
    },
    {} as Record<string, DailyWeatherData>,
  )

  const dailyForecast: ProcessedDailyData[] = Object.values(dailyData)
    .slice(0, 5)
    .map((day) => ({
      ...day,
      tempMin: Math.min(...day.temps),
      tempMax: Math.max(...day.temps),
    }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {dailyForecast.map((day, index) => (
          <div key={day.date} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-sm font-medium min-w-[60px]">{index === 0 ? "Today" : formatDate(day.date)}</div>
              <Image
                src={getWeatherIcon(day.weather.icon) || "/placeholder.svg"}
                alt={day.weather.description}
                width={32}
                height={32}
                className="drop-shadow-sm"
              />
              <div className="text-sm capitalize">{day.weather.description}</div>
            </div>

            <div className="flex items-center space-x-4 text-sm">
              <div className="text-muted-foreground">{Math.round(day.pop * 100)}%</div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold">{formatTemperature(day.tempMax, settings.temperatureUnit)}</span>
                <span className="text-muted-foreground">
                  {formatTemperature(day.tempMin, settings.temperatureUnit)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
