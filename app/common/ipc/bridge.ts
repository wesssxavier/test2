import type {
  ItemsCreateInput,
  ItemsFindManyInput,
  ItemsUpdateMetaInput,
  OutfitsCreateInput,
  OutfitsListInput,
  AnalysisAnalyzeOutfitInput,
  AnalysisDailyAdviceInput,
  ClosetsCreateInput,
  ClosetsSwitchInput,
  ShareCreateLinkInput,
  GroupsCreateInput,
  GroupsInviteInput,
  WishlistClipInput,
  WishlistCreateInput,
  AnalyticsSummaryInput,
  ConciergeRequestInput,
  ChallengesCreateInput,
  ChallengesJoinInput,
  ChallengesSubmitEntryInput,
  ChallengesVoteInput,
} from './schemas';

export type RendererBridge = {
  items: {
    create(payload: ItemsCreateInput): Promise<unknown>;
    updateMeta(payload: ItemsUpdateMetaInput): Promise<unknown>;
    findMany(payload: ItemsFindManyInput): Promise<unknown>;
  };
  outfits: {
    create(payload: OutfitsCreateInput): Promise<unknown>;
    list(payload: OutfitsListInput): Promise<unknown>;
  };
  analysis: {
    analyzeOutfit(payload: AnalysisAnalyzeOutfitInput): Promise<unknown>;
    dailyAdvice(payload: AnalysisDailyAdviceInput): Promise<unknown>;
  };
  closets: {
    create(payload: ClosetsCreateInput): Promise<unknown>;
    switch(payload: ClosetsSwitchInput): Promise<unknown>;
  };
  share: {
    createLink(payload: ShareCreateLinkInput): Promise<unknown>;
  };
  groups: {
    create(payload: GroupsCreateInput): Promise<unknown>;
    invite(payload: GroupsInviteInput): Promise<unknown>;
  };
  wishlist: {
    clip(payload: WishlistClipInput): Promise<unknown>;
    create(payload: WishlistCreateInput): Promise<unknown>;
  };
  analytics: {
    summary(payload: AnalyticsSummaryInput): Promise<unknown>;
  };
  concierge: {
    request(payload: ConciergeRequestInput): Promise<unknown>;
  };
  challenges: {
    create(payload: ChallengesCreateInput): Promise<unknown>;
    join(payload: ChallengesJoinInput): Promise<unknown>;
    submitEntry(payload: ChallengesSubmitEntryInput): Promise<unknown>;
    vote(payload: ChallengesVoteInput): Promise<unknown>;
  };
};
