import { describe, it, expect } from "vitest";
import EpisodeSelector from "../src/EpisodeSelector";

describe("EpisodeSelector", () => {
  it("throws an error if no episodes are available", () => {
    const episodes = [];
    const tempo = 30;
    const episodeSelector = new EpisodeSelector(episodes, tempo);

    expect(() => episodeSelector.selectEpisodes()).toThrow(
      "No hay episodios disponibles para seleccionar."
    );
  });

  it("throws an error if selected time is less than the shortest episode", () => {
    const episodes = [{ title: "Episode 1", duration: 1800 }]; // 30 minutes
    const tempo = 15; // 15 minutes
    const episodeSelector = new EpisodeSelector(episodes, tempo);

    expect(() => episodeSelector.selectEpisodes()).toThrow(
      "El tiempo seleccionado es menor que el episodio más corto de 1800 segundos."
    );
  });

  it("selects episodes within the given time limit", () => {
    const episodes = [
      { title: "Episode 1", duration: 900 }, // 15 minutes
      { title: "Episode 2", duration: 1810 }, // 30 minutes, 10 seconds
      { title: "Episode 3", duration: 600 }, // 10 minutes
    ];
    const tempo = 45; // 45 minutes
    const episodeSelector = new EpisodeSelector(episodes, tempo);

    episodeSelector.selectEpisodes();
    const selectedTitles = episodeSelector.selected.map((ep) => ep.title);

    const validCombinations = [
      ["Episode 1", "Episode 3"],
      ["Episode 2"],
      ["Episode 1", "Episode 2"],
    ];

    const isSelectedValid = validCombinations.some((combination) =>
      combination.every((title) => selectedTitles.includes(title))
    );

    expect(isSelectedValid).toBe(true);
  });
});
