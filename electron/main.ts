import { app, BrowserWindow } from "electron";
import remoteMain from "@electron/remote/main";
remoteMain.initialize();

app.whenReady().then(() => {
  const win = new BrowserWindow({
    title: "Main window",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
  });
  remoteMain.enable(win.webContents);

  console.log(process);
  // You can use `process.env.VITE_DEV_SERVER_URL` when the vite command is called `serve`
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    // Load your file
    win.loadFile("dist/index.html");
  }

  win.webContents.openDevTools();
});
