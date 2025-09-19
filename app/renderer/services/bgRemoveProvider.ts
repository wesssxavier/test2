export type BackgroundRemovalResult = {
  imagePath: string;
  usedFallback: boolean;
};

export interface BackgroundRemovalProvider {
  removeBackground(filePath: string): Promise<BackgroundRemovalResult>;
}

class LocalMaskEditor implements BackgroundRemovalProvider {
  async removeBackground(filePath: string): Promise<BackgroundRemovalResult> {
    return {
      imagePath: filePath,
      usedFallback: true,
    };
  }
}

class MockBackgroundRemoval implements BackgroundRemovalProvider {
  constructor(private readonly fallback: BackgroundRemovalProvider = new LocalMaskEditor()) {}

  async removeBackground(filePath: string): Promise<BackgroundRemovalResult> {
    try {
      if (!window.navigator.onLine) {
        throw new Error('offline');
      }
      return {
        imagePath: `${filePath.replace(/\.[^.]+$/, '')}-bg-removed.png`,
        usedFallback: false,
      };
    } catch (error) {
      return this.fallback.removeBackground(filePath);
    }
  }
}

export const bgRemoveProvider = new MockBackgroundRemoval();
