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
const { addAlert } = useAlertStore();

const take = 10;
let count = 0;
let skip = 0;

async function loadHighscores(): Promise<void> {
  try {
    const response = await getHighscoresOfLanguage(
      selectedLanguage.value,
      take,
      skip
    );
    highscores.value = [...highscores.value, ...response.data];
    count = response.count;
    skip += take;
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

onMounted(() => {
  loadHighscores();
});
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
      <HighscoreList :highscores="highscores" />
      <AppButton
        v-if="!allScoresFetched"
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
</style>
