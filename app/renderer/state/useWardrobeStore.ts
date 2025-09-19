import { create } from 'zustand';
import type { Closet, Item, Outfit, WishlistItem, Challenge } from '../types';

const sampleClosets: Closet[] = [
  { id: 'closet-default', name: 'Everyday', season: 'Spring', isDefault: true },
  { id: 'closet-travel', name: 'Travel Capsule', season: 'Summer', isDefault: false },
];

const sampleItems: Item[] = Array.from({ length: 8 }).map((_, index) => ({
  id: `item-${index + 1}`,
  closetId: sampleClosets[index % sampleClosets.length].id,
  title: `Layer ${index + 1}`,
  category: ['top', 'bottom', 'outerwear', 'shoes'][index % 4],
  color: ['Navy', 'Camel', 'Olive', 'White'][index % 4],
  brand: 'StyleAI',
  season: index % 2 === 0 ? 'Spring' : 'Fall',
  wears: 5 + index,
  imagePath: '/assets/item-placeholder.png',
  tags: ['demo'],
}));

const sampleOutfits: Outfit[] = [
  {
    id: 'outfit-1',
    closetId: sampleClosets[0].id,
    name: 'Brunch Layers',
    occasion: 'Weekend',
    style: 'casual',
    favorite: true,
    imagePath: undefined,
    itemIds: sampleItems.slice(0, 3).map((item) => item.id),
  },
  {
    id: 'outfit-2',
    closetId: sampleClosets[1].id,
    name: 'Red-eye Travel',
    occasion: 'Travel',
    style: 'athleisure',
    favorite: false,
    imagePath: undefined,
    itemIds: sampleItems.slice(3, 6).map((item) => item.id),
  },
];

const sampleWishlist: WishlistItem[] = [
  {
    id: 'wishlist-1',
    title: 'Indigo Selvedge Jacket',
    brand: 'Denim Co',
    price: 198,
    status: 'wanted',
  },
];

const sampleChallenges: Challenge[] = [
  {
    id: 'challenge-1',
    title: 'Layer Lovers',
    rules: 'Showcase creative layering techniques for transitional weather.',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(),
    entries: [
      {
        id: 'entry-1',
        outfitId: 'outfit-1',
        votes: 8,
      },
    ],
  },
];

type WardrobeState = {
  loading: boolean;
  closets: Closet[];
  items: Item[];
  outfits: Outfit[];
  wishlist: WishlistItem[];
  challenges: Challenge[];
  activeClosetId: string;
  initialize: () => Promise<void>;
  setActiveCloset: (closetId: string) => void;
};

export const useWardrobeStore = create<WardrobeState>((set) => ({
  loading: false,
  closets: sampleClosets,
  items: sampleItems,
  outfits: sampleOutfits,
  wishlist: sampleWishlist,
  challenges: sampleChallenges,
  activeClosetId: sampleClosets[0].id,
  async initialize() {
    set({ loading: true });
    try {
      if (window?.styleAI) {
        const response = (await window.styleAI.items.findMany({
          filters: { closetId: sampleClosets[0].id },
          search: undefined,
          sort: 'newest',
        })) as { items?: Item[] };
        if (response?.items) {
          set({ items: response.items });
        }
      }
    } catch (error) {
      console.warn('IPC unavailable, continuing with demo data', error);
    } finally {
      set({ loading: false });
    }
  },
  setActiveCloset(closetId: string) {
    set({ activeClosetId: closetId });
  },
}));
