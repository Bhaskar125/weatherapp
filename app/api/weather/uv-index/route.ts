import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const querySchema = z.object({
  lat: z.string(),
  lon: z.string(),
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = querySchema.parse({
      lat: searchParams.get("lat"),
      lon: searchParams.get("lon"),
    })

    const apiKey = process.env.OPENWEATHER_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "Weather service temporarily unavailable" }, { status: 500 })
    }

    const url = `https://api.openweathermap.org/data/2.5/uvi?lat=${query.lat}&lon=${query.lon}&appid=${apiKey}`

    const response = await fetch(url, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    })

    if (!response.ok) {
      throw new Error(`UV Index API error: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("UV Index API error:", error)
    return NextResponse.json({ error: "Failed to fetch UV index data" }, { status: 500 })
  }
} 