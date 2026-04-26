const fs = require("fs");
const path = require("path");

const API =
  "https://catalog.gog.com/v1/catalog?limit=24&price=free&order=desc:releaseDate";

async function main() {
  const res = await fetch(API);

  if (!res.ok) {
    throw new Error(`GOG API failed: ${res.status}`);
  }

  const data = await res.json();

  const products = data.products || [];

  const games = products.map((item) => ({
    title: item.title,
    platform: "GOG",
    originalPrice: "Free",
    endDate: "",
    url: `https://www.gog.com/en/game/${item.slug}`,
    image: item._links?.image || "",
    source: "GOG Official API",
  }));

  const outputPath = path.join(__dirname, "../data/gog.json");
  fs.writeFileSync(outputPath, JSON.stringify(games, null, 2));

  console.log(`Saved ${games.length} GOG games`);
}

main().catch(console.error);