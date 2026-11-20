import Ticker from "@/components/ui/Marquee";
import { tracks } from "@/data/conference";

/** 02 — infinite track ticker, accelerated by scroll velocity. */
export default function Marquee() {
  const items = tracks.map((track) => `${track.n} · ${track.title}`);

  return (
    <section
      id="marquee"
      aria-label="Conference tracks ticker"
      className="bg-navy-800 relative z-10 border-y border-white/10 py-5"
    >
      <Ticker
        items={items}
        speed={52}
        itemClassName="text-[10px] text-white/60"
      />
    </section>
  );
}
