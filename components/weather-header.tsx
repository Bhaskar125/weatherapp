"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { Search, Settings, Moon, Sun, Monitor, MapPin } from "lucide-react"
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

interface CitySearchResult {
  name: string
  country: string
  state?: string
  lat: number
  lon: number
}

export function WeatherHeader() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)
  const [searchSuggestions, setSearchSuggestions] = useState<CitySearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<NodeJS.Timeout>()

  const { recentSearches, settings, setCurrentLocation, addRecentSearch, clearRecentSearches, setTemperatureUnit } =
    useWeatherStore()

  const { setTheme, theme } = useTheme()
  const { toast } = useToast()

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Debounced search function
  const searchCities = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSearchSuggestions([])
      return
    }

    setIsSearching(true)
    try {
      const response = await fetch(`/api/weather/search?q=${encodeURIComponent(query)}`)
      if (response.ok) {
        const results = await response.json()
        setSearchSuggestions(results.slice(0, 5)) // Limit to 5 suggestions
      } else {
        setSearchSuggestions([])
      }
    } catch (error) {
      console.error('Search error:', error)
      setSearchSuggestions([])
    } finally {
      setIsSearching(false)
    }
  }, [])

  // Handle input change with debouncing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)

    // Clear previous debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    // Set new debounce
    debounceRef.current = setTimeout(() => {
      searchCities(value)
    }, 300) // 300ms delay
  }

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!searchQuery.trim() || isSubmitting) return

    setIsSubmitting(true)
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
      setShowDropdown(false)
      setSearchSuggestions([])

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
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRecentSearch = (location: (typeof recentSearches)[0]) => {
    setCurrentLocation(location)
    setShowDropdown(false)
    setSearchQuery("")
    setSearchSuggestions([])
    toast({
      title: "Location Updated",
      description: `Now showing weather for ${location.name}, ${location.country}`,
    })
  }

  const handleSuggestionSelect = (suggestion: CitySearchResult) => {
    const location = {
      lat: suggestion.lat,
      lon: suggestion.lon,
      name: suggestion.name,
      country: suggestion.country,
    }

    setCurrentLocation(location)
    addRecentSearch(location)
    setSearchQuery("")
    setShowDropdown(false)
    setSearchSuggestions([])

    toast({
      title: "Location Updated",
      description: `Now showing weather for ${suggestion.name}, ${suggestion.country}`,
    })
  }

  const handleInputFocus = () => {
    setShowDropdown(true)
  }

  const handleClearRecentSearches = () => {
    clearRecentSearches()
    setShowDropdown(false)
  }

  const showSuggestions = searchSuggestions.length > 0 || isSearching
  const showRecentSearches = recentSearches.length > 0 && searchQuery.length === 0

  return (
    <header className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div className="flex-1 max-w-md" ref={searchRef}>
        <form onSubmit={handleSearch} className="relative">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for a city..."
                value={searchQuery}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                className="pl-10"
                autoComplete="off"
              />
            </div>
            <Button 
              type="submit" 
              size="sm" 
              disabled={!searchQuery.trim() || isSubmitting}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-4"
            >
              {isSubmitting ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>
          {showDropdown && (showSuggestions || showRecentSearches) && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
              <div className="p-2">
                {/* Search Suggestions */}
                {showSuggestions && (
                  <div className="mb-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-muted-foreground">
                        {isSearching ? "Searching..." : "Cities"}
                      </span>
                    </div>
                    {isSearching && (
                      <div className="text-center py-2">
                        <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                      </div>
                    )}
                    {searchSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionSelect(suggestion)}
                        className="w-full text-left p-2 hover:bg-muted rounded text-sm flex items-center gap-2"
                      >
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <div>
                          <div className="font-medium">
                            {suggestion.name}
                            {suggestion.state && `, ${suggestion.state}`}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {suggestion.country}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Recent Searches */}
                {showRecentSearches && (
                  <div>
                    {showSuggestions && <div className="border-t pt-2 mt-2" />}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-muted-foreground">Recent Searches</span>
                      <Button variant="ghost" size="sm" onClick={handleClearRecentSearches} className="h-auto p-1 text-xs">
                        Clear
                      </Button>
                    </div>
                    {recentSearches.map((location, index) => (
                      <button
                        key={index}
                        onClick={() => handleRecentSearch(location)}
                        className="w-full text-left p-2 hover:bg-muted rounded text-sm flex items-center gap-2"
                      >
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <div>
                          {location.name}, {location.country}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
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
