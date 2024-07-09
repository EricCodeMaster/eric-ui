// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import Antd from 'ant-design-vue';
import './antd-overwrite.less'

import { AntDesignContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'

import './style.css'

import HomeImage from './HomeImage.vue'
import EricUI from "../../../components";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'home-hero-image': () => h(HomeImage)
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.use(Antd)
    app.use(EricUI)
    app.component('demo-preview', AntDesignContainer)
  }
} satisfies Theme
