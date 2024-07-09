import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.less";

import EricUI from "../components";

const app = createApp(App).use(Antd).use(EricUI).mount("#app");
