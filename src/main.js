import { createApp } from "vue";
import { createPinia } from "pinia";
import "./index.css";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faMagnifyingGlass);

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
