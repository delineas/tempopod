import { describe, it, expect, vi } from "vitest";
import FeedFetcher from "../src/FeedFetcher";
import FeedError from "../src/errors/FeedError.js";

// Mock global.fetch function
global.fetch = vi.fn();

describe("FeedFetcher", () => {
  it("should throw an error if the response is not ok", async () => {
    const fakeUrl = "https://example.com/feed";
    const fetcher = new FeedFetcher();

    fetch.mockResolvedValueOnce({ ok: false });

    await expect(fetcher.fetch(fakeUrl)).rejects.toThrow(FeedError);
  });

  it("should return feed content if the response is ok", async () => {
    const fakeUrl = "https://example.com/feed";
    const expectedFeedContent = "<rss><channel></channel></rss>";
    const fetcher = new FeedFetcher();

    fetch.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(expectedFeedContent),
    });

    const content = await fetcher.fetch(fakeUrl);
    expect(content).toBe(expectedFeedContent);
  });
});
