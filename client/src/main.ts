import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faStar,
  faKeyboard,
  faClock,
  faAngleUp,
  faLanguage,
  faRotateRight,
  faGlobe,
  faUser,
  faCircleExclamation,
  faCircleCheck,
  faCalendarDay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faStar,
  faKeyboard,
  faClock,
  faAngleUp,
  faLanguage,
  faRotateRight,
  faGlobe,
  faUser,
  faCircleExclamation,
  faCircleCheck,
  faCalendarDay
);

const app = createApp(App);

app.use(router);
app.use(VueAxios, axios);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
