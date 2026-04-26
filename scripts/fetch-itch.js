const fs = require("fs");
const path = require("path");

const URL = "https://itch.io/games/free";

function clean(text = "") {
  return text.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

async function main() {
  const res = await fetch(URL, {
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
  });

  if (!res.ok) {
    throw new Error(`itch.io fetch failed: ${res.status}`);
  }

  const html = await res.text();

  const blocks = html.match(/<div class="game_cell[\s\S]*?<\/div>\s*<\/div>/g) || [];

  const games = blocks
    .map((block) => {
      const titleMatch = block.match(/class="title game_link"[^>]*>([\s\S]*?)<\/a>/);
      const urlMatch = block.match(/class="title game_link"[^>]*href="([^"]+)"/);
      const imageMatch =
        block.match(/data-lazy_src="([^"]+)"/) ||
        block.match(/src="([^"]+)"/);

      const title = clean(titleMatch?.[1] || "");
      const url = urlMatch?.[1] || "";

      if (!title || !url) return null;

      return {
        title,
        platform: "itch.io",
        originalPrice: "Free",
        endDate: "",
        url,
        image: imageMatch?.[1] || "",
        source: "itch.io Official",
        freeType: "permanent",
      };
    })
    .filter(Boolean)
    .slice(0, 24);

  fs.writeFileSync(
    path.join(__dirname, "../data/itch.json"),
    JSON.stringify(games, null, 2),
    "utf-8"
  );

  console.log(`Saved ${games.length} itch.io games`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});