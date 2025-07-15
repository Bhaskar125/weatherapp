"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw, MapPin } from "lucide-react"

interface WeatherErrorProps {
  error: Error | null
  onRetry: () => void
}

export function WeatherError({ error, onRetry }: WeatherErrorProps) {
  const getErrorMessage = (error: Error | null) => {
    if (!error) return "An unexpected error occurred"
    
    if (error.message.includes("City not found")) {
      return "City not found. Please check the spelling and try again."
    }
    
    if (error.message.includes("temporarily unavailable")) {
      return "Weather service is temporarily unavailable. Please try again later."
    }
    
    if (error.message.includes("Location parameter required")) {
      return "Location is required to get weather data."
    }
    
    return error.message || "Failed to load weather data"
  }

  const getErrorIcon = (error: Error | null) => {
    if (error?.message.includes("Location")) {
      return MapPin
    }
    return AlertTriangle
  }

  const ErrorIcon = getErrorIcon(error)

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Card className="max-w-md w-full">
        <CardContent className="flex flex-col items-center text-center p-6">
          <ErrorIcon className="h-12 w-12 text-destructive mb-4" />
          <h2 className="text-xl font-semibold mb-2">Unable to Load Weather</h2>
          <p className="text-muted-foreground mb-6">
            {getErrorMessage(error)}
          </p>
          <Button onClick={onRetry} className="w-full">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
