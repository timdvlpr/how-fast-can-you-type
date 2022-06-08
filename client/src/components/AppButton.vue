<script setup lang="ts">
interface Props {
  icon?: string;
  text: string;
  selected?: boolean;
}

const props = defineProps<Props>();
</script>

<template>
  <button :class="{ selected: props.selected }">
    <font-awesome-icon v-if="props.icon" :icon="props.icon"></font-awesome-icon>
    <span>{{ props.text }}</span>
  </button>
</template>

<style scoped lang="scss">
button {
  background: $main;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  color: $light;
  border: 2px solid $shade;
  margin: 0 0.5rem;
  cursor: pointer;
  transition: 0.25s;
  @include flex-center;
  svg {
    margin-right: 0.25rem;
  }
  &:hover {
    background: $accent;
  }
}
.selected {
  background: $accent !important;
}
</style>
