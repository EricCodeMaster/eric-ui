import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

// 文档: https://vitejs.dev/config/
export default defineConfig({
  minify: false,
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          "ant-prefix": "ant",
        },
      },
    },
  },
  plugins: [],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("../src", import.meta.url)),
    },
  },
});
