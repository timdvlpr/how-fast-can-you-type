<script setup lang="ts">
import AppButton from "@/components/AppButton.vue";
import { ref, watch } from "vue";

const emit = defineEmits<{
  (e: "close-modal"): void;
  (e: "submit-form", username: string): void;
}>();

const usernameInput = ref("");
const inputFocused = ref(false);
function focusInput(): void {
  inputFocused.value = true;
}
function blurInput(): void {
  if (usernameInput.value.length > 0) {
    return;
  }
  inputFocused.value = false;
}

const error = ref(false);
function submitForm(): void {
  if (error.value) {
    return;
  }
  emit("submit-form", usernameInput.value);
  usernameInput.value = "";
}
function closeModal(): void {
  emit("close-modal");
}
watch(usernameInput, () => {
  error.value = usernameInput.value.length > 25;
});
</script>

<template>
  <div class="wrapper" @click.self="closeModal">
    <div class="modal">
      <div class="modal-header">
        <h2>Save highscore</h2>
      </div>
      <div class="modal-body">
        <form class="username-input" @submit.prevent="submitForm">
          <label for="username" :class="{ focus: inputFocused }"
            >Username:</label
          >
          <input
            id="username"
            type="text"
            v-model="usernameInput"
            autocomplete="off"
            spellcheck="false"
            required
            @focus="focusInput"
            @blur="blurInput"
          />
          <font-awesome-icon icon="user" />
        </form>
        <div class="form-error" v-if="error">
          <font-awesome-icon icon="circle-exclamation" />
          <p>Username too long</p>
        </div>
        <AppButton text="Save" @click="submitForm" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.focus {
  top: -1rem !important;
  opacity: 1 !important;
}
.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.75);
  z-index: 99;
  @include flex-center;
}
.modal {
  background: $main;
  padding: 0 1rem;
  border-radius: 1rem;
  animation: drop-in 0.5s forwards;
  color: $light;
  &-header {
    text-align: center;
    h2 {
      text-transform: uppercase;
      padding: 1rem 0;
    }
  }
  &-body {
    padding: 1rem 0;
    @include flex-center-column;
  }
}
.username-input {
  position: relative;
  margin-bottom: 1rem;
  width: 20rem;
  label {
    position: absolute;
    top: 0.5rem;
    left: 1.75rem;
    opacity: 50%;
    transition: 0.25s;
  }
  input {
    position: relative;
    color: $light;
    width: 100%;
    font-size: 1.05rem;
    background: transparent;
    border: none;
    padding: 0.5rem 0.5rem 0.5rem 1.75rem;
    outline: none;
    border-bottom: 1px solid $shade;
    transition: 0.25s;
    &:focus + svg {
      color: $accent;
    }
    &:focus {
      border-bottom: 1px solid $accent;
    }
  }
  svg {
    position: absolute;
    top: 0.5rem;
    left: 0;
    transition: 0.25s;
  }
}
.form-error {
  @include flex-center;
  margin-bottom: 1rem;
  svg {
    color: $accent;
    margin-right: 0.25rem;
  }
}
@keyframes drop-in {
  from {
    transform: translateY(-5rem);
  }
  to {
    transform: translateY(0);
  }
}
</style>
