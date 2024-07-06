// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import Antd from 'ant-design-vue';
import './antd-overwrite.less'

import { AntDesignContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'

import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.use(Antd)

    app.config.globalProperties.$configProvider = {
      prefixCls: 'custom', // 设置自定义前缀
    }

    app.component('demo-preview', AntDesignContainer)
  }
} satisfies Theme
