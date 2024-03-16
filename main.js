import FeedParser from "./src/FeedParser.js";
import EpisodeSelector from "./src/EpisodeSelector.js";
import FeedError from "./src/errors/FeedError.js";
import SelectorError from "./src/errors/SelectorError.js";
import FeedFetcher from "./src/FeedFetcher.js";

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

const feedFetcher = new FeedFetcher();
const feedParser = new FeedParser();

async function main() {
  const { selectedTempo, feedUrl } = getCommandLineArgs();

  try {
    const feedXml = await feedFetcher.fetch(feedUrl);
    const episodes = feedParser.parse(feedXml);

    const selectedEpisodes = new EpisodeSelector(
      episodes,
      selectedTempo
    ).selectEpisodes();

    console.log("Episodios seleccionados:", selectedEpisodes);
  } catch (error) {
    if (error instanceof FeedError) {
      console.error("Error de Feed:", error.message);
    } else if (error instanceof SelectorError) {
      console.error("Error de selección de episodios:", error.message);
    } else {
      console.error(error);
    }
  }
}

main();
