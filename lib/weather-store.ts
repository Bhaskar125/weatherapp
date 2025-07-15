import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Location, WeatherSettings, TemperatureUnit, Theme } from "./types"

interface WeatherStore {
  // Location state
  currentLocation: Location | null
  recentSearches: Location[]

  // Settings
  settings: WeatherSettings

  // Actions
  setCurrentLocation: (location: Location) => void
  addRecentSearch: (location: Location) => void
  clearRecentSearches: () => void
  updateSettings: (settings: Partial<WeatherSettings>) => void
  setTemperatureUnit: (unit: TemperatureUnit) => void
  setTheme: (theme: Theme) => void
}

export const useWeatherStore = create<WeatherStore>()(
  persist(
    (set, get) => ({
      currentLocation: null,
      recentSearches: [],
      settings: {
        temperatureUnit: "celsius",
        theme: "system",
        refreshInterval: 300000, // 5 minutes
      },

      setCurrentLocation: (location) => {
        set({ currentLocation: location })
      },

      addRecentSearch: (location) => {
        const { recentSearches } = get()
        const filtered = recentSearches.filter(
          (search) => search.name !== location.name || search.country !== location.country,
        )
        set({
          recentSearches: [location, ...filtered].slice(0, 5),
        })
      },

      clearRecentSearches: () => {
        set({ recentSearches: [] })
      },

      updateSettings: (newSettings) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        }))
      },

      setTemperatureUnit: (unit) => {
        set((state) => ({
          settings: { ...state.settings, temperatureUnit: unit },
        }))
      },

      setTheme: (theme) => {
        set((state) => ({
          settings: { ...state.settings, theme },
        }))
      },
    }),
    {
      name: "weather-store",
      partialize: (state) => ({
        recentSearches: state.recentSearches,
        settings: state.settings,
      }),
    },
  ),
)
