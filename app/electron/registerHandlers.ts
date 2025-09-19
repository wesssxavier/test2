import type { IpcMain } from 'electron';
import { registerItemsHandlers } from './ipcHandlers/items';
import { registerOutfitHandlers } from './ipcHandlers/outfits';
import { registerAnalysisHandlers } from './ipcHandlers/analysis';
import { registerClosetHandlers } from './ipcHandlers/closets';
import { registerShareHandlers } from './ipcHandlers/share';
import { registerGroupHandlers } from './ipcHandlers/groups';
import { registerWishlistHandlers } from './ipcHandlers/wishlist';
import { registerAnalyticsHandlers } from './ipcHandlers/analytics';
import { registerConciergeHandlers } from './ipcHandlers/concierge';
import { registerChallengeHandlers } from './ipcHandlers/challenges';

export const registerHandlers = (ipcMain: IpcMain) => {
  registerItemsHandlers(ipcMain);
  registerOutfitHandlers(ipcMain);
  registerAnalysisHandlers(ipcMain);
  registerClosetHandlers(ipcMain);
  registerShareHandlers(ipcMain);
  registerGroupHandlers(ipcMain);
  registerWishlistHandlers(ipcMain);
  registerAnalyticsHandlers(ipcMain);
  registerConciergeHandlers(ipcMain);
  registerChallengeHandlers(ipcMain);
};
