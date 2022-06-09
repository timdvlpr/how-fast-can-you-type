<script setup lang="ts">
import AppButton from "@/components/AppButton.vue";
</script>

<template>
  <h1>Highscore!</h1>
  <AppButton text="Save to leaderboard" />
</template>

<style scoped lang="scss">
h1 {
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  animation: scale-up 1s infinite;
}
@keyframes scale-up {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.15);
    color: $accent;
  }
  100% {
    transform: scale(1);
  }
}
</style>
