import games from "../data/games.json";

export default function Home() {
  return (
    <main style={{ maxWidth: 600, margin: "40px auto", padding: 20 }}>
      <h1>🎮 Free Games Radar</h1>

      <h2>🔥 This Week Free Games</h2>

      {games.map((game, i) => (
        <div
          key={i}
          style={{
            border: "1px solid #ddd",
            padding: 16,
            marginBottom: 16,
            borderRadius: 12,
          }}
        >
          <h3>{game.title}</h3>
          <p>Platform: {game.platform}</p>
          <p>
            {game.originalPrice} → <b style={{ color: "green" }}>FREE</b>
          </p>
          <p>Ends: {game.endDate}</p>

          <a href={game.url} target="_blank">
            👉 Claim Now
          </a>

          <hr />

          <p>🎧 Recommended Gear:</p>
          <ul>
            <li>Gaming Headset</li>
            <li>Controller</li>
          </ul>
        </div>
      ))}

      <div style={{ textAlign: "center", marginTop: 40 }}>
        <p>🔔 Get notified for new free games</p>
        <a href="https://t.me/你的频道">Join Telegram</a>
      </div>
    </main>
  );
}