import { useEffect, useState } from 'react';

interface WeatherData {
  current: {
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    weather_code: number;
    is_day: number;
  };
}

interface GeoData {
  city: string;
  country: string;
}

function weatherDescription(code: number): string {
  if (code === 0) return 'Clear sky';
  if (code <= 2) return 'Partly cloudy';
  if (code === 3) return 'Overcast';
  if (code <= 49) return 'Foggy';
  if (code <= 59) return 'Drizzle';
  if (code <= 69) return 'Rain';
  if (code <= 79) return 'Snow';
  if (code <= 82) return 'Rain showers';
  if (code <= 86) return 'Snow showers';
  if (code <= 99) return 'Thunderstorm';
  return 'Unknown';
}

function weatherIcon(code: number, isDay: number): string {
  if (code === 0) return isDay ? '☀️' : '🌙';
  if (code <= 2) return isDay ? '⛅' : '🌤️';
  if (code === 3) return '☁️';
  if (code <= 49) return '🌫️';
  if (code <= 69) return '🌧️';
  if (code <= 79) return '❄️';
  if (code <= 82) return '🌦️';
  if (code <= 86) return '🌨️';
  if (code <= 99) return '⛈️';
  return '🌡️';
}

export function WeatherPage() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [geo, setGeo] = useState<GeoData | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
      },
      () => {
        // Fall back to a default location (London) if denied
        setCoords({ lat: 51.5074, lon: -0.1278 });
      }
    );
  }, []);

  useEffect(() => {
    if (!coords) return;

    const { lat, lon } = coords;

    const weatherUrl =
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
      `&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code,is_day` +
      `&wind_speed_unit=kmh`;

    const geoUrl =
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

    Promise.all([
      fetch(weatherUrl).then((r) => r.json()),
      fetch(geoUrl).then((r) => r.json()),
    ])
      .then(([wData, gData]) => {
        setWeather(wData as WeatherData);
        const address = gData?.address ?? {};
        setGeo({
          city: address.city ?? address.town ?? address.village ?? address.county ?? 'Unknown',
          country: address.country ?? '',
        });
      })
      .catch(() => setError('Failed to load weather data. Please try again.'))
      .finally(() => setLoading(false));
  }, [coords]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-3 text-5xl animate-spin">🌐</div>
          <p className="text-gray-500 text-sm">Fetching weather…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-xl bg-red-50 border border-red-200 p-6 text-center max-w-sm">
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  if (!weather) return null;

  const { temperature_2m, apparent_temperature, relative_humidity_2m, wind_speed_10m, weather_code, is_day } =
    weather.current;
  const icon = weatherIcon(weather_code, is_day);
  const desc = weatherDescription(weather_code);
  const tempRounded = Math.round(temperature_2m);
  const feelsRounded = Math.round(apparent_temperature);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-100 to-blue-200 p-4">
      <div className="w-full max-w-sm rounded-3xl bg-white shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-500 to-sky-400 px-8 py-10 text-white text-center">
          <p className="text-base font-medium opacity-90">
            {geo ? `${geo.city}${geo.country ? ', ' + geo.country : ''}` : 'Current Location'}
          </p>
          <div className="mt-2 text-8xl leading-none">{icon}</div>
          <p className="mt-4 text-7xl font-thin tracking-tight">{tempRounded}°C</p>
          <p className="mt-1 text-lg opacity-80">{desc}</p>
        </div>

        {/* Details */}
        <div className="grid grid-cols-3 divide-x divide-gray-100 px-2 py-6">
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl">🌡️</span>
            <span className="text-sm font-semibold text-gray-700">{feelsRounded}°C</span>
            <span className="text-xs text-gray-400">Feels like</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl">💧</span>
            <span className="text-sm font-semibold text-gray-700">{relative_humidity_2m}%</span>
            <span className="text-xs text-gray-400">Humidity</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl">💨</span>
            <span className="text-sm font-semibold text-gray-700">{Math.round(wind_speed_10m)} km/h</span>
            <span className="text-xs text-gray-400">Wind</span>
          </div>
        </div>

        <p className="pb-4 text-center text-xs text-gray-300">Powered by Open-Meteo</p>
      </div>
    </main>
  );
}