import { useState } from 'react';
import ChallengeCard from '../components/ChallengeCard';
import GroupPicker from '../components/GroupPicker';
import { useWardrobeStore } from '../state/useWardrobeStore';

const visibilities: Array<'private' | 'link' | 'group'> = ['private', 'link', 'group'];

const Community = () => {
  const { challenges } = useWardrobeStore((state) => ({ challenges: state.challenges }));
  const [shareVisibility, setShareVisibility] = useState<'private' | 'link' | 'group'>('link');
  const [groupId, setGroupId] = useState('group-1');

  const groups = [
    { id: 'group-1', name: 'Style Council' },
    { id: 'group-2', name: 'Travel Capsule Crew' },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-800">Private groups</h2>
        <p className="text-sm text-slate-500">
          Collaborate on closets with trusted friends. Create voting sessions and share read-only links.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button className="rounded-md border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600">
            Create group
          </button>
          <GroupPicker groups={groups} onSelect={setGroupId} />
          <div className="flex gap-1">
            {visibilities.map((visibility) => (
              <button
                key={visibility}
                type="button"
                onClick={() => setShareVisibility(visibility)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  shareVisibility === visibility
                    ? 'bg-primary text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {visibility}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-3 rounded-full bg-primary/10 px-4 py-2 text-xs text-primary">
          Share mode: {shareVisibility} · Group: {groupId}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-slate-800">Styling challenges</h3>
        <p className="text-sm text-slate-500">Join the community leaderboard and earn weekly badges.</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {challenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              onJoin={(challengeId) => console.log('Join challenge', challengeId)}
              onVote={(entryId) => console.log('Vote', entryId)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Community;
