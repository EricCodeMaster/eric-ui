import { defineConfig } from "vitepress";
import {
  containerPreview,
  componentPreview,
} from "@vitepress-demo-preview/plugin";

const BASE_PATH = "/eric-ui";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: BASE_PATH,
  title: "Eric UI",
  description: "基于ant design vue进行开发，解决B端后台管理系统UI",
  head: [["link", { rel: "icon", href: `${BASE_PATH}/logo.png` }]],
  markdown: {
    config(md) {
      md.use(containerPreview);
      md.use(componentPreview);
    },
  },
  appearance: false,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "文档", link: "/component-examples" },
      {
        text: "测试用例报告",
        link: '/report/index.html',
        target: "_self",
      },
    ],
    sidebar: [
      {
        text: "组件",
        items: [{ text: "Button", link: "/Button" }],
      },
    ],

    socialLinks: [
      {
        icon: {
          svg: `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="56" height="60" viewBox="0 0 56 60" enable-background="new 0 0 56 60" xml:space="preserve">  <image id="image0" width="56" height="60" x="0" y="0"
            href="data:image/png;base64,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" ></image>
            </svg>
          `,
        },
        link: "https://blog.csdn.net/m0_73884922",
        ariaLabel: "csdn",
      },
    ],
  },
  vite: {
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
  },
});
