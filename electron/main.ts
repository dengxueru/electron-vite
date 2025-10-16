import { app, BrowserWindow, ipcMain, IpcMainEvent } from "electron";

import "./ipcMainEvent";

app.commandLine.appendSwitch("lang", "zh-CN");

import { join } from "path";
import { fileURL } from "./util";

import log from "electron-log/main";
log.initialize();

app.whenReady().then(() => {
  const win = new BrowserWindow({
    title: "example-app",
    webPreferences: {
      nodeIntegration: true,
      // preload: join(fileURL, "./preload.js"),
      contextIsolation: false,
    },
  });

  win.removeMenu();
  win.webContents.openDevTools();

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    win.loadFile("dist/index.html");
  }
  // autoUpdater.check();
});

// ipcMain.on(MainProcessChannel.TO_MAIN, (e: IpcMainEvent, args: MainArgs) => {
//   const { name, data } = args;
//   switch (name) {
//     case MainProcessEventName.REALM_CAR_QUERY:
//       carDB.query();
//       break;
//     case MainProcessEventName.REALM_CAR_INSERT:
//       const { carlist } = data;
//       carDB.insert(carlist);
//       break;
//     case MainProcessEventName.REALM_CAR_UPDATE:
//       break;
//     case MainProcessEventName.REALM_CAR_DELETE:
//       break;
//   }
// });
