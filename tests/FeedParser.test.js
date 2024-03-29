import { describe, it, expect, vi } from "vitest";
import FeedParser from "../src/FeedParser";

// Mock global.fetch function
global.fetch = vi.fn();

describe("FeedParser", () => {
  it("handles no episodes", async () => {
    const emptyFeed = "<rss><channel></channel></rss>";
    const parser = new FeedParser();

    expect(() => parser.parse(emptyFeed)).toThrow();
  });

  it("parses <itunes:duration> in MM:SS format correctly", async () => {
    const feedWithMMSSDuration =
      "<rss><channel><item><title>Episode 1</title><itunes:duration>15:30</itunes:duration></item></channel></rss>";
    const parser = new FeedParser();

    const episodes = parser.parse(feedWithMMSSDuration);
    expect(episodes[0].duration).toBe(930); // 15 minutes and 30 seconds
  });

  it("handles missing <itunes:duration> tag", async () => {
    const feedWithoutDurationTag =
      "<rss><channel><item><title>Episode 1</title></item><item><title>Episode 2</title><itunes:duration>1600</itunes:duration></item></channel></rss>";
    const parser = new FeedParser();

    const episodes = parser.parse(feedWithoutDurationTag);

    expect(
      episodes.find((e) => e.title === "Episode 1").duration
    ).toBeUndefined();
  });
});

describe("Output format", () => {
  it("should produce an array of episodes with title, duration, and link", async () => {
    const feedContent = `
      <rss>
        <channel>
          <item>
            <title>Episode 1</title>
            <itunes:duration>20:00</itunes:duration>
            <link>https://link.to.episode1</link>
          </item>
          <item>
            <title>Episode 2</title>
            <itunes:duration>21:30</itunes:duration>
            <link>https://link.to.episode2</link>
          </item>
        </channel>
      </rss>
    `;

    const parser = new FeedParser();
    const selectedEpisodes = parser.parse(feedContent);

    selectedEpisodes.forEach((episode) => {
      expect(episode).toHaveProperty("title");
      expect(episode).toHaveProperty("duration");
      expect(episode).toHaveProperty("link");
    });

    selectedEpisodes.forEach((episode) => {
      expect(episode).toMatchObject({
        title: expect.any(String),
        duration: expect.any(Number) || undefined,
        link: expect.any(String) || undefined,
      });
    });
  });
});
