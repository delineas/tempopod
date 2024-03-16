import { parseDuration } from "./utils.js";
import Episode from "./domain/Episode.js";
import FeedError from "./errors/FeedError.js";

export default class FeedParser {
  async fetchAndParse(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new FeedError(`Error al acceder al feed URL: ${url}`);
    }
    const feedXml = await response.text();
    return this.parseFeed(feedXml);
  }

  parseFeed(feedXml) {
    const episodes = [];
    const itemRegex = /<item>(.*?)<\/item>/gs;
    let itemMatch;

    while ((itemMatch = itemRegex.exec(feedXml)) !== null) {
      const episodeContent = itemMatch[1];
      const titleMatch = episodeContent.match(/<title>(.*?)<\/title>/);
      const durationMatch = episodeContent.match(
        /<itunes:duration>(.*?)<\/itunes:duration>/
      );
      const linkMatch = episodeContent.match(/<link>(.*?)<\/link>/);

      if (titleMatch) {
        episodes.push(
          new Episode(
            titleMatch[1],
            durationMatch ? parseDuration(durationMatch[1]) : undefined,
            linkMatch ? linkMatch[1] : undefined
          )
        );
      }
    }

    if (episodes.length === 0) {
      throw new FeedError("El feed no contiene items.");
    }

    return episodes;
  }
}
