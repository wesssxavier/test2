import { useState } from 'react';

const Settings = () => {
  const [weatherLocation, setWeatherLocation] = useState('San Francisco');
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-800">Settings</h2>
        <p className="text-sm text-slate-500">Control weather providers, automation and concierge preferences.</p>
        <div className="mt-4 space-y-3">
          <label className="flex flex-col text-sm text-slate-600">
            Default weather location
            <input
              className="mt-1 rounded-md border border-slate-200 px-3 py-2 text-sm"
              value={weatherLocation}
              onChange={(event) => setWeatherLocation(event.target.value)}
            />
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={notifications}
              onChange={(event) => setNotifications(event.target.checked)}
              className="h-4 w-4 rounded border-slate-300"
            />
            Enable challenge notifications
          </label>
        </div>
      </section>
    </div>
  );
};

export default Settings;
