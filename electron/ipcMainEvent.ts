import { join } from "path";
import { app, ipcMain, IpcMainEvent } from "electron";
import { MainArgs, MainProcessChannel } from "../types/electron";
// import clipboardFiles from "clipboard-files";

import log from "electron-log";

// ipcMain.on(MainProcessChannel.TO_MAIN, (e: IpcMainEvent, args: MainArgs) => {
//   log.warn(clipboardFiles);
//   const downloads = join(app.getPath("downloads"), "253220000001_41180789.pdf");
//   clipboardFiles.writeFiles([downloads]);
// });
