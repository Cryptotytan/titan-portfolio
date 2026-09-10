import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowDown, X } from "lucide-react";
import type { SystemBody } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import { LivingGlobe } from "@/components/living-globe";
import { cn } from "@/lib/utils";

export function PlanetInspect({
  body,
  onClose,
}: {
  body: SystemBody;
  onClose: () => void;
}) {
  const [fly, setFly] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const travel = () => {
    setFly(true);
    const id = body.href.replace("#", "");
    window.setTimeout(() => {
      onClose();
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 720);
  };

  return createPortal(
    <div className={cn("inspect-root fixed inset-0 z-50 flex items-center justify-center overflow-hidden py-10", fly && "is-flying")}>
      <button type="button" className="absolute inset-0 bg-bg/80" aria-label="Close inspection" onClick={onClose} />
      <div className="shell-page relative z-10 grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        <div className="inspect-globe min-w-0 overflow-visible">
          <LivingGlobe key={body.id} kind={body.kind} glow={body.glow} rings={body.rings} star={body.star} fly={fly} />
          <p className="mt-3 text-center font-sans text-micro uppercase tracking-kicker text-subtle">Drag to turn · {body.planet}</p>
        </div>
        <aside className="inspect-card rounded-2xl bg-surface/90 p-6 shadow-border sm:p-8">
          <p className="font-sans text-caption uppercase tracking-kicker text-accent">{body.kicker}</p>
          <p className="mt-3 font-sans text-micro uppercase tracking-widest text-subtle">{body.planet}</p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl">{body.title}</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{body.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button type="button" size="lg" onClick={travel}>{body.cta}<ArrowDown className="size-4" /></Button>
            <Button type="button" variant="ghost" size="lg" onClick={onClose}>Back to system</Button>
          </div>
        </aside>
      </div>
      <button type="button" onClick={onClose} className="absolute right-4 top-4 z-20 flex size-11 items-center justify-center rounded-md text-fg sm:right-6 sm:top-6" aria-label="Close">
        <X className="size-5" />
      </button>
    </div>,
    document.body,
  );
}
