import { cpSync, existsSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = join(root, "node_modules/@electric-sql/pglite/dist");
const assets = ["pglite.data", "pglite.wasm", "initdb.wasm"];
const out = join(root, ".vercel/output");

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      walk(full);
      continue;
    }
    if (!name.endsWith(".mjs") || !name.includes("pglite")) continue;
    const destDir = dirname(full);
    for (const asset of assets) {
      cpSync(join(srcDir, asset), join(destDir, asset));
    }
  }
}

if (existsSync(out)) walk(out);
