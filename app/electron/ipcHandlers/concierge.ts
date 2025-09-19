import type { IpcMain } from 'electron';
import { ipcChannels } from '../../common/ipc/channels';
import { conciergeRequestInput } from '../../common/ipc/schemas';
import { getPrismaClient } from '../db';
import { DEFAULT_USER_ID } from '../userContext';

export const registerConciergeHandlers = (ipcMain: IpcMain) => {
  const prisma = getPrismaClient();

  ipcMain.handle(ipcChannels.conciergeRequest, async (_event, payload) => {
    const input = conciergeRequestInput.parse(payload);
    await prisma.activity.create({
      data: {
        userId: DEFAULT_USER_ID,
        type: 'concierge_request',
        payload: JSON.stringify({ goal: input.goal, timeslot: input.timeslot }),
      },
    });

    return {
      status: 'scheduled',
      message: 'A stylist will confirm within 24h.',
    };
  });
};
