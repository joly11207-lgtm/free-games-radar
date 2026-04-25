const fs = require("fs");
const path = require("path");

const API_URL =
  "https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions?locale=en-US&country=US&allowCountries=US";

async function main() {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error(`Epic API failed: ${res.status}`);
  }

  const data = await res.json();

  const elements =
    data?.data?.Catalog?.searchStore?.elements || [];

  const games = elements
    .filter((item) => {
      const promotions = item.promotions;
      return (
        promotions?.promotionalOffers?.length > 0 ||
        promotions?.upcomingPromotionalOffers?.length > 0
      );
    })
    .map((item) => {
      const offer =
        item.promotions?.promotionalOffers?.[0]?.promotionalOffers?.[0] ||
        item.promotions?.upcomingPromotionalOffers?.[0]?.promotionalOffers?.[0];

      const slug =
        item.productSlug ||
        item.catalogNs?.mappings?.[0]?.pageSlug ||
        item.urlSlug;

      const image =
        item.keyImages?.find((img) => img.type === "OfferImageWide")?.url ||
        item.keyImages?.[0]?.url ||
        "";

      return {
        title: item.title,
        platform: "Epic Games",
        originalPrice: item.price?.totalPrice?.fmtPrice?.originalPrice || "",
        endDate: offer?.endDate || "",
        url: slug
          ? `https://store.epicgames.com/en-US/p/${slug}`
          : "https://store.epicgames.com/en-US/free-games",
        image,
      };
    });

  const outputPath = path.join(__dirname, "../data/games.json");

  fs.writeFileSync(outputPath, JSON.stringify(games, null, 2), "utf-8");

  console.log(`Saved ${games.length} Epic free games to data/games.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});