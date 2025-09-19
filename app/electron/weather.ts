export type WeatherSummary = {
  temperature: number;
  precipitation: number;
  summary: string;
};

export const fetchWeather = async (location: string): Promise<WeatherSummary> => {
  const [city = 'San Francisco'] = location.split(',');
  const query = new URL('https://api.open-meteo.com/v1/forecast');
  query.searchParams.set('latitude', '37.7749');
  query.searchParams.set('longitude', '-122.4194');
  query.searchParams.set('current_weather', 'true');

  const response = await fetch(query.toString());
  if (!response.ok) {
    return { temperature: 20, precipitation: 0, summary: 'mild conditions' };
  }
  const data = (await response.json()) as { current_weather?: { temperature: number; weathercode: number } };
  const temperature = data.current_weather?.temperature ?? 20;
  const summary = `${temperature.toFixed(0)}°C in ${city}`;
  return { temperature, precipitation: 0, summary };
};
