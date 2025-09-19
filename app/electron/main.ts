import { app, BrowserWindow, ipcMain, nativeTheme, shell } from 'electron';
import path from 'path';
import { URL } from 'url';
import log from 'electron-log';
import { registerHandlers } from './registerHandlers';
import { disconnectPrisma } from './db';
import fs from 'fs';

const isDev = !app.isPackaged;

const resolvePreloadPath = () => {
  const compiledPath = path.join(app.getAppPath(), 'dist-electron/preload.js');
  if (fs.existsSync(compiledPath)) {
    return compiledPath;
  }
  return path.join(app.getAppPath(), 'app/electron/preload.js');
};

const createWindow = async () => {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    show: false,
    backgroundColor: nativeTheme.shouldUseDarkColors ? '#0f172a' : '#ffffff',
    webPreferences: {
      preload: resolvePreloadPath(),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  const pageUrl = isDev
    ? new URL('http://localhost:5173')
    : new URL(`file://${path.join(__dirname, '../renderer/index.html')}`);

  await mainWindow.loadURL(pageUrl.toString());

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
};

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', async () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    await createWindow();
  }
});

app.on('ready', async () => {
  try {
    registerHandlers(ipcMain);
    await createWindow();
  } catch (error) {
    log.error(error);
  }
});

app.on('before-quit', async () => {
  await disconnectPrisma();
});

process.on('uncaughtException', (error) => {
  log.error(error);
});
