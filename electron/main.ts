import { app, BrowserWindow, ipcMain, IpcMainEvent } from "electron";
import { createRequire } from "node:module";

import "./ipcMainEvent";

app.commandLine.appendSwitch("lang", "zh-CN");
app.commandLine.appendSwitch("ignore-gpu-blocklist");
app.commandLine.appendSwitch("enable-gpu-rasterization");
app.commandLine.appendSwitch("enable-webgl");
app.commandLine.appendSwitch("enable-webgl2-compute-context");
app.commandLine.appendSwitch("disable-gpu-sandbox");
app.disableDomainBlockingFor3DAPIs();

import './remote'

import { join } from "path";
import { fileURL } from "./util";

import log from "electron-log/main";
log.initialize();

const require = createRequire(import.meta.url);

const remoteMain = require("@electron/remote/main");
remoteMain.initialize();

if (process.env.ELECTRON_DISABLE_HARDWARE_ACCELERATION === "1") {
  app.disableHardwareAcceleration();
}

app.whenReady().then(() => {
  console.log("[main] argv:", process.argv);
  console.log("[main] disable-gpu switch:", app.commandLine.hasSwitch("disable-gpu"));
  console.log("[main] disable-software-rasterizer switch:", app.commandLine.hasSwitch("disable-software-rasterizer"));
  console.log("[main] disableHardwareAcceleration env:", process.env.ELECTRON_DISABLE_HARDWARE_ACCELERATION);
  console.log("[main] gpuFeatureStatus:", app.getGPUFeatureStatus());
  if (process.env.ENABLE_WFC_NATIVE === "1") {
    const { init: initProtoMain } = require("../src/wfc/proto/proto_main");
    const proto = require("../marswrapper.node");
    initProtoMain(proto);
  }
  const win = new BrowserWindow({
    title: "electron-vite-tsx GLB Viewer",
    webPreferences: {
      nodeIntegration: true,
      // preload: join(fileURL, "./preload.js"),
      contextIsolation: false,
    },
  });

  remoteMain.enable(win.webContents)
  win.removeMenu();
  win.webContents.openDevTools();

  if (process.env.VITE_DEV_SERVER_URL) {
    console.log("[main] loadURL:", process.env.VITE_DEV_SERVER_URL);
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    console.log("[main] loadFile: dist/index.html");
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
