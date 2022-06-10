<script setup lang="ts">
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
import AppAlert from "@/components/AppAlert.vue";
import { useAlertStore } from "@/stores/alertStore";
import FadeUpTransition from "@/components/FadeUpTransition.vue";

const { globalAlerts } = useAlertStore();
</script>

<template>
  <Header />
  <main>
    <TransitionGroup name="alert" tag="div" class="alerts">
      <AppAlert
        v-for="(alert, index) in globalAlerts"
        :alert="alert"
        :key="index"
      />
    </TransitionGroup>
    <RouterView v-slot="{ Component }">
      <FadeUpTransition>
        <component :is="Component"></component>
      </FadeUpTransition>
    </RouterView>
  </main>
</template>

<style lang="scss">
main {
  position: relative;
}
.alerts {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 90;
}
.alert-enter-active,
.alert-leave-active {
  transition: all 0.5s ease;
}
.alert-enter-from,
.alert-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
