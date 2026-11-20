"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems, conference } from "@/data/conference";
import { ABSTRACT_SUBMISSION_URL } from "@/lib/config";
import { getLenis, lockScroll, scrollToSection } from "@/lib/scroll";
import { cn } from "@/lib/utils";
import MagneticButton from "@/components/ui/MagneticButton";

/**
 * Fixed navigation: transparent over the hero, navy glass once the sequence is
 * underway. Scroll-spy tracks the section currently filling the viewport.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const timeoutId = useRef<number | undefined>(undefined);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > window.innerHeight * 0.65);
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const elements = navItems
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKey);
    lockScroll(true);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 120);

    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
      document.body.style.overflow = previous;
      window.clearTimeout(focusTimer);
    };
  }, [open]);

  const go = (id: string) => {
    if (id === "hero") {
      setOpen(false);
      getLenis()?.scrollTo(0, { duration: 1.2 });
      if (!getLenis()) window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      return;
    }

    const delay = open ? 260 : 0;
    setOpen(false);
    window.clearTimeout(timeoutId.current);
    timeoutId.current = window.setTimeout(() => scrollToSection(id), delay);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled || open
          ? "border-b border-white/10 bg-navy-900/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="shell flex h-[72px] items-center justify-between gap-6">
        <a
          href="#hero"
          onClick={(event) => {
            event.preventDefault();
            go("hero");
          }}
          className="group flex items-center gap-3"
          aria-label="AIM-HUB 2027 — back to top"
        >
          <span className="relative grid h-7 w-7 place-items-center">
            <span className="border-lime-400/60 absolute inset-0 rotate-45 border" />
            <span className="bg-lime-400 h-1.5 w-1.5 rounded-full transition-transform duration-500 group-hover:scale-150" />
          </span>
          <span className="font-display text-sm font-semibold tracking-[-0.01em]">
            AIM-HUB<span className="text-lime-400">.</span>
            <span className="ml-1.5 font-mono text-[10px] font-normal tracking-[0.18em] text-steel">
              2027
            </span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex xl:gap-8">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(event) => {
                event.preventDefault();
                go(item.id);
              }}
              aria-current={active === item.id ? "true" : undefined}
              className={cn(
                "link-underline font-mono text-[10px] tracking-[0.18em] uppercase transition-colors duration-300",
                active === item.id ? "text-white" : "text-steel hover:text-white",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <MagneticButton
            href={ABSTRACT_SUBMISSION_URL}
            external
            className="hidden px-5 py-2.5 lg:inline-flex"
            icon={false}
          >
            Submit Abstract
          </MagneticButton>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.35 }}
            className="bg-navy-900/97 fixed inset-0 -z-10 flex flex-col justify-between px-5 pt-28 pb-8 backdrop-blur-2xl lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    go(item.id);
                  }}
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: reduce ? 0 : 0.06 * index + 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex items-baseline justify-between border-b border-white/10 py-4"
                >
                  <span className="font-display text-2xl font-medium tracking-tight">
                    {item.label}
                  </span>
                  <span className="font-mono text-[10px] text-steel">
                    0{index + 3}
                  </span>
                </motion.a>
              ))}
            </nav>

            <div className="space-y-5">
              <MagneticButton href={ABSTRACT_SUBMISSION_URL} external className="w-full">
                Submit Abstract
              </MagneticButton>
              <p className="font-mono text-[10px] leading-relaxed tracking-[0.16em] text-steel uppercase">
                {conference.datesLabel} · {conference.venue}
                <br />
                Bengaluru, India
              </p>
            </div>

            <button ref={closeRef} type="button" className="sr-only" onClick={() => setOpen(false)}>
              Close menu
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
