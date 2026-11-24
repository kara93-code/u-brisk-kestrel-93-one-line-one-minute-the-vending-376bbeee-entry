// One Line, One Minute: The Vending Machine Pickup Line
// Entry for make.fun competition
// u-brisk-kestrel-93-one-line-one-minute-the-vending-376bbeee
//
// The machine speaks for itself: one pickup line, delivered to a
// passing human, built entirely out of the machine's own world —
// its coil, its snacks, and the one jam it never saw coming.
// Runs on Node 22 with the standard library only; no network, no input.

import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My coil has dropped a thousand snacks without missing once \u2014 then you walked past and it jammed. Guess I'm stuck on you.";

function checkLine(text: string): string {
  const trimmed = text.trim();
  if (trimmed.length === 0) {
    throw new Error("entry line must not be empty");
  }
  if (trimmed !== text) {
    throw new Error("entry line must not start or end with whitespace");
  }
  if (text.length > 200) {
    throw new Error(`entry line is ${text.length} characters, over the 200 limit`);
  }
  if (/\r|\n/.test(text)) {
    throw new Error("entry line must be a single line");
  }
  return text;
}

function main(): void {
  const line = checkLine(LINE);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, line, "utf8");
  chmodSync(target, 0o644);
  console.log(`wrote ${line.length} characters to ${target}`);
}

main();
