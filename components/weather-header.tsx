"use client"

import type React from "react"

import { useState } from "react"
import { Search, Settings, Moon, Sun, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useWeatherStore } from "@/lib/weather-store"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

export function WeatherHeader() {
  const [searchQuery, setSearchQuery] = useState("")

  const { recentSearches, settings, setCurrentLocation, addRecentSearch, clearRecentSearches, setTemperatureUnit } =
    useWeatherStore()

  const { setTheme, theme } = useTheme()
  const { toast } = useToast()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    try {
      const response = await fetch(`/api/weather/current?q=${encodeURIComponent(searchQuery.trim())}`)
      
      if (!response.ok) {
        throw new Error("City not found")
      }
      
      const result = await response.json()
      
      const location = {
        lat: result.coord.lat,
        lon: result.coord.lon,
        name: result.name,
        country: result.sys.country,
      }

      setCurrentLocation(location)
      addRecentSearch(location)
      setSearchQuery("")

      toast({
        title: "Location Updated",
        description: `Now showing weather for ${location.name}, ${location.country}`,
      })
    } catch (error) {
      toast({
        title: "Search Failed",
        description: "City not found. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleRecentSearch = (location: (typeof recentSearches)[0]) => {
    setCurrentLocation(location)
    toast({
      title: "Location Updated",
      description: `Now showing weather for ${location.name}, ${location.country}`,
    })
  }

  return (
    <header className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div className="flex-1 max-w-md">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for a city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          {recentSearches.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-lg z-50">
              <div className="p-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-muted-foreground">Recent Searches</span>
                  <Button variant="ghost" size="sm" onClick={clearRecentSearches} className="h-auto p-1 text-xs">
                    Clear
                  </Button>
                </div>
                {recentSearches.map((location, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentSearch(location)}
                    className="w-full text-left p-2 hover:bg-muted rounded text-sm"
                  >
                    {location.name}, {location.country}
                  </button>
                ))}
              </div>
            </div>
          )}
        </form>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Temperature Unit</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setTemperatureUnit("celsius")}>
              <span className="flex-1">Celsius (°C)</span>
              {settings.temperatureUnit === "celsius" && <Badge variant="secondary">Active</Badge>}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTemperatureUnit("fahrenheit")}>
              <span className="flex-1">Fahrenheit (°F)</span>
              {settings.temperatureUnit === "fahrenheit" && <Badge variant="secondary">Active</Badge>}
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuLabel>Theme</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setTheme("light")}>
              <Sun className="h-4 w-4 mr-2" />
              <span className="flex-1">Light</span>
              {theme === "light" && <Badge variant="secondary">Active</Badge>}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              <Moon className="h-4 w-4 mr-2" />
              <span className="flex-1">Dark</span>
              {theme === "dark" && <Badge variant="secondary">Active</Badge>}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              <Monitor className="h-4 w-4 mr-2" />
              <span className="flex-1">System</span>
              {theme === "system" && <Badge variant="secondary">Active</Badge>}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
