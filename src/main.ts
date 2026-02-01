import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./styles/global.css";
import "leaflet/dist/leaflet.css";
import "bootstrap-icons/font/bootstrap-icons.css"; 
createApp(App).use(router).mount("#app");
