export type ShareBadgeProps = {
  visibility: 'private' | 'link' | 'group';
};

const labels: Record<ShareBadgeProps['visibility'], string> = {
  private: 'Private',
  link: 'Link',
  group: 'Group',
};

const colors: Record<ShareBadgeProps['visibility'], string> = {
  private: 'bg-slate-200 text-slate-700',
  link: 'bg-amber-100 text-amber-700',
  group: 'bg-emerald-100 text-emerald-700',
};

const ShareBadge = ({ visibility }: ShareBadgeProps) => (
  <span className={`rounded-full px-2 py-1 text-xs font-semibold ${colors[visibility]}`}>
    {labels[visibility]}
  </span>
);

export default ShareBadge;
