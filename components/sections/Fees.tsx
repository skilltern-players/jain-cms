"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { fees, type FeeRegion, type FeeSeason } from "@/data/conference";
import { REGISTRATION_URL, SHOW_BANK_DETAILS } from "@/lib/config";
import { cn } from "@/lib/utils";
import SectionLabel from "@/components/ui/SectionLabel";
import SplitHeading from "@/components/motion/SplitHeading";
import Tabs from "@/components/ui/Tabs";
import Counter from "@/components/ui/Counter";
import Reveal from "@/components/motion/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";

/**
 * 08 — registration. Region and season are independent toggles; prices count
 * up to the selected rate and the early-bird saving is shown per category.
 */
export default function Fees() {
  const [region, setRegion] = useState<FeeRegion>("india");
  const [season, setSeason] = useState<FeeSeason>("early");

  const regionMeta = fees.regions.find((item) => item.id === region)!;
  const seasonMeta = fees.seasons.find((item) => item.id === season)!;
  const locale = region === "india" ? "en-IN" : "en-US";
  const otherSeason: FeeSeason = season === "early" ? "regular" : "early";
  const otherLabel = season === "early" ? "Regular" : "Early bird";

  return (
    <section
      id="fees"
      className="bg-white text-navy-900 relative scroll-mt-24"
    >
      <div className="shell py-section">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SectionLabel index="08" tone="light">
            Registration
          </SectionLabel>
          <span className="font-mono text-[9px] tracking-[0.2em] text-navy-900/40 uppercase">
            {fees.gstNote}
          </span>
        </div>

        <SplitHeading as="h2" className="mt-6 max-w-3xl text-display-lg font-semibold">
          Registration{" "}
          <span className="font-serif italic font-normal">fees</span>
        </SplitHeading>

        <p className="text-navy-900/60 mt-5 max-w-xl text-sm leading-relaxed">
          One rate per participant, in the currency of your region. The early
          bird window closes before the regular window.
        </p>

        {/* Toggles */}
        <div className="mt-10 flex flex-col gap-4 border-t border-navy-900/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Tabs
            items={fees.regions.map((item) => ({
              id: item.id,
              label: item.label,
              hint: "hint" in item ? item.hint : undefined,
            }))}
            value={region}
            onChange={(id) => setRegion(id as FeeRegion)}
            tone="light"
            ariaLabel="Fee region"
          />
          <Tabs
            items={fees.seasons.map((item) => ({
              id: item.id,
              label: item.label,
              hint: item.window,
            }))}
            value={season}
            onChange={(id) => setSeason(id as FeeSeason)}
            tone="light"
            ariaLabel="Registration season"
          />
        </div>

        <p className="mt-4 font-mono text-[9px] tracking-[0.16em] text-navy-900/40 uppercase">
          {regionMeta.label} · {seasonMeta.label} window {seasonMeta.window}
        </p>

        {/* Fee cards */}
        <div className="mt-8 grid gap-px border border-navy-900/15 bg-navy-900/15 sm:grid-cols-2 xl:grid-cols-4">
          {fees.cards.map((card) => {
            const price = card[region][season];
            const alternate = card[region][otherSeason];
            const saving = card[region].regular - card[region].early;

            return (
              <article
                key={card.id}
                className="group relative flex flex-col justify-between bg-white p-6 transition-colors duration-500 hover:bg-white"
              >
                <div>
                  <div className="flex min-h-[1.25rem] items-start justify-between gap-3">
                    <span className="font-mono text-[9px] tracking-[0.18em] text-navy-900/40 uppercase">
                      {regionMeta.currency}
                    </span>
                    {season === "early" && saving > 0 ? (
                      <span className="bg-lime-400 rounded-full px-2 py-0.5 font-mono text-[8px] tracking-[0.12em] text-navy-900 uppercase">
                        Save {regionMeta.symbol}
                        {saving.toLocaleString(locale)}
                      </span>
                    ) : null}
                  </div>

                  <p className="font-display mt-6 text-[clamp(1.85rem,3vw,2.4rem)] leading-none tracking-tight">
                    <Counter
                      key={`${region}-${season}-${card.id}`}
                      value={price}
                      prefix={regionMeta.symbol}
                      locale={locale}
                      duration={0.9}
                    />
                  </p>

                  <h3 className="font-display mt-4 text-base leading-snug">
                    {card.label}
                  </h3>
                  {"detail" in card && card.detail ? (
                    <p className="mt-1 text-xs text-navy-900/50">{card.detail}</p>
                  ) : null}
                </div>

                <div className="mt-8 flex items-baseline justify-between gap-3 border-t border-navy-900/10 pt-3">
                  <span className="font-mono text-[8px] tracking-[0.16em] text-navy-900/40 uppercase">
                    {seasonMeta.label}
                  </span>
                  <span className="font-mono text-[9px] text-navy-900/45">
                    {otherLabel} {regionMeta.symbol}
                    {alternate.toLocaleString(locale)}
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="hud-frame border-navy-900/15 h-full border p-6 sm:p-7">
              <p className="font-mono text-[9px] tracking-[0.22em] text-navy-900/45 uppercase">
                Registration includes
              </p>
              <ul className="mt-5 space-y-3">
                {fees.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-snug text-navy-900/80"
                  >
                    <span
                      aria-hidden
                      className="bg-lime-400 mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full text-navy-900"
                    >
                      <Check size={9} strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="flex h-full flex-col justify-between border border-navy-900/15 p-6 sm:p-7">
              <div>
                <p className="font-mono text-[9px] tracking-[0.22em] text-navy-900/45 uppercase">
                  Payment
                </p>
                <p className="mt-4 text-sm leading-relaxed text-navy-900/75">
                  {fees.gstNote} Register within the {seasonMeta.label.toLowerCase()}{" "}
                  window to secure this rate.
                </p>

                <dl className="mt-5 divide-y divide-navy-900/10 border-t border-navy-900/10">
                  <div className="flex items-baseline justify-between gap-6 py-3">
                    <dt className="font-mono text-[9px] tracking-[0.16em] text-navy-900/45 uppercase">
                      Window
                    </dt>
                    <dd className="text-right text-[13px]">{seasonMeta.window}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-6 py-3">
                    <dt className="font-mono text-[9px] tracking-[0.16em] text-navy-900/45 uppercase">
                      Closing
                    </dt>
                    <dd className="text-right text-[13px]">
                      {fees.seasons[1].window}
                    </dd>
                  </div>
                  {SHOW_BANK_DETAILS ? (
                    <>
                      <div className="flex items-baseline justify-between gap-6 py-3">
                        <dt className="font-mono text-[9px] tracking-[0.16em] text-navy-900/45 uppercase">
                          Account
                        </dt>
                        <dd className="text-right text-[13px]">
                          {fees.bank.accountName}
                        </dd>
                      </div>
                      <div className="flex items-baseline justify-between gap-6 py-3">
                        <dt className="font-mono text-[9px] tracking-[0.16em] text-navy-900/45 uppercase">
                          A/C · IFSC
                        </dt>
                        <dd className="text-right font-mono text-[11px]">
                          {fees.bank.accountNumber} · {fees.bank.ifsc}
                        </dd>
                      </div>
                    </>
                  ) : null}
                </dl>
              </div>

              <div className="mt-8">
                <MagneticButton
                  href={REGISTRATION_URL}
                  external
                  variant="outline-navy"
                >
                  Register
                </MagneticButton>
              </div>
            </div>
          </Reveal>
        </div>

        <p
          className={cn(
            "mt-6 font-mono text-[9px] tracking-[0.14em] text-navy-900/35 uppercase",
          )}
        >
          Additional authors register separately under “Additional Author
          Registration”.
        </p>
      </div>
    </section>
  );
}
