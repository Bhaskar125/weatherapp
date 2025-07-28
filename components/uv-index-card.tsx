"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sun } from "lucide-react"
import type { UVIndexData } from "@/lib/types"

interface UVIndexCardProps {
  uvData: UVIndexData
}

function getUVCategory(value: number) {
  if (value <= 2) return { category: "Low", description: "No protection needed", color: "from-green-400 to-green-600" }
  if (value <= 5) return { category: "Moderate", description: "Some protection required", color: "from-yellow-400 to-yellow-600" }
  if (value <= 7) return { category: "High", description: "Protection essential", color: "from-orange-400 to-orange-600" }
  if (value <= 10) return { category: "Very High", description: "Extra protection needed", color: "from-red-400 to-red-600" }
  return { category: "Extreme", description: "Avoid sun exposure", color: "from-purple-400 to-purple-600" }
}

export function UVIndexCard({ uvData }: UVIndexCardProps) {
  const { category, description, color } = getUVCategory(uvData.value)
  const percentage = Math.min((uvData.value / 12) * 100, 100) // Scale to 12 as max for visual

  return (
    <Card className="overflow-hidden shadow-2xl border-0 backdrop-blur-sm bg-white/10 dark:bg-black/10">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-white drop-shadow-md">
          <Sun className="h-5 w-5 text-yellow-300" />
          UV Index
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* UV Value and Category */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-3xl font-bold text-white drop-shadow-lg">
              {uvData.value.toFixed(1)}
            </div>
            <div className="text-sm text-white/80 drop-shadow-md">
              {category}
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${color} text-white text-xs font-medium shadow-lg`}>
            {category}
          </div>
        </div>

        {/* UV Index Bar */}
        <div className="space-y-2">
          <div className="relative h-4 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className={`h-full bg-gradient-to-r ${color} transition-all duration-500 ease-out rounded-full shadow-lg`}
              style={{ width: `${percentage}%` }}
            />
            {/* Glow effect */}
            <div 
              className={`absolute top-0 h-full bg-gradient-to-r ${color} opacity-50 blur-sm transition-all duration-500 ease-out rounded-full`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          
          {/* Scale markers */}
          <div className="flex justify-between text-xs text-white/60 px-1">
            <span>0</span>
            <span>3</span>
            <span>6</span>
            <span>9</span>
            <span>12+</span>
          </div>
        </div>

        {/* Description */}
        <div className="bg-black/20 rounded-lg p-3 backdrop-blur-sm">
          <p className="text-sm text-white/90 drop-shadow-sm">
            {description}
          </p>
        </div>

        {/* Real-time indicator */}
        <div className="flex items-center gap-2 text-xs text-white/70">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
          <span>Real-time data</span>
        </div>
      </CardContent>
    </Card>
  )
} 