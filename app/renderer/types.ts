export type Closet = {
  id: string;
  name: string;
  season?: string | null;
  isDefault: boolean;
};

export type Item = {
  id: string;
  closetId: string;
  title: string;
  category: string;
  color?: string | null;
  brand?: string | null;
  season?: string | null;
  wears: number;
  imagePath: string;
  tags: string[];
};

export type Outfit = {
  id: string;
  closetId: string;
  name: string;
  occasion?: string | null;
  style?: string | null;
  favorite: boolean;
  imagePath?: string | null;
  itemIds: string[];
};

export type WishlistItem = {
  id: string;
  title: string;
  brand?: string | null;
  price?: number | null;
  status: string;
};

export type Challenge = {
  id: string;
  title: string;
  rules: string;
  deadline: string;
  entries?: ChallengeEntry[];
};

export type ChallengeEntry = {
  id: string;
  outfitId: string;
  votes: number;
};
