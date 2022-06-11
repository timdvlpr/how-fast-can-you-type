<script setup lang="ts">
import { onMounted, ref } from "vue";
import HighscoreList from "@/components/HighscoreList.vue";
import AppButton from "@/components/AppButton.vue";
import { getHighscoresOfLanguage } from "@/services/highscoreService";
import { useAlertStore } from "@/stores/alertStore";
import type { Highscore } from "@/interfaces/Highscore";
import { Language } from "@/enums/Language";

const highscores = ref<Highscore[]>([]);
const allScoresFetched = ref(false);
const loading = ref(true);
const { addAlert } = useAlertStore();

const take = 10;
let count = 0;
let skip = 0;

async function loadHighscores(): Promise<void> {
  try {
    loading.value = true;
    const response = await getHighscoresOfLanguage(
      selectedLanguage.value,
      take,
      skip
    );
    highscores.value = [...highscores.value, ...response.data];
    count = response.count;
    skip += take;
    loading.value = false;
    if (highscores.value.length === count) {
      allScoresFetched.value = true;
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      addAlert({ message: e.message, type: "error" });
    }
  }
}

const selectedLanguage = ref<Language>(Language.GERMAN);

function selectLanguage(language: Language): void {
  selectedLanguage.value = language;
  reset();
  loadHighscores();
}
function reset(): void {
  count = 0;
  skip = 0;
  highscores.value = [];
  allScoresFetched.value = false;
}

onMounted(() => loadHighscores());
</script>

<template>
  <section>
    <div class="highscores">
      <h1>Highscores</h1>
      <div class="highscores-filter">
        <AppButton
          text="German"
          :selected="selectedLanguage === Language.GERMAN"
          @click="selectLanguage(Language.GERMAN)"
        />
        <AppButton
          text="English"
          :selected="selectedLanguage === Language.ENGLISH"
          @click="selectLanguage(Language.ENGLISH)"
        />
      </div>
      <HighscoreList :highscores="highscores" v-if="highscores.length > 0" />
      <div
        class="no-highscores-message"
        v-if="highscores.length === 0 && !loading"
      >
        <font-awesome-icon icon="circle-exclamation" />
        <p>No highscores for this language registered</p>
      </div>
      <AppButton
        v-if="!allScoresFetched && highscores.length > 0"
        @click="loadHighscores"
        text="Load more"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
section {
  @include flex-center;
  width: 100%;
  padding: 2rem 0.25rem;
}
.highscores {
  width: min(70rem, 100%);
  @include flex-center-column;
  h1 {
    margin-bottom: 2rem;
    text-transform: uppercase;
  }
  &-filter {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
  }
}
.no-highscores-message {
  @include flex-center;
  color: $light;
  margin: 1rem 0;
  svg {
    color: $error;
    margin-right: 0.25rem;
  }
}
</style>
