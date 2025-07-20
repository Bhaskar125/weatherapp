import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function WeatherSkeleton() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
          <Skeleton className="h-10 w-64 bg-white/30" />
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
          <Skeleton className="h-9 w-24 bg-white/30" />
        </div>
      </div>

      {/* Title */}
      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 w-fit">
        <Skeleton className="h-8 w-48 bg-white/30" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Current Weather Card */}
          <Card className="border-0 bg-white/10 backdrop-blur-sm shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-20 w-20 rounded-full bg-white/30" />
                    <div className="space-y-2">
                      <Skeleton className="h-12 w-24 bg-white/30" />
                      <Skeleton className="h-6 w-32 bg-white/30" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Skeleton className="h-6 w-40 bg-white/30" />
                    <Skeleton className="h-4 w-32 bg-white/30" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weather Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="border-0 bg-white/10 backdrop-blur-sm shadow-lg">
                <CardHeader className="pb-2">
                  <Skeleton className="h-4 w-16 bg-white/30" />
                </CardHeader>
                <CardContent className="pt-0">
                  <Skeleton className="h-8 w-12 mb-1 bg-white/30" />
                  <Skeleton className="h-3 w-20 bg-white/30" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {/* Hourly Forecast */}
          <Card className="border-0 bg-white/10 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <Skeleton className="h-6 w-32 bg-white/30" />
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4 overflow-x-auto">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center space-y-2 min-w-[80px]">
                    <Skeleton className="h-4 w-12 bg-white/30" />
                    <Skeleton className="h-10 w-10 rounded-full bg-white/30" />
                    <Skeleton className="h-4 w-8 bg-white/30" />
                    <Skeleton className="h-3 w-6 bg-white/30" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Daily Forecast */}
          <Card className="border-0 bg-white/10 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <Skeleton className="h-6 w-32 bg-white/30" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="h-4 w-12 bg-white/30" />
                    <Skeleton className="h-8 w-8 rounded-full bg-white/30" />
                    <Skeleton className="h-4 w-20 bg-white/30" />
                  </div>
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-4 w-8 bg-white/30" />
                    <Skeleton className="h-4 w-12 bg-white/30" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
