"use client";

import { useState } from "react";
import games from "../data/games.json";

export default function Home() {
  const [platform, setPlatform] = useState("All");
  const [gogType, setGogType] = useState("All");

  const platforms = ["All", "Epic", "Steam", "GOG", "itch.io"];

  const filteredGames = games.filter((g) => {
  const matchPlatform =
    platform === "All" ||
    g.platform.toLowerCase().includes(platform.toLowerCase());

  const matchGogType =
    platform !== "GOG" ||
    gogType === "All" ||
    g.freeType === gogType.toLowerCase();

  return matchPlatform && matchGogType;
});

  return (
    <main className="min-h-screen bg-[#080808] text-white px-5 py-10">
      <section className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-sm text-green-400 mb-2">Updated automatically</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            🎮 Free Games Radar
          </h1>
          <p className="text-gray-400 text-lg">
            Track free games from Epic Games, Steam, GOG, itch.io and more.
            No login. No account. Just claim on official stores.
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold">🔥 This Week&apos;s Free Games</h2>
          <span className="text-sm text-gray-400">
            {filteredGames.length} games found
          </span>
        </div>

        <div className="flex gap-2 mb-8 flex-wrap">
          {platforms.map((p) => (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                platform === p
                  ? "bg-green-500 text-black"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        {platform === "GOG" && (
  <div className="flex gap-2 mb-8 flex-wrap">
    {["All", "Permanent", "Limited"].map((t) => (
      <button
        key={t}
        onClick={() => setGogType(t)}
        className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
          gogType === t
            ? "bg-purple-500 text-white"
            : "bg-white/10 text-white hover:bg-white/20"
        }`}
      >
        {t === "All"
          ? "All GOG"
          : t === "Permanent"
          ? "Permanent Free"
          : "Limited-Time Free"}
      </button>
    ))}
  </div>
)}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredGames.map((game, i) => (
            <article
              key={i}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-lg hover:bg-white/[0.07] transition"
            >
              {game.image && (
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-40 object-cover rounded-xl mb-4"
                />
              )}

              <div className="mb-3">
                <span className="inline-block text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-300">
                  {game.platform}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-3 line-clamp-2">
                {game.title}
              </h3>

              <p className="text-gray-300 mb-2">
                <span className="line-through text-gray-500">
                  {game.originalPrice || "Paid"}
                </span>{" "}
                <span className="text-green-400 font-bold">FREE</span>
              </p>

              <p className="text-sm text-gray-400 mb-5">
                Ends:{" "}
                {game.endDate
                  ? new Date(game.endDate).toLocaleDateString()
                  : "Check official store"}
              </p>

              <a
                href={game.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center rounded-xl bg-green-500 hover:bg-green-400 text-black font-bold py-3 transition"
              >
                Claim on Official Store
              </a>
            </article>
          ))}
        </div>

        <section className="mt-12 rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center">
          <h2 className="text-2xl font-bold mb-2">🔔 Never miss a free game</h2>
          <p className="text-gray-400 mb-5">
            Get notified when new free games are available.
          </p>
          <a
            href="https://t.me/你的频道"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-bold px-6 py-3 transition"
          >
            Join Telegram
          </a>
        </section>

        <footer className="text-center text-gray-500 text-sm mt-10">
          Not affiliated with Epic Games, Steam, GOG, or other game stores.
        </footer>
      </section>
    </main>
  );
}