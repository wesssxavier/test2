import { useEffect, useState } from 'react';
import AnalyticsCharts, { type AnalyticsSnapshot } from '../components/AnalyticsCharts';

const Analytics = () => {
  const [snapshot, setSnapshot] = useState<AnalyticsSnapshot>({
    itemCount: 12,
    outfitCount: 3,
    wishlistCount: 1,
    costPerWear: 14,
  });

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      if (!window.styleAI) return;
      const payload = (await window.styleAI.analytics.summary({})) as AnalyticsSnapshot | undefined;
      if (mounted && payload) {
        setSnapshot((prev) => ({ ...prev, ...payload }));
      }
    };
    fetchData();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-800">Advanced analytics</h2>
        <p className="text-sm text-slate-500">
          Track cost-per-wear, colour distribution and closet value. Premium unlocks exports.
        </p>
        <div className="mt-4">
          <AnalyticsCharts snapshot={snapshot} />
        </div>
        <div className="mt-4 flex gap-3">
          <button className="rounded-md border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600">Export CSV</button>
          <button className="rounded-md bg-primary px-3 py-2 text-xs font-semibold text-white">Export charts</button>
        </div>
      </section>
    </div>
  );
};

export default Analytics;
