<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import Timer from "../components/Timer.vue";
import Type from "../components/Type.vue";
import TypeResult from "../components/TypeResult.vue";
import LanguageSelection from "../components/LanguageSelection.vue";
import AppButton from "../components/AppButton.vue";
import HighscoreBanner from "../components/HighscoreBanner.vue";
import SaveHighscoreModal from "@/components/SaveHighscoreModal.vue";
import FadeUpTransition from "@/components/FadeUpTransition.vue";
import type { Language } from "@/enums/Language";
import type { Result } from "@/interfaces/Result";
import type { Highscore } from "@/interfaces/Highscore";
import { getWords } from "@/services/wordService";
import { checkIsHighscore, saveHighscore } from "@/services/highscoreService";
import { useAlertStore } from "@/stores/alertStore";

const { addAlert } = useAlertStore();

const timerStarted = ref(false);
const timerTimeout = ref(false);
const timerReset = ref(false);
const isHighscore = ref(false);
async function handleTimeout(): Promise<void> {
  timerTimeout.value = true;
  calcTypeResults();
  if (!selectedLanguage.value || !checkForScore.value) {
    return;
  }
  try {
    const response = await checkIsHighscore(
      selectedLanguage.value,
      typeData.wordsPerMinute
    );
    isHighscore.value = response.isHighscore;
  } catch (e: unknown) {
    if (e instanceof Error) {
      addAlert({ message: e.message, type: "error" });
    }
  }
}

const typeData = reactive<Result>({
  falseKeys: 0,
  correctKeys: 0,
  keystrokes: 0,
  wordsPerMinute: 0,
  accuracy: 0,
});
function handleKeypress(key: string): void {
  if (!timerStarted.value) {
    timerStarted.value = true;
    timerReset.value = false;
  }

  if (key === "Shift") {
    return;
  }

  typeData.keystrokes++;

  if (generatedWords.value.length < 150) {
    const randomWords = getRandomElementsFromArray(words.value, 20);
    generatedWords.value = [
      ...generatedWords.value,
      ...generateCharacterArray(randomWords),
    ];
    animatedCharacters.value = [];
  }

  if (key === generatedWords.value[0]) {
    const character = generatedWords.value.splice(0, 1);
    animatedCharacters.value.push(character[0]);
    if (generatedWords.value[0].length === 0) {
      return;
    }
    typeData.correctKeys++;
  } else {
    if (generatedWords.value[0].length === 0) {
      return;
    }
    typeData.falseKeys++;
    animatedCharacters.value.push("false");
  }
}
function calcTypeResults(): void {
  typeData.wordsPerMinute = typeData.correctKeys / 5;
  typeData.accuracy = Number(
    ((typeData.correctKeys / typeData.keystrokes) * 100).toFixed(2)
  );
}
async function saveHighscoreToLeaderboard(username: string): Promise<void> {
  const data: Highscore = {
    score: typeData.wordsPerMinute,
    username: username,
    language: selectedLanguage.value!,
  };
  try {
    await saveHighscore(data);
    addAlert({
      message: "Highscore successfully added to leaderboard",
      type: "success",
    });
    restart();
  } catch (e: unknown) {
    closeModal();
    if (e instanceof Error) {
      addAlert({ message: e.message, type: "error" });
    }
  }
}
function restart(): void {
  reset();
  const randomWords = getRandomElementsFromArray(words.value, 50);
  generatedWords.value = generateCharacterArray(randomWords);
}
function reset(): void {
  typeData.correctKeys = 0;
  typeData.falseKeys = 0;
  typeData.keystrokes = 0;
  typeData.wordsPerMinute = 0;
  typeData.accuracy = 0;

  timerTimeout.value = false;
  timerStarted.value = false;
  timerReset.value = true;
  isHighscore.value = false;
  showHighscoreModal.value = false;
  animatedCharacters.value = [];
  generatedWords.value = [];
}

const words = ref<string[]>([]);
const generatedWords = ref<string[]>([]);
const animatedCharacters = ref<string[]>([]);
const selectedLanguage = ref<Language | null>(null);
function generateCharacterArray(words: string[]): string[] {
  const array: string[] = [];
  words.forEach((word) => array.push(...word, " "));
  return array;
}
function getRandomElementsFromArray(array: string[], amount: number): string[] {
  const randomArray: string[] = [];
  for (let i = 0; i < amount; i++) {
    let randomNum = Math.floor(Math.random() * array.length);
    randomArray.push(array[randomNum]);
  }
  return randomArray;
}
async function selectLanguage(language: Language): Promise<void> {
  if (selectedLanguage.value === language) {
    return;
  }
  try {
    const fetchedWords = await getWords(language);
    words.value = fetchedWords;
    reset();
    const randomWords = getRandomElementsFromArray(fetchedWords, 50);
    generatedWords.value = generateCharacterArray(randomWords);
    selectedLanguage.value = language;
  } catch (e: unknown) {
    if (e instanceof Error) {
      addAlert({ message: e.message, type: "error" });
    }
  }
}

const checkForScore = ref(true);
function setScoreCheckMode(): void {
  checkForScore.value = !checkForScore.value;
}
const buttonTitle = computed(() => {
  return checkForScore.value
    ? "Disable checking for highscore"
    : "Enable checking for highscore";
});

const showHighscoreModal = ref(false);
function showModal(): void {
  showHighscoreModal.value = true;
}
function closeModal(): void {
  showHighscoreModal.value = false;
}
</script>

<template>
  <div>
    <Transition name="bounce">
      <div class="container" v-if="!timerTimeout">
        <div class="container-action-bar">
          <AppButton
            @click="setScoreCheckMode"
            v-if="selectedLanguage"
            :selected="checkForScore"
            :title="buttonTitle"
            text=""
            icon="globe"
          />
          <LanguageSelection
            :selected-language="selectedLanguage"
            v-on:select-language="selectLanguage($event)"
          />
          <AppButton
            v-if="selectedLanguage"
            text=""
            icon="rotate-right"
            @click="restart"
          />
        </div>

        <div class="container-words">
          <FadeUpTransition>
            <Type
              v-if="selectedLanguage"
              :words="generatedWords"
              :animated-characters="animatedCharacters"
              :timer-timeout="timerTimeout"
              v-on:key-pressed="handleKeypress"
            />
          </FadeUpTransition>
        </div>

        <Timer
          v-if="selectedLanguage"
          :timer-started="timerStarted"
          :timer-reset="timerReset"
          v-on:timeout="handleTimeout"
        />
      </div>
    </Transition>

    <Transition name="bounce">
      <div class="container-timeout" v-if="timerTimeout">
        <HighscoreBanner
          v-if="isHighscore"
          v-on:save-to-leaderboard="showModal"
        />
        <Teleport to="body">
          <Transition name="fade">
            <SaveHighscoreModal
              v-if="showHighscoreModal"
              v-on:close-modal="closeModal"
              v-on:submit-form="saveHighscoreToLeaderboard"
            />
          </Transition>
        </Teleport>
        <TypeResult :result="typeData" />
        <AppButton v-on:click="restart" text="Restart" icon="rotate-right" />
      </div>
    </Transition>
  </div>
</template>

<style lang="scss">
.container {
  @include flex-center-column;
  padding: 2rem 0;
  &-action-bar {
    @include flex-center;
  }
  &-words {
    width: 100%;
    @include flex-center;
  }
}
.container-timeout {
  @include flex-center-column;
  padding: 2rem 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
