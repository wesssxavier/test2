import { contextBridge, ipcRenderer } from 'electron';
import { ipcChannels } from '../common/ipc/channels';
import type { RendererBridge } from '../common/ipc/bridge';
import type {
  ItemsCreateInput,
  ItemsUpdateMetaInput,
  ItemsFindManyInput,
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
} from '../common/ipc/schemas';

type Invoke = <T>(channel: string, payload?: unknown) => Promise<T>;

const invoke: Invoke = (channel, payload) => ipcRenderer.invoke(channel, payload);

const api: RendererBridge = {
  items: {
    create: (payload: ItemsCreateInput) => invoke(ipcChannels.itemsCreate, payload),
    updateMeta: (payload: ItemsUpdateMetaInput) => invoke(ipcChannels.itemsUpdateMeta, payload),
    findMany: (payload: ItemsFindManyInput) => invoke(ipcChannels.itemsFindMany, payload),
  },
  outfits: {
    create: (payload: OutfitsCreateInput) => invoke(ipcChannels.outfitsCreate, payload),
    list: (payload: OutfitsListInput) => invoke(ipcChannels.outfitsList, payload),
  },
  analysis: {
    analyzeOutfit: (payload: AnalysisAnalyzeOutfitInput) => invoke(ipcChannels.analysisAnalyze, payload),
    dailyAdvice: (payload: AnalysisDailyAdviceInput) => invoke(ipcChannels.analysisDailyAdvice, payload),
  },
  closets: {
    create: (payload: ClosetsCreateInput) => invoke(ipcChannels.closetsCreate, payload),
    switch: (payload: ClosetsSwitchInput) => invoke(ipcChannels.closetsSwitch, payload),
  },
  share: {
    createLink: (payload: ShareCreateLinkInput) => invoke(ipcChannels.shareCreateLink, payload),
  },
  groups: {
    create: (payload: GroupsCreateInput) => invoke(ipcChannels.groupsCreate, payload),
    invite: (payload: GroupsInviteInput) => invoke(ipcChannels.groupsInvite, payload),
  },
  wishlist: {
    clip: (payload: WishlistClipInput) => invoke(ipcChannels.wishlistClip, payload),
    create: (payload: WishlistCreateInput) => invoke(ipcChannels.wishlistCreate, payload),
  },
  analytics: {
    summary: (payload: AnalyticsSummaryInput) => invoke(ipcChannels.analyticsSummary, payload),
  },
  concierge: {
    request: (payload: ConciergeRequestInput) => invoke(ipcChannels.conciergeRequest, payload),
  },
  challenges: {
    create: (payload: ChallengesCreateInput) => invoke(ipcChannels.challengesCreate, payload),
    join: (payload: ChallengesJoinInput) => invoke(ipcChannels.challengesJoin, payload),
    submitEntry: (payload: ChallengesSubmitEntryInput) => invoke(ipcChannels.challengesSubmit, payload),
    vote: (payload: ChallengesVoteInput) => invoke(ipcChannels.challengesVote, payload),
  },
};

contextBridge.exposeInMainWorld('styleAI', api);
