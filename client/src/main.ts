import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import { useTheme } from "./composables/useTheme";

import "./style.css";

// Persist a user id locally and send with every request
const storedId = localStorage.getItem("userId");
if (storedId) {
  axios.defaults.headers.common["x-user-id"] = storedId;
}

const { loadTheme } = useTheme();
loadTheme();

const app = createApp(App);
app.use(router);
app.mount("#app");
