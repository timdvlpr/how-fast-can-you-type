import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import HighscoreView from "../views/HighscoreView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/highscores",
      name: "highscores",
      component: HighscoreView,
    },
  ],
});

export default router;
