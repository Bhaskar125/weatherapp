import { WeatherDashboard } from "@/components/weather-dashboard"
import { Suspense } from "react"
import { WeatherSkeleton } from "@/components/weather-skeleton"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
      <Suspense fallback={<WeatherSkeleton />}>
        <WeatherDashboard />
      </Suspense>
    </main>
  )
}
