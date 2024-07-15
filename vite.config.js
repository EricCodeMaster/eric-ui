import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    include: ["./components/**/_test_/*.{js,ts}"],
    coverage: {
      provider: "v8",
      include: ["components/**/*.vue"],
      reporter: ["text", "html", "clover", "json"],
    },
  },
  plugins: [
    vue(),
    // vueJsx()
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"), //把 src 的别名设置为 @
    },
  },
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
});
