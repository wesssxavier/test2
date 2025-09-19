import { useMemo, useState } from 'react';
import ShareBadge from '../components/ShareBadge';
import { useWardrobeStore } from '../state/useWardrobeStore';

const tabs = ['All', 'Favourites', 'Recent', 'Top Rated'] as const;

type Tab = (typeof tabs)[number];

const Outfits = () => {
  const { outfits } = useWardrobeStore((state) => ({ outfits: state.outfits }));
  const [activeTab, setActiveTab] = useState<Tab>('All');
  const [filters, setFilters] = useState({ occasion: '', style: '' });

  const filtered = useMemo(() => {
    return outfits.filter((outfit) => {
      if (filters.occasion && outfit.occasion !== filters.occasion) return false;
      if (filters.style && outfit.style !== filters.style) return false;
      if (activeTab === 'Favourites' && !outfit.favorite) return false;
      return true;
    });
  }, [outfits, filters, activeTab]);

  return (
    <div className="space-y-6">
      <section className="flex flex-wrap items-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              activeTab === tab ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
        <select
          className="ml-auto rounded-md border border-slate-200 px-3 py-2 text-sm"
          value={filters.occasion}
          onChange={(event) => setFilters((prev) => ({ ...prev, occasion: event.target.value }))}
        >
          <option value="">All occasions</option>
          <option value="Work">Work</option>
          <option value="Weekend">Weekend</option>
          <option value="Travel">Travel</option>
        </select>
        <select
          className="rounded-md border border-slate-200 px-3 py-2 text-sm"
          value={filters.style}
          onChange={(event) => setFilters((prev) => ({ ...prev, style: event.target.value }))}
        >
          <option value="">All styles</option>
          <option value="casual">Casual</option>
          <option value="business">Business</option>
          <option value="athleisure">Athleisure</option>
        </select>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {filtered.map((outfit) => (
          <article key={outfit.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-semibold text-slate-800">{outfit.name}</h3>
                <p className="text-xs text-slate-500">
                  {outfit.occasion ?? 'Versatile'} · {outfit.style ?? 'Smart'}
                </p>
              </div>
              <button className={`text-sm ${outfit.favorite ? 'text-amber-500' : 'text-slate-400'}`}>★</button>
            </div>
            <div className="mt-3 rounded-lg bg-slate-100 py-16 text-center text-xs text-slate-500">Outfit preview</div>
            <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
              <span>{outfit.itemIds.length} items</span>
              <ShareBadge visibility="link" />
            </div>
            <div className="mt-3 flex gap-2">
              <button className="flex-1 rounded-md border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600">
                Open in studio
              </button>
              <button className="flex-1 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-white">
                Mark worn
              </button>
            </div>
          </article>
        ))}
        {filtered.length === 0 && <p className="text-sm text-slate-500">No outfits found. Try adjusting filters.</p>}
      </section>
    </div>
  );
};

export default Outfits;
