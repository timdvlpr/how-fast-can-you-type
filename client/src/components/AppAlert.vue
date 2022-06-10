<script setup lang="ts">
import type { Alert } from "@/interfaces/Alert";
import { useAlertStore } from "@/stores/alertStore";
import { onMounted } from "vue";

const props = defineProps<{
  alert: Alert;
}>();

const { removeAlert } = useAlertStore();

onMounted(() => {
  setTimeout(() => removeAlert(), 5000);
});
</script>

<template>
  <div
    class="alert"
    :class="[
      { 'alert-error': props.alert.type === 'error' },
      { 'alert-success': props.alert.type === 'success' },
    ]"
  >
    <font-awesome-icon
      icon="check-circle"
      v-if="props.alert.type === 'success'"
    />
    <font-awesome-icon
      icon="circle-exclamation"
      v-if="props.alert.type === 'error'"
    />
    <p>{{ props.alert.message }}</p>
  </div>
</template>

<style scoped lang="scss">
.alert {
  @include flex-center;
  margin: 0.25rem 0;
  width: 100%;
  color: $light;
  text-align: center;
  padding: 0.75rem 0;
  border-radius: 1rem;
  svg {
    margin-right: 0.25rem;
  }
  &-success {
    background: #38ad3850;
    border: 1px solid $success;
  }
  &-error {
    background: #b6343450;
    border: 1px solid $error;
  }
}
</style>
