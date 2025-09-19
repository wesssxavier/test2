import type { Item } from '../types';

export type ItemCardProps = {
  item: Item;
  onSelect?: (item: Item) => void;
};

const ItemCard = ({ item, onSelect }: ItemCardProps) => {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(item)}
      className="group flex flex-col items-stretch overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative h-40 w-full bg-slate-100">
        <span className="absolute right-2 top-2 rounded-full bg-white/80 px-2 text-xs font-semibold text-slate-600">
          {item.category}
        </span>
        <div className="flex h-full items-center justify-center text-sm text-slate-500">Image</div>
      </div>
      <div className="space-y-1 p-3">
        <p className="text-sm font-medium text-slate-800">{item.title}</p>
        <p className="text-xs text-slate-500">{item.brand ?? 'Unknown brand'}</p>
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>{item.color ?? 'Any colour'}</span>
          <span>{item.wears} wears</span>
        </div>
      </div>
    </button>
  );
};

export default ItemCard;
