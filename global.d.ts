import { ipcRenderer } from "electron/renderer";

declare global {
  interface Window {
    ipcRenderer: {
      send: (...args: Parameters<typeof ipcRenderer.send>) => void;
    };
  }
}

export {};
