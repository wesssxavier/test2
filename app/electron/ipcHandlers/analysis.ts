import type { IpcMain } from 'electron';
import { ipcChannels } from '../../common/ipc/channels';
import { analysisAnalyzeOutfitInput, analysisDailyAdviceInput } from '../../common/ipc/schemas';
import { getPrismaClient } from '../db';
import { DEFAULT_USER_ID } from '../userContext';
import { fetchWeather } from '../weather';

const prisma = getPrismaClient();

export const registerAnalysisHandlers = (ipcMain: IpcMain) => {
  ipcMain.handle(ipcChannels.analysisAnalyze, async (_event, payload) => {
    const input = analysisAnalyzeOutfitInput.parse(payload);
    const outfit = await prisma.outfit.findUnique({ where: { id: input.outfitId } });
    if (!outfit) {
      throw new Error('Outfit not found');
    }
    const items = JSON.parse(outfit.items) as string[];
    const insights = [`${items.length} item look`, 'Balanced colour palette', 'Weather ready layers'];
    return {
      score: 82,
      notes: insights,
      tips: ['Add a contrasting accessory', 'Swap shoes for weather-proof pair'],
    };
  });

  ipcMain.handle(ipcChannels.analysisDailyAdvice, async (_event, payload) => {
    const input = analysisDailyAdviceInput.parse(payload);
    const weather = await fetchWeather(input.location ?? 'San Francisco,US');
    const outfitCount = await prisma.outfit.count({ where: { userId: DEFAULT_USER_ID } });
    return `Expect ${weather.summary}. Try one of your ${outfitCount} saved outfits with breathable layers.`;
  });
};
