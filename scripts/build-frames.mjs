/**
 * Converts the extracted PNG frames in /cropped_png into three responsive
 * WebP sets under /public/frames.
 *
 *   npm run frames
 *
 * desktop  hero        1920px wide, every frame      (119 files)
 * tablet   hero-md     1280px wide, every frame      (119 files)
 * mobile   hero-mobile  720px wide, every 2nd frame  (60 files)
 *
 * File naming follows lib/config.ts: f_0001.webp ... f_0119.webp, using the
 * source frame number so the renderer can map set index -> source index.
 */
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SOURCE_DIR = "cropped_png";
const OUTPUT_DIR = path.join("public", "frames");
const QUALITY = 78;

const SETS = [
  { name: "hero", width: 1920, step: 1 },
  { name: "hero-md", width: 1280, step: 1 },
  { name: "hero-mobile", width: 720, step: 2 },
];

async function pool(tasks, concurrency = 4) {
  let cursor = 0;
  const workers = Array.from({ length: Math.min(concurrency, tasks.length) }, async () => {
    while (cursor < tasks.length) {
      const index = cursor++;
      await tasks[index]();
    }
  });
  await Promise.all(workers);
}

const entries = (await readdir(SOURCE_DIR))
  .filter((file) => /\.png$/i.test(file))
  .sort();

if (!entries.length) {
  console.error(`No PNG frames found in ${SOURCE_DIR}/`);
  process.exit(1);
}

console.log(`Found ${entries.length} source frames in ${SOURCE_DIR}/`);

const frames = entries.map((file, index) => ({ file, sourceIndex: index + 1 }));

for (const set of SETS) {
  const dir = path.join(OUTPUT_DIR, set.name);
  await mkdir(dir, { recursive: true });

  const selected = frames.filter(({ sourceIndex }) => (sourceIndex - 1) % set.step === 0);
  let done = 0;

  await pool(
    selected.map(({ file, sourceIndex }) => async () => {
      const output = path.join(
        dir,
        `f_${String(sourceIndex).padStart(4, "0")}.webp`,
      );
      await sharp(path.join(SOURCE_DIR, file))
        .resize({ width: set.width, withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 4 })
        .toFile(output);

      done += 1;
      if (done % 20 === 0 || done === selected.length) {
        console.log(`  ${set.name}: ${done}/${selected.length}`);
      }
    }),
  );
}

console.log("Frame sets ready in public/frames/.");
