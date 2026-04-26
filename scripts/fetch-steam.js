const fs = require("fs");
const path = require("path");

const URL =
  "https://store.steampowered.com/search/results/?query&start=0&count=50&dynamic_data=&sort_by=_ASC&specials=1&maxprice=free&infinite=1";

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
    throw new Error(`Steam fetch failed: ${res.status}`);
  }

  const data = await res.json();
  const html = data.results_html || "";

  const blocks = html.match(/<a[\s\S]*?class="search_result_row[\s\S]*?<\/a>/g) || [];

  const games = blocks
    .map((block) => {
      const discountMatch = block.match(/search_discount[^>]*>\s*<span>(.*?)<\/span>/);
      const discount = clean(discountMatch?.[1] || "");

      if (discount !== "-100%") return null;

      const titleMatch = block.match(/<span class="title">(.*?)<\/span>/);
      const urlMatch = block.match(/href="([^"]+)"/);
      const imageMatch = block.match(/<img[^>]+src="([^"]+)"/);
      const originalPriceMatch = block.match(/<strike>(.*?)<\/strike>/);

      const title = clean(titleMatch?.[1] || "");
      const url = urlMatch?.[1]?.split("?")[0] || "";
      const image = imageMatch?.[1] || "";
      const originalPrice = clean(originalPriceMatch?.[1] || "Paid");

      if (!title || !url) return null;

      return {
        title,
        platform: "Steam",
        originalPrice,
        endDate: "",
        url,
        image,
        source: "Steam Store",
        freeType: "limited",
      };
    })
    .filter(Boolean)
    .slice(0, 24);

  fs.writeFileSync(
    path.join(__dirname, "../data/steam.json"),
    JSON.stringify(games, null, 2),
    "utf-8"
  );

  console.log(`Saved ${games.length} Steam games`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});