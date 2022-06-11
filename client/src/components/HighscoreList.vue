<script setup lang="ts">
import HighscoreItem from "@/components/HighscoreItem.vue";
import type { Highscore } from "@/interfaces/Highscore";

const props = defineProps<{
  highscores: Highscore[];
}>();
</script>

<template>
  <div class="highscore-list">
    <TransitionGroup name="highscore">
      <div
        class="highscore-list-item"
        v-for="(highscore, index) in props.highscores"
        :key="highscore.id"
      >
        <p>{{ index < 9 ? "0" + (index + 1) : index + 1 }}.</p>
        <HighscoreItem :highscore="highscore" />
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped lang="scss">
.highscore-list {
  width: 100%;
  margin: 1rem 0;
  &-item {
    display: flex;
    align-items: center;
    width: 100%;
    p {
      @include flex-center;
      background: $accent;
      padding: 1rem 0.25rem;
      border-radius: 1rem;
      margin: 0.25rem 1rem 0.25rem 0.25rem;
      font-weight: bold;
    }
  }
}
.highscore-enter-active {
  transition: all 0.5s ease;
}
.highscore-enter-from {
  opacity: 0;
  transform: translateY(2rem);
}
</style>
