export default class FeedError extends Error {
  constructor(message) {
    super(message);
    this.name = "FeedError";
  }
}
