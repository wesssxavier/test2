import type { IpcMain } from 'electron';
import { ipcChannels } from '../../common/ipc/channels';
import { wishlistClipInput, wishlistCreateInput } from '../../common/ipc/schemas';
import { getPrismaClient } from '../db';
import { DEFAULT_USER_ID } from '../userContext';

const parseOpenGraph = (url: string) => ({
  title: `Wishlist item from ${url}`,
  image: undefined as string | undefined,
  price: undefined as number | undefined,
});

export const registerWishlistHandlers = (ipcMain: IpcMain) => {
  const prisma = getPrismaClient();

  ipcMain.handle(ipcChannels.wishlistClip, async (_event, payload) => {
    const input = wishlistClipInput.parse(payload);
    const parsed = parseOpenGraph(input.url);
    return parsed;
  });

  ipcMain.handle(ipcChannels.wishlistCreate, async (_event, payload) => {
    const input = wishlistCreateInput.parse(payload);
    const item = await prisma.wishlistItem.create({
      data: {
        userId: DEFAULT_USER_ID,
        title: input.title,
        brand: input.brand,
        price: input.price,
        url: input.url,
        imageUrl: input.imageUrl,
        tags: input.tags ?? [],
        desiredSize: input.desiredSize,
      },
    });
    return item;
  });
};
