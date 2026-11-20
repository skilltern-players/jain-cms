import { Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import { conference, contact } from "@/data/conference";
import { ABSTRACT_SUBMISSION_URL, REGISTRATION_URL } from "@/lib/config";
import SectionLabel from "@/components/ui/SectionLabel";
import SplitHeading from "@/components/motion/SplitHeading";
import Reveal from "@/components/motion/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";

const ICONS: Record<string, LucideIcon> = {
  Phone,
  Email: Mail,
  Venue: MapPin,
  "Conference contact": MapPin,
};

/** 12 — the closing call to action and the ways to reach the desk. */
export default function Contact() {
  return (
    <section id="contact" className="bg-navy-900 relative scroll-mt-24 text-white">
      <div className="shell py-section">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SectionLabel index="12">Contact</SectionLabel>
          <span className="font-mono text-[9px] tracking-[0.2em] text-white/35 uppercase">
            {conference.datesLabel}
          </span>
        </div>

        <SplitHeading as="h2" className="mt-6 max-w-4xl text-display-lg font-semibold">
          Submit your{" "}
          <span className="font-serif text-lime-400 font-normal italic">
            research
          </span>
        </SplitHeading>

        <p className="mt-5 max-w-xl text-sm leading-relaxed text-steel">
          {contact.lead}
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          <Reveal className="h-full">
            <div className="glass hud-frame flex h-full flex-col justify-between p-6 sm:p-8">
              <div>
                <p className="font-mono text-[9px] tracking-[0.22em] text-steel uppercase">
                  Take part
                </p>
                <p className="font-display mt-4 max-w-md text-2xl leading-tight text-balance">
                  Submit an abstract, then register within your fee window.
                </p>

                <div className="mt-6 flex flex-wrap gap-2.5">
                  <MagneticButton href={ABSTRACT_SUBMISSION_URL} external>
                    Submit abstract
                  </MagneticButton>
                  <MagneticButton
                    href={REGISTRATION_URL}
                    external
                    variant="outline"
                  >
                    Register
                  </MagneticButton>
                </div>
              </div>

              <div className="mt-8 border-t border-white/10 pt-5">
                <p className="font-mono text-[10px] leading-relaxed tracking-[0.12em] text-steel uppercase">
                  {conference.datesLabel} · {conference.city}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-white/70">
                  {conference.venue}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-steel">
                  {conference.mode}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05} className="h-full">
            <div className="flex h-full flex-col justify-between border border-white/15 p-6 sm:p-8">
              <div>
                <p className="font-mono text-[9px] tracking-[0.22em] text-steel uppercase">
                  Conference desk
                </p>

                <ul className="mt-4 divide-y divide-white/10 border-t border-white/10">
                  {contact.details.map((detail) => {
                    const Icon = ICONS[detail.label] ?? MapPin;

                    return (
                      <li
                        key={detail.label}
                        className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 py-4"
                      >
                        <Icon
                          aria-hidden
                          size={15}
                          strokeWidth={1.4}
                          className="mt-0.5 text-white/35"
                        />
                        <div>
                          <p className="font-mono text-[9px] tracking-[0.18em] text-steel uppercase">
                            {detail.label}
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-white">
                            {"href" in detail && detail.href ? (
                              <a className="link-underline" href={detail.href}>
                                {detail.value}
                              </a>
                            ) : (
                              detail.value
                            )}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <p className="mt-6 font-mono text-[9px] leading-relaxed tracking-[0.14em] text-white/35 uppercase">
                Submissions and registrations are confirmed by email
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
