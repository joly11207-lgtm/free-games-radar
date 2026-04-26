const fs = require("fs");
const path = require("path");

const URL = "https://www.gog.com/en/games/free";

async function main() {
  const res = await fetch(URL);

  if (!res.ok) {
    throw new Error("Failed to fetch GOG page");
  }

  const html = await res.text();

  // 简单提取游戏名称（GOG页面结构变化较多，这里先做基础版）
  const matches = [...html.matchAll(/product-title[^>]*>(.*?)<\/div>/g)];

  const games = matches.slice(0, 10).map((m) => ({
    title: m[1].replace(/<[^>]+>/g, "").trim(),
    platform: "GOG",
    originalPrice: "Paid",
    endDate: "",
    url: "https://www.gog.com/en/games/free",
    image: "",
    source: "GOG Official"
  }));

  const outputPath = path.join(__dirname, "../data/gog.json");
  fs.writeFileSync(outputPath, JSON.stringify(games, null, 2));

  console.log(`Saved ${games.length} GOG games`);
}

main().catch(console.error);