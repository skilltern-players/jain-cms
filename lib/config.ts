/**
 * Central configuration. Every value that the organisers must confirm is
 * flagged with TODO / VERIFY so it can be collected in one place.
 */

/** Canonical site origin — used for metadata, sitemap and JSON-LD. */
export const SITE_URL = "https://aimhub2027.jainuniversity.ac.in";

/**
 * TODO(links): replace with the live submission form before launch.
 * The placeholder is a valid, non-breaking URL on a reserved example domain.
 */
export const ABSTRACT_SUBMISSION_URL = "https://aimhub2027.example.org/submit-abstract";

/**
 * TODO(links): replace with the live registration/payment page.
 */
export const REGISTRATION_URL = "https://aimhub2027.example.org/register";

/**
 * Bank transfer details stay hidden until the organisers confirm them.
 * Flip to `true` only after written confirmation of every field.
 */
export const SHOW_BANK_DETAILS = false;

/**
 * Single source of truth for the hero scroll sequence.
 *
 * The renderer derives the filename from these values, e.g.
 *   /frames/hero/f_0001.webp
 * The responsive sets are produced by `npm run frames`.
 */
export type FrameSet = {
  /** Public folder that holds this set. */
  folder: string;
  /** Number of files actually present in the folder. */
  frameCount: number;
  /** Use every Nth frame of the source sequence (mobile can skip frames). */
  step: number;
  /** Intrinsic aspect ratio of the frames (1920 x 840). */
  aspectRatio: number;
};

export const HERO_FRAME_CONFIG = {
  frameCount: 119,
  /** Critical frames loaded before the preloader releases the page. */
  priorityFrames: 20,
  prefix: "f_",
  extension: "webp",
  /** Digits used in the filename, e.g. f_0001.webp -> 4. */
  padding: 4,
  /** Scroll length of the pinned hero, in viewport heights (400vh). */
  scrollDistanceVh: 400,
  scrub: 0.5,
  /** Breakpoint (px) at which each set takes over. */
  breakpoints: {
    tablet: 768,
    desktop: 1280,
  },
  sets: {
    mobile: { folder: "/frames/hero-mobile", frameCount: 60, step: 2, aspectRatio: 1920 / 840 },
    tablet: { folder: "/frames/hero-md", frameCount: 119, step: 1, aspectRatio: 1920 / 840 },
    desktop: { folder: "/frames/hero", frameCount: 119, step: 1, aspectRatio: 1920 / 840 },
  } satisfies Record<string, FrameSet>,
} as const;

export type FrameSetName = keyof typeof HERO_FRAME_CONFIG.sets;

/** Build the URL for one frame of a set. */
export function frameUrl(set: FrameSet, index: number) {
  const sourceIndex = Math.min(
    set.frameCount - 1,
    Math.max(0, index),
  ) * set.step;
  const file = `${HERO_FRAME_CONFIG.prefix}${String(sourceIndex + 1).padStart(
    HERO_FRAME_CONFIG.padding,
    "0",
  )}.${HERO_FRAME_CONFIG.extension}`;
  return `${set.folder}/${file}`;
}

/** Countdown target is the first conference day, 09:00 IST. */
export const COUNTDOWN_TARGET = "2027-06-24T09:00:00+05:30";

export const CONTACT = {
  name: "Dr. Smita M Gaikwad",
  phone: "+91 88611 15612",
  phoneHref: "+918861115612",
  email: "conference.desk@jainuniversity.ac.in",
} as const;
