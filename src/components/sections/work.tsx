import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, X } from "lucide-react";
import { WORK, type WorkItem } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";

export function Work() {
  const [active, setActive] = useState<WorkItem | null>(null);
  return (
    <section id="work" className="scroll-mt-24 py-20 sm:py-28">
      <div className="shell-page">
        <Reveal className="max-w-2xl">
          <p className="font-sans text-caption uppercase tracking-kicker text-accent">01 · Bodies</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-fg sm:text-5xl">Dune Dashboards</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">On-chain work recognized inside Katana and Plume — plus a TVL breakdown built for people who need the mix, not just the headline.</p>
        </Reveal>
        <div className="mt-12 grid gap-3 md:grid-cols-3">
          {WORK.map((item) => (
            <article key={item.id} className="group overflow-hidden rounded-2xl bg-surface/80 shadow-border transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-glow">
              <button type="button" onClick={() => setActive(item)} className="flex h-full w-full flex-col p-5 text-left sm:p-6">
                <p className="font-sans text-micro uppercase tracking-wider text-accent">{item.kind}</p>
                <p className="mt-4 text-xs text-muted">{item.client}</p>
                <h3 className="mt-1 flex items-center justify-between gap-3 font-display text-xl font-semibold tracking-tight text-fg">{item.title}<ArrowUpRight className="size-4 shrink-0 text-muted" /></h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{item.summary}</p>
              </button>
            </article>
          ))}
        </div>
      </div>
      {active ? <WorkDialog item={active} onClose={() => setActive(null)} /> : null}
    </section>
  );
}

function WorkDialog({ item, onClose }: { item: WorkItem; onClose: () => void }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", onKey); };
  }, [onClose]);
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" role="dialog" aria-modal="true">
      <button type="button" aria-label="Close dialog" className="absolute inset-0 bg-bg/70" onClick={onClose} />
      <div className="relative z-10 max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-surface p-5 shadow-glow sm:mx-6 sm:rounded-2xl sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-sans text-micro uppercase tracking-wider text-accent">{item.kind} · {item.client}</p>
            <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-fg">{item.title}</h3>
          </div>
          <button type="button" onClick={onClose} className="flex size-11 shrink-0 items-center justify-center rounded-md text-muted hover:text-fg" aria-label="Close"><X className="size-5" /></button>
        </div>
        <p className="mt-5 text-sm leading-relaxed text-muted">{item.body}</p>
        <ul className="mt-5 flex flex-wrap gap-2">{item.tags.map((tag) => (<li key={tag} className="rounded-full bg-elevated px-3 py-1 text-xs text-fg shadow-border">{tag}</li>))}</ul>
        {item.href ? (<Button asChild className="mt-6"><a href={item.href} target="_blank" rel="noreferrer">{item.hrefLabel ?? "Open"}<ArrowUpRight className="size-4" /></a></Button>) : null}
      </div>
    </div>,
    document.body,
  );
}
