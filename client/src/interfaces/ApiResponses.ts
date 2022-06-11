import type { Highscore } from "@/interfaces/Highscore";

export interface CheckHighscoreResponse {
  isHighscore: boolean;
  language: string;
}

export interface GetHighscoresResponse {
  count: number;
  data: Highscore[];
}
