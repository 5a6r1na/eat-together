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

const app = createApp(App);
const vuetify = createVuetify();
app.use(vuetify);
app.use(ElementPlus);
// app.use(router);
app.mount("#app");
