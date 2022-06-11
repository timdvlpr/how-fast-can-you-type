<script setup lang="ts">
import { ref, computed } from "vue";
import { Language } from "@/enums/Language";
import AppButton from "../components/AppButton.vue";

const emit = defineEmits<{
  (e: "select-language", language: Language): void;
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
  emit("select-language", language);
}

const currentSelectedLanguage = computed(() => {
  return props.selectedLanguage
    ? props.selectedLanguage.toUpperCase()
    : "Choose Language";
});
</script>

<template>
  <div class="selected-language">
    <AppButton
      :text="currentSelectedLanguage"
      icon="language"
      :class="{ blink: !props.selectedLanguage }"
      @click="showLanguageOptions()"
      v-if="!languageOptionsVisible"
    />
    <div class="selected-language-selection" v-else>
      <AppButton
        text="German"
        @click="selectLanguage(Language.GERMAN)"
        :selected="selectedLanguage === Language.GERMAN"
      />
      <AppButton
        text="English"
        @click="selectLanguage(Language.ENGLISH)"
        :selected="selectedLanguage === Language.ENGLISH"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.selected-language {
  @include flex-center;
}
.selected-language-selection {
  @include flex-center;
}
.blink {
  animation: blink 2s infinite linear;
}
@keyframes blink {
  0% {
    background: $main;
  }
  50% {
    background: $accent;
  }
  100% {
    background: $main;
  }
}
</style>
