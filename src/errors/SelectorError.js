export default class SelectorError extends Error {
  constructor(message) {
    super(message);
    this.name = "SelectorError";
  }
}
