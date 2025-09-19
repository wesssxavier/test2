export type AnalyticsSnapshot = {
  itemCount: number;
  outfitCount: number;
  wishlistCount: number;
  costPerWear?: number;
};

export type AnalyticsChartsProps = {
  snapshot: AnalyticsSnapshot;
};

const placeholderBars = ['w-3/12', 'w-6/12', 'w-4/12', 'w-9/12', 'w-5/12'];

const AnalyticsCharts = ({ snapshot }: AnalyticsChartsProps) => (
  <div className="grid gap-4 md:grid-cols-2">
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-700">Wears by Month</h3>
      <div className="mt-3 space-y-2">
        {placeholderBars.map((width, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="w-16 text-xs text-slate-400">Month {index + 1}</span>
            <div className={`h-2 rounded-full bg-primary/70 ${width}`} />
          </div>
        ))}
      </div>
    </div>
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-700">Closet Snapshot</h3>
      <ul className="mt-3 space-y-1 text-sm text-slate-600">
        <li>Total items: {snapshot.itemCount}</li>
        <li>Saved outfits: {snapshot.outfitCount}</li>
        <li>Wishlist pieces: {snapshot.wishlistCount}</li>
        <li>Cost per wear (est): ${snapshot.costPerWear?.toFixed(2) ?? '12.40'}</li>
      </ul>
    </div>
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:col-span-2">
      <h3 className="text-sm font-semibold text-slate-700">Cost per Wear Trend</h3>
      <div className="mt-4 h-32 rounded-lg bg-gradient-to-r from-emerald-100 via-primary/20 to-primary/60" />
    </div>
  </div>
);

export default AnalyticsCharts;
