export const ipcChannels = {
  itemsCreate: 'items:create',
  itemsUpdateMeta: 'items:updateMeta',
  itemsFindMany: 'items:findMany',
  outfitsCreate: 'outfits:create',
  outfitsList: 'outfits:list',
  analysisAnalyze: 'analysis:analyzeOutfit',
  analysisDailyAdvice: 'analysis:dailyAdvice',
  closetsCreate: 'closets:create',
  closetsSwitch: 'closets:switch',
  shareCreateLink: 'share:createLink',
  groupsCreate: 'groups:create',
  groupsInvite: 'groups:invite',
  wishlistClip: 'wishlist:clip',
  wishlistCreate: 'wishlist:create',
  analyticsSummary: 'analytics:summary',
  conciergeRequest: 'concierge:request',
  challengesCreate: 'challenges:create',
  challengesJoin: 'challenges:join',
  challengesSubmit: 'challenges:submitEntry',
  challengesVote: 'challenges:vote',
} as const;

export type IpcChannel = (typeof ipcChannels)[keyof typeof ipcChannels];
