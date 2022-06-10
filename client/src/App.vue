<script setup lang="ts">
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
import AppAlert from "@/components/AppAlert.vue";
import { useAlertStore } from "@/stores/alertStore";

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
      <Transition name="fade">
        <component :is="Component"></component>
      </Transition>
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
.fade-enter-active {
  transition: all 0.25s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(5rem);
}
</style>
