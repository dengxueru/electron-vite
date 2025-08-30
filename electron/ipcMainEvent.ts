import { join } from "path";
import { app, ipcMain, IpcMainEvent } from "electron";
import { MainArgs, MainProcessChannel } from "../types/electron";
const clipboardFiles = require("clipboard-files");

import log from "electron-log";

ipcMain.on(MainProcessChannel.TO_MAIN, (e: IpcMainEvent, args: MainArgs) => {
  const binding = require("clipboard-files/build/Release/binding.node");
  log.warn(binding.path, "tama binding.path"); // 真实文件系统路径
  log.warn(clipboardFiles);
  const downloads = join(app.getPath("downloads"), "253220000001_41180789.pdf");
  clipboardFiles.writeFiles([downloads]);
});
