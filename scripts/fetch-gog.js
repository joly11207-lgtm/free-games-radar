const fs = require("fs");
const path = require("path");

const API =
  "https://catalog.gog.com/v1/catalog?limit=24&price=free&order=desc:releaseDate";

function readJson(file) {
  const p = path.join(__dirname, "../data", file);
  if (!fs.existsSync(p)) return [];
  return JSON.parse(fs.readFileSync(p, "utf-8"));
}

async function main() {
  const res = await fetch(API);

  if (!res.ok) {
    throw new Error(`GOG API failed: ${res.status}`);
  }

  const data = await res.json();
  const products = data.products || [];

  const permanent = readJson("gog-permanent.json");
  const permanentSlugs = new Set(permanent.map((g) => g.slug));

  const games = products.map((item) => {
    const isPermanent = permanentSlugs.has(item.slug);

    return {
      title: item.title,
      slug: item.slug,
      platform: "GOG",
      originalPrice: "Free",
      endDate: "",
      url: `https://www.gog.com/en/game/${item.slug}`,
      image: item._links?.image || "",
      source: "GOG Official API",
      freeType: isPermanent ? "permanent" : "limited",
    };
  });

  const outputPath = path.join(__dirname, "../data/gog.json");
  fs.writeFileSync(outputPath, JSON.stringify(games, null, 2), "utf-8");

  console.log(`Saved ${games.length} GOG games`);
  console.log(
    `Permanent: ${games.filter((g) => g.freeType === "permanent").length}`
  );
  console.log(
    `Limited: ${games.filter((g) => g.freeType === "limited").length}`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});