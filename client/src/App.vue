<script setup lang="ts">
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
</script>

<template>
  <Header />
  <main>
    <RouterView v-slot="{ Component }">
      <Transition name="fade">
        <component :is="Component"></component>
      </Transition>
    </RouterView>
  </main>
</template>

<style lang="scss">
.fade-enter-active {
  transition: all 0.25s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(5rem);
}
</style>
