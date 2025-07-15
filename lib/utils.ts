import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { TemperatureUnit } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertTemperature(temp: number, unit: TemperatureUnit): number {
  if (unit === "fahrenheit") {
    return (temp * 9) / 5 + 32
  }
  return temp
}

export function formatTemperature(temp: number, unit: TemperatureUnit): string {
  const converted = convertTemperature(temp, unit)
  const symbol = unit === "celsius" ? "°C" : "°F"
  return `${Math.round(converted)}${symbol}`
}

export function getWeatherIcon(iconCode: string): string {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
}

export function getWeatherBackground(weatherMain: string): string {
  const backgrounds = {
    Clear: "from-yellow-400 to-orange-500",
    Clouds: "from-gray-400 to-gray-600",
    Rain: "from-blue-500 to-blue-700",
    Drizzle: "from-blue-400 to-blue-600",
    Thunderstorm: "from-purple-600 to-gray-800",
    Snow: "from-blue-200 to-white",
    Mist: "from-gray-300 to-gray-500",
    Smoke: "from-gray-400 to-gray-600",
    Haze: "from-yellow-200 to-gray-400",
    Dust: "from-yellow-300 to-orange-400",
    Fog: "from-gray-200 to-gray-400",
    Sand: "from-yellow-400 to-orange-500",
    Ash: "from-gray-500 to-gray-700",
    Squall: "from-gray-600 to-blue-800",
    Tornado: "from-gray-700 to-red-800",
  }

  return backgrounds[weatherMain as keyof typeof backgrounds] || "from-blue-400 to-blue-600"
}

export function formatTime(timestamp: number, timezone: number): string {
  const date = new Date((timestamp + timezone) * 1000)
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  })
}

export function formatDate(timestamp: number): string {
  const date = new Date(timestamp * 1000)
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })
}

export function getWindDirection(degrees: number): string {
  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ]
  const index = Math.round(degrees / 22.5) % 16
  return directions[index]
}

export function getUVIndexLevel(uvIndex: number): { level: string; color: string } {
  if (uvIndex <= 2) return { level: "Low", color: "text-green-600" }
  if (uvIndex <= 5) return { level: "Moderate", color: "text-yellow-600" }
  if (uvIndex <= 7) return { level: "High", color: "text-orange-600" }
  if (uvIndex <= 10) return { level: "Very High", color: "text-red-600" }
  return { level: "Extreme", color: "text-purple-600" }
}
