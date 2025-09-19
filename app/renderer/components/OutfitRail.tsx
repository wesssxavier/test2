import type { Item } from '../types';

export type OutfitRailProps = {
  items: Item[];
  onInsert: (item: Item) => void;
};

const OutfitRail = ({ items, onInsert }: OutfitRailProps) => {
  return (
    <div className="flex items-center gap-3 overflow-x-auto rounded-xl border border-slate-200 bg-white p-3 text-sm shadow-sm">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onInsert(item)}
          className="min-w-[120px] rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-left transition hover:border-primary hover:bg-primary/10"
        >
          <p className="text-xs uppercase tracking-wide text-slate-400">{item.category}</p>
          <p className="text-sm font-medium text-slate-700">{item.title}</p>
          <p className="text-xs text-slate-500">Swipe to add</p>
        </button>
      ))}
    </div>
  );
};

export default OutfitRail;
