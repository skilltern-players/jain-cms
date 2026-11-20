import { Check, FileText } from "lucide-react";
import { guidelines } from "@/data/conference";
import { ABSTRACT_SUBMISSION_URL } from "@/lib/config";
import SectionLabel from "@/components/ui/SectionLabel";
import SplitHeading from "@/components/motion/SplitHeading";
import Reveal from "@/components/motion/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";

/**
 * 07 — call for papers. The manuscript spec sheet stays in view while the
 * nine-point checklist scrolls past it.
 */
export default function Guidelines() {
  const spec = [
    { label: "Font", value: guidelines.formatting.font },
    { label: "Size", value: guidelines.formatting.size },
    { label: "Spacing", value: guidelines.formatting.spacing },
    { label: "Margins", value: guidelines.formatting.margins },
  ];

  return (
    <section
      id="guidelines"
      className="bg-navy-900 relative scroll-mt-24 text-white"
    >
      <div className="shell py-section">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SectionLabel index="07">Call for Papers</SectionLabel>
          <span className="font-mono text-[9px] tracking-[0.2em] text-white/35 uppercase">
            MS Word · .doc / .docx
          </span>
        </div>

        <SplitHeading as="h2" className="mt-6 max-w-4xl text-display-lg font-semibold">
          Submission{" "}
          <span className="font-serif text-lime-400 font-normal italic">
            guidelines
          </span>
        </SplitHeading>

        <div className="mt-6 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-2xl text-sm leading-relaxed text-steel">
            {guidelines.intro}
          </p>

          <div className="shrink-0">
            <MagneticButton href={ABSTRACT_SUBMISSION_URL} external>
              Submit abstract
            </MagneticButton>
            <p className="mt-3 max-w-[16rem] font-mono text-[9px] leading-relaxed tracking-[0.14em] text-white/40 uppercase">
              {guidelines.submitNote}
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-12 border-t border-white/10 pt-10 lg:grid-cols-[21rem_minmax(0,1fr)] lg:gap-16">
          {/* Spec sheet */}
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <Reveal>
              <div className="glass hud-frame p-6">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-mono text-[9px] tracking-[0.22em] text-steel uppercase">
                    Manuscript spec
                  </p>
                  <FileText aria-hidden size={15} className="text-lime-400/70" />
                </div>

                <dl className="mt-4 divide-y divide-white/10">
                  {spec.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-baseline justify-between gap-6 py-3"
                    >
                      <dt className="font-mono text-[9px] tracking-[0.16em] text-white/40 uppercase">
                        {row.label}
                      </dt>
                      <dd className="text-right text-[13px] text-white">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-5 space-y-3 border-t border-white/10 pt-5">
                  {guidelines.limits.map((limit) => (
                    <div key={limit.label}>
                      <p className="font-mono text-[9px] tracking-[0.16em] text-white/40 uppercase">
                        {limit.label}
                      </p>
                      <p className="mt-1 text-[13px] leading-snug text-white">
                        {limit.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="mt-6">
                <p className="font-mono text-[9px] tracking-[0.22em] text-steel uppercase">
                  Accepted submissions
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {guidelines.submissionTypes.map((type) => (
                    <li
                      key={type}
                      className="rounded-full border border-white/15 px-3 py-1.5 font-mono text-[9px] tracking-[0.12em] text-white/65 uppercase transition-colors duration-300 hover:border-lime-400/60 hover:text-white"
                    >
                      {type}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Checklist */}
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-display text-xl">Manuscript checklist</h3>
              <span className="font-mono text-[9px] tracking-[0.16em] text-white/35 uppercase">
                09 / 09
              </span>
            </div>

            <ol className="mt-6">
              {guidelines.checklist.map((item, index) => (
                <li
                  key={item.title}
                  className="group grid grid-cols-[2.25rem_minmax(0,1fr)_auto] items-start gap-4 border-t border-white/10 py-5 last:border-b"
                >
                  <span className="mt-0.5 font-mono text-[10px] tracking-[0.14em] text-lime-400/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-display text-base leading-snug text-white transition-colors duration-300 group-hover:text-lime-400">
                      {item.title}
                    </p>
                    <p className="mt-1 text-[13px] leading-relaxed text-steel">
                      {item.detail}
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="mt-0.5 grid h-5 w-5 place-items-center rounded-full border border-lime-400/30 text-lime-400/70 transition-colors duration-300 group-hover:border-lime-400 group-hover:bg-lime-400 group-hover:text-navy-900"
                  >
                    <Check size={11} strokeWidth={2.5} />
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
