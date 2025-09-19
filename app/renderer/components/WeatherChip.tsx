import { useEffect, useState } from 'react';
import { weatherProvider } from '../services/weatherProvider';

export type WeatherChipProps = {
  location: string;
};

const WeatherChip = ({ location }: WeatherChipProps) => {
  const [summary, setSummary] = useState('Fetching weather…');

  useEffect(() => {
    let mounted = true;
    weatherProvider.getWeather(location).then((weather) => {
      if (mounted) {
        setSummary(`${weather.summary}`);
      }
    });
    return () => {
      mounted = false;
    };
  }, [location]);

  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/90 px-3 py-1 text-xs font-medium text-white shadow">
      <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
      {summary}
    </span>
  );
};

export default WeatherChip;
