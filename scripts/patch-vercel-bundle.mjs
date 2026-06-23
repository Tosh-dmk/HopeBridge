/**
 * Post-build patch: inline tslib into the Vercel serverless bundle.
 *
 * Nitro chunks packages into _libs files that contain
 * `import { ... } from "tslib"` as a bare specifier. Vercel's
 * serverless sandbox has no node_modules, so Node throws ERR_MODULE_NOT_FOUND.
 *
 * This script replaces that bare import with the actual tslib source code,
 * scanning recursively through all subdirectories.
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { resolve, join } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const root = resolve(__dirname, "..");
const funcDir = resolve(
  root,
  ".vercel/output/functions/__server.func"
);

// Read tslib ESM source
const tslibPath = resolve(root, "node_modules/tslib/tslib.es6.mjs");
const tslibSrc = readFileSync(tslibPath, "utf8");

// Recursively collect all .mjs files
function collectMjs(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...collectMjs(full));
    } else if (entry.endsWith(".mjs")) {
      results.push(full);
    }
  }
  return results;
}

const files = collectMjs(funcDir);
let patched = 0;

for (const filePath of files) {
  let content = readFileSync(filePath, "utf8");

  if (content.includes('from "tslib"') || content.includes("from 'tslib'")) {
    // Remove the tslib import line(s)
    content = content
      .replace(/^import\s*\{[^}]+\}\s*from\s*["']tslib["'];?\r?\n?/gm, "")
      .replace(/^import\s+\*\s+as\s+\w+\s+from\s*["']tslib["'];?\r?\n?/gm, "");

    // Prepend the full tslib source so all exported helpers are available
    content = tslibSrc + "\n" + content;

    writeFileSync(filePath, content, "utf8");
    const rel = filePath.replace(funcDir + "\\", "").replace(funcDir + "/", "");
    console.log(`✓ Patched tslib into ${rel}`);
    patched++;
  }
}

if (patched === 0) {
  console.log("No files needed patching (tslib already bundled or not found).");
} else {
  console.log(`\nDone. Patched ${patched} file(s).`);
}
