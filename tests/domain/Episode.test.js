import { describe, it, expect } from "vitest";
import Episode from "../../src/domain/Episode";

describe("Episode", () => {
  it("should create an instance with the correct properties", () => {
    const title = "Test Episode";
    const duration = 300;
    const link = "http://example.com/test-episode";

    const episode = new Episode(title, duration, link);

    expect(episode.title).toBe(title);
    expect(episode.duration).toBe(duration);
    expect(episode.link).toBe(link);
  });
});
