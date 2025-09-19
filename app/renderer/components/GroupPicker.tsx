import { useState } from 'react';

export type GroupPickerProps = {
  groups: { id: string; name: string }[];
  onSelect: (groupId: string) => void;
};

const GroupPicker = ({ groups, onSelect }: GroupPickerProps) => {
  const [value, setValue] = useState(groups[0]?.id ?? '');

  return (
    <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 text-sm shadow-sm">
      <span className="text-xs uppercase text-slate-500">Share with</span>
      <select
        className="rounded-md border border-slate-200 px-3 py-1 text-sm"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          onSelect(event.target.value);
        }}
      >
        {groups.map((group) => (
          <option key={group.id} value={group.id}>
            {group.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GroupPicker;
