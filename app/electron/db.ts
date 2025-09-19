import path from 'path';
import { app } from 'electron';
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient | null = null;

export const getDatabasePath = () => {
  const userData = app.getPath('userData');
  return path.join(userData, 'styleai.db');
};

export const getPrismaClient = () => {
  if (!prisma) {
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: `file:${getDatabasePath()}`,
        },
      },
    });
  }
  return prisma;
};

export const disconnectPrisma = async () => {
  if (prisma) {
    await prisma.$disconnect();
    prisma = null;
  }
};
