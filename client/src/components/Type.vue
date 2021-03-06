<script setup lang="ts">
import { ref, watch } from "vue";

const emit = defineEmits<{
  (e: "key-pressed", key: string): void;
}>();

const props = defineProps<{
  words: string[];
  animatedCharacters: string[];
  timerTimeout: boolean;
}>();

const wordsWrapperRef = ref<HTMLDivElement | null>(null);

function handleKeyPress(event: KeyboardEvent): void {
  if (props.timerTimeout) {
    return;
  }
  emit("key-pressed", event.key);
}
function refocus(): void {
  if (props.timerTimeout) {
    return;
  }
  setTimeout(() => {
    if (wordsWrapperRef.value) {
      wordsWrapperRef.value.focus();
    }
  });
}

watch(wordsWrapperRef, () => {
  if (wordsWrapperRef.value) {
    wordsWrapperRef.value.focus();
  }
});
</script>

<template>
  <div
    class="words-wrapper"
    ref="wordsWrapperRef"
    tabindex="0"
    @blur="refocus()"
    @keydown="handleKeyPress($event)"
  >
    <div class="words">
      <span
        class="character"
        v-for="(character, index) in props.words"
        :key="index"
        :class="{
          whitespace: character === ' ',
          active: index === 0,
        }"
      >
        {{ character }}
      </span>
      <span
        class="animatedCharacter"
        :class="{ false: animatedCharacter === 'false' }"
        v-for="animatedCharacter in props.animatedCharacters"
      >
        {{ animatedCharacter !== "false" ? animatedCharacter : "x" }}
      </span>
    </div>
    <div class="words-marker">
      <font-awesome-icon icon="angle-up" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.words-wrapper {
  @include flex-center-column;
  width: 100%;
  padding: 5rem 0;
  overflow: hidden;
  position: relative;
  &:focus {
    outline: none;
  }
  &:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    background-image: linear-gradient(to right, transparent, $main);
    height: 100%;
    width: 10rem;
  }
}
.words {
  transform: translateX(50%);
  @include flex-center;
  span.character {
    position: relative;
  }
  span.animatedCharacter {
    position: absolute !important;
    top: -1.75rem;
    left: 0;
    animation: moveUp 0.5s forwards;
    font-weight: normal;
    opacity: 50%;
  }
}
.words-marker {
  font-weight: bold;
  color: $accent;
}
.whitespace {
  width: 19.2px;
  height: 1rem;
}
.active {
  font-weight: bold;
}
.false {
  color: $accent;
}
@keyframes moveUp {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-3rem);
    opacity: 0;
  }
}
</style>
