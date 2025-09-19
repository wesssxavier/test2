import { z } from 'zod';

export const fileStubSchema = z.object({
  name: z.string(),
  path: z.string(),
});

export const itemMetaSchema = z.object({
  title: z.string().min(1),
  category: z.string().min(1),
  color: z.string().optional(),
  brand: z.string().optional(),
  size: z.string().optional(),
  fabric: z.string().optional(),
  season: z.string().optional(),
  price: z.number().optional(),
  purchaseAt: z.string().datetime().optional(),
  tags: z.array(z.string()).default([]),
});

export const itemsCreateInput = z.object({
  closetId: z.string(),
  file: fileStubSchema,
  meta: itemMetaSchema,
});

export const itemsUpdateMetaInput = z.object({
  itemId: z.string(),
  meta: itemMetaSchema.partial(),
});

export const itemsFindManyInput = z.object({
  filters: z
    .object({
      category: z.string().optional(),
      color: z.string().optional(),
      season: z.string().optional(),
      tags: z.array(z.string()).optional(),
      closetId: z.string().optional(),
      priceRange: z.tuple([z.number(), z.number()]).optional(),
    })
    .default({}),
  search: z.string().optional(),
  sort: z.enum(['newest', 'mostWorn', 'alphabetical']).optional(),
});

export const outfitsCreateInput = z.object({
  closetId: z.string(),
  itemIds: z.array(z.string()),
  name: z.string(),
  occasion: z.string().optional(),
  style: z.string().optional(),
  exportPng: z.boolean().optional(),
});

export const outfitsListInput = z.object({
  filters: z
    .object({
      closetId: z.string().optional(),
      occasion: z.string().optional(),
      style: z.string().optional(),
      favorite: z.boolean().optional(),
    })
    .default({}),
  tabs: z.enum(['all', 'favourites', 'recent', 'topRated']).optional(),
});

export const analysisAnalyzeOutfitInput = z.object({
  outfitId: z.string(),
});

export const analysisDailyAdviceInput = z.object({
  location: z.string().optional(),
  calendarStub: z.array(z.string()).optional(),
});

export const closetsCreateInput = z.object({
  name: z.string(),
  season: z.string().optional(),
  isDefault: z.boolean().optional(),
});

export const closetsSwitchInput = z.object({
  closetId: z.string(),
});

export const shareCreateLinkInput = z.object({
  targetId: z.string(),
  targetType: z.enum(['outfit', 'closet']),
  visibility: z.enum(['private', 'link', 'group']),
  groupId: z.string().optional(),
});

export const groupsCreateInput = z.object({
  name: z.string(),
});

export const groupsInviteInput = z.object({
  groupId: z.string(),
  email: z.string().email(),
});

export const wishlistClipInput = z.object({
  url: z.string().url(),
});

export const wishlistCreateInput = z.object({
  title: z.string(),
  brand: z.string().optional(),
  price: z.number().optional(),
  url: z.string().url().optional(),
  imageUrl: z.string().url().optional(),
  tags: z.array(z.string()).optional(),
  desiredSize: z.string().optional(),
});

export const analyticsSummaryInput = z.object({});

export const conciergeRequestInput = z.object({
  goal: z.string(),
  timeslot: z.string(),
  images: z.array(fileStubSchema).default([]),
});

export const challengesCreateInput = z.object({
  title: z.string(),
  rules: z.string(),
  deadline: z.string(),
});

export const challengesJoinInput = z.object({
  challengeId: z.string(),
});

export const challengesSubmitEntryInput = z.object({
  challengeId: z.string(),
  outfitId: z.string(),
});

export const challengesVoteInput = z.object({
  entryId: z.string(),
});

export type ItemsCreateInput = z.infer<typeof itemsCreateInput>;
export type ItemsUpdateMetaInput = z.infer<typeof itemsUpdateMetaInput>;
export type ItemsFindManyInput = z.infer<typeof itemsFindManyInput>;
export type OutfitsCreateInput = z.infer<typeof outfitsCreateInput>;
export type OutfitsListInput = z.infer<typeof outfitsListInput>;
export type AnalysisAnalyzeOutfitInput = z.infer<typeof analysisAnalyzeOutfitInput>;
export type AnalysisDailyAdviceInput = z.infer<typeof analysisDailyAdviceInput>;
export type ClosetsCreateInput = z.infer<typeof closetsCreateInput>;
export type ClosetsSwitchInput = z.infer<typeof closetsSwitchInput>;
export type ShareCreateLinkInput = z.infer<typeof shareCreateLinkInput>;
export type GroupsCreateInput = z.infer<typeof groupsCreateInput>;
export type GroupsInviteInput = z.infer<typeof groupsInviteInput>;
export type WishlistClipInput = z.infer<typeof wishlistClipInput>;
export type WishlistCreateInput = z.infer<typeof wishlistCreateInput>;
export type AnalyticsSummaryInput = z.infer<typeof analyticsSummaryInput>;
export type ConciergeRequestInput = z.infer<typeof conciergeRequestInput>;
export type ChallengesCreateInput = z.infer<typeof challengesCreateInput>;
export type ChallengesJoinInput = z.infer<typeof challengesJoinInput>;
export type ChallengesSubmitEntryInput = z.infer<typeof challengesSubmitEntryInput>;
export type ChallengesVoteInput = z.infer<typeof challengesVoteInput>;
