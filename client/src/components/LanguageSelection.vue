<script setup lang="ts">
import { ref, computed } from "vue";
import { Language } from "@/enums/Language";

const emit = defineEmits<{
  (e: "selectLanguage", language: Language): void;
}>();

const props = defineProps<{
  selectedLanguage: Language | null;
}>();

const languageOptionsVisible = ref(false);

function showLanguageOptions(): void {
  languageOptionsVisible.value = !languageOptionsVisible.value;
}
function selectLanguage(language: Language): void {
  languageOptionsVisible.value = false;
  emit("selectLanguage", language);
}

const currentSelectedLanguage = computed(() => {
  return props.selectedLanguage
    ? props.selectedLanguage.toUpperCase()
    : "Choose Language";
});
</script>

<template>
  <div class="selected-language">
    <button @click="showLanguageOptions()" v-if="!languageOptionsVisible">
      <font-awesome-icon icon="language" />
      {{ currentSelectedLanguage }}
    </button>
    <div class="selected-language-selection" v-else>
      <button
        :class="{ selected: selectedLanguage === Language.GERMAN }"
        @click="selectLanguage(Language.GERMAN)"
      >
        German
      </button>
      <button
        :class="{ selected: selectedLanguage === Language.ENGLISH }"
        @click="selectLanguage(Language.ENGLISH)"
      >
        English
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.selected-language {
  @include flex-center;
  margin-top: 2rem;
  button {
    background: $main;
    padding: 0.5rem 2rem;
    border-radius: 1rem;
    color: $light;
    border: 2px solid $shade;
    margin: 0 0.5rem;
    cursor: pointer;
    transition: 0.25s;
    &:hover {
      background: $accent;
    }
  }
}
.selected {
  background: $accent !important;
}
</style>
