import { ArrowUpRight } from "lucide-react";
import CircuitLine from "@/components/layout/CircuitLine";
import { conference, contact } from "@/data/conference";
import { ABSTRACT_SUBMISSION_URL } from "@/lib/config";
import cmsLogo from "@/logo/CMS New Logo w.png";

const linkColumns = [
  {
    title: "Conference",
    links: [
      { id: "theme", label: "Theme" },
      { id: "tracks", label: "Tracks" },
      { id: "dates", label: "Important dates" },
      { id: "publication", label: "Publication" },
    ],
  },
  {
    title: "Participate",
    links: [
      { id: "guidelines", label: "Call for papers" },
      { id: "fees", label: "Registration fees" },
      { id: "contact", label: "Contact" },
    ],
  },
  {
    title: "About",
    links: [
      { id: "institutions", label: "Institutions" },
      { id: "committee", label: "Committee" },
      { id: "objectives", label: "Objectives" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy-900 relative text-white">
      <CircuitLine />

      <div className="shell border-t border-white/10 py-14">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <img src={cmsLogo.src} alt="CMS Business School logo" className="mb-8 h-10 w-auto" />

            <p className="font-mono text-[9px] tracking-[0.24em] text-white/35 uppercase">
              International Conference · {conference.datesLabel}
            </p>

            <p className="font-display mt-4 text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.85] font-semibold tracking-[-0.04em]">
              AIM-HUB
              <span className="block font-serif text-[0.55em] font-normal italic text-white/35">
                2027
              </span>
            </p>

            <p className="mt-6 max-w-md text-[13px] leading-relaxed text-steel">
              {conference.organiser}
              <br />
              In association with {conference.inAssociationWith}
              <br />
              Institutional membership: {conference.institutionalMembership}
            </p>

            <a
              href={ABSTRACT_SUBMISSION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-lime-400 uppercase"
            >
              Submit an abstract
              <ArrowUpRight
                aria-hidden
                size={13}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {linkColumns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <p className="font-mono text-[9px] tracking-[0.2em] text-white/35 uppercase">
                  {column.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.id}>
                      <a
                        href={`#${link.id}`}
                        className="link-underline text-[13px] text-white/65 transition-colors duration-300 hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[9px] leading-relaxed tracking-[0.12em] text-white/35 uppercase">
            {contact.copyright}
          </p>

          <a
            href="#hero"
            className="group inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.18em] text-white/50 uppercase transition-colors duration-300 hover:text-lime-400"
          >
            Back to top
            <span className="grid h-6 w-6 place-items-center rounded-full border border-white/15 transition-colors duration-300 group-hover:border-lime-400">
              <ArrowUpRight
                aria-hidden
                size={11}
                className="-rotate-45 transition-transform duration-300 group-hover:-translate-y-0.5"
              />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
