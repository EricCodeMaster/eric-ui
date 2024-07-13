import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

import EricUI from "../components";

import VxeTable from "vxe-table";
import "vxe-table/lib/style.css";

const app = createApp(App).use(VxeTable).use(Antd).use(EricUI).mount("#app");
