declare global {
  interface Window {
    ipcRenderer: {
      send: (...args: Parameters<typeof ipcRenderer.send>) => void;
    };
  }
}

export {};
