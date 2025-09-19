import type { IpcMain } from 'electron';
import { ipcChannels } from '../../common/ipc/channels';
import { outfitsCreateInput, outfitsListInput } from '../../common/ipc/schemas';
import { getPrismaClient } from '../db';
import { DEFAULT_USER_ID } from '../userContext';

const prisma = getPrismaClient();

const exportOutfitPreview = async (outfitId: string) => {
  // Stubbed export logic - real implementation would render canvas to PNG
  return `/generated/outfit-${outfitId}.png`;
};

export const registerOutfitHandlers = (ipcMain: IpcMain) => {
  ipcMain.handle(ipcChannels.outfitsCreate, async (_event, payload) => {
    const input = outfitsCreateInput.parse(payload);
    const outfit = await prisma.outfit.create({
      data: {
        userId: DEFAULT_USER_ID,
        closetId: input.closetId,
        name: input.name,
        occasion: input.occasion,
        style: input.style,
        items: JSON.stringify(input.itemIds),
      },
    });

    let imagePath: string | null = null;
    if (input.exportPng) {
      imagePath = await exportOutfitPreview(outfit.id);
      await prisma.outfit.update({
        where: { id: outfit.id },
        data: { imagePath },
      });
    }

    await prisma.activity.create({
      data: {
        userId: DEFAULT_USER_ID,
        type: 'create_outfit',
        payload: JSON.stringify({ outfitId: outfit.id }),
      },
    });

    return { ...outfit, imagePath: imagePath ?? outfit.imagePath };
  });

  ipcMain.handle(ipcChannels.outfitsList, async (_event, payload) => {
    const input = outfitsListInput.parse(payload);
    const outfits = await prisma.outfit.findMany({
      where: {
        userId: DEFAULT_USER_ID,
        closetId: input.filters.closetId,
        occasion: input.filters.occasion,
        style: input.filters.style,
        favorite: input.filters.favorite,
      },
      orderBy: { createdAt: 'desc' },
    });

    return outfits.map((outfit) => ({
      ...outfit,
      itemIds: JSON.parse(outfit.items) as string[],
    }));
  });
};
