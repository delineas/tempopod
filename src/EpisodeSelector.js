import SelectorError from "./errors/SelectorError.js";

export default class EpisodeSelector {
  constructor(episodes, tempo) {
    this.episodes = episodes;
    this.tempo = tempo;
    this.selected = [];
  }

  selectEpisodes() {
    if (this.episodes.length === 0) {
      throw new SelectorError("No hay episodios disponibles para seleccionar.");
    }

    const minDuration = Math.min(
      ...this.episodes.map((episode) => episode.duration)
    );

    if (this.tempo * 60 < minDuration) {
      throw new SelectorError(
        `El tiempo seleccionado es menor que el episodio más corto de ${minDuration} segundos.`
      );
    }

    let totalTime = 0;
    const episodes = this.episodes.sort(() => 0.5 - Math.random());

    for (let episode of episodes) {
      if (totalTime + episode.duration <= this.tempo * 60) {
        this.selected.push(episode);
        totalTime += episode.duration;
      }
    }

    return this.selected;
  }
}
