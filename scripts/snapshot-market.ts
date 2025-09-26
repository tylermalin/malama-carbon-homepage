/* eslint-disable no-console */
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const base = process.env.MARKET_BASE_URL || "http://localhost:3000";
  const url = `${base}/api/data`;

  console.log(`Fetching ${url} ...`);
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();

  const dir = path.join(__dirname, "..", "public", "data", "_snapshots");
  await mkdir(dir, { recursive: true });
  const ts = new Date().toISOString().replace(/[:.]/g, "-");
  const file = path.join(dir, `market.snapshot.${ts}.json`);
  await writeFile(file, JSON.stringify(json, null, 2), "utf-8");

  console.log(`✅ Snapshot saved → ${file}`);
  console.log("Tip: set MARKET_BASE_URL=https://your-prod-hostname when snapshotting prod.");
}

main().catch((e) => {
  console.error("❌ Snapshot failed:", e);
  process.exit(1);
});
