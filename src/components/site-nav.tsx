import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV, SITE } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { TitanMark } from "@/components/titan-mark";
import { Button } from "@/components/ui/button";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 bg-bg/85 shadow-border backdrop-blur-md transition-[background-color,box-shadow] duration-300 ease-out",
        (scrolled || open) && "bg-bg/92",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-fg focus:px-3 focus:py-2 focus:text-sm focus:text-accent-fg"
      >
        Skip to content
      </a>
      <div className="shell flex h-16 items-center justify-between">
        <a
          href="#top"
          className="flex items-center gap-2.5 text-fg"
          onClick={() => setOpen(false)}
        >
          <TitanMark className="size-7 text-accent" />
          <span className="font-display text-lg font-semibold uppercase tracking-display">
            {SITE.brand}
          </span>
        </a>

        <nav className="hidden items-center gap-0 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                "rounded-full px-2.5 py-2 text-sm transition-[color,background-color] duration-200",
                active === item.id
                  ? "text-fg"
                  : "text-muted hover:text-fg",
              )}
            >
              {item.label}
            </a>
          ))}
          <Button asChild size="sm" className="ml-2">
            <a href="#contact">Work with Titan</a>
          </Button>
        </nav>

        <div className="flex items-center gap-1 lg:hidden">
          <button
            type="button"
            className="relative flex size-11 items-center justify-center rounded-md text-fg"
            aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative size-5">
            <Menu
              className={cn(
                "absolute inset-0 size-5 transition-[opacity,transform,filter] duration-200 ease-out",
                open ? "scale-50 opacity-0 blur-sm" : "scale-100 opacity-100 blur-none",
              )}
            />
            <X
              className={cn(
                "absolute inset-0 size-5 transition-[opacity,transform,filter] duration-200 ease-out",
                open ? "scale-100 opacity-100 blur-none" : "scale-50 opacity-0 blur-sm",
              )}
            />
          </span>
        </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-border bg-bg/90 transition-[max-height,opacity] duration-300 ease-out lg:hidden",
          open ? "max-h-dvh opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="flex flex-col px-5 py-4" aria-label="Mobile">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center border-b border-border text-base text-fg last:border-0"
            >
              {item.label}
            </a>
          ))}
          <Button asChild className="mt-4 w-full">
            <a href="#contact" onClick={() => setOpen(false)}>
              Work with Titan
            </a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
