import { defineConfig } from "@solidjs/start/config";
import { comlink } from "vite-plugin-comlink";

export default defineConfig({
  server: {
    preset: "deno-deploy",
  },
  vite: {
    worker: {
      plugins: () => [comlink()],
    },
  },
});
