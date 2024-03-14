import { describe, it, expect, vi } from "vitest";
import { parseDuration, selectEpisodes, fetchFeed } from "./tempopod";

global.fetch = vi.fn();

describe("parseDuration", () => {
  it("parses HH:MM:SS correctly", () => {
    const durationStr = "02:30:45";
    const expectedSeconds = 2 * 3600 + 30 * 60 + 45;
    expect(parseDuration(durationStr)).toBe(expectedSeconds);
  });

  it("parses MM:SS correctly", () => {
    const durationStr = "45:30";
    const expectedSeconds = 45 * 60 + 30;
    expect(parseDuration(durationStr)).toBe(expectedSeconds);
  });

  it("parses SS correctly", () => {
    const durationStr = "75";
    const expectedSeconds = 75;
    expect(parseDuration(durationStr)).toBe(expectedSeconds);
  });

  it("handles leading zeros", () => {
    const durationStr = "02:05:09";
    const expectedSeconds = 2 * 3600 + 5 * 60 + 9;
    expect(parseDuration(durationStr)).toBe(expectedSeconds);
  });
});

describe("selectEpisodes", () => {
  it("throws an error if no episodes are available", () => {
    const episodes = [];
    const tempo = 30;
    expect(() => selectEpisodes(episodes, tempo)).toThrow();
  });

  it("throws an error if selected time is less than the shortest episode", () => {
    const episodes = [{ title: "Episode 1", duration: 1800 }]; // 30 minutes
    const tempo = 15; // 15 minutes
    expect(() => selectEpisodes(episodes, tempo)).toThrow();
  });

  it("selects episodes within the given time limit", () => {
    const episodes = [
      { title: "Episode 1", duration: 900 }, // 15 minutes
      { title: "Episode 2", duration: 1810 }, // 30 minutes, 10 seconds
      { title: "Episode 3", duration: 600 }, // 10 minutes
    ];
    const validCombinations = [
      ["Episode 1", "Episode 3"],
      ["Episode 2"],
      ["Episode 1", "Episode 2"],
    ];

    const tempo = 45;
    const selected = selectEpisodes(episodes, tempo);
    const isSelectedValid = validCombinations.some((combination) =>
      combination.every((item) => selected.includes(item))
    );

    expect(isSelectedValid).toBe(true);
  });
});

describe("fetchFeed", () => {
  it("handles no episodes", async () => {
    const emptyFeed = "<rss><channel></channel></rss>";
    fetch.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(emptyFeed),
    });

    await expect(fetchFeed("http://example.com/empty.xml")).rejects.toThrow();
  });

  it("handles no episodes of that duration", async () => {
    const noMatchingDurationFeed =
      "<rss><channel><item><title>Episode 1</title><itunes:duration>1600</itunes:duration></item></channel></rss>";
    fetch.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(noMatchingDurationFeed),
    });

    const episodes = await fetchFeed(
      "http://example.com/no-matching-duration.xml"
    );
    expect(() => selectEpisodes(episodes, 1).toThrow());
  });

  it("handles <itunes:duration> in MM:SS format", async () => {
    const feedWithMMSSDuration =
      "<rss><channel><item><title>Episode 1</title><itunes:duration>15:30</itunes:duration></item></channel></rss>";
    fetch.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(feedWithMMSSDuration),
    });

    const episodes = await fetchFeed("http://example.com/mmss-duration.xml");
    expect(episodes[0].duration).toBe(930); // 15:30 minutes
  });

  it("handles missing <itunes:duration> tag", async () => {
    const feedWithoutDurationTag =
      "<rss><channel><item><title>Episode 1</title></item><item><title>Episode 2</title><itunes:duration>1600</itunes:duration></item></channel></rss>";
    fetch.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(feedWithoutDurationTag),
    });

    const episodes = await fetchFeed("http://example.com/missing-duration.xml");
    expect(() => selectEpisodes(episodes, 100)[0].duration.toBeUndefined());
  });
});
