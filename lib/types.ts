export interface WeatherData {
    coord: {
      lon: number
      lat: number
    }
    weather: Array<{
      id: number
      main: string
      description: string
      icon: string
    }>
    base: string
    main: {
      temp: number
      feels_like: number
      temp_min: number
      temp_max: number
      pressure: number
      humidity: number
      sea_level?: number
      grnd_level?: number
    }
    visibility: number
    wind: {
      speed: number
      deg: number
      gust?: number
    }
    clouds: {
      all: number
    }
    dt: number
    sys: {
      type: number
      id: number
      country: string
      sunrise: number
      sunset: number
    }
    timezone: number
    id: number
    name: string
    cod: number
  }
  
  export interface ForecastData {
    cod: string
    message: number
    cnt: number
    list: Array<{
      dt: number
      main: {
        temp: number
        feels_like: number
        temp_min: number
        temp_max: number
        pressure: number
        sea_level: number
        grnd_level: number
        humidity: number
        temp_kf: number
      }
      weather: Array<{
        id: number
        main: string
        description: string
        icon: string
      }>
      clouds: {
        all: number
      }
      wind: {
        speed: number
        deg: number
        gust?: number
      }
      visibility: number
      pop: number
      sys: {
        pod: string
      }
      dt_txt: string
    }>
    city: {
      id: number
      name: string
      coord: {
        lat: number
        lon: number
      }
      country: string
      population: number
      timezone: number
      sunrise: number
      sunset: number
    }
  }

  export interface UVIndexData {
    lat: number
    lon: number
    date_iso: string
    date: number
    value: number
  }
  
  export interface Location {
    lat: number
    lon: number
    name: string
    country?: string
  }
  
  export type TemperatureUnit = "celsius" | "fahrenheit"
  export type Theme = "light" | "dark" | "system"
  
  export interface WeatherSettings {
    temperatureUnit: TemperatureUnit
    theme: Theme
    refreshInterval: number
  }
  
  export interface WeatherError {
    message: string
    code?: string
    retry?: () => void
  }
  