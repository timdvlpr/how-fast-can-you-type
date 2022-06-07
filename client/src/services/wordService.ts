import axios from "axios";
import { CONFIG } from "@/config";

export function getWords(language: string): Promise<string[]> {
  return axios
    .get(CONFIG.API_URL + "/words/" + language)
    .then((response) => response.data.words);
}
