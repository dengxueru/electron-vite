import type { Configuration } from "electron-builder";
const options: Configuration = {
  appId: "com.example.app",
  asar: true,
  afterPack: "./build/afterPack/index.ts",
  asarUnpack: ["/node_modules/better-sqlite3/build/**"],
  productName: "example-app",
  directories: {
    output: "release/${version}",
  },
  files: ["dist", "dist-electron"],
  publish: [
    {
      provider: "generic",
      url: "https://henglink-desktop-1301610563.cos.ap-shanghai.myqcloud.com",
    },
  ],
  mac: {
    target: ["dmg"],
    icon: "build/icons/mac/icon.icns",
    artifactName: "${productName}-${version}.${ext}",
  },
  win: {
    icon: "build/icons/icon.ico",
    target: [
      {
        target: "nsis",
        arch: ["x64", "ia32"],
      },
    ],
    artifactName: "${productName}-${arch}-${version}.${ext}",
  },
  nsis: {
    oneClick: false, // 是否一键安装
    perMachine: false, // 是否为所有用户安装
    allowToChangeInstallationDirectory: true, // 是否允许用户选择安装目录
    deleteAppDataOnUninstall: false, // 卸载时是否删除应用数据
    createDesktopShortcut: true, // 是否创建桌面快捷方式
    createStartMenuShortcut: true, // 是否创建开始菜单快捷方式
    installerIcon: "build/icons/win/icon.ico", // 安装程序图标
    uninstallerIcon: "build/icons/win/icon.ico", // 卸载程序图标
    installerHeaderIcon: "build/icons/win/icon.ico", // 安装程序头部图标
  },
  linux: {
    target: ["AppImage"],
    icon: "build/icons/256x256.png",
    artifactName: "${productName}-${version}.${ext}",
  },
};

export default options;
