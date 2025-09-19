import { useWardrobeStore } from '../state/useWardrobeStore';

const Profile = () => {
  const { closets, outfits, items, wishlist } = useWardrobeStore((state) => ({
    closets: state.closets,
    outfits: state.outfits,
    items: state.items,
    wishlist: state.wishlist,
  }));

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-800">Profile overview</h2>
        <p className="text-sm text-slate-500">Track wardrobe usage, premium status and recent actions.</p>
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          <div className="rounded-xl bg-slate-900 p-4 text-white shadow-lg">
            <p className="text-xs uppercase text-white/70">Closets</p>
            <p className="mt-2 text-2xl font-semibold">{closets.length}</p>
          </div>
          <div className="rounded-xl bg-white p-4 text-slate-700 shadow-sm ring-1 ring-primary/10">
            <p className="text-xs uppercase text-slate-400">Outfits</p>
            <p className="mt-2 text-2xl font-semibold">{outfits.length}</p>
          </div>
          <div className="rounded-xl bg-white p-4 text-slate-700 shadow-sm ring-1 ring-primary/10">
            <p className="text-xs uppercase text-slate-400">Items</p>
            <p className="mt-2 text-2xl font-semibold">{items.length}</p>
          </div>
          <div className="rounded-xl bg-white p-4 text-slate-700 shadow-sm ring-1 ring-primary/10">
            <p className="text-xs uppercase text-slate-400">Wishlist</p>
            <p className="mt-2 text-2xl font-semibold">{wishlist.length}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700">Activity feed</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>• Added blazer to Everyday closet</li>
            <li>• Joined Layer Lovers challenge</li>
            <li>• Requested stylist concierge session</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700">Subscription</h3>
          <p className="text-sm text-slate-500">You&apos;re on the Free plan — unlimited items included.</p>
          <button className="mt-3 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white">Upgrade to Premium</button>
        </div>
      </section>
    </div>
  );
};

export default Profile;
