/* eslint-disable no-console */
import { writeFile, mkdir, cp, stat } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { marketData } from "../src/lib/marketSchema";   // uses zod schema
import type { MarketData } from "../src/types/market";
import { marketLocal } from "../src/data/market.local";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function ensureDir(p: string) {
  try { await mkdir(p, { recursive: true }); } catch {}
}

async function backupIfExists(targetFile: string, backupDir: string) {
  try {
    await stat(targetFile);
    await ensureDir(backupDir);
    const ts = new Date().toISOString().replace(/[:.]/g, "-");
    const backupFile = path.join(backupDir, `market.${ts}.json`);
    await cp(targetFile, backupFile);
    console.log(`↳ Backed up existing file to ${backupFile}`);
  } catch {
    // file does not exist; no backup needed
  }
}

async function main() {
  // 1) Validate structure
  const parsed = marketData.safeParse(marketLocal as MarketData);
  if (!parsed.success) {
    console.error("❌ market.local.ts failed validation:");
    console.error(parsed.error.format());
    process.exit(1);
  }

  // 2) Set generated_at if not present
  const payload = {
    generated_at: new Date().toISOString(),
    ...parsed.data,
  };

  // 3) Paths
  const projectRoot = path.join(__dirname, ".."); // scripts -> project root
  const publicDir = path.join(projectRoot, "public", "data");
  const targetFile = path.join(publicDir, "market.json");
  const backupDir = path.join(publicDir, "_backups");

  // 4) Backup, then write pretty JSON
  await ensureDir(publicDir);
  await backupIfExists(targetFile, backupDir);

  const json = JSON.stringify(payload, null, 2);
  await writeFile(targetFile, json, "utf-8");

  console.log(`✅ Exported market data → ${targetFile}`);
}

main().catch((e) => {
  console.error("❌ Export failed:", e);
  process.exit(1);
});
