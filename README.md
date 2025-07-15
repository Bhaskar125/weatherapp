# WeatherPro - Modern Weather App

A beautiful, responsive weather application built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Real-time Weather Data** - Current conditions and 5-day forecasts
- **Geolocation Support** - Automatic location detection
- **City Search** - Search for weather in any city worldwide
- **Dark/Light Mode** - Theme switching with system preference support
- **Temperature Units** - Celsius and Fahrenheit support
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Accessibility** - Full keyboard navigation and screen reader support
- **Error Handling** - Graceful error states and retry functionality

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: Radix UI + Shadcn UI
- **State Management**: Zustand
- **Data Fetching**: SWR
- **Icons**: Lucide React
- **Theme**: next-themes

## 📦 Project Structure

```
weather-app/
├── app/                          # Next.js App Router
│   ├── api/weather/             # Weather API routes
│   │   ├── current/route.ts     # Current weather endpoint
│   │   └── forecast/route.ts    # Forecast endpoint
│   ├── globals.css              # Global styles & CSS variables
│   ├── layout.tsx              # Root layout with providers
│   └── page.tsx                # Main page with weather dashboard
├── components/                  # React components
│   ├── ui/                     # Reusable UI components
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── scroll-area.tsx
│   │   ├── skeleton.tsx
│   │   ├── toast.tsx
│   │   └── toaster.tsx
│   ├── current-weather-card.tsx # Current weather display
│   ├── daily-forecast.tsx      # 5-day forecast
│   ├── error-boundary.tsx      # Error handling
│   ├── hourly-forecast.tsx     # 24-hour forecast
│   ├── theme-provider.tsx      # Theme context provider
│   ├── weather-dashboard.tsx   # Main dashboard component
│   ├── weather-error.tsx       # Error state component
│   ├── weather-header.tsx      # Header with search & settings
│   ├── weather-metrics.tsx     # Weather metrics grid
│   └── weather-skeleton.tsx    # Loading skeleton
├── hooks/                      # Custom React hooks
│   ├── use-debounce.ts        # Debounce hook
│   ├── use-geolocation.ts     # Geolocation hook
│   ├── use-mobile.tsx         # Mobile detection hook
│   ├── use-toast.ts           # Toast notifications hook
│   └── use-weather.ts         # Weather data fetching hooks
├── lib/                       # Utility libraries
│   ├── types.ts              # TypeScript type definitions
│   ├── utils.ts              # Utility functions
│   └── weather-store.ts      # Zustand state store
├── next.config.mjs           # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install --legacy-peer-deps
```

> **Note**: We use `--legacy-peer-deps` to resolve React 19 compatibility issues with some packages.

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Get your free API key from: https://openweathermap.org/api
OPENWEATHER_API_KEY=your_openweather_api_key_here
```

### 3. Get OpenWeather API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Generate an API key
4. Add it to your `.env.local` file

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🎨 Customization

### Theme Colors

Edit CSS variables in `app/globals.css`:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96%;
  /* ... other variables */
}
```

### Weather Backgrounds

Customize weather condition backgrounds in `lib/utils.ts`:

```typescript
const backgrounds = {
  Clear: "from-yellow-400 to-orange-500",
  Clouds: "from-gray-400 to-gray-600",
  // ... other conditions
}
```

## 🔧 Key Components

### Weather Dashboard
Main component that orchestrates the entire weather app experience.

### State Management
- **useWeatherStore**: Global state with Zustand
- **SWR**: Data fetching with caching and revalidation
- **Local Storage**: Persisted settings and recent searches

### Error Handling
- **Error Boundary**: Catches React errors
- **API Error States**: Graceful handling of API failures
- **Retry Mechanisms**: Automatic and manual retry options

## 🌐 API Integration

The app uses OpenWeatherMap API with:
- **Current Weather**: Real-time conditions
- **5-Day Forecast**: Extended weather predictions
- **Geocoding**: Location-based weather lookup
- **Caching**: 5-minute cache for current weather, 10-minute for forecasts

## 📱 Features in Detail

### Location Services
- Automatic geolocation detection
- Manual city search
- Recent searches history
- Fallback for location access denial

### Weather Display
- Current conditions with animated backgrounds
- Detailed metrics (humidity, wind, pressure, etc.)
- 24-hour hourly forecast
- 5-day daily forecast
- Weather icons from OpenWeatherMap

### Settings
- Temperature unit switching (°C/°F)
- Theme preference (Light/Dark/System)
- Persistent user preferences

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The app is a standard Next.js application and can be deployed to:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 🧪 Development

### Build for Production

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

### Type Checking

```bash
npx tsc --noEmit
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help setting up the project, please create an issue in the GitHub repository.
