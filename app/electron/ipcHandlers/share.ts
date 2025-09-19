import type { IpcMain } from 'electron';
import { ipcChannels } from '../../common/ipc/channels';
import { shareCreateLinkInput } from '../../common/ipc/schemas';
import { getPrismaClient } from '../db';
import { DEFAULT_USER_ID } from '../userContext';
import { randomUUID } from 'crypto';

export const registerShareHandlers = (ipcMain: IpcMain) => {
  const prisma = getPrismaClient();

  ipcMain.handle(ipcChannels.shareCreateLink, async (_event, payload) => {
    const input = shareCreateLinkInput.parse(payload);
    const shareId = randomUUID();
    const share = await prisma.shareLink.create({
      data: {
        id: shareId,
        userId: DEFAULT_USER_ID,
        targetId: input.targetId,
        targetType: input.targetType,
        visibility: input.visibility,
        groupId: input.groupId,
      },
    });
    return { ...share, url: `styleai://share/${share.id}` };
  });
};
