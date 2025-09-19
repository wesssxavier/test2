import { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

const navigation = [
  { to: '/', label: 'Home' },
  { to: '/closet', label: 'Closet' },
  { to: '/studio', label: 'Outfit Studio' },
  { to: '/outfits', label: 'Outfits' },
  { to: '/analysis', label: 'Analysis' },
  { to: '/analytics', label: 'Analytics' },
  { to: '/community', label: 'Community' },
  { to: '/wishlist', label: 'Wishlist' },
  { to: '/profile', label: 'Profile' },
  { to: '/settings', label: 'Settings' },
];

const shortcuts: Record<string, string> = {
  u: '/closet',
  s: '/studio',
  f: '/outfits',
  '/': '/closet',
};

const SidebarLink = ({ to, label }: { to: string; label: string }) => (
  <NavLink
    to={to}
    end={to === '/'}
    className={({ isActive }) =>
      clsx(
        'px-3 py-2 rounded-md text-sm font-medium transition-colors',
        isActive ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:text-primary',
      )
    }
  >
    {label}
  </NavLink>
);

const AppLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey) return;
      const route = shortcuts[event.key.toLowerCase()];
      if (route) {
        event.preventDefault();
        navigate(route);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [navigate]);

  return (
    <div className="flex h-screen bg-slate-100">
      <aside className="w-64 space-y-4 border-r border-slate-200 bg-white p-4">
        <div>
          <h1 className="text-xl font-semibold text-primary">StyleAI</h1>
          <p className="text-xs text-slate-500">Desktop Wardrobe HQ</p>
        </div>
        <nav className="flex flex-col gap-1">
          {navigation.map((item) => (
            <SidebarLink key={item.to} to={item.to} label={item.label} />
          ))}
        </nav>
        <div className="rounded-lg border border-dashed border-primary/40 p-3 text-xs text-slate-600">
          <p className="font-semibold text-primary">Premium</p>
          <p>Unlock concierge, analytics exports and style challenges perks.</p>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Your Smart Wardrobe</h2>
              <p className="text-xs text-slate-500">Command center for outfits, closets and analytics.</p>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="search"
                placeholder="Search"
                className="rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none"
              />
              <button className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-white shadow-sm">
                Upload
              </button>
            </div>
          </div>
        </header>
        <section className="p-6">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default AppLayout;
