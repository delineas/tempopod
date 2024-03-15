import { parseDuration } from "./utils.js";

export default class FeedParser {
  async fetchAndParse(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error al acceder al feed URL: ${url}`);
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
        episodes.push({
          title: titleMatch[1],
          duration: durationMatch ? parseDuration(durationMatch[1]) : undefined,
          link: linkMatch ? linkMatch[1] : undefined,
        });
      }
    }

    if (episodes.length === 0) {
      throw new Error("El feed no contiene items.");
    }

    return episodes;
  }
}
