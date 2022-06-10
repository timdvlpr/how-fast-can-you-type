import axios from "axios";
import { CONFIG } from "@/config";
import type { CheckHighscoreResponse } from "@/interfaces/ApiResponses";
import type { Highscore } from "@/interfaces/Highscore";

export function checkIsHighscore(
  language: string,
  score: number
): Promise<CheckHighscoreResponse> {
  return axios
    .get(`${CONFIG.API_URL}/highscore/check/${language}/${score}`)
    .then((response) => response.data);
}

export function saveHighscore(highscore: Highscore): Promise<any> {
  return axios
    .post(`${CONFIG.API_URL}/highscore`, highscore)
    .then((response) => response.data);
}
