import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";
import 'element-plus/theme-chalk/dark/css-vars.css'
import './assets/dark/css-vars.css'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import dateFormatPlugin from './utils/dateFormatPlugin';
const app = createApp(App);
app.component("Document", Document);
app.component("Menu", IconMenu);
app.component("Setting", Setting);
app.component("Location", Location);
app.use(createPinia());
app.use(ElementPlus, {
  locale: zhCn,
});
app.use(router);
app.use(dateFormatPlugin);
app.mount("#app");
