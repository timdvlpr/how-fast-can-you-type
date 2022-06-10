import { ref } from "vue";
import type { Alert } from "@/interfaces/Alert";

const globalAlerts = ref<Alert[]>([]);

export function useAlertStore() {
  const addAlert = (alert: Alert) => {
    globalAlerts.value.push(alert);
  };

  const removeAlert = () => {
    globalAlerts.value.shift();
  };

  const reset = () => {
    globalAlerts.value = [];
  };

  return {
    globalAlerts,
    addAlert,
    removeAlert,
    reset,
  };
}
