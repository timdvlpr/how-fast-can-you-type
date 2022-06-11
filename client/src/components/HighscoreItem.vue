<script setup lang="ts">
import { computed } from "vue";
import type { Highscore } from "@/interfaces/Highscore";

const props = defineProps<{
  highscore: Highscore;
}>();

const formattedDate = computed(() => {
  const date = new Date(props.highscore.createdAt!);
  return date.toLocaleDateString();
});
</script>

<template>
  <div class="highscore-item">
    <p class="highscore-item-score">
      <font-awesome-icon icon="star" />
      {{ props.highscore.score }}
    </p>
    <p class="highscore-item-username">
      <font-awesome-icon icon="user" />
      {{ props.highscore.username }}
    </p>
    <p class="highscore-item-date">
      <font-awesome-icon icon="calendar-day" />
      {{ formattedDate }}
    </p>
  </div>
</template>

<style scoped lang="scss">
.highscore-item {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-row-gap: 0.5rem;
  justify-items: center;
  padding: 1rem;
  margin: 0.25rem 0;
  width: 100%;
  border-bottom: 2px solid $shade;
  @include for-tablet-portrait-up {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
  }
  &-username {
    grid-column: 1 / 3;
    grid-row: 2;
    @include for-tablet-portrait-up {
      grid-column: auto;
      grid-row: auto;
    }
  }
}
</style>
