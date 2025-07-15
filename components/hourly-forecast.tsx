"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useWeatherStore } from "@/lib/weather-store"
import { formatTemperature, getWeatherIcon } from "@/lib/utils"
import type { ForecastData } from "@/lib/types"
import Image from "next/image"
import { format } from "date-fns"

interface HourlyForecastProps {
  forecast: ForecastData
}

export function HourlyForecast({ forecast }: HourlyForecastProps) {
  const { settings } = useWeatherStore()

  // Get next 24 hours (8 entries, 3-hour intervals)
  const hourlyData = forecast.list.slice(0, 8)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">24-Hour Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-4 pb-4">
            {hourlyData.map((item, index) => {
              const time = index === 0 ? "Now" : format(new Date(item.dt * 1000), "HH:mm")

              return (
                <div key={item.dt} className="flex flex-col items-center space-y-2 min-w-[80px]">
                  <div className="text-sm font-medium">{time}</div>
                  <Image
                    src={getWeatherIcon(item.weather[0].icon) || "/placeholder.svg"}
                    alt={item.weather[0].description}
                    width={40}
                    height={40}
                    className="drop-shadow-sm"
                  />
                  <div className="text-sm font-semibold">
                    {formatTemperature(item.main.temp, settings.temperatureUnit)}
                  </div>
                  <div className="text-xs text-muted-foreground">{Math.round(item.pop * 100)}%</div>
                </div>
              )
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
