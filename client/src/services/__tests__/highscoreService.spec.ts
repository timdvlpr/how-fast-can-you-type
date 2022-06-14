import { describe, it, expect, vi } from "vitest";

import axios from "axios";
import { CONFIG } from "../../config";
import {
  getHighscoresOfLanguage,
  checkIsHighscore,
  saveHighscore,
} from "../highscoreService";

describe("HighscoreService", () => {
  const mockHighscores = [
    {
      id: 1,
      score: 100,
      username: "Max",
      language: "german",
    },
    {
      id: 2,
      score: 91,
      username: "Tom",
      language: "german",
    },
  ];

  it("should call axios to get highscores of language", () => {
    const spy = vi
      .spyOn(axios, "get")
      .mockResolvedValue({ data: { data: mockHighscores, count: 2 } });
    getHighscoresOfLanguage("german", 10, 0);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(
      `${CONFIG.API_URL}/highscore/german/?take=10&skip=0`
    );
  });

  it("should call axios to check if score is a highscore", () => {
    const spy = vi
      .spyOn(axios, "get")
      .mockResolvedValue({ data: { isHighscore: true, language: "german" } });
    checkIsHighscore("german", 80);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(
      `${CONFIG.API_URL}/highscore/check/german/80`
    );
  });

  it("should call axios to save highscore", () => {
    const spy = vi
      .spyOn(axios, "post")
      .mockResolvedValue({ data: { identifier: 32 } });
    saveHighscore(mockHighscores[0]);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(
      `${CONFIG.API_URL}/highscore`,
      mockHighscores[0]
    );
  });
});
