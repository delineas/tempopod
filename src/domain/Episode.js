/**
 * Represents a podcast episode.
 * @class
 */
class Episode {
  /**
   * Creates an instance of Episode.
   * @param {string} title The title of the episode.
   * @param {number} duration The duration of the episode in seconds.
   * @param {string} link The link to the episode.
   */
  constructor(title, duration, link) {
    /**
     * The title of the episode.
     * @type {string}
     */
    this.title = title;

    /**
     * The duration of the episode in seconds.
     * @type {number}
     */
    this.duration = duration;

    /**
     * The link to the episode.
     * @type {string}
     */
    this.link = link;
  }
}

export default Episode;
