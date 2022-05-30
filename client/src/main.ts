import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faStar,
  faKeyboard,
  faClock,
  faAngleUp,
  faLanguage,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faStar, faKeyboard, faClock, faAngleUp, faLanguage);

const app = createApp(App);

app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
