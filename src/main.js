import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Demo from "./Demo.vue";

const app = createApp(App).mount("#app");
app.components("Demo", Demo);
