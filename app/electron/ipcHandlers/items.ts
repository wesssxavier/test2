import type { IpcMain } from 'electron';
import { itemsCreateInput, itemsFindManyInput, itemsUpdateMetaInput } from '../../common/ipc/schemas';
import { ipcChannels } from '../../common/ipc/channels';
import { getPrismaClient } from '../db';
import { DEFAULT_USER_ID } from '../userContext';

export const registerItemsHandlers = (ipcMain: IpcMain) => {
  const prisma = getPrismaClient();

  ipcMain.handle(ipcChannels.itemsCreate, async (_event, payload) => {
    const input = itemsCreateInput.parse(payload);
    const item = await prisma.item.create({
      data: {
        userId: DEFAULT_USER_ID,
        closetId: input.closetId,
        title: input.meta.title,
        category: input.meta.category,
        color: input.meta.color,
        brand: input.meta.brand,
        size: input.meta.size,
        fabric: input.meta.fabric,
        season: input.meta.season,
        price: input.meta.price,
        purchaseAt: input.meta.purchaseAt ? new Date(input.meta.purchaseAt) : undefined,
        imagePath: input.file.path,
        tags: input.meta.tags ?? [],
      },
    });

    await prisma.activity.create({
      data: {
        userId: DEFAULT_USER_ID,
        type: 'add_item',
        payload: JSON.stringify({ itemId: item.id }),
      },
    });

    return item;
  });

  ipcMain.handle(ipcChannels.itemsUpdateMeta, async (_event, payload) => {
    const input = itemsUpdateMetaInput.parse(payload);
    const item = await prisma.item.update({
      where: { id: input.itemId },
      data: {
        ...input.meta,
        purchaseAt: input.meta.purchaseAt ? new Date(input.meta.purchaseAt) : undefined,
        tags: input.meta.tags ?? undefined,
      },
    });
    return item;
  });

  ipcMain.handle(ipcChannels.itemsFindMany, async (_event, payload) => {
    const input = itemsFindManyInput.parse(payload);
    const items = await prisma.item.findMany({
      where: {
        userId: DEFAULT_USER_ID,
        closetId: input.filters.closetId,
        category: input.filters.category,
        color: input.filters.color,
        season: input.filters.season,
        tags: input.filters.tags ? { hasSome: input.filters.tags } : undefined,
        title: input.search ? { contains: input.search, mode: 'insensitive' } : undefined,
      },
      orderBy:
        input.sort === 'alphabetical'
          ? { title: 'asc' }
          : input.sort === 'mostWorn'
          ? { wears: 'desc' }
          : { createdAt: 'desc' },
    });

    const counts = await prisma.item.groupBy({
      by: ['category'],
      where: { userId: DEFAULT_USER_ID },
      _count: true,
    });

    return { items, counts };
  });
};
