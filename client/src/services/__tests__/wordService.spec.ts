import { describe, it, expect, vi } from "vitest";

import axios from "axios";
import { CONFIG } from "../../config";
import { getWords } from "../wordService";

describe("WordService", () => {
  it("should call axios to get words", () => {
    const spy = vi
      .spyOn(axios, "get")
      .mockResolvedValue({ data: { words: ["test", "words"] } });
    getWords("german");
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(`${CONFIG.API_URL}/words/german`);
  });
});
