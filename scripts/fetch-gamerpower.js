const fs = require("fs");
const path = require("path");

const API_URL = "https://www.gamerpower.com/api/giveaways?type=game";

async function main() {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error(`GamerPower API failed: ${res.status}`);
  }

  const data = await res.json();

  const allowedPlatforms = ["Steam", "GOG", "Itch.io", "Epic Games Store"];

  const games = data
    .filter((item) =>
      allowedPlatforms.some((p) =>
        item.platforms?.toLowerCase().includes(p.toLowerCase())
      )
    )
    .map((item) => ({
      title: item.title,
      platform: item.platforms || "Multiple Platforms",
      originalPrice: item.worth || "Paid",
      endDate: item.end_date || "",
      url: item.open_giveaway_url || item.gamerpower_url,
      image: item.image || item.thumbnail || "",
      source: "GamerPower",
    }));

  const outputPath = path.join(__dirname, "../data/games.json");
  fs.writeFileSync(outputPath, JSON.stringify(games, null, 2), "utf-8");

  console.log(`Saved ${games.length} multi-platform free games`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});