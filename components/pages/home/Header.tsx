"use client";
import { useEffect, useState, type CSSProperties } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { NAV } from "@/lib/products";
import { useSectionAccent } from "@/lib/accent";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");
  const homeAccent = useSectionAccent("home");
  const shopAccent = useSectionAccent("shop");
  // navbar follows the flavour selected in whichever section is on screen (Home or Shop)
  const accent = active === "#shop" ? shopAccent : homeAccent;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    NAV.forEach((n) => { const el = document.querySelector(n.href); if (el) io.observe(el); });
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      style={{
        "--accent": accent,
        transitionProperty: "background, backdrop-filter, --accent",
        transitionDuration: "500ms, 500ms, 900ms",
        transitionTimingFunction: "ease, ease, cubic-bezier(0.22, 1, 0.36, 1)",
      } as CSSProperties}
      className={`fixed inset-x-0 top-0 z-50 ${
        scrolled || open ? "bg-black/70 backdrop-blur-xl" : "bg-transparent"}`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:h-[80px] lg:px-16">
        <a href="#home" aria-label="Nitro home" onClick={() => setOpen(false)}>
          <Image src="/images/logo.png" alt="Nitro" width={288} height={66} priority className="h-[22px] w-auto lg:h-6" />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex gap-14 xl:gap-20">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="group relative block py-1 text-base leading-[150%] text-white">
                  {n.label}
                  <span className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-[var(--accent)] transition-transform duration-500 ease-out ${
                    active === n.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a href="#shop" className="btn hidden bg-[var(--accent)] text-black sm:inline-flex sm:px-8 lg:px-[45px]">Buy Now</a>
          <button type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}
            onClick={() => setOpen((o) => !o)} className="relative grid size-11 place-items-center lg:hidden">
            <span className={`absolute h-0.5 w-6 bg-white transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-1.5"}`} />
            <span className={`absolute h-0.5 w-6 bg-white transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
            <span className={`absolute h-0.5 w-6 bg-white transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-1.5"}`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav aria-label="Mobile" initial={{ height: 0 }} animate={{ height: "calc(100svh - 72px)" }} exit={{ height: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden lg:hidden">
            <ul className="flex h-full flex-col justify-center gap-6 px-8 pb-16">
              {NAV.map((n, i) => (
                <motion.li key={n.href} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.12 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
                  <a href={n.href} onClick={() => setOpen(false)} className="display text-4xl text-white active:text-[var(--accent)]">{n.label}</a>
                </motion.li>
              ))}
              <li className="pt-4"><a href="#shop" onClick={() => setOpen(false)} className="btn w-full bg-[var(--accent)] text-black">Buy Now</a></li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
