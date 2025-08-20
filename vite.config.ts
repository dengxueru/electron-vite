import { defineConfig } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";
import electron from "vite-plugin-electron/simple";
import vueJsx from "@vitejs/plugin-vue2-jsx";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      vueJsx(),
      createVuePlugin(),
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
