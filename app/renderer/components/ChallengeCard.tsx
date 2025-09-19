import type { Challenge } from '../types';

export type ChallengeCardProps = {
  challenge: Challenge;
  onJoin?: (challengeId: string) => void;
  onVote?: (entryId: string) => void;
};

const ChallengeCard = ({ challenge, onJoin, onVote }: ChallengeCardProps) => {
  const deadline = new Date(challenge.deadline).toLocaleDateString();
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-800">{challenge.title}</h3>
          <p className="text-xs text-slate-500">Deadline {deadline}</p>
        </div>
        <button
          type="button"
          onClick={() => onJoin?.(challenge.id)}
          className="rounded-md bg-primary px-3 py-1 text-xs font-semibold text-white shadow"
        >
          Join
        </button>
      </div>
      <p className="mt-3 text-sm text-slate-600">{challenge.rules}</p>
      <div className="mt-4 space-y-2">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Entries</h4>
        {(challenge.entries ?? []).map((entry) => (
          <div key={entry.id} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600">
            <span>Outfit {entry.outfitId}</span>
            <button
              type="button"
              className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-primary shadow"
              onClick={() => onVote?.(entry.id)}
            >
              Vote ({entry.votes})
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChallengeCard;
