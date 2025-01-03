import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";

import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue"; 

const app = createApp(App);
app.component("Document", Document);
app.component("Menu", IconMenu);
app.component("Setting", Setting);
app.component("Location", Location);
app.use(createPinia());
app.use(ElementPlus);
app.use(router);

app.mount("#app");
