import games from "../data/games.json";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080808] text-white px-5 py-10">
      <section className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-sm text-green-400 mb-2">Updated automatically</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            🎮 Free Games Radar
          </h1>
          <p className="text-gray-400 text-lg">
            Track free games from Epic Games and more platforms. No login. No account. Just claim on official stores.
          </p>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">🔥 This Week&apos;s Free Games</h2>
          <span className="text-sm text-gray-400">{games.length} games found</span>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {games.map((game, i) => (
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
                Ends: {game.endDate ? new Date(game.endDate).toLocaleDateString() : "Check official store"}
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