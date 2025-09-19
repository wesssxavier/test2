import type { IpcMain } from 'electron';
import { ipcChannels } from '../../common/ipc/channels';
import {
  challengesCreateInput,
  challengesJoinInput,
  challengesSubmitEntryInput,
  challengesVoteInput,
} from '../../common/ipc/schemas';
import { getPrismaClient } from '../db';
import { DEFAULT_USER_ID } from '../userContext';

export const registerChallengeHandlers = (ipcMain: IpcMain) => {
  const prisma = getPrismaClient();

  ipcMain.handle(ipcChannels.challengesCreate, async (_event, payload) => {
    const input = challengesCreateInput.parse(payload);
    const challenge = await prisma.challenge.create({
      data: {
        title: input.title,
        rules: input.rules,
        deadline: new Date(input.deadline),
        ownerId: DEFAULT_USER_ID,
      },
    });
    return challenge;
  });

  ipcMain.handle(ipcChannels.challengesJoin, async (_event, payload) => {
    const input = challengesJoinInput.parse(payload);
    await prisma.activity.create({
      data: {
        userId: DEFAULT_USER_ID,
        type: 'challenge_join',
        payload: JSON.stringify({ challengeId: input.challengeId }),
      },
    });
    return { success: true };
  });

  ipcMain.handle(ipcChannels.challengesSubmit, async (_event, payload) => {
    const input = challengesSubmitEntryInput.parse(payload);
    const entry = await prisma.challengeEntry.create({
      data: {
        challengeId: input.challengeId,
        userId: DEFAULT_USER_ID,
        outfitId: input.outfitId,
      },
    });
    return entry;
  });

  ipcMain.handle(ipcChannels.challengesVote, async (_event, payload) => {
    const input = challengesVoteInput.parse(payload);
    const entry = await prisma.challengeEntry.update({
      where: { id: input.entryId },
      data: { votes: { increment: 1 } },
    });
    return entry;
  });
};
