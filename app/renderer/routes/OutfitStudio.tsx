import { useMemo, useState } from 'react';
import MannequinCanvas, { type CanvasLayer } from '../components/MannequinCanvas';
import OutfitRail from '../components/OutfitRail';
import { useWardrobeStore } from '../state/useWardrobeStore';
import type { Item } from '../types';

const createLayer = (item: Item, index: number): CanvasLayer => ({
  item,
  x: 50,
  y: 30 + index * 18,
  scale: 1,
  rotation: 0,
  zIndex: 10 + index,
});

const OutfitStudio = () => {
  const { items } = useWardrobeStore((state) => ({ items: state.items }));
  const starterLayers = useMemo(() => items.slice(0, 3).map(createLayer), [items]);
  const [layers, setLayers] = useState<CanvasLayer[]>(starterLayers);

  const addItem = (item: Item) => {
    setLayers((current) => [...current, createLayer(item, current.length)]);
  };

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-[2fr_1fr]">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Virtual mannequin</h2>
          <p className="text-sm text-slate-500">Swipe through the rail to remix layers. Drag handles to adjust placement.</p>
          <div className="mt-4">
            <MannequinCanvas layers={layers} onChange={setLayers} />
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-700">Export</h3>
            <p className="text-xs text-slate-500">Save this look to your outfits to log wears and share with friends.</p>
            <button className="mt-3 w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow">
              Save outfit (S)
            </button>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-700">Layer controls</h3>
            <ul className="mt-2 space-y-1 text-xs text-slate-500">
              <li>• Click a tile to select and reveal quick controls.</li>
              <li>• Use arrow keys to nudge selected layer.</li>
              <li>• Auto-arrange keeps proportions for the mannequin.</li>
            </ul>
          </div>
        </div>
      </section>
      <section>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Swipe rail</h3>
        <p className="text-xs text-slate-500">Use unlimited items—even on the free tier.</p>
        <div className="mt-3">
          <OutfitRail items={items} onInsert={addItem} />
        </div>
      </section>
    </div>
  );
};

export default OutfitStudio;
