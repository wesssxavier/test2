import { useState } from 'react';
import { similarityProvider } from '../services/similarityProvider';
import { useWardrobeStore } from '../state/useWardrobeStore';
import type { Item } from '../types';

const Wishlist = () => {
  const { wishlist, items } = useWardrobeStore((state) => ({
    wishlist: state.wishlist,
    items: state.items,
  }));
  const [clipUrl, setClipUrl] = useState('https://brand.example/item');
  const [similar, setSimilar] = useState<Item[]>([]);

  const clipFromUrl = async () => {
    if (!window.styleAI) return;
    await window.styleAI.wishlist.clip({ url: clipUrl });
  };

  const findSimilar = async (item: Item) => {
    const matches = await similarityProvider.findSimilar(item, items);
    setSimilar(items.filter((candidate) => matches.some((match) => match.id === candidate.id)));
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-800">Wishlist</h2>
        <p className="text-sm text-slate-500">Clip products from the web or log resale intentions for pieces you own.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <input
            type="url"
            value={clipUrl}
            onChange={(event) => setClipUrl(event.target.value)}
            className="flex-1 min-w-[240px] rounded-md border border-slate-200 px-3 py-2 text-sm"
          />
          <button className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white" onClick={clipFromUrl}>
            Clip from URL
          </button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {wishlist.map((item) => (
          <article key={item.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-slate-800">{item.title}</h3>
                <p className="text-xs text-slate-500">{item.brand ?? 'Unknown brand'}</p>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                {item.status}
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Price wish: {item.price ? `$${item.price}` : 'Add price'} · Desired size {item.desiredSize ?? 'Any'}
            </p>
            <div className="mt-3 flex gap-2">
              <button className="flex-1 rounded-md border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600">
                List for resale
              </button>
              <button
                className="flex-1 rounded-md border border-primary/40 bg-primary/10 px-3 py-2 text-xs font-semibold text-primary"
                onClick={() => findSimilar({
                  id: item.id,
                  closetId: 'wishlist',
                  title: item.title,
                  category: 'accessories',
                  color: undefined,
                  brand: item.brand,
                  season: undefined,
                  wears: 0,
                  imagePath: '/assets/item-placeholder.png',
                  tags: [],
                })}
              >
                Find similar
              </button>
            </div>
          </article>
        ))}
      </section>

      {similar.length > 0 && (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700">Closet matches</h3>
          <div className="mt-3 flex gap-3">
            {similar.map((item) => (
              <div key={item.id} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
                {item.title}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Wishlist;
