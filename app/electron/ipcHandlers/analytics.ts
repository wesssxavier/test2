import type { IpcMain } from 'electron';
import { ipcChannels } from '../../common/ipc/channels';
import { analyticsSummaryInput } from '../../common/ipc/schemas';
import { getPrismaClient } from '../db';
import { DEFAULT_USER_ID } from '../userContext';

export const registerAnalyticsHandlers = (ipcMain: IpcMain) => {
  const prisma = getPrismaClient();

  ipcMain.handle(ipcChannels.analyticsSummary, async (_event, payload) => {
    analyticsSummaryInput.parse(payload ?? {});
    const [itemCount, outfitCount, wishlistCount] = await Promise.all([
      prisma.item.count({ where: { userId: DEFAULT_USER_ID } }),
      prisma.outfit.count({ where: { userId: DEFAULT_USER_ID } }),
      prisma.wishlistItem.count({ where: { userId: DEFAULT_USER_ID } }),
    ]);

    const wearsByMonth = await prisma.activity.groupBy({
      by: ['createdAt'],
      where: { userId: DEFAULT_USER_ID, type: 'wear_log' },
      _count: true,
    });

    return {
      itemCount,
      outfitCount,
      wishlistCount,
      wearsByMonth: wearsByMonth.map((row) => ({ month: row.createdAt, wears: row._count })),
    };
  });
};
