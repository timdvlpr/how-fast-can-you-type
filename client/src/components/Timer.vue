<script setup lang="ts">
import { ref, watch, computed } from "vue";

const emit = defineEmits<{
  (e: "timeout"): void;
}>();

const props = defineProps<{
  timerStarted: boolean;
  timerReset: boolean;
}>();

const minutes = ref(1);
const seconds = ref(0);

let timerInterval: ReturnType<typeof setInterval>;

function startTimer(): void {
  timerInterval = setInterval(() => {
    if (seconds.value === 0) {
      minutes.value--;
      seconds.value = 59;
    } else {
      seconds.value--;
    }
    if (minutes.value === 0 && seconds.value === 0) {
      clearInterval(timerInterval);
      emit("timeout");
    }
  }, 1000);
}

function resetTimer(): void {
  clearInterval(timerInterval);
  minutes.value = 1;
  seconds.value = 0;
}

const computedMinutes = computed(() => {
  return String(minutes.value).length === 1
    ? "0" + minutes.value
    : minutes.value;
});
const computedSeconds = computed(() => {
  return String(seconds.value).length === 1
    ? "0" + seconds.value
    : seconds.value;
});

watch(
  () => props.timerStarted,
  (newValue) => {
    if (newValue) {
      startTimer();
    }
  }
);
watch(
  () => props.timerReset,
  (newValue) => {
    if (newValue) resetTimer();
  }
);
</script>

<template>
  <div class="timer">
    <p>
      <font-awesome-icon icon="clock" />
      <span class="timer-minutes">{{ computedMinutes }}:</span>
      <span class="timer-seconds">{{ computedSeconds }}</span>
    </p>
  </div>
</template>

<style scoped lang="scss">
.timer {
  display: inline-block;
  p {
    background: $accent;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    @include flex-center;
    svg {
      margin-right: 0.25rem;
    }
  }
}
</style>
