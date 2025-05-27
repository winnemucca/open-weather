
export interface CityInfo {
  hourly: WeatherData[],
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
}

interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface WeatherData {
  clouds: number;
  dew_point: number;
  dt: number; // UNIX timestamp
  feels_like: number;
  humidity: number;
  pop: number; // Probability of precipitation
  pressure: number;
  temp: number;
  uvi: number;
  visibility: number;
  weather: WeatherCondition[];
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
}

export interface Next12 {
  temp: number;
  time: number;
  icon: string;
  prec: number;
}

export interface DailySummary {
  formattedDate?: string;
  icon: string | any;
  avgTemp: number;
  minTemp: number;
  maxTemp: number;
  description: string;
}
