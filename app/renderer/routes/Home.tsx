import { useEffect } from 'react';
import WeatherChip from '../components/WeatherChip';
import ItemCard from '../components/ItemCard';
import { useWardrobeStore } from '../state/useWardrobeStore';

const Home = () => {
  const { outfits, items, initialize } = useWardrobeStore((state) => ({
    outfits: state.outfits,
    items: state.items,
    initialize: state.initialize,
  }));

  useEffect(() => {
    initialize();
  }, [initialize]);

  const todaysOutfit = outfits[0];

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 rounded-2xl bg-gradient-to-r from-primary/90 via-primary to-indigo-600 p-6 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Today&apos;s Outfit</h2>
            <p className="text-sm text-white/80">Curated for your calendar and the forecast.</p>
          </div>
          <WeatherChip location="San Francisco" />
        </div>
        {todaysOutfit ? (
          <div className="rounded-xl bg-white/10 p-4 shadow-inner">
            <p className="text-lg font-medium">{todaysOutfit.name}</p>
            <p className="text-sm text-white/80">Occasion: {todaysOutfit.occasion ?? 'Everyday'} · Style: {todaysOutfit.style ?? 'Smart casual'}</p>
            <button className="mt-3 rounded-lg bg-white/20 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/40">
              Refresh suggestion
            </button>
          </div>
        ) : (
          <p>No outfit saved yet. Visit the outfit studio to craft one.</p>
        )}
      </section>

      <section>
        <header className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-800">Outfit ideas</h3>
          <span className="text-xs text-slate-500">Virtual mannequin ready</span>
        </header>
        <div className="mt-3 grid gap-4 md:grid-cols-3">
          {outfits.slice(0, 3).map((outfit) => (
            <div key={outfit.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold text-slate-700">{outfit.name}</p>
              <p className="text-xs text-slate-500">{outfit.occasion ?? 'Versatile'} · {outfit.style ?? 'Smart'}</p>
              <button className="mt-3 w-full rounded-md border border-primary/30 bg-primary/10 px-3 py-2 text-xs font-semibold text-primary">
                Load in studio
              </button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <header className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-800">Upsell</h3>
          <span className="text-xs text-slate-500">Premium perks</span>
        </header>
        <div className="mt-3 grid gap-4 md:grid-cols-3">
          {["Stylist concierge", 'Advanced analytics', 'Community challenges'].map((perk) => (
            <div key={perk} className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-primary/10">
              <p className="text-base font-semibold text-primary">{perk}</p>
              <p className="text-sm text-slate-600">
                {perk === 'Stylist concierge'
                  ? 'Book a dedicated human stylist when you need a refresh.'
                  : perk === 'Advanced analytics'
                  ? 'Deep dives into cost-per-wear, colour stories and exportable reports.'
                  : 'Join themed styling battles and climb the leaderboard.'}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-slate-800">Fresh from your closet</h3>
        <div className="mt-3 grid gap-3 md:grid-cols-4">
          {items.slice(0, 4).map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
