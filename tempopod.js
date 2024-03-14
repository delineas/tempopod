const args = process.argv.slice(2);
const selectedTempo = args[0] || 30; // Minutes
const feedUrl =
  args[1] ||
  "https://raw.githubusercontent.com/webreactiva-devs/reto-tempopod/main/feed/webreactiva.xml";

fetchFeed(feedUrl)
  .then((episodes) => selectEpisodes(episodes, selectedTempo))
  .then((selectedEpisodes) =>
    console.log("Episodios seleccionados:", selectedEpisodes)
  )
  .catch((error) => console.error(error));

export async function fetchFeed(url) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error al acceder al feed URL: ${url}`);
      }
      return response.text();
    })
    .then(parseFeed);
}

export function parseFeed(feedXml) {
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

    if (titleMatch && durationMatch) {
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

export function parseDuration(durationStr) {
  const parts = durationStr.split(":").map(Number);
  let seconds = 0;

  if (parts.length === 3) {
    seconds = parts[0] * 3600 + parts[1] * 60 + parts[2]; // HH:MM:SS
  } else if (parts.length === 2) {
    seconds = parts[0] * 60 + parts[1]; // MM:SS
  } else if (parts.length === 1) {
    seconds = parts[0]; // SS
  }

  return seconds;
}

export function selectEpisodes(episodes, tempo) {
  if (episodes.length === 0) {
    throw new Error("No hay episodios disponibles para seleccionar.");
  }

  const minDuration = Math.min(...episodes.map((episode) => episode.duration));

  if (tempo * 60 < minDuration) {
    throw new Error(
      `El tiempo seleccionado es menor que el episodio más corto de ${minDuration} segundos.`
    );
  }

  let selected = [];
  let totalTime = 0;
  episodes = episodes.sort(() => 0.5 - Math.random());

  for (let episode of episodes) {
    if (totalTime + episode.duration <= tempo * 60) {
      selected.push({
        title: episode.title,
        duration: episode.duration,
        link: episode.link,
      });
      totalTime += episode.duration;
    }
  }

  return selected;
}
