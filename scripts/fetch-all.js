const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function readJson(file) {
  const p = path.join(__dirname, "../data", file);
  if (!fs.existsSync(p)) return [];
  return JSON.parse(fs.readFileSync(p, "utf-8"));
}

function run(cmd) {
  console.log(`Running: ${cmd}`);
  execSync(cmd, { stdio: "inherit" });
}

run("node scripts/fetch-epic.js");
run("node scripts/fetch-gog.js");

const epic = readJson("games.json");
const gog = readJson("gog.json");

const all = [...epic, ...gog];

fs.writeFileSync(
  path.join(__dirname, "../data/games.json"),
  JSON.stringify(all, null, 2),
  "utf-8"
);

console.log(`Saved ${all.length} total games`);
console.log(`Epic: ${epic.length}`);
console.log(`GOG: ${gog.length}`);