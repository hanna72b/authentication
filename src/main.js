import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import store from "./store";
import instance from "./plugins/axios.config";

const app = createApp(App);

app.use(router, store, instance);

app.mount("#app");
