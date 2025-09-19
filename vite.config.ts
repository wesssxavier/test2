import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  root: 'app/renderer',
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'app/renderer'),
      '@state': path.resolve(__dirname, 'app/renderer/state'),
      '@components': path.resolve(__dirname, 'app/renderer/components'),
      '@routes': path.resolve(__dirname, 'app/renderer/routes'),
      '@services': path.resolve(__dirname, 'app/renderer/services'),
      '@ipc': path.resolve(__dirname, 'app/common/ipc'),
    },
  },
  server: {
    port: 5173,
    host: '0.0.0.0',
  },
});
