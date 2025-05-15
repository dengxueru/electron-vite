import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import electron from "vite-plugin-electron/simple";
import { resolve } from "path";
console.log(process.versions);
// https://vite.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      vue(),
      vueJsx(),
      electron({
        main: {
          entry: "electron/main.ts",
        },
        preload: {
          input: "electron/preload.ts",
        },
        renderer: {},
      }),
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
  };
});
