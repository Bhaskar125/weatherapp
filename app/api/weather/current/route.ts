import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const querySchema = z.object({
  lat: z.string().optional(),
  lon: z.string().optional(),
  q: z.string().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = querySchema.parse({
      lat: searchParams.get("lat") ?? undefined,
      lon: searchParams.get("lon") ?? undefined,
      q: searchParams.get("q") ?? undefined,
    })

    const apiKey = process.env.OPENWEATHER_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "Weather service temporarily unavailable" }, { status: 500 })
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric`

    if (query.lat && query.lon) {
      url += `&lat=${query.lat}&lon=${query.lon}`
    } else if (query.q) {
      url += `&q=${encodeURIComponent(query.q)}`
    } else {
      return NextResponse.json({ error: "Location parameter required" }, { status: 400 })
    }

    const response = await fetch(url, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    })

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: "City not found" }, { status: 404 })
      }
      throw new Error(`Weather API error: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Weather API error:", error)
    return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 })
  }
}
