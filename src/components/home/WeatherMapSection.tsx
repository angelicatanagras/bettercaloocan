import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Wind,
  MapPin,
} from 'lucide-react';
import Section from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { Card, CardContent } from '@bettergov/kapwa/card';

// Vite doesn't resolve Leaflet's default marker image URLs correctly out of
// the box, so the icon set is provided explicitly.
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })
  ._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Caloocan City Hall — verified via OpenStreetMap Nominatim geocoding.
const CITY_HALL = {
  lat: 14.6488536,
  lon: 120.9906085,
  label: 'City Hall, Caloocan City, Metro Manila',
};

interface WeatherInfo {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

function getWeatherInfo(code: number): WeatherInfo {
  if (code === 0) return { icon: Sun, label: 'Clear' };
  if ([1, 2].includes(code)) return { icon: CloudSun, label: 'Partly Cloudy' };
  if (code === 3) return { icon: Cloud, label: 'Overcast' };
  if ([45, 48].includes(code)) return { icon: CloudFog, label: 'Fog' };
  if ([51, 53, 55, 56, 57].includes(code))
    return { icon: CloudDrizzle, label: 'Drizzle' };
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code))
    return { icon: CloudRain, label: 'Rain' };
  if ([71, 73, 75, 77, 85, 86].includes(code))
    return { icon: CloudSnow, label: 'Snow' };
  if ([95, 96, 99].includes(code))
    return { icon: CloudLightning, label: 'Thunderstorm' };
  return { icon: Cloud, label: 'Cloudy' };
}

interface ForecastData {
  currentTemp: number;
  currentCode: number;
  windSpeed: number;
  high: number;
  low: number;
  hourly: { label: string; temp: number; code: number }[];
}

export default function WeatherMapSection() {
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadForecast() {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${CITY_HALL.lat}&longitude=${CITY_HALL.lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weathercode&timezone=Asia%2FManila`;
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error('Weather request failed');
        const data = await res.json();

        const nowIso: string = data.current_weather.time;
        const hourlyTimes: string[] = data.hourly.time;
        const startIdx = Math.max(0, hourlyTimes.indexOf(nowIso));

        const hourly = [0, 1, 2, 3].map(offset => {
          const idx = startIdx + offset;
          const date = new Date(hourlyTimes[idx]);
          return {
            label:
              offset === 0
                ? 'Now'
                : date
                    .toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      hour12: true,
                    })
                    .replace(' ', ' '),
            temp: Math.round(data.hourly.temperature_2m[idx]),
            code: data.hourly.weathercode[idx],
          };
        });

        setForecast({
          currentTemp: data.current_weather.temperature,
          currentCode: data.current_weather.weathercode,
          windSpeed: data.current_weather.windspeed,
          high: Math.round(data.daily.temperature_2m_max[0]),
          low: Math.round(data.daily.temperature_2m_min[0]),
          hourly,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') setError(true);
      }
    }

    loadForecast();
    return () => controller.abort();
  }, []);

  const CurrentIcon = forecast
    ? getWeatherInfo(forecast.currentCode).icon
    : Cloud;
  const currentLabel = forecast
    ? getWeatherInfo(forecast.currentCode).label
    : '';

  return (
    <Section>
      <Heading level={2} className="font-normal">
        Weather and Map of Caloocan
      </Heading>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="h-fit">
          <CardContent className="p-6">
            <Text className="text-xs tracking-wide text-gray-500 uppercase mb-2">
              Caloocan, Metro Manila
            </Text>

            {error ? (
              <Text className="text-gray-600">
                Weather data is temporarily unavailable.
              </Text>
            ) : !forecast ? (
              <Text className="text-gray-600">Loading weather…</Text>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-1">
                  <CurrentIcon className="h-10 w-10 text-primary-500" />
                  <span className="text-5xl font-bold text-gray-900">
                    {Math.round(forecast.currentTemp)}°
                  </span>
                </div>
                <Text className="text-gray-600 mb-4">{currentLabel}</Text>

                <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-100">
                  <div className="flex flex-col items-center">
                    <div className="bg-blue-50 text-blue-500 rounded-full p-2 mb-1">
                      <Wind className="h-4 w-4" />
                    </div>
                    <Text className="text-xs text-gray-500">Wind</Text>
                    <Text className="text-sm font-semibold text-gray-900">
                      {Math.round(forecast.windSpeed)} km/h
                    </Text>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-orange-50 text-orange-500 rounded-full p-2 mb-1">
                      <Sun className="h-4 w-4" />
                    </div>
                    <Text className="text-xs text-gray-500">High</Text>
                    <Text className="text-sm font-semibold text-gray-900">
                      {forecast.high}°
                    </Text>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-sky-50 text-sky-500 rounded-full p-2 mb-1">
                      <CloudSun className="h-4 w-4" />
                    </div>
                    <Text className="text-xs text-gray-500">Low</Text>
                    <Text className="text-sm font-semibold text-gray-900">
                      {forecast.low}°
                    </Text>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <Text className="text-xs tracking-wide text-gray-500 uppercase mb-3">
                    Hourly Forecast
                  </Text>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    {forecast.hourly.map((h, i) => {
                      const HourIcon = getWeatherInfo(h.code).icon;
                      return (
                        <div key={i} className="flex flex-col items-center">
                          <Text className="text-xs text-gray-500 mb-1">
                            {h.label}
                          </Text>
                          <HourIcon className="h-5 w-5 text-primary-500 mb-1" />
                          <Text className="text-sm font-semibold text-gray-900">
                            {h.temp}°
                          </Text>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="overflow-hidden p-0">
          <div className="h-[360px] lg:h-[420px]">
            <MapContainer
              center={[CITY_HALL.lat, CITY_HALL.lon]}
              zoom={13}
              scrollWheelZoom={false}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[CITY_HALL.lat, CITY_HALL.lon]}>
                <Popup>{CITY_HALL.label}</Popup>
              </Marker>
            </MapContainer>
          </div>
          <CardContent className="p-4 flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-primary-500 shrink-0" />
            {CITY_HALL.label}
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
