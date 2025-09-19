import type { Item } from '../types';

export type SimilarItem = Pick<Item, 'id' | 'title' | 'category' | 'imagePath'>;

export interface SimilarityProvider {
  findSimilar(item: Item, candidates: Item[]): Promise<SimilarItem[]>;
}

class MockSimilarityProvider implements SimilarityProvider {
  async findSimilar(item: Item, candidates: Item[]): Promise<SimilarItem[]> {
    return candidates
      .filter((candidate) => candidate.category === item.category)
      .slice(0, 4)
      .map((candidate) => ({
        id: candidate.id,
        title: candidate.title,
        category: candidate.category,
        imagePath: candidate.imagePath,
      }));
  }
}

export const similarityProvider: SimilarityProvider = new MockSimilarityProvider();
