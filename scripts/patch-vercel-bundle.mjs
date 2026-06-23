/**
 * Post-build patch: inline tslib into the Vercel serverless bundle.
 *
 * Nitro chunks @supabase/functions-js into a _libs file that contains
 * `import { __awaiter } from "tslib"` as a bare specifier. Vercel's
 * serverless sandbox has no node_modules, so Node throws ERR_MODULE_NOT_FOUND.
 *
 * This script replaces that bare import with the actual tslib source code.
 */

import { readFileSync, writeFileSync, readdirSync } from "fs";
import { resolve, join } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const root = resolve(__dirname, "..");
const libsDir = resolve(
  root,
  ".vercel/output/functions/__server.func/_libs"
);

// Read tslib ESM source
const tslibPath = resolve(root, "node_modules/tslib/tslib.es6.mjs");
const tslibSrc = readFileSync(tslibPath, "utf8");

// Extract just the named exports we need (everything tslib exports)
// We'll prepend the entire tslib source and remove the import line
const files = readdirSync(libsDir).filter((f) => f.endsWith(".mjs"));
let patched = 0;

for (const file of files) {
  const filePath = join(libsDir, file);
  let content = readFileSync(filePath, "utf8");

  if (content.includes('from "tslib"') || content.includes("from 'tslib'")) {
    // Replace the import line with inlined tslib source
    content = content
      .replace(/^import\s*\{[^}]+\}\s*from\s*["']tslib["'];?\n?/m, "")
      .replace(/^import\s+\*\s+as\s+\w+\s+from\s*["']tslib["'];?\n?/m, "");

    // Prepend the full tslib source
    content = tslibSrc + "\n" + content;

    writeFileSync(filePath, content, "utf8");
    console.log(`✓ Patched tslib into ${file}`);
    patched++;
  }
}

if (patched === 0) {
  console.log("No files needed patching (tslib already bundled or not found).");
} else {
  console.log(`\nDone. Patched ${patched} file(s).`);
}
