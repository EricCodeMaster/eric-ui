// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import Demo from '../components/MyComponent.vue'
import EInput from '../../../src/components/HelloWorld.vue'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';

import { AntDesignContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
    app.component('Demo', Demo)
    app.component('EInput', EInput)
    app.use(Antd)
    app.component('demo-preview', AntDesignContainer)

  }
} satisfies Theme
