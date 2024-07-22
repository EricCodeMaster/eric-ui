import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import vue from "@vitejs/plugin-vue";
import lessEntry from "./vite-plugin-less-entry";
import baseConfig from "./base.config";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  ...baseConfig,
  build: {
    sourcemap: true,
    outDir: "lib",
    lib: {
      entry: fileURLToPath(new URL("../components/index.js", import.meta.url)),
      name: "EricUI",
      fileName: format => `eric-ui.${format}.js`,
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: [
        "vue",
        "@ant-design/icons-vue",
        "vxe-table",
        "xe-utils",
        "@vitepress-demo-preview/component",
        "@vitepress-demo-preview/plugin",
        "ant-design-vue/es/locale/zh_CN"
      ],
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    viteStaticCopy({
      targets: [
        {
          src: "components/**/*.less",
          dest: "/",
        },
      ],
      structured: true,
    }),
    lessEntry({
      // 生成的入口文件名
      entry: "components",
      // libPath需要与viteStaticCopy中的dest保持一致
      libPath: "components",
      name: "style",
    }),
  ],
});
