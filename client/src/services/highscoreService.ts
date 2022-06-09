import axios from "axios";
import { CONFIG } from "@/config";
import type { CheckHighscoreResponse } from "@/interfaces/ApiResponses";

export function checkIsHighscore(
  language: string,
  score: number
): Promise<CheckHighscoreResponse> {
  return axios
    .get(`${CONFIG.API_URL}/highscore/check/${language}/${score}`)
    .then((response) => response.data);
}
