import { useMemo, useState } from 'react';
import UploadWidget from '../components/UploadWidget';
import Filters, { type ClosetFilters } from '../components/Filters';
import ItemCard from '../components/ItemCard';
import { useWardrobeStore } from '../state/useWardrobeStore';

const Closet = () => {
  const { items, closets, activeClosetId, setActiveCloset } = useWardrobeStore((state) => ({
    items: state.items,
    closets: state.closets,
    activeClosetId: state.activeClosetId,
    setActiveCloset: state.setActiveCloset,
  }));
  const [filters, setFilters] = useState<ClosetFilters>({});

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (activeClosetId && item.closetId !== activeClosetId) return false;
      if (filters.category && item.category !== filters.category) return false;
      if (filters.season && item.season !== filters.season) return false;
      if (filters.text && !item.title.toLowerCase().includes(filters.text.toLowerCase())) return false;
      return true;
    });
  }, [items, filters, activeClosetId]);

  const insights = useMemo(() => {
    const totalWears = filtered.reduce((acc, item) => acc + item.wears, 0);
    const mostWorn = filtered.slice().sort((a, b) => b.wears - a.wears)[0];
    return {
      totalItems: filtered.length,
      totalWears,
      averageWear: filtered.length ? Math.round(totalWears / filtered.length) : 0,
      mostWorn: mostWorn?.title,
    };
  }, [filtered]);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <UploadWidget onUpload={(file) => console.log('Upload placeholder', file.name)} />
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700">Closet insights</h3>
          <ul className="mt-3 space-y-1 text-sm text-slate-600">
            <li>Total items: {insights.totalItems}</li>
            <li>Total wears: {insights.totalWears}</li>
            <li>Average wears/item: {insights.averageWear}</li>
            <li>Most worn: {insights.mostWorn ?? 'N/A'}</li>
          </ul>
        </div>
      </section>

      <section className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-700">Closet</span>
          <select
            className="rounded-md border border-slate-200 px-3 py-2 text-sm"
            value={activeClosetId}
            onChange={(event) => setActiveCloset(event.target.value)}
          >
            {closets.map((closet) => (
              <option key={closet.id} value={closet.id}>
                {closet.name}
              </option>
            ))}
          </select>
        </div>
        <button className="rounded-md border border-primary bg-primary/10 px-3 py-2 text-xs font-semibold text-primary shadow-sm">
          New closet
        </button>
      </section>

      <Filters value={filters} onChange={setFilters} />

      <section>
        <div className="grid gap-3 md:grid-cols-4">
          {filtered.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
          {filtered.length === 0 && <p className="text-sm text-slate-500">No items match the filters.</p>}
        </div>
      </section>
    </div>
  );
};

export default Closet;
