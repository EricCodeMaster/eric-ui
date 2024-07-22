// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";

import Antd, { ConfigProvider } from "ant-design-vue";
import "./antd-overwrite.less";
// import zhCN from "ant-design-vue/es/locale/zh_CN";

import AntdConfigProviderRewrite from "../../../src/components/AntdConfigProviderRewrite.vue";

import { AntDesignContainer } from "@vitepress-demo-preview/component";
import "@vitepress-demo-preview/component/dist/style.css";

import "./style.css";

import HomeImage from "./HomeImage.vue";
import EricUI from "../../../components";

import VxeTable from "vxe-table";
import "vxe-table/lib/style.css";

import "../../../components/style/index.less";

export default {
  extends: DefaultTheme,
  Layout: () => {
    // https://vitepress.dev/guide/extending-default-theme#layout-slots
    return h(
      AntdConfigProviderRewrite,
      {},
      {
        default: () =>
          h(DefaultTheme.Layout, null, {
            "home-hero-image": () => h(HomeImage),
          }),
      }
    );
  },
  enhanceApp({ app, router, siteData }) {
    app.use(VxeTable);
    app.use(Antd);
    app.use(ConfigProvider)
    app.use(EricUI);
    app.component("demo-preview", AntDesignContainer);
  },
} satisfies Theme;
