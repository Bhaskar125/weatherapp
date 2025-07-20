import { WeatherDashboard } from "@/components/weather-dashboard"
import { Suspense } from "react"
import { WeatherSkeleton } from "@/components/weather-skeleton"

export default function Home() {
  return (
    <Suspense fallback={<WeatherSkeleton />}>
      <WeatherDashboard />
    </Suspense>
  )
}
