import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import electron from "vite-plugin-electron";
import renderer from "vite-plugin-electron-renderer";

export default defineConfig({
  plugins: [
    vue(),
    electron({
      entry: "electron/main.ts",
      vite: {
        build: {
          outDir: "dist/electron",
          rollupOptions: {
            external: ["sqlite3"],
          },
        },
      },
    }),
    renderer(),
  ],
});
