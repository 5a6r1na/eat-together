import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
// import router from "./router";

// Vuetify imports
import "vuetify/styles";
import { createVuetify } from "vuetify";

// Element-plus imports
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

// Pinia import
import { createPinia } from "pinia";

// import router from "./router";

import { db } from "./firebase";

const app = createApp(App);
const vuetify = createVuetify();
const pinia = createPinia();

app.use(vuetify);
app.use(ElementPlus);
app.use(pinia);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
// app.use(router);
app.mount("#app");
