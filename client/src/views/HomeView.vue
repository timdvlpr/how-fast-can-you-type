<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import Timer from "../components/Timer.vue";
import Type from "../components/Type.vue";
import TypeResult from "../components/TypeResult.vue";
import LanguageSelection from "../components/LanguageSelection.vue";
import AppButton from "../components/AppButton.vue";
import HighscoreBanner from "../components/HighscoreBanner.vue";
import type { Language } from "@/enums/Language";
import type { Result } from "@/interfaces/Result";
import { getWords } from "@/services/wordService";
import { checkIsHighscore } from "@/services/highscoreService";

const timerStarted = ref(false);
const timerTimeout = ref(false);
const isHighscore = ref(false);

function handleTypeStart(): void {
  timerStarted.value = true;
}
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
  } catch (e) {
    console.log("error occurred: ", e);
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
  isHighscore.value = false;
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
    const randomWords = getRandomElementsFromArray(fetchedWords, 50);
    generatedWords.value = generateCharacterArray(randomWords);
    selectedLanguage.value = language;
  } catch (e) {
    console.log("error occurred: ", e);
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
          <Type
            v-if="selectedLanguage"
            :words="generatedWords"
            :animated-characters="animatedCharacters"
            :timer-timeout="timerTimeout"
            v-on:keyPressed="handleKeypress"
            v-on:typingStarted="handleTypeStart"
          />
        </div>

        <Timer
          v-if="selectedLanguage"
          :timer-started="timerStarted"
          v-on:timeout="handleTimeout"
        />
      </div>
    </Transition>

    <Transition name="bounce">
      <div class="container-timeout" v-if="timerTimeout">
        <HighscoreBanner v-if="isHighscore" />
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
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
