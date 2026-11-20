import { theme } from "@/data/conference";
import ScrubWords from "@/components/motion/ScrubWords";
import SplitHeading from "@/components/motion/SplitHeading";
import Reveal from "@/components/motion/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";

/** 03 — the conference theme, revealed word by word as you scroll. */
export default function Theme() {
  return (
    <section id="theme" className="bg-navy-900 relative overflow-hidden">
      <div className="shell py-section">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SectionLabel index="03">Theme</SectionLabel>
          <span className="font-mono text-[9px] tracking-[0.2em] text-white/35 uppercase">
            About AIM-HUB 2027
          </span>
        </div>

        <SplitHeading
          as="h2"
          className="mt-6 max-w-4xl text-display-lg font-semibold text-white"
        >
          The{" "}
          <span className="font-serif text-lime-400 font-normal italic">
            human-centric
          </span>{" "}
          shift
        </SplitHeading>

        <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            {theme.paragraphs.map((paragraph, index) => (
              <ScrubWords
                key={index}
                text={paragraph}
                className={
                  index === 0
                    ? "max-w-3xl text-base leading-relaxed text-white/90 sm:text-lg"
                    : "mt-8 max-w-3xl text-sm leading-relaxed text-steel sm:text-base"
                }
                start={index === 0 ? "top 80%" : "top 88%"}
                end="bottom 58%"
              />
            ))}

            <Reveal className="mt-14 border-t border-white/10 pt-7">
              <h3 className="font-display text-lg text-white">{theme.whyTitle}</h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-steel">
                {theme.why}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center justify-between">
                <p className="eyebrow">The balances</p>
                <span className="font-mono text-[9px] tracking-[0.16em] text-white/30">
                  04 TENSIONS
                </span>
              </div>

              <ul className="mt-5 space-y-2.5">
                {theme.pairs.map((pair) => (
                  <li
                    key={pair.a}
                    className="glass group flex items-center gap-3 px-4 py-4 transition-colors duration-300 hover:border-lime-400/30"
                  >
                    <span className="relative flex-1 font-display text-base leading-tight sm:text-lg">
                      {pair.a}
                      <span
                        aria-hidden
                        className="bg-lime-400/70 absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 ease-expo group-hover:scale-x-100"
                      />
                    </span>

                    <span className="relative grid h-7 w-7 shrink-0 place-items-center">
                      <span
                        aria-hidden
                        className="border-lime-400/40 group-hover:bg-lime-400/10 absolute inset-0 rotate-45 border transition-colors duration-300"
                      />
                      <span className="relative font-mono text-[7px] tracking-[0.08em] text-lime-400">
                        VS
                      </span>
                    </span>

                    <span className="relative flex-1 text-right font-display text-base leading-tight sm:text-lg">
                      {pair.b}
                      <span
                        aria-hidden
                        className="bg-lime-400/70 absolute -bottom-1 right-0 h-px w-full origin-right scale-x-0 transition-transform duration-500 ease-expo group-hover:scale-x-100"
                      />
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-6 font-mono text-[9px] leading-relaxed tracking-[0.16em] text-white/35 uppercase">
                Balancing personalisation with privacy, efficiency with ethics,
                growth with responsibility, innovation with sustainability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
