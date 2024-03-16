import FeedError from "./errors/FeedError.js";

export default class FeedFetcher {
  async fetch(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new FeedError(`Error al acceder al feed URL: ${url}`);
    }
    return await response.text();
  }
}
