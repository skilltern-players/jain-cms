"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { committee } from "@/data/conference";
import SectionLabel from "@/components/ui/SectionLabel";
import SplitHeading from "@/components/motion/SplitHeading";
import Tabs from "@/components/ui/Tabs";

/** 11 — leadership plus a filterable list of every committee. */
export default function Committee() {
  const [active, setActive] = useState<string>(committee.groups[0]!.id);
  const reduce = useReducedMotion();

  const group =
    committee.groups.find((item) => item.id === active) ?? committee.groups[0]!;
  const total = committee.groups.reduce(
    (sum, item) => sum + item.members.length,
    0,
  );

  return (
    <section
      id="committee"
      className="bg-white text-navy-900 relative scroll-mt-24"
    >
      <div className="shell py-section">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SectionLabel index="11" tone="light">
            Committee
          </SectionLabel>
          <span className="font-mono text-[9px] tracking-[0.2em] text-navy-900/40 uppercase">
            {total} members · {committee.groups.length} committees
          </span>
        </div>

        <SplitHeading as="h2" className="mt-6 max-w-3xl text-display-lg font-semibold">
          The{" "}
          <span className="font-serif italic font-normal">committee</span>
        </SplitHeading>

        <p className="text-navy-900/60 mt-5 max-w-xl text-sm leading-relaxed">
          Academic leadership, an advisory board and the teams running the
          conference.
        </p>

        {/* Leadership */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {committee.leadership.map((person) => (
            <article
              key={person.name}
              className="bg-navy-900 hud-frame p-6 text-white sm:p-7"
            >
              <p className="font-mono text-[9px] tracking-[0.2em] text-lime-400 uppercase">
                {person.group}
              </p>
              <h3 className="font-display mt-3 text-xl leading-tight">
                {person.name}
              </h3>
              <p className="mt-1 text-[13px] text-steel">{person.role}</p>
            </article>
          ))}
        </div>

        {/* Groups */}
        <div className="mt-14 border-t border-navy-900/10 pt-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="font-display text-xl leading-tight">
                {group.label}
              </h3>
              <span className="font-mono text-[9px] tracking-[0.16em] text-navy-900/40 uppercase">
                {String(group.members.length).padStart(2, "0")}
              </span>
            </div>

            <Tabs
              items={committee.groups.map((item) => ({
                id: item.id,
                label: item.label,
                hint: `${String(item.members.length).padStart(2, "0")}`,
              }))}
              value={active}
              onChange={setActive}
              tone="light"
              ariaLabel="Committee groups"
            />
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={group.id}
              role="tabpanel"
              aria-label={group.label}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 1 } : { opacity: 0, y: -8 }}
              transition={{ duration: reduce ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6"
            >
              <ul className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
                {group.members.map((member) => (
                  <li
                    key={member.name}
                    className="border-t border-navy-900/10 py-4"
                  >
                    <p className="font-display text-base leading-snug">
                      {member.name}
                    </p>
                    <p className="text-navy-900/55 mt-1 text-[12px] leading-relaxed">
                      {member.role}
                    </p>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="mt-8 font-mono text-[9px] tracking-[0.14em] text-navy-900/35 uppercase">
          Committee as published in the conference brochure
        </p>
      </div>
    </section>
  );
}
