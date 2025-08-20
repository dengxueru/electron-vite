import { defineConfig } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";
import electron from "vite-plugin-electron/simple";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      createVuePlugin({ jsx: true }),
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
