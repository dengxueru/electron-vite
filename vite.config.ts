import { defineConfig } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";
import electron from "vite-plugin-electron/simple";
import commonjs from "@rollup/plugin-commonjs";
import { resolve } from "path";

console.log(process.versions.modules);
console.log(process.arch);

export default defineConfig(() => {
  return {
    plugins: [
      createVuePlugin({ jsx: true }),
      electron({
        main: {
          entry: "electron/main.ts",
          vite: {
            build: {
              commonjsOptions: {
                ignoreDynamicRequires: true,
              },
              rollupOptions: {
                external: ["clipboard-files"],
              },
            },
          },
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
