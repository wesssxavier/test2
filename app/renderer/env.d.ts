/// <reference types="vite/client" />

import type { RendererBridge } from '../common/ipc/bridge';

declare global {
  interface Window {
    styleAI: RendererBridge;
  }
}
