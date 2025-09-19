import type { IpcMain } from 'electron';
import { ipcChannels } from '../../common/ipc/channels';
import { closetsCreateInput, closetsSwitchInput } from '../../common/ipc/schemas';
import { getPrismaClient } from '../db';
import { DEFAULT_USER_ID } from '../userContext';

export const registerClosetHandlers = (ipcMain: IpcMain) => {
  const prisma = getPrismaClient();

  ipcMain.handle(ipcChannels.closetsCreate, async (_event, payload) => {
    const input = closetsCreateInput.parse(payload);
    const closet = await prisma.closet.create({
      data: {
        userId: DEFAULT_USER_ID,
        name: input.name,
        season: input.season,
        isDefault: input.isDefault ?? false,
      },
    });

    if (input.isDefault) {
      await prisma.closet.updateMany({
        where: { userId: DEFAULT_USER_ID, NOT: { id: closet.id } },
        data: { isDefault: false },
      });
    }

    return closet;
  });

  ipcMain.handle(ipcChannels.closetsSwitch, async (_event, payload) => {
    const input = closetsSwitchInput.parse(payload);
    await prisma.closet.updateMany({
      where: { userId: DEFAULT_USER_ID },
      data: { isDefault: false },
    });
    const closet = await prisma.closet.update({
      where: { id: input.closetId },
      data: { isDefault: true },
    });
    return closet;
  });
};
