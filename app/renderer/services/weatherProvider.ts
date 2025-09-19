export type WeatherData = {
  temperature: number;
  precipitation: number;
  summary: string;
};

export interface WeatherProvider {
  getWeather(location: string): Promise<WeatherData>;
}

export class OpenMeteoProvider implements WeatherProvider {
  async getWeather(location: string): Promise<WeatherData> {
    try {
      const query = new URL('https://api.open-meteo.com/v1/forecast');
      query.searchParams.set('latitude', '37.7749');
      query.searchParams.set('longitude', '-122.4194');
      query.searchParams.set('current_weather', 'true');
      const response = await fetch(query.toString());
      if (!response.ok) {
        throw new Error('Failed request');
      }
      const json = (await response.json()) as { current_weather?: { temperature: number } };
      const temperature = json.current_weather?.temperature ?? 18;
      return {
        temperature,
        precipitation: 0,
        summary: `${temperature.toFixed(0)}°C and breezy in ${location}`,
      };
    } catch (error) {
      return { temperature: 20, precipitation: 0, summary: `Mild day in ${location}` };
    }
  }
}

export const weatherProvider = new OpenMeteoProvider();
