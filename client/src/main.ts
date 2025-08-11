import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

import "./style.css";

// Persist a user id locally and send with every request
const storedId = localStorage.getItem("userId");
const userId = storedId || crypto.randomUUID();
localStorage.setItem("userId", userId);
axios.defaults.headers.common["x-user-id"] = userId;

const app = createApp(App);
app.use(router);
app.mount("#app");
