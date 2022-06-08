<script setup lang="ts">
import { reactive, ref } from "vue";
import Timer from "../components/Timer.vue";
import Type from "../components/Type.vue";
import LanguageSelection from "../components/LanguageSelection.vue";
import type { Language } from "@/enums/Language";
import { getWords } from "@/services/wordService";

const timerStarted = ref(false);
const timerTimeout = ref(false);

function handleTypeStart(): void {
  timerStarted.value = true;
}
function handleTimeout(): void {
  timerTimeout.value = true;
  calcTypeResults();
}

const typeData = reactive({
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
</script>

<template>
  <div class="container">
    <LanguageSelection
      :selected-language="selectedLanguage"
      v-on:select-language="selectLanguage($event)"
    />

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
</template>

<style lang="scss">
.container {
  @include flex-center-column;
  &-words {
    width: 100%;
    @include flex-center;
  }
}
</style>
