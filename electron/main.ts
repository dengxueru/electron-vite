import {
  BaseMainArgs,
  BaseMainArgsMap,
  MainProcessChannel,
  MainProcessEventName,
} from "./../types/electron";
import { app, BrowserWindow, ipcMain, IpcMainEvent } from "electron";
import { join } from "path";
import { fileURL } from "./util";

import car from "../realm/Car";

app.whenReady().then(() => {
  const win = new BrowserWindow({
    title: "example-app",
    webPreferences: {
      nodeIntegration: true,
      preload: join(fileURL, "./preload.mjs"),
    },
  });

  win.setMenu(null);
  win.webContents.openDevTools();

  // You can use `process.env.VITE_DEV_SERVER_URL` when the vite command is called `serve`
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    // Load your file
    win.loadFile("dist/index.html");
  }
  // autoUpdater.check();
});

ipcMain.on(
  MainProcessChannel.TO_MAIN,
  (event: IpcMainEvent, args: BaseMainArgs) => {
    const { name } = args;
    switch (name) {
      case MainProcessEventName.REALM_CAR_QUERY:
        break;
      case MainProcessEventName.REALM_CAR_INSERT:
        args.data.carlist;
        break;
      case MainProcessEventName.REALM_CAR_UPDATE:
        break;
      case MainProcessEventName.REALM_CAR_DELETE:
        break;
    }
  }
);
