import { defineConfig } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";
import electron from "vite-plugin-electron/simple";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log(process.versions.modules);
console.log(process.arch);

export default defineConfig(() => {
  return {
    plugins: [
      createVuePlugin({ jsx: true }),
      electron({
        main: {
          entry: "electron/main.ts",
          onstart({ startup }) {
            startup(["."]);
          },
          vite: {
            build: {
              lib: {
                entry: "electron/main.ts",
                formats: ["cjs"],
              },
              commonjsOptions: {
                ignoreDynamicRequires: true,
              },
              rollupOptions: {
                external: ["clipboard-files"],
                output: {
                  entryFileNames: "[name].cjs",
                },
              },
            },
          },
        },
        // preload: {
        //   input: "electron/preload.ts",
        // },
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
