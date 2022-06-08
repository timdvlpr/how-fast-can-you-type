<script setup lang="ts">
import type { Result } from "@/interfaces/Result";

interface Props {
  result: Result;
}

const props = defineProps<Props>();
</script>

<template>
  <div class="type-result">
    <div class="type-result-head">
      <h4>
        <span class="wpm">{{ props.result.wordsPerMinute }}</span>
        <span>WpM</span>
      </h4>
    </div>
    <div class="type-result-body">
      <div class="type-result-body-data">
        <p>Accuracy:</p>
        <p class="bold">{{ props.result.accuracy }} %</p>
      </div>
      <div class="type-result-body-data">
        <p>Keystrokes:</p>
        <p class="bold">{{ props.result.keystrokes }}</p>
      </div>
      <div class="type-result-body-data">
        <p>Mistakes:</p>
        <p class="bold">{{ props.result.falseKeys }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.type-result {
  padding: 5rem 0;
  @include flex-center-column;
  &-head {
    border: 2px solid $shade;
    border-radius: 50%;
    background: $accent;
    width: 8rem;
    height: 8rem;
    margin-bottom: 1rem;
    @include flex-center;
    h4 {
      @include flex-center-column;
      span.wpm {
        font-size: 2rem;
      }
    }
  }
  &-body {
    @include flex-center-column;
    padding: 0 2rem;
    min-width: 20rem;
    &-data {
      @include flex-center;
      width: 100%;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      border: 2px solid $shade;
      border-radius: 1rem;
      padding: 0.5rem 1rem;
      .bold {
        font-weight: bold;
      }
    }
  }
}
</style>
