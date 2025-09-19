export type ClosetFilters = {
  category?: string;
  colour?: string;
  season?: string;
  text?: string;
};

export type FiltersProps = {
  value: ClosetFilters;
  onChange: (next: ClosetFilters) => void;
};

const categories = ['All', 'Top', 'Bottom', 'Dress', 'Outerwear', 'Shoes', 'Accessories'];
const seasons = ['All', 'Spring', 'Summer', 'Fall', 'Winter'];

const Filters = ({ value, onChange }: FiltersProps) => {
  return (
    <div className="flex flex-wrap gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm shadow-sm">
      <div className="flex flex-col gap-1">
        <span className="text-xs uppercase tracking-wide text-slate-500">Category</span>
        <div className="flex flex-wrap gap-1">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`rounded-full px-3 py-1 text-xs ${
                value.category === category.toLowerCase() ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'
              }`}
              onClick={() =>
                onChange({
                  ...value,
                  category: category === 'All' ? undefined : category.toLowerCase(),
                })
              }
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <label className="flex flex-col text-xs text-slate-500">
        Season
        <select
          className="mt-1 rounded-md border border-slate-200 px-3 py-2 text-sm"
          value={value.season ?? 'All'}
          onChange={(event) =>
            onChange({
              ...value,
              season: event.target.value === 'All' ? undefined : event.target.value,
            })
          }
        >
          {seasons.map((season) => (
            <option key={season}>{season}</option>
          ))}
        </select>
      </label>
      <label className="flex flex-col text-xs text-slate-500">
        Search
        <input
          type="search"
          placeholder="Find items"
          value={value.text ?? ''}
          onChange={(event) => onChange({ ...value, text: event.target.value })}
          className="mt-1 rounded-md border border-slate-200 px-3 py-2 text-sm"
        />
      </label>
    </div>
  );
};

export default Filters;
