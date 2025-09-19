import type { IpcMain } from 'electron';
import { ipcChannels } from '../../common/ipc/channels';
import { groupsCreateInput, groupsInviteInput } from '../../common/ipc/schemas';
import { getPrismaClient } from '../db';
import { DEFAULT_USER_ID } from '../userContext';

export const registerGroupHandlers = (ipcMain: IpcMain) => {
  const prisma = getPrismaClient();

  ipcMain.handle(ipcChannels.groupsCreate, async (_event, payload) => {
    const input = groupsCreateInput.parse(payload);
    const group = await prisma.group.create({
      data: {
        name: input.name,
        ownerId: DEFAULT_USER_ID,
      },
    });

    await prisma.groupMember.create({
      data: {
        groupId: group.id,
        userId: DEFAULT_USER_ID,
        role: 'owner',
      },
    });

    return group;
  });

  ipcMain.handle(ipcChannels.groupsInvite, async (_event, payload) => {
    const input = groupsInviteInput.parse(payload);
    // Stub invitation: record activity for tracking
    await prisma.activity.create({
      data: {
        userId: DEFAULT_USER_ID,
        type: 'group_invite',
        payload: JSON.stringify({ groupId: input.groupId, email: input.email }),
      },
    });
    return { success: true };
  });
};
