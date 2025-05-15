import { app, BrowserWindow } from "electron";
import autoUpdater from "../autoUpdater";
import Database from "../database";

console.log(process.versions);

app.whenReady().then(() => {
  const win = new BrowserWindow({
    title: "example-app",
    webPreferences: {
      nodeIntegration: true,
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
  new Database();
  autoUpdater.check();
});
