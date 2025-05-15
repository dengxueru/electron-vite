import electronUpdater, {
  type AppUpdater,
  type UpdateInfo,
  type ProgressInfo,
  type UpdateDownloadedEvent,
} from "electron-updater";
const { autoUpdater } = electronUpdater;
import log from "electron-log";
log.transports.file.level = "info";

class AutoUpdater {
  constructor() {
    autoUpdater.logger = log;
    autoUpdater.setFeedURL(
      "https://henglink-desktop-1301610563.cos.accelerate.myqcloud.com/example"
    );

    // 开始检查更新
    autoUpdater.on("checking-for-update", () => {
      log.info("checking-for-update - 正在检查更新...");
    });

    // 检查更新出错
    autoUpdater.on("error", () => {
      log.info("error - 检查更新出错...");
    });

    // 检查到新版本
    autoUpdater.on("update-available", (info: UpdateInfo) => {
      console.log(info);
    });

    // 已经是新版本
    autoUpdater.on("update-not-available", (info: UpdateInfo) => {
      console.log(info);
    });

    // 取消下载
    autoUpdater.on("update-not-available", (info: UpdateInfo) => {
      console.log(info);
    });

    // 更新下载中
    autoUpdater.on("download-progress", (info: ProgressInfo) => {});

    // 更新下载完毕
    autoUpdater.on("update-downloaded", (event: UpdateDownloadedEvent) => {
      autoUpdater.quitAndInstall();
    });
  }

  check() {
    autoUpdater.checkForUpdates();
  }
}

export default new AutoUpdater();
