import FeedParser from "./src/FeedParser.js";
import EpisodeSelector from "./src/EpisodeSelector.js";

const defaultFeedUrl =
  "https://raw.githubusercontent.com/webreactiva-devs/reto-tempopod/main/feed/webreactiva.xml";
const defaultTempo = 30; // Minutes

function getCommandLineArgs() {
  const args = process.argv.slice(2);
  return {
    selectedTempo: parseInt(args[0], 10) || defaultTempo,
    feedUrl: args[1] || defaultFeedUrl,
  };
}

async function main() {
  const { selectedTempo, feedUrl } = getCommandLineArgs();

  try {
    const feedParser = new FeedParser();
    const episodes = await feedParser.fetchAndParse(feedUrl);

    const selectedEpisodes = new EpisodeSelector(
      episodes,
      selectedTempo
    ).selectEpisodes();

    console.log("Episodios seleccionados:", selectedEpisodes);
  } catch (error) {
    console.error(error);
  }
}

main();
