import { conference, institutions } from "@/data/conference";
import SectionLabel from "@/components/ui/SectionLabel";
import SplitHeading from "@/components/motion/SplitHeading";
import Reveal from "@/components/motion/Reveal";

/** 10 — the host institutions and their partner organisations. */
export default function Institutions() {
  return (
    <section
      id="institutions"
      className="bg-navy-800 relative scroll-mt-24 border-y border-white/10 text-white"
    >
      <div className="shell py-section">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SectionLabel index="10">Institutions</SectionLabel>
          <span className="font-mono text-[9px] tracking-[0.2em] text-white/35 uppercase">
            NAAC A++ · NIRF 2025
          </span>
        </div>

        <SplitHeading as="h2" className="mt-6 max-w-4xl text-display-lg font-semibold">
          The institutions{" "}
          <span className="font-serif text-lime-400 font-normal italic">
            behind it
          </span>
        </SplitHeading>

        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-steel">
          AIM-HUB 2027 is organised by {conference.organiserShort}, in
          association with {conference.inAssociationWith}.
        </p>

        <div className="mt-12 grid gap-px border border-white/10 bg-white/10 lg:grid-cols-2">
          {/* JAIN */}
          <Reveal className="h-full">
            <article className="bg-navy-800 flex h-full flex-col p-6 sm:p-8">
              <p className="font-mono text-[9px] tracking-[0.2em] text-lime-400 uppercase">
                Host university
              </p>
              <h3 className="font-display mt-3 text-2xl leading-tight">
                {institutions.jain.name}
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-steel">
                {institutions.jain.body}
              </p>

              <div className="mt-7 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                {institutions.jain.highlights.map((highlight) => (
                  <div key={highlight.label}>
                    <p className="font-display text-3xl leading-none text-lime-400">
                      {highlight.value}
                    </p>
                    <p className="mt-2 font-mono text-[9px] tracking-[0.14em] text-white/60 uppercase">
                      {highlight.label}
                    </p>
                    {"detail" in highlight ? (
                      <p className="mt-0.5 font-mono text-[9px] tracking-[0.12em] text-white/35 uppercase">
                        {highlight.detail}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>

              <div className="mt-6 border-l border-lime-400/40 pl-4">
                <p className="font-mono text-[9px] tracking-[0.16em] text-white/40 uppercase">
                  Award
                </p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-steel">
                  {institutions.jain.award}
                </p>
              </div>
            </article>
          </Reveal>

          {/* CMS */}
          <Reveal delay={0.05} className="h-full">
            <article className="bg-navy-800 flex h-full flex-col p-6 sm:p-8">
              <p className="font-mono text-[9px] tracking-[0.2em] text-lime-400 uppercase">
                Business school
              </p>
              <h3 className="font-display mt-3 text-2xl leading-tight">
                {institutions.cms.name}
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-steel">
                {institutions.cms.body}
              </p>

              <div className="mt-7 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                {institutions.cms.highlights.map((highlight) => (
                  <div key={highlight.label}>
                    <p className="font-display text-3xl leading-none text-lime-400">
                      {highlight.value}
                    </p>
                    <p className="mt-2 font-mono text-[9px] tracking-[0.14em] text-white/60 uppercase">
                      {highlight.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {institutions.cms.memberships.map((membership) => (
                  <span
                    key={membership}
                    className="rounded-full border border-white/15 px-3 py-1.5 font-mono text-[9px] tracking-[0.12em] text-white/65 uppercase"
                  >
                    {membership}
                  </span>
                ))}
              </div>

              <p className="mt-4 text-[13px] leading-relaxed text-steel">
                {institutions.cms.rankingNote}
              </p>
            </article>
          </Reveal>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="font-mono text-[9px] tracking-[0.2em] text-white/40 uppercase">
            Partners and memberships
          </p>

          <ul className="mt-5 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {institutions.partners.map((partner) => (
              <li key={partner.name} className="bg-navy-800 group px-5 py-4">
                <p className="font-display text-sm leading-snug text-white">
                  {partner.name}
                </p>
                <p className="mt-1 font-mono text-[9px] tracking-[0.14em] text-white/35 uppercase transition-colors duration-300 group-hover:text-lime-400">
                  {partner.country}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
